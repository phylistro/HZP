import { motion } from 'framer-motion'
import { Brain } from 'lucide-react'

export default function LoadingSpinner({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center py-24"
    >
      <div className="relative">
        {/* Outer pulsing ring */}
        <div className="animate-pulse-ring absolute inset-0 h-28 w-28 rounded-full border-2 border-violet-500/30" />
        <div
          className="animate-pulse-ring absolute inset-0 h-28 w-28 rounded-full border-2 border-blue-500/20"
          style={{ animationDelay: '0.5s' }}
        />

        {/* Spinning gradient ring */}
        <div className="animate-spin-slow relative flex h-28 w-28 items-center justify-center rounded-full">
          <svg className="h-full w-full" viewBox="0 0 112 112">
            <defs>
              <linearGradient id="spinner-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <circle
              cx="56"
              cy="56"
              r="50"
              fill="none"
              stroke="url(#spinner-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="200 100"
            />
          </svg>
          <div className="absolute flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Brain className="h-10 w-10 text-violet-400" />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-lg font-medium text-slate-300"
      >
        {message || 'Processing...'}
      </motion.p>

      <motion.div
        className="mt-3 flex items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            className="h-1.5 w-1.5 rounded-full bg-violet-400"
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
