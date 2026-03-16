import { motion } from 'framer-motion'
import { MapPin, Building2, DollarSign, Briefcase, ArrowRight } from 'lucide-react'

function MatchScoreCircle({ score }) {
  const radius = 20
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  let colorClass, strokeColor
  if (score >= 80) {
    colorClass = 'text-green-400'
    strokeColor = '#4ade80'
  } else if (score >= 60) {
    colorClass = 'text-blue-400'
    strokeColor = '#60a5fa'
  } else if (score >= 40) {
    colorClass = 'text-amber-400'
    strokeColor = '#fbbf24'
  } else {
    colorClass = 'text-slate-400'
    strokeColor = '#94a3b8'
  }

  return (
    <div className="relative flex h-14 w-14 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={radius} fill="none" stroke="currentColor" strokeWidth="3" className="text-white/10" />
        <motion.circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />
      </svg>
      <span className={`absolute text-xs font-bold ${colorClass}`}>{score}%</span>
    </div>
  )
}

export default function JobCard({ job }) {
  const matchScore = job.matchScore ?? job.match_score ?? 0
  const title = job.title || job.jobTitle || 'Untitled Position'
  const company = job.company || job.companyName || 'Unknown Company'
  const location = job.location || 'Remote'
  const salary = job.salary || job.salaryRange || job.salary_range
  const jobType = job.type || job.jobType || job.job_type || 'Full-time'
  const matchedSkills = job.matchedSkills || job.matched_skills || []
  const url = job.url || job.link || '#'

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(139, 92, 246, 0.15)' }}
      className="group rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg transition-all"
    >
      <div className="flex items-start gap-4">
        <MatchScoreCircle score={matchScore} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-base font-bold text-transparent">
            {title}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Building2 className="h-3 w-3 text-slate-500" />
              {company}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-slate-500" />
              {location}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {salary && (
          <span className="flex items-center gap-1 rounded-md bg-green-500/15 px-2 py-0.5 text-xs font-medium text-green-300">
            <DollarSign className="h-3 w-3" />
            {salary}
          </span>
        )}
        <span className="flex items-center gap-1 rounded-md bg-violet-500/15 px-2 py-0.5 text-xs font-medium text-violet-300">
          <Briefcase className="h-3 w-3" />
          {jobType}
        </span>
      </div>

      {matchedSkills.length > 0 && (
        <div className="mt-3">
          <p className="mb-1.5 text-xs font-medium text-slate-500">Matched Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {matchedSkills.map((skill, idx) => (
              <span
                key={idx}
                className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-500/20 transition-all hover:shadow-lg hover:shadow-violet-500/30 hover:brightness-110"
        >
          View Job
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.div>
  )
}
