import { NextResponse } from 'next/server';
import db from '../../db'; // Adjust the path based on your project structure
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const [user] = await db.query('SELECT * FROM Sadak WHERE Email = ?', [email]);

    if (user && await bcrypt.compare(password, user.Password)) {
      // Successful login
      return NextResponse.json({ 
        message: 'Login successful', 
        user: { email: user.Email, name: user.Name } 
      }, { status: 200 });
    } else {
      // Invalid email or password
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
