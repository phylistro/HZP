import { motion } from 'framer-motion'
import { Upload, Brain, CheckCircle, Search } from 'lucide-react'

const steps = [
  { label: 'Upload', icon: Upload },
  { label: 'Analyze', icon: Brain },
  { label: 'Results', icon: Search },
]

export default function StepIndicator({ currentStep }) {
  return (
    <div className="mb-10 flex items-center justify-center gap-0">
      {steps.map((step, idx) => {
        const stepNum = idx + 1
        const isActive = stepNum === currentStep
        const isCompleted = stepNum < currentStep
        const Icon = isCompleted ? CheckCircle : step.icon

        return (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                  isCompleted
                    ? 'border-green-400 bg-green-500/20 text-green-400'
                    : isActive
                      ? 'border-violet-400 bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-500/30'
                      : 'border-white/20 bg-white/5 text-slate-500'
                }`}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isCompleted
                    ? 'text-green-400'
                    : isActive
                      ? 'text-violet-400'
                      : 'text-slate-500'
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className="mx-3 mb-6 h-0.5 w-16 sm:w-24">
                <div className="h-full w-full rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{
                      width: isCompleted ? '100%' : isActive ? '50%' : '0%',
                    }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
