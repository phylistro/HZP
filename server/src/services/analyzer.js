async function analyzeResume(text) {
  if (process.env.OPENAI_API_KEY) {
    return analyzeWithOpenAI(text);
  }
  return analyzeWithRules(text);
}

// ── OpenAI-based analysis ──────────────────────────────────────────────────────

async function analyzeWithOpenAI(text) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a resume parser. Extract structured data from the resume text. ' +
            'Return ONLY valid JSON with these fields: name (string), email (string), ' +
            'phone (string), skills (string[]), experience (array of {title, company, duration, description}), ' +
            'education (array of {degree, institution, year}), summary (string).',
        },
        { role: 'user', content: text },
      ],
      temperature: 0.1,
    }),
  });

  if (!response.ok) {
    console.warn('OpenAI API error, falling back to rule-based analysis');
    return analyzeWithRules(text);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  try {
    return JSON.parse(content);
  } catch {
    console.warn('Failed to parse OpenAI response, falling back to rule-based analysis');
    return analyzeWithRules(text);
  }
}

// ── Rule-based fallback analysis ───────────────────────────────────────────────

function analyzeWithRules(text) {
  const lines = text.split('\n').map((l) => l.trim());
  const nonEmptyLines = lines.filter((l) => l.length > 0);

  return {
    name: extractName(nonEmptyLines),
    email: extractEmail(text),
    phone: extractPhone(text),
    skills: extractSkills(text, lines),
    experience: extractExperience(text, lines),
    education: extractEducation(text, lines),
    summary: extractSummary(text, lines),
  };
}

// ── Name extraction ────────────────────────────────────────────────────────────

