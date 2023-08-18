const PDFDocument = require('pdfkit');
const fs = require('fs');
const connection = require("./config");
const path=require('path')
async function createPDF(data, result) {
  try {
    await createpdf1(data, result); // Wait for createpdf1 to finish
  } catch (error) {
    console.log('Error creating PDF:', error);
  }
  // try{
  //   await createpdf2(data); // Wait for createpdf2 to finish
  // }
  // catch(err){

  // }
}

async function createpdf1(data, result) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      // Rest of the code...
  console.log(data, result);
  const id5 = data[0].id;
  const name = data[0].name;
  const roll = data[0].roll;
  const len=result.length-1;
  const begindate = result[len].begindate;
  const enddate = result[len].enddate;
  const reqid=result[len].reqid
  const gateid=result[len].gateid
  console.log(id5, name, roll, begindate, enddate,reqid);
  const filepath1=path.join(__dirname,'public')
  const pdfFilePath = `${filepath1}"/docs/"${id5}.pdf`;

  const filename = `${filepath1}/docs/${id5}.pdf`;

  // Create a write stream to save the PDF
  const stream = fs.createWriteStream(filename);

  // Pipe the PDF content to the write stream
  doc.pipe(stream);

  // Set the content of the page
  doc.font('Helvetica', 12);

  // ... (rest of the code for creating the PDF)
  const headers = ['id', 'name', 'roll','begindate','enddate','requestID','gateID'];
  
  const columns = [id5, name, roll,begindate,enddate,reqid,gateid];

  const cellMargin = 10;
  const tableWidth = 300;
  const startX = (doc.page.width - tableWidth) / 2;
  let startY = 50;

  doc.fontSize(16).font('Helvetica-Bold');
  doc.fillColor('black').text('LEAVE APPROVAL SLIP', { align: 'center' });

  startY += cellMargin + 30;

  headers.forEach((header, rowIndex) => {
    const xPos = startX;
    const yPos = startY + rowIndex * 20;

    doc.fontSize(12).font('Helvetica');
    doc.rect(xPos, yPos, tableWidth / 3, 20).fillAndStroke('#cccccc', '#000000');
    doc.fillColor('black').text(header.toString(), xPos + cellMargin, yPos + cellMargin, {
      width: tableWidth / 3 - 2 * cellMargin,
      align: 'left',
    });
  });

  columns.forEach((column, columnIndex) => {
    const xPos = startX + tableWidth / 3;
    const yPos = startY + columnIndex * 20;

    const fillColor = columnIndex % 2 === 0 ? '#f2f2f2' : '#ffffff';

    doc.fontSize(12).font('Helvetica');
    doc.rect(xPos, yPos, tableWidth * 2 / 3, 20).fillAndStroke(fillColor, '#000000');
    doc.fillColor('black').text(column.toString(), xPos + cellMargin, yPos + cellMargin, {
      width: tableWidth * 2 / 3 - 2 * cellMargin,
      align: 'left',
    });
  });


      // Finalize the PDF
      doc.end();

      // Wait for the PDF creation to finish
      doc.on('end', () => {
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
// const fs1=require("fs/promises")
// async function createpdf2(data) {
//   try {
//     const id5 = data[0].id;
//     const name = data[0].name;
//     const pdfFilePath = `${name}.pdf`;

//     // Read the PDF file as binary data
//     const pdfData= await fs1.readFile(pdfFilePath);
//     console.log("read data")
//     console.log(pdfData)
//     const pdfDataObj = { id: id5, pdf: pdfData};

//         // Insert the PDF file into the SQL table
//         const query = 'INSERT INTO pdfdownload SET ?';
//         connection.query(query, pdfDataObj, (error, results) => {
//           if (error) {
//             console.log('Error uploading PDF:', error);
//           } else {
//             console.log('PDF uploaded successfully!');
//           }
//         });
//   } catch (error) {
//     console.log('Error creating PDF:', error);
//   }
// }

module.exports = createPDF;
