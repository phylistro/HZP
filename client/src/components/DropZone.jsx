import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react'

export default function DropZone({ onFileUpload, isLoading }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileError, setFileError] = useState(null)

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setFileError(null)

      if (rejectedFiles?.length > 0) {
        setFileError('Please upload a PDF or DOCX file only.')
        return
      }

      if (acceptedFiles?.length > 0) {
        const file = acceptedFiles[0]
        setSelectedFile(file)
      }
    },
    []
  )

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile)
    }
  }

  const clearFile = () => {
    setSelectedFile(null)
    setFileError(null)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    disabled: isLoading,
  })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl"
    >
      <div
        {...getRootProps()}
        className={`group relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
          isDragActive
            ? 'scale-[1.02] border-violet-400 bg-violet-500/10'
            : selectedFile
              ? 'border-green-400/50 bg-green-500/5'
              : 'border-white/20 bg-white/5 hover:border-violet-400/50 hover:bg-white/10'
        } backdrop-blur-lg`}
      >
        <input {...getInputProps()} />

        {!selectedFile ? (
          <div className="space-y-4">
            <motion.div
              animate={isDragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/20"
            >
              <Upload
                className={`h-10 w-10 transition-colors ${
                  isDragActive ? 'text-violet-400' : 'text-slate-400 group-hover:text-violet-400'
                }`}
              />
            </motion.div>
            <div>
              <p className="text-lg font-semibold text-white">
                {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume here'}
              </p>
              <p className="mt-1 text-sm text-slate-400">or click to browse</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="rounded-md bg-red-500/20 px-3 py-1 text-xs font-medium text-red-300">
                PDF
              </span>
              <span className="rounded-md bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300">
                DOCX
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-green-500/20">
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">File selected!</p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2">
                <FileText className="h-4 w-4 text-violet-400" />
                <span className="text-sm text-slate-300">{selectedFile.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    clearFile()
                  }}
                  className="ml-1 rounded-full p-0.5 transition-colors hover:bg-white/10"
                >
                  <X className="h-3 w-3 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {fileError && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          {fileError}
        </motion.div>
      )}

      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex justify-center"
        >
          <button
            onClick={handleUpload}
            disabled={isLoading}
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:brightness-110 disabled:opacity-50"
          >
            Analyze Resume
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
