import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const csvFilePath = path.join(dataDir, 'Skrivly-features.csv');

    if (!fs.existsSync(csvFilePath)) {
      return NextResponse.json({ submissions: [] });
    }

    const csvContent = await fs.promises.readFile(csvFilePath, 'utf-8');
    const lines = csvContent.trim().split('\n');
    
    // Skip the header line
    const dataLines = lines.slice(1);
    
    const submissions = dataLines.map((line, index) => {
      // Remove quotes and split by semicolon
      const values = line.split(';').map(value => value.replace(/^"|"$/g, ''));
      
      return {
        name: values[0] || '',
        email: values[1] || '',
        feature: values[2] || '',
        timestamp: values[3] || '',
        index: index
      };
    });

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('Error reading submissions:', error);
    return NextResponse.json(
      { error: 'Failed to read submissions' },
      { status: 500 }
    );
  }
} 