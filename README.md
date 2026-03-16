# AI Resume Analyzer

A modern web application that analyzes resumes using AI and finds matching job opportunities. Upload your resume (PDF or DOCX), get instant analysis of your skills and experience, and discover relevant job openings.

## Features

- **Drag & Drop Resume Upload** — Upload PDF or DOCX resumes with a smooth drag-and-drop interface
- **AI-Powered Analysis** — Extracts name, email, phone, skills, experience, education, and summary from your resume
- **Smart Job Matching** — Finds and ranks job opportunities based on your skills and experience
- **Match Score** — Each job listing shows a match percentage based on overlapping skills
- **Modern UI/UX** — Dark theme with glassmorphism, gradient accents, and smooth animations

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS v4, Framer Motion, Lucide React
- **Backend**: Node.js, Express.js
- **PDF Parsing**: pdfjs-dist
- **DOCX Parsing**: mammoth
- **AI Analysis**: OpenAI GPT-3.5 (optional) with rule-based fallback

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/phylistro/HZP.git
   cd HZP
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. (Optional) Set up OpenAI API key for enhanced AI analysis:
   ```bash
   # In the server directory, create a .env file
   echo "OPENAI_API_KEY=your_api_key_here" > server/.env
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm start
   ```
   The server runs on `http://localhost:5000`

2. In a new terminal, start the frontend:
   ```bash
   cd client
   npm run dev
   ```
   The app opens at `http://localhost:3000`

3. Open `http://localhost:3000` in your browser and upload a resume!

## API Endpoints

| Method | Endpoint       | Description                              |
|--------|---------------|------------------------------------------|
| GET    | /api/health   | Health check                             |
| POST   | /api/upload   | Upload and parse a resume (PDF/DOCX)     |
| POST   | /api/analyze  | Analyze resume text and extract details  |
| POST   | /api/jobs     | Find matching jobs based on skills/title |

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx         # Main application component
│   │   ├── components/
│   │   │   ├── Header.jsx          # App header
│   │   │   ├── DropZone.jsx        # Drag & drop upload
│   │   │   ├── StepIndicator.jsx   # Progress steps
│   │   │   ├── LoadingSpinner.jsx  # Loading animation
│   │   │   ├── ResumeAnalysis.jsx  # Resume analysis display
│   │   │   ├── JobListings.jsx     # Job listings grid
│   │   │   └── JobCard.jsx         # Individual job card
│   │   └── index.css       # Tailwind CSS + custom styles
│   └── vite.config.js      # Vite configuration
├── server/                 # Express backend
│   └── src/
│       ├── index.js         # Express app entry point
│       ├── routes/
│       │   ├── upload.js    # File upload route
│       │   ├── analyze.js   # Resume analysis route
│       │   └── jobs.js      # Job search route
│       ├── services/
│       │   ├── parser.js    # PDF/DOCX text extraction
│       │   ├── analyzer.js  # Resume analysis (AI + rule-based)
│       │   └── jobSearch.js # Job matching service
│       └── middleware/
│           └── upload.js    # Multer file upload config
└── README.md
```

## How It Works

1. **Upload** — User drops a resume file (PDF or DOCX) onto the upload zone
2. **Parse** — The backend extracts text from the file using pdfjs-dist or mammoth
3. **Analyze** — The text is analyzed to extract structured data (skills, experience, etc.)
4. **Match** — Skills and job title are matched against a database of job openings
5. **Display** — Results are presented in a beautiful, interactive UI

## License

MIT
