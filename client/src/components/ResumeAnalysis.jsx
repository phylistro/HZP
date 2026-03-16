import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Star,
  Clock,
  FileText,
} from 'lucide-react'

const container = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function SectionCard({ title, icon: Icon, iconColor, children }) {
  return (
    <motion.div variants={item} className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg">
      <div className="mb-3 flex items-center gap-2">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconColor}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      {children}
    </motion.div>
  )
}

export default function ResumeAnalysis({ analysis }) {
  if (!analysis) return null

  const { name, email, phone, summary, skills, experience, education, title } = analysis

  return (
    <motion.div variants={container} initial="initial" animate="animate" className="space-y-4">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
        <FileText className="h-5 w-5 text-violet-400" />
        Resume Analysis
      </h2>

      {/* Profile */}
      <SectionCard title="Profile" icon={User} iconColor="bg-violet-500">
        <div className="space-y-2">
          {name && (
            <p className="text-lg font-semibold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              {name}
            </p>
          )}
          {title && <p className="text-sm text-slate-400">{title}</p>}
          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            {email && (
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-cyan-400" />
                {email}
              </span>
            )}
            {phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-cyan-400" />
                {phone}
              </span>
            )}
          </div>
        </div>
      </SectionCard>

      {/* Summary */}
      {summary && (
        <SectionCard title="Summary" icon={Star} iconColor="bg-cyan-500">
          <p className="text-sm leading-relaxed text-slate-300">{summary}</p>
        </SectionCard>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <SectionCard title="Skills" icon={Star} iconColor="bg-blue-500">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => {
              const colors = [
                'from-violet-500/20 to-purple-500/20 text-violet-300 border-violet-500/30',
                'from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30',
                'from-cyan-500/20 to-teal-500/20 text-cyan-300 border-cyan-500/30',
                'from-pink-500/20 to-rose-500/20 text-pink-300 border-pink-500/30',
                'from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30',
              ]
              const color = colors[idx % colors.length]
              return (
                <span
                  key={idx}
                  className={`rounded-full border bg-gradient-to-r px-3 py-1 text-xs font-medium ${color}`}
                >
                  {skill}
                </span>
              )
            })}
          </div>
        </SectionCard>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <SectionCard title="Experience" icon={Briefcase} iconColor="bg-amber-500">
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative pl-6">
                {/* Timeline dot and line */}
                <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-violet-400 to-blue-400" />
                {idx < experience.length - 1 && (
                  <div className="absolute left-[4.5px] top-5 h-full w-0.5 bg-white/10" />
                )}
                <div>
                  <p className="font-medium text-white">{exp.role || exp.title || exp.position}</p>
                  <p className="text-sm text-violet-400">{exp.company || exp.organization}</p>
                  {(exp.duration || exp.dates || exp.period) && (
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      {exp.duration || exp.dates || exp.period}
                    </p>
                  )}
                  {exp.description && (
                    <p className="mt-1 text-sm text-slate-400">{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <SectionCard title="Education" icon={GraduationCap} iconColor="bg-green-500">
          <div className="space-y-3">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-white/5 bg-white/5 p-3"
              >
                <p className="font-medium text-white">
                  {edu.degree || edu.qualification}
                </p>
                <p className="text-sm text-violet-400">
                  {edu.institution || edu.school || edu.university}
                </p>
                {(edu.year || edu.dates || edu.graduation) && (
                  <p className="mt-1 text-xs text-slate-500">
                    {edu.year || edu.dates || edu.graduation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </motion.div>
  )
}
