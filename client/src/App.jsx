import { useState, useCallback } from 'react'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import DropZone from './components/DropZone'
import StepIndicator from './components/StepIndicator'
import LoadingSpinner from './components/LoadingSpinner'
import ResumeAnalysis from './components/ResumeAnalysis'
import JobListings from './components/JobListings'
import { AlertCircle, ArrowRight, Upload } from 'lucide-react'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

export default function App() {
  const [state, setState] = useState({
    step: 'upload',
    file: null,
    resumeText: '',
    analysis: null,
    jobs: [],
    error: null,
    loadingMessage: '',
  })

  const updateState = (updates) =>
    setState((prev) => ({ ...prev, ...updates }))

  const handleFileUpload = useCallback(async (file) => {
    updateState({ file, error: null, step: 'analyzing', loadingMessage: 'Uploading your resume...' })

    try {
      const formData = new FormData()
      formData.append('resume', file)

      const uploadRes = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      const resumeText = uploadRes.data.text

      updateState({ resumeText, loadingMessage: 'Analyzing your resume with AI...' })

      const analysisRes = await axios.post('/api/analyze', { text: resumeText })
      const analysis = analysisRes.data.analysis || analysisRes.data

      updateState({ analysis, loadingMessage: 'Finding matching job opportunities...' })

      const jobsRes = await axios.post('/api/jobs', {
        skills: analysis.skills || [],
        title: analysis.experience?.[0]?.title || analysis.name || '',
      })
      const jobs = jobsRes.data.jobs || jobsRes.data || []

      updateState({ jobs, step: 'results', loadingMessage: '' })
    } catch (err) {
      updateState({
        step: 'upload',
        error: err.response?.data?.error || err.message || 'Something went wrong. Please try again.',
        loadingMessage: '',
      })
    }
  }, [])

  const handleReset = () => {
    setState({
      step: 'upload',
      file: null,
      resumeText: '',
      analysis: null,
      jobs: [],
      error: null,
      loadingMessage: '',
    })
  }

  const currentStepNumber = state.step === 'upload' ? 1 : state.step === 'analyzing' ? 2 : 3

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <StepIndicator currentStep={currentStepNumber} />

        <AnimatePresence mode="wait">
          {state.error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300 backdrop-blur-sm"
            >
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">{state.error}</p>
            </motion.div>
          )}

          {state.step === 'upload' && (
            <motion.div
              key="upload"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <DropZone onFileUpload={handleFileUpload} isLoading={false} />
            </motion.div>
          )}

          {state.step === 'analyzing' && (
            <motion.div
              key="analyzing"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <LoadingSpinner message={state.loadingMessage} />
            </motion.div>
          )}

          {state.step === 'results' && (
            <motion.div
              key="results"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="mb-6 flex justify-end">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  <Upload className="h-4 w-4" />
                  Upload New Resume
                </button>
              </div>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <ResumeAnalysis analysis={state.analysis} />
                <JobListings jobs={state.jobs} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