function extractName(nonEmptyLines) {
  for (const line of nonEmptyLines) {
    const labelMatch = line.match(/^name\s*[:\-]\s*(.+)/i);
    if (labelMatch) return labelMatch[1].trim();
  }

  for (const line of nonEmptyLines) {
    const cleaned = line.replace(/[|•·\-–—]/g, '').trim();
    if (!cleaned) continue;
    if (/[@.\/\\#]/.test(cleaned)) continue;
    if (/^(resume|curriculum|cv|portfolio|summary|objective|experience|education|skills|phone|email|address|contact)/i.test(cleaned)) continue;
    if (/^\d/.test(cleaned)) continue;
    if (cleaned.length > 60 || cleaned.length < 2) continue;

    const words = cleaned.split(/\s+/);
    if (words.length >= 2 && words.length <= 5 && words.every((w) => /^[A-Z]/.test(w))) {
      return cleaned;
    }
  }

  for (const line of nonEmptyLines) {
    const cleaned = line.replace(/[|•·\-–—]/g, '').trim();
    if (!cleaned || cleaned.length > 60 || cleaned.length < 2) continue;
    if (/[@.\/\\#\d]/.test(cleaned)) continue;
    if (/^(resume|curriculum|cv|portfolio|summary|objective|experience|education|skills|phone|email|address|contact)/i.test(cleaned)) continue;
    const words = cleaned.split(/\s+/);
    if (words.length >= 2 && words.length <= 5) {
      return cleaned;
    }
  }

  return '';
}

// ── Email extraction ───────────────────────────────────────────────────────────

function extractEmail(text) {
  const match = text.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : '';
}

// ── Phone extraction ───────────────────────────────────────────────────────────

function extractPhone(text) {
  const patterns = [
    /(?:phone|tel|mobile|cell|contact)\s*[:\-]?\s*([\d\s\-().+]{7,20})/i,
    /(\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4})/,
    /(\+?\d{1,3}[\s\-]?\(?\d{2,4}\)?[\s\-]?\d{3,4}[\s\-]?\d{3,4})/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1] ? match[1].trim() : match[0].trim();
  }
  return '';
}

// ── Skills extraction ──────────────────────────────────────────────────────────

const COMMON_SKILLS = [
  'javascript', 'typescript', 'python', 'java', 'c\\+\\+', 'c#', 'ruby', 'go',
  'golang', 'rust', 'swift', 'kotlin', 'php', 'scala', 'r\\b', 'matlab',
  'react', 'angular', 'vue', 'svelte', 'next\\.?js', 'nuxt\\.?js', 'node\\.?js',
  'express', 'django', 'flask', 'spring', 'rails', 'laravel', 'fastapi',
  'html', 'css', 'sass', 'less', 'tailwind', 'bootstrap', 'material.ui',
  'sql', 'mysql', 'postgresql', 'postgres', 'mongodb', 'redis', 'elasticsearch',
  'dynamodb', 'cassandra', 'sqlite', 'oracle', 'firebase',
  'aws', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'terraform',
  'jenkins', 'ci/cd', 'github actions', 'gitlab', 'ansible', 'nginx',
  'git', 'linux', 'bash', 'rest', 'graphql', 'grpc', 'microservices', 'api',
  'machine learning', 'deep learning', 'nlp', 'computer vision', 'tensorflow',
  'pytorch', 'keras', 'scikit.learn', 'pandas', 'numpy', 'data science',
  'agile', 'scrum', 'jira', 'confluence', 'figma', 'photoshop',
  'webpack', 'vite', 'babel', 'jest', 'mocha', 'cypress', 'selenium',
  'redux', 'mobx', 'zustand', 'rabbitmq', 'kafka', 'spark',
  'hadoop', 'tableau', 'power bi', 'excel',
];

function extractSkills(text, lines) {
  const sectionText = extractSection(lines, ['skills', 'technical skills', 'technologies', 'tech stack', 'competencies', 'tools']);

  const skills = new Set();

  if (sectionText) {
    const items = sectionText.split(/[,|•·;\n]/).map((s) => s.replace(/^[\s\-–—*]+/, '').trim()).filter((s) => s.length > 0 && s.length < 50);
    for (const item of items) {
      if (!/^(and|or|the|with|using|including)$/i.test(item)) {
        skills.add(item);
      }
    }
  }

  const lowerText = text.toLowerCase();
  for (const skill of COMMON_SKILLS) {
    const regex = new RegExp(`\\b${skill}\\b`, 'i');
    if (regex.test(lowerText)) {
      const match = lowerText.match(regex);
      if (match) {
        const original = text.substring(
          text.toLowerCase().indexOf(match[0]),
          text.toLowerCase().indexOf(match[0]) + match[0].length,
        );
        skills.add(original);
      }
    }
  }

  return [...skills].slice(0, 30);
}

// ── Experience extraction ──────────────────────────────────────────────────────

function extractExperience(text, lines) {
  const sectionText = extractSection(lines, ['experience', 'work experience', 'professional experience', 'employment', 'work history']);
  if (!sectionText) return [];

  const entries = [];
  const entryLines = sectionText.split('\n');

  // Date patterns broken into named formats for maintainability
  const MONTH = '(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\\.?';
  const SEP = '\\s*[-–—to]+\\s*';
  const monthRange = `\\b${MONTH}\\s*\\d{0,4}${SEP}${MONTH}?\\s*\\d{0,4}\\b`;
  const yearRange = `\\b\\d{4}${SEP}(?:\\d{4}|present|current)\\b`;
  const monthYearToPresent = `\\b${MONTH}\\s+\\d{4}${SEP}(?:present|current)\\b`;
  const datePattern = new RegExp(`(${monthRange}|${yearRange}|${monthYearToPresent})`, 'i');
  const titlePattern = /^(.+?)(?:\s+at\s+|\s+[-–—@|]\s+)(.+)/i;

  let current = null;

  for (const line of entryLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const hasDate = datePattern.test(trimmed);
    const titleMatch = trimmed.match(titlePattern);

    if (hasDate || titleMatch) {
      if (current) entries.push(current);

      const duration = trimmed.match(datePattern);
      let title = '';
      let company = '';

      if (titleMatch) {
        title = titleMatch[1].trim();
        company = titleMatch[2].replace(datePattern, '').trim();
      } else {
        const parts = trimmed.replace(datePattern, '').trim();
        title = parts;
      }

      current = {
        title: title.replace(/[,|]$/, '').trim(),
        company: company.replace(/[,|\-–—\s]+$/, '').trim(),
        duration: duration ? duration[0].trim() : '',
        description: '',
      };
    } else if (current) {
      current.description += (current.description ? ' ' : '') + trimmed;
    }
  }

  if (current) entries.push(current);

  return entries.slice(0, 10);
}

// ── Education extraction ───────────────────────────────────────────────────────

function extractEducation(text, lines) {
  const sectionText = extractSection(lines, ['education', 'academic', 'qualifications', 'degrees']);
  if (!sectionText) return [];

  const entries = [];
  const eduLines = sectionText.split('\n').map((l) => l.trim()).filter(Boolean);

  const degreePatterns = [
    /\b(bachelor|master|ph\.?d|doctor|associate|diploma|b\.?s\.?|b\.?a\.?|m\.?s\.?|m\.?a\.?|m\.?b\.?a\.?|b\.?sc|m\.?sc|b\.?eng|m\.?eng)\b/i,
  ];

  let current = null;

  for (const line of eduLines) {
    const hasDegree = degreePatterns.some((p) => p.test(line));
    const yearMatch = line.match(/\b((?:19|20)\d{2})\b/);

    if (hasDegree || (yearMatch && !current)) {
      if (current) entries.push(current);
      current = { degree: '', institution: '', year: '' };

      const degreeMatch = line.match(degreePatterns[0]);
      if (degreeMatch) {
        current.degree = line.replace(/\b((?:19|20)\d{2})\b/, '').trim().replace(/[,|]$/, '');
      }
      if (yearMatch) current.year = yearMatch[1];

      const inMatch = line.match(/(?:from|at|[-–—,|])\s*(.+?)(?:\d{4}|$)/i);
      if (inMatch) {
        current.institution = inMatch[1].trim().replace(/^[-–—,|\s]+/, '').replace(/[-–—,|\s]+$/, '');
      }
    } else if (current) {
      if (!current.institution && line.length < 80) {
        current.institution = line.replace(/\b((?:19|20)\d{2})\b/, '').trim().replace(/[,|]$/, '');
        const yearMatch2 = line.match(/\b((?:19|20)\d{2})\b/);
        if (yearMatch2 && !current.year) current.year = yearMatch2[1];
      } else if (!current.degree) {
        current.degree = line;
      }
    } else {
      current = { degree: line, institution: '', year: '' };
      const yearMatch2 = line.match(/\b((?:19|20)\d{2})\b/);
      if (yearMatch2) current.year = yearMatch2[1];
    }
  }

  if (current) entries.push(current);

  return entries.slice(0, 5);
}

// ── Summary extraction ─────────────────────────────────────────────────────────

function extractSummary(text, lines) {
  const sectionText = extractSection(lines, ['summary', 'objective', 'profile', 'about', 'about me', 'professional summary', 'career objective']);

  if (sectionText) {
    return sectionText.split('\n').filter((l) => l.trim()).join(' ').substring(0, 500);
  }

  const skills = extractSkills(text, lines);
  if (skills.length > 0) {
    return `Professional with experience in ${skills.slice(0, 5).join(', ')}.`;
  }

  return '';
}

// ── Section extraction helper ──────────────────────────────────────────────────

function extractSection(lines, headings) {
  const headingPattern = new RegExp(
    `^(?:#{1,3}\\s*)?(?:${headings.join('|')})\\s*[:\\-–—]?\\s*$`,
    'i',
  );

  const SECTION_NAMES = [
    'experience', 'education', 'skills', 'technical skills', 'work', 'projects',
    'certifications?', 'references?', 'languages?', 'interests?', 'publications?',
    'awards?', 'summary', 'objective', 'profile', 'about', 'contact', 'tools',
    'technologies', 'competencies', 'qualifications', 'achievements',
  ];

  const sectionHeadingPattern = new RegExp(
    `^(?:#{1,3}\\s*)?(?:${SECTION_NAMES.join('|')})\\s*[:\\-–—]?\\s*$`,
    'i',
  );

  let startIdx = -1;

  for (let i = 0; i < lines.length; i++) {
    if (headingPattern.test(lines[i].trim())) {
      startIdx = i + 1;
      break;
    }
  }

  if (startIdx === -1) return '';

  let endIdx = lines.length;
  for (let i = startIdx; i < lines.length; i++) {
    if (sectionHeadingPattern.test(lines[i].trim()) && !headingPattern.test(lines[i].trim())) {
      endIdx = i;
      break;
    }
  }

  return lines.slice(startIdx, endIdx).join('\n').trim();
}

module.exports = { analyzeResume };
