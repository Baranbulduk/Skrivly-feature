import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, feature } = data;

    console.log('Received form data:', { name, email, feature });

    const dataDir = path.join(process.cwd(), 'data');
    const csvFilePath = path.join(dataDir, 'Skrivly-features.csv');
    console.log('CSV file path:', csvFilePath);

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Check if CSV file exists, if not create it with headers
    if (!fs.existsSync(csvFilePath)) {
      const headers = 'Name;Email;Feature;Timestamp\n';
      await fs.promises.writeFile(csvFilePath, headers);
      console.log('Created new CSV file with headers');
    }

    // Prepare the new row data
    const timestamp = new Date().toISOString();
    const newRow = `"${name}";"${email}";"${feature}";"${timestamp}"\n`;

    // Append the new row to the CSV file
    try {
      await fs.promises.appendFile(csvFilePath, newRow);
      console.log('✅ Successfully appended to CSV file');
      return NextResponse.json({ success: true });
    } catch (fileErr) {
      console.error('❌ Failed to append to CSV file:', fileErr);
      return NextResponse.json(
        { error: 'Failed to append to CSV file', details: fileErr instanceof Error ? fileErr.message : 'Unknown error' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error saving feature:', error);
    return NextResponse.json(
      { error: 'Failed to save feature', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
