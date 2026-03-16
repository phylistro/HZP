import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, SlidersHorizontal, ChevronDown } from 'lucide-react'
import JobCard from './JobCard'

const container = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function JobListings({ jobs }) {
  const [sortBy, setSortBy] = useState('match')
  const [showSort, setShowSort] = useState(false)

  const sortedJobs = useMemo(() => {
    if (!jobs?.length) return []
    const sorted = [...jobs]
    if (sortBy === 'match') {
      sorted.sort((a, b) => (b.matchScore || b.match_score || 0) - (a.matchScore || a.match_score || 0))
    } else if (sortBy === 'salary') {
      sorted.sort((a, b) => {
        const salaryA = a.salaryMax || a.salary_max || a.salary || 0
        const salaryB = b.salaryMax || b.salary_max || b.salary || 0
        return salaryB - salaryA
      })
    }
    return sorted
  }, [jobs, sortBy])

  if (!jobs?.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-lg">
        <Briefcase className="mb-4 h-12 w-12 text-slate-500" />
        <p className="text-lg font-medium text-slate-400">No matching jobs found</p>
        <p className="mt-1 text-sm text-slate-500">Try updating your resume with more skills</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold text-white">
          <Briefcase className="h-5 w-5 text-blue-400" />
          Matching Opportunities
          <span className="ml-1 rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs font-medium text-blue-300">
            {jobs.length}
          </span>
        </h2>
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm transition-colors hover:bg-white/15"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Sort
            <ChevronDown className="h-3 w-3" />
          </button>
          {showSort && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-1 z-10 w-40 rounded-lg border border-white/10 bg-slate-800 py-1 shadow-xl"
            >
              <button
                onClick={() => { setSortBy('match'); setShowSort(false) }}
                className={`w-full px-3 py-2 text-left text-xs ${sortBy === 'match' ? 'text-violet-400' : 'text-slate-300'} hover:bg-white/10`}
              >
                Match Score
              </button>
              <button
                onClick={() => { setSortBy('salary'); setShowSort(false) }}
                className={`w-full px-3 py-2 text-left text-xs ${sortBy === 'salary' ? 'text-violet-400' : 'text-slate-300'} hover:bg-white/10`}
              >
                Salary (High to Low)
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Job Grid */}
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 gap-4 xl:grid-cols-2"
      >
        {sortedJobs.map((job, idx) => (
          <motion.div key={job.id || idx} variants={item}>
            <JobCard job={job} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
