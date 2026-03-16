const express = require('express');
const { v4: uuidv4 } = require('uuid');
const upload = require('../middleware/upload');
const { extractText } = require('../services/parser');

const router = express.Router();

router.post('/upload', upload.single('resume'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded. Please upload a PDF or DOCX file.' });
    }

    const text = await extractText(req.file.buffer, req.file.originalname);

    if (!text || text.trim().length === 0) {
      return res.status(422).json({ error: 'Could not extract text from the uploaded file.' });
    }

    res.json({
      id: uuidv4(),
      filename: req.file.originalname,
      text,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
