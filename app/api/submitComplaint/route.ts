// app/api/application/route.ts
import { NextResponse } from 'next/server';
import dbApplication from '../../dbApplication'; // Connection to Application database

export async function POST(request: Request) {
  const { vehicleType, description, contactInfo, location, problemType, additionalNotes } = await request.json();

  try {
    // Save data to the 'new_table' in the 'Application' database
    const result = await dbApplication.query(
      `INSERT INTO Application.new_table (Vtype, ComplaintD, ContactInfo, Location, TypeProblem, AddNote)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [vehicleType, description, contactInfo, location, problemType, additionalNotes]
    );

    return NextResponse.json({ message: 'Complaint submitted successfully', result }, { status: 201 });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
