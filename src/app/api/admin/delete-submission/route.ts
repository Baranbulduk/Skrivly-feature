import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE(request: Request) {
  try {
    const { index } = await request.json();
    
    if (typeof index !== 'number' || index < 0) {
      return NextResponse.json(
        { error: 'Invalid index provided' },
        { status: 400 }
      );
    }

    const dataDir = path.join(process.cwd(), 'data');
    const csvFilePath = path.join(dataDir, 'Skrivly-features.csv');

    if (!fs.existsSync(csvFilePath)) {
      return NextResponse.json(
        { error: 'CSV file not found' },
        { status: 404 }
      );
    }

    // Read the current CSV content
    const csvContent = await fs.promises.readFile(csvFilePath, 'utf-8');
    const lines = csvContent.trim().split('\n');
    
    // Check if the index is valid
    if (index >= lines.length - 1) { // -1 because we skip header
      return NextResponse.json(
        { error: 'Index out of range' },
        { status: 400 }
      );
    }

    // Remove the line at the specified index (add 1 to skip header)
    lines.splice(index + 1, 1);
    
    // Write the updated content back to the file
    await fs.promises.writeFile(csvFilePath, lines.join('\n') + '\n');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    );
  }
} 