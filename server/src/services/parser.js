const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const path = require('path');

async function extractText(buffer, filename) {
  const ext = path.extname(filename).toLowerCase();

  if (ext === '.pdf') {
    return extractFromPDF(buffer);
  }

  if (ext === '.docx') {
    return extractFromDOCX(buffer);
  }

  throw new Error(`Unsupported file type: ${ext}`);
}

async function extractFromPDF(buffer) {
  const data = await pdfParse(buffer);
  return data.text.trim();
}

async function extractFromDOCX(buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return result.value.trim();
}

module.exports = { extractText };
