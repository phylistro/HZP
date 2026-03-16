const express = require('express');
const { searchJobs } = require('../services/jobSearch');

const router = express.Router();

router.post('/jobs', (req, res, next) => {
  try {
    const { skills, title } = req.body;

    if (!skills && !title) {
      return res.status(400).json({ error: 'Request body must include "skills" (array) and/or "title" (string).' });
    }

    const jobs = searchJobs(
      Array.isArray(skills) ? skills : [],
      typeof title === 'string' ? title : '',
    );

    res.json({ jobs });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
