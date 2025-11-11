import { useEffect, useState } from 'react'
import {
  Code,
  Database,
  Cloud,
  Shield,
  Award,
  Star,
  Folder,
  Globe,
  Phone,
  GitBranch,
  Save,
  FileText,
} from 'lucide-react'

function SkillBadge({ icon: Icon, label }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-gray-200 shadow-sm hover:shadow transition-shadow">
      <Icon className="w-4 h-4 text-gray-700" />
      <span className="text-sm font-semibold text-gray-800">{label}</span>
    </div>
  )
}

function ProjectItem({ icon: Icon, title, desc }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 bg-white/70 hover:bg-white transition-colors">
      <div className="mt-0.5">
        <Icon className="w-5 h-5 text-gray-700" />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600 leading-snug">{desc}</p>
      </div>
    </div>
  )
}

export default function App() {
  const [availability, setAvailability] = useState(3)

  useEffect(() => {
    const id = setInterval(() => {
      setAvailability((prev) => {
        const next = prev + (Math.random() > 0.6 ? 1 : 0)
        return Math.min(9, next)
      })
    }, 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100/60 text-gray-900 relative">
      {/* Board Container */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="relative rounded-2xl border border-gray-200 bg-white/80 backdrop-blur shadow-sm overflow-hidden">
          {/* Corner certification stickers */}
          <div className="absolute right-3 top-3 flex gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
              <Award className="w-3.5 h-3.5" /> AWS Cert
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm">
              <Shield className="w-3.5 h-3.5" /> Security+
            </span>
          </div>

          {/* Header */}
          <div className="px-8 pt-10 pb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Alex Johnson
            </h1>
            <p className="mt-2 text-lg md:text-xl font-bold text-gray-700">
              Senior Full‑Stack Engineer
            </p>

            {/* Skills */}
            <div className="mt-6 flex flex-wrap gap-2">
              <SkillBadge icon={Code} label="TypeScript" />
              <SkillBadge icon={Database} label="MongoDB" />
              <SkillBadge icon={Cloud} label="AWS" />
              <SkillBadge icon={GitBranch} label="CI/CD" />
              <SkillBadge icon={Shield} label="Auth & Security" />
            </div>
          </div>

          {/* Body */}
          <div className="px-8 pb-8 grid md:grid-cols-5 gap-6">
            {/* Left column: Projects */}
            <div className="md:col-span-3 space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-600">Projects</h2>
              <ProjectItem
                icon={Folder}
                title="Realtime Collaboration Suite"
                desc="Built a WebSocket-based document editor with presence, comments, and role-based access. Reduced sync conflicts by 40%."
              />
              <ProjectItem
                icon={Globe}
                title="Global E‑commerce Platform"
                desc="Led migration to micro frontends, introduced edge caching and A/B infra—cut TTFB by 35% across regions."
              />
              <ProjectItem
                icon={Phone}
                title="Mobile Health Dashboard"
                desc="Created offline‑first PWA with secure sync, charts, and notifications. HIPAA‑aligned data flows."
              />
            </div>

            {/* Right column: Highlights */}
            <div className="md:col-span-2 space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-600">Highlights</h2>
              <div className="rounded-lg border border-gray-200 bg-white/70 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  <p className="text-sm font-semibold text-gray-800">10+ years experience</p>
                </div>
                <div className="flex items-start gap-2">
                  <Database className="w-4 h-4 text-gray-700 mt-0.5" />
                  <p className="text-sm text-gray-700">Designed multi‑tenant data models and analytics pipelines for 100k+ MAU.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Cloud className="w-4 h-4 text-gray-700 mt-0.5" />
                  <p className="text-sm text-gray-700">Infra as code, autoscaling, and cost monitoring across AWS.</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-900 text-white font-bold text-sm shadow hover:shadow-md hover:bg-black transition-all">
                  <Save className="w-4 h-4" /> Save Talent
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white font-bold text-sm text-gray-900 border border-gray-300 shadow-sm hover:shadow hover:translate-y-[-1px] transition-all">
                  <FileText className="w-4 h-4" /> Request Resume
                </button>
              </div>
            </div>
          </div>

          {/* Footer hint */}
          <div className="px-8 pb-8">
            <div className="text-xs text-gray-500">
              References available upon request • Open to remote and hybrid roles
            </div>
          </div>
        </div>
      </div>

      {/* Hot Availability counter */}
      <div className="fixed bottom-6 right-6">
        <div className="flex items-center gap-3 rounded-full border border-red-200 bg-white/90 backdrop-blur px-4 py-2 shadow-lg">
          <div className="flex -space-x-2">
            <span className="w-6 h-6 rounded-full bg-red-100 border border-white" />
            <span className="w-6 h-6 rounded-full bg-orange-100 border border-white" />
            <span className="w-6 h-6 rounded-full bg-rose-100 border border-white" />
          </div>
          <span className="text-sm font-extrabold text-red-600 tracking-wide">Hot Availability</span>
          <span className="text-sm font-black text-gray-900 bg-red-50 border border-red-200 rounded px-2 py-0.5">
            {availability}
          </span>
          <div className="flex items-center gap-1">
            <button
              aria-label="decrease"
              onClick={() => setAvailability((v) => Math.max(0, v - 1))}
              className="w-6 h-6 grid place-items-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              −
            </button>
            <button
              aria-label="increase"
              onClick={() => setAvailability((v) => Math.min(9, v + 1))}
              className="w-6 h-6 grid place-items-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
