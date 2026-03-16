import { Brain, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-white/10 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/25"
          >
            <Brain className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <h1 className="flex items-center gap-2 text-xl font-bold">
              <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AI Resume Analyzer
              </span>
              <Sparkles className="h-4 w-4 text-cyan-400" />
            </h1>
            <p className="text-xs text-slate-400">
              Upload your resume and discover matching opportunities
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
            AI Powered
          </span>
        </div>
      </div>
    </header>
  )
}
