import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, feature } = data;

    console.log('Received form data:', { name, email, feature });

    // Path to your Excel file in the public directory
    const excelFilePath = path.join(process.cwd(), 'public', 'data', 'Skrivly-new-features.xlsx');
    console.log('Excel file path:', excelFilePath);

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'public', 'data');
    console.log('Checking if data directory exists:', dataDir);
    try {
      if (!fs.existsSync(dataDir)) {
        console.log('Data directory does not exist. Attempting to create...');
        fs.mkdirSync(dataDir, { recursive: true });
        console.log('Data directory created successfully.');
      } else {
        console.log('Data directory already exists.');
      }
    } catch (dirErr) {
      console.error('Failed to create data directory:', dirErr);
      throw new Error('Directory creation failed: ' + (dirErr instanceof Error ? dirErr.message : 'Unknown error'));
    }

    let workbook;
    let worksheet;

    // Check if Excel file exists
    if (fs.existsSync(excelFilePath)) {
      console.log('Reading existing Excel file...');
      try {
        workbook = XLSX.readFile(excelFilePath);
        worksheet = workbook.Sheets[workbook.SheetNames[0]];
      } catch (readError) {
        console.error('Failed to read existing Excel file:', readError);
        console.log('Creating new Excel file instead...');
        // Create new workbook
        workbook = XLSX.utils.book_new();
        worksheet = XLSX.utils.json_to_sheet([], {
          header: ['Name', 'Email', 'Feature', 'Timestamp']
        });
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Features');
      }
    } else {
      console.log('Creating new Excel file...');
      // Create new workbook
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.json_to_sheet([], {
        header: ['Name', 'Email', 'Feature', 'Timestamp']
      });
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Features');
    }

    // Convert worksheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log('Current data in Excel:', jsonData);

    // Add new data
    const newData = {
      Name: name,
      Email: email,
      Feature: feature,
      Timestamp: new Date().toISOString()
    };
    console.log('Adding new data:', newData);
    jsonData.push(newData);

    // Convert back to worksheet
    worksheet = XLSX.utils.json_to_sheet(jsonData);

    // Update workbook
    workbook.Sheets[workbook.SheetNames[0]] = worksheet;

    // Write to file
    console.log('Writing to Excel file...');
    try {
      XLSX.writeFile(workbook, excelFilePath);
      console.log('Successfully wrote to Excel file');
    } catch (fileErr) {
      console.error('Failed to write Excel file:', fileErr);
      throw new Error('Excel file write failed: ' + (fileErr instanceof Error ? fileErr.message : 'Unknown error'));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving feature:', error);
    return NextResponse.json(
      { error: 'Failed to save feature', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 