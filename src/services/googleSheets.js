// // services/googleSheets.js
// import { google } from 'googleapis';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // For ES modules, get the current directory

// // https://docs.google.com/spreadsheets/d/1pIxH2Fdwu1wY54hoohJPhrB9pjdoLXqpw2LYXJFmOMM/edit?usp=sharing

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const auth = new google.auth.GoogleAuth({
//     keyFile: path.join(__dirname, 'credentials.json'),
//     scopes: ['https://www.googleapis.com/auth/spreadsheets'],
// });

// const sheets = google.sheets({ version: 'v4', auth });

// // You can set the spreadsheet ID in credentials.json or as environment variable
// const SPREADSHEET_ID = '1pIxH2Fdwu1wY54hoohJPhrB9pjdoLXqpw2LYXJFmOMM';
// const SHEET_NAME = 'MemberList'; // Change to your sheet name

// // Get all members
// export const getAllMembers = async () => {
//     try {
//         const response = await sheets.spreadsheets.values.get({
//             spreadsheetId: SPREADSHEET_ID,
//             range: `${SHEET_NAME}!A:Z`,
//         });

//         const rows = response.data.values;
//         if (!rows || rows.length === 0) {
//             return [];
//         }

//         const headers = rows[0];
//         const members = rows.slice(1).map(row => {
//             const member = {};
//             headers.forEach((header, index) => {
//                 member[header] = row[index] || '';
//             });
//             return member;
//         });

//         return members;
//     } catch (error) {
//         console.error('Error fetching all members:', error);
//         throw error;
//     }
// };

// // Fetch a specific row by ID
// export const getRowById = async (id) => {
//     try {
//         const response = await sheets.spreadsheets.values.get({
//             spreadsheetId: SPREADSHEET_ID,
//             range: `${SHEET_NAME}!A:Z`,
//         });

//         const rows = response.data.values;
//         if (!rows || rows.length === 0) {
//             throw new Error('No data found in sheet');
//         }

//         const headers = rows[0];
//         const idColumnIndex = headers.indexOf('ID'); // Adjust if your ID column has different name

//         const rowIndex = rows.findIndex((row, index) => index > 0 && row[idColumnIndex] === id);

//         if (rowIndex === -1) {
//             throw new Error(`Member with ID ${id} not found`);
//         }

//         const rowData = rows[rowIndex];
//         const member = {};
//         headers.forEach((header, index) => {
//             member[header] = rowData[index] || '';
//         });

//         return {
//             rowIndex: rowIndex + 1,
//             data: member
//         };
//     } catch (error) {
//         console.error('Error fetching row by ID:', error);
//         throw error;
//     }
// };

// // Update a specific row by ID
// export const updateRowById = async (id, updatedData) => {
//     try {
//         const { rowIndex } = await getRowById(id);

//         const headerResponse = await sheets.spreadsheets.values.get({
//             spreadsheetId: SPREADSHEET_ID,
//             range: `${SHEET_NAME}!1:1`,
//         });

//         const headers = headerResponse.data.values[0];
//         const updateValues = headers.map(header => updatedData[header] || '');

//         await sheets.spreadsheets.values.update({
//             spreadsheetId: SPREADSHEET_ID,
//             range: `${SHEET_NAME}!A${rowIndex}:Z${rowIndex}`,
//             valueInputOption: 'RAW',
//             resource: {
//                 values: [updateValues],
//             },
//         });

//         return { success: true, message: `Member ${id} updated successfully` };
//     } catch (error) {
//         console.error('Error updating row by ID:', error);
//         throw error;
//     }
// };

// // Add new member
// export const addNewMember = async (memberData) => {
//     try {
//         const headerResponse = await sheets.spreadsheets.values.get({
//             spreadsheetId: SPREADSHEET_ID,
//             range: `${SHEET_NAME}!1:1`,
//         });

//         const headers = headerResponse.data.values[0];
//         const newRow = headers.map(header => memberData[header] || '');

//         await sheets.spreadsheets.values.append({
//             spreadsheetId: SPREADSHEET_ID,
//             range: `${SHEET_NAME}!A:Z`,
//             valueInputOption: 'RAW',
//             resource: {
//                 values: [newRow],
//             },
//         });

//         return { success: true, message: 'Member added successfully' };
//     } catch (error) {
//         console.error('Error adding new member:', error);
//         throw error;
//     }
// };