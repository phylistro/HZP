const express = require('express');
const { analyzeResume } = require('../services/analyzer');

const router = express.Router();

router.post('/analyze', async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Request body must include a non-empty "text" field.' });
    }

    const analysis = await analyzeResume(text);

    res.json({ analysis });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
