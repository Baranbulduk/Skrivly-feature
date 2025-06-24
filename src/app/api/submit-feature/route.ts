import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, feature } = data;

    console.log('Received form data:', { name, email, feature });

    const dataDir = path.join(process.cwd(), 'data');
    const excelFilePath = path.join(dataDir, 'Skrivly-new-features.xlsx');
    console.log('Excel file path:', excelFilePath);

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let workbook;
    let worksheet;

    const sheetName = 'Features';
    if (fs.existsSync(excelFilePath)) {
      try {
        console.log('Reading existing Excel file...');
        workbook = XLSX.readFile(excelFilePath);
        worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
          throw new Error(`Sheet '${sheetName}' not found in workbook.`);
        }
      } catch (readError) {
        console.error('❌ Failed to read existing Excel file:', readError);
        throw new Error('Could not read existing Excel file. Aborting to prevent data loss.');
      }
    } else {
      console.log('Creating new Excel file...');
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.json_to_sheet([
        { Name: '', Email: '', Feature: '', Timestamp: '' }
      ], {
        header: ['Name', 'Email', 'Feature', 'Timestamp']
      });
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }

    let jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
    jsonData = jsonData.filter((row: any) => row.Name || row.Email || row.Feature || row.Timestamp);

    const newData = {
      Name: name,
      Email: email,
      Feature: feature,
      Timestamp: new Date().toISOString()
    };

    jsonData.push(newData);
    worksheet = XLSX.utils.json_to_sheet(jsonData, { header: ['Name', 'Email', 'Feature', 'Timestamp'] });
    workbook.Sheets[sheetName] = worksheet;

    try {
      const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
      fs.writeFileSync(excelFilePath, buffer);
      console.log('✅ Successfully wrote to Excel file');
    } catch (fileErr) {
      console.error('❌ Failed to write Excel file:', fileErr);
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
