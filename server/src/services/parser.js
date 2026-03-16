const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.mjs');
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
  const uint8 = new Uint8Array(buffer);
  const doc = await pdfjsLib.getDocument({ data: uint8 }).promise;
  const pages = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const lines = [];
    let lastY = null;

    for (const item of content.items) {
      if (lastY !== null && Math.abs(item.transform[5] - lastY) > 2) {
        lines.push('\n');
      }
      lines.push(item.str);
      lastY = item.transform[5];
    }

    pages.push(lines.join(' ').replace(/ \n /g, '\n').trim());
  }

  return pages.join('\n\n').trim();
}

async function extractFromDOCX(buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return result.value.trim();
}

module.exports = { extractText };
