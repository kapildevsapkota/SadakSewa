// app/api/register/route.ts
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  // Hash the password for security
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Connect to the MySQL database
    const connection = await mysql.createConnection({
      host: process.env.DB_SERVER,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Insert user details into the Sadak table
    const [result] = await connection.execute(
      "INSERT INTO Sadak (Name, Email, Password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    // Close the connection
    await connection.end();

    // Return success response
    return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to register user. Please try again later." },
      { status: 500 }
    );
  }
}
