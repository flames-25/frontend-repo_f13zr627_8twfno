import { useEffect, useMemo, useRef, useState } from 'react'
import {
  User2,
  Briefcase,
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
  Heart,
  MessageCircle,
  Share2,
  Send,
  ArrowLeft,
  ArrowRight,
  Info,
} from 'lucide-react'

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Utilities
const clamp = (n, min, max) => Math.max(min, Math.min(max, n))

// Shared UI pieces
function SkillBadge({ icon: Icon, label, onClick, active = false, tone = 'default' }) {
  const tones = {
    default: active ? 'bg-gray-900 text-white border-gray-900' : 'bg-white/85 text-gray-800 border-gray-200 hover:bg-white',
    soft: active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100',
    glass: active ? 'bg-white/90 text-gray-900 border-white/90' : 'bg-white/30 text-white border-white/40 hover:bg-white/40 backdrop-blur',
  }
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold shadow-sm transition-all',
        tones[tone]
      )}
      aria-pressed={active}
    >
      <Icon className={cn('w-4 h-4', tone === 'glass' ? 'text-white' : active ? 'text-white' : 'text-gray-700')} />
      <span>{label}</span>
    </button>
  )
}

function ProjectItem({ icon: Icon, title, desc, linkLabel = 'Expand', onExpand, dense = false }) {
  return (
    <div className={cn(
      'flex items-start gap-3 rounded-lg border border-gray-200 bg-white/75 hover:bg-white transition-colors',
      dense ? 'p-2.5' : 'p-3'
    )}>
      <div className="mt-0.5">
        <Icon className="w-5 h-5 text-gray-700" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600 leading-snug">{desc}</p>
      </div>
      <button
        onClick={onExpand}
        className={cn('text-xs font-bold text-gray-700 hover:text-gray-900 inline-flex items-center gap-1 rounded border border-gray-200 bg-white hover:shadow', dense ? 'px-1.5 py-0.5' : 'px-2 py-1')}
      >
        <Info className="w-3.5 h-3.5" /> {linkLabel}
      </button>
    </div>
  )
}

function Availability({ level, setLevel, variant = 'bar' }) {
  const pct = (level / 9) * 100
  if (variant === 'pill') {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/90 backdrop-blur px-3 py-1.5 shadow">
        <span className="text-xs font-bold tracking-wide text-red-600">Hot Availability</span>
        <span className="text-xs font-black text-gray-900 bg-red-50 border border-red-200 rounded px-1.5 py-0.5">{level}</span>
        <div className="flex items-center gap-1 ml-1">
          <button aria-label="decrease" onClick={() => setLevel((v) => clamp(v - 1, 0, 9))} className="w-6 h-6 grid place-items-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50">−</button>
          <button aria-label="increase" onClick={() => setLevel((v) => clamp(v + 1, 0, 9))} className="w-6 h-6 grid place-items-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50">+</button>
        </div>
      </div>
    )
  }
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-wide text-red-600">Hot Availability</span>
        <span className="text-xs font-black text-gray-900 bg-red-50 border border-red-200 rounded px-2 py-0.5">{level}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-red-100 overflow-hidden border border-red-200">
        <div className="h-full bg-gradient-to-r from-rose-400 to-amber-400 transition-all" style={{ width: pct + '%' }} />
      </div>
      <div className="flex items-center gap-2">
        <button aria-label="decrease" onClick={() => setLevel((v) => clamp(v - 1, 0, 9))} className="w-7 h-7 grid place-items-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50">−</button>
        <button aria-label="increase" onClick={() => setLevel((v) => clamp(v + 1, 0, 9))} className="w-7 h-7 grid place-items-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50">+</button>
      </div>
    </div>
  )
}

function EngagementBar({ likes, comments, onLike, onCommentToggle, onShare, onDM, subtle = false }) {
  return (
    <div>
      <div className={cn('flex items-center gap-3', subtle && 'gap-2')}>
        <button onClick={onLike} className={cn('flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 font-semibold text-sm', subtle && 'px-2 py-1.5')}>
          <Heart className="w-4 h-4 text-rose-500" /> Like
        </button>
        <button onClick={onCommentToggle} className={cn('flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 font-semibold text-sm', subtle && 'px-2 py-1.5')}>
          <MessageCircle className="w-4 h-4 text-indigo-600" /> Comment
        </button>
        <button onClick={onShare} className={cn('flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 font-semibold text-sm', subtle && 'px-2 py-1.5')}>
          <Share2 className="w-4 h-4 text-emerald-600" /> Share
        </button>
        <button onClick={onDM} className={cn('flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 font-semibold text-sm', subtle && 'px-2 py-1.5')}>
          <Send className="w-4 h-4 text-gray-700" /> DM
        </button>
      </div>
      <div className="mt-2 text-xs text-gray-600">
        <span className="font-bold">{likes}</span> likes • <span className="font-bold">{comments}</span> comments
      </div>
    </div>
  )
}

// Card Variants
function useCardState() {
  const [activeSkill, setActiveSkill] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const [availability, setAvailability] = useState(3)
  const [likes, setLikes] = useState(Math.floor(Math.random() * 80) + 20)
  const [comments, setComments] = useState(Math.floor(Math.random() * 25) + 2)
  const [showCommentBox, setShowCommentBox] = useState(false)
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    const id = setInterval(() => {
      setAvailability((v) => clamp(v + (Math.random() > 0.6 ? 1 : 0), 0, 9))
    }, 4000)
    return () => clearInterval(id)
  }, [])

  const addComment = () => {
    const t = commentText.trim()
    if (!t) return
    setComments((c) => c + 1)
    setCommentText('')
    setShowCommentBox(false)
  }

  return {
    activeSkill,
    setActiveSkill,
    expanded,
    setExpanded,
    availability,
    setAvailability,
    likes,
    setLikes,
    comments,
    setComments,
    showCommentBox,
    setShowCommentBox,
    commentText,
    setCommentText,
    addComment,
  }
}

function CardMinimal({ profile }) {
  const s = useCardState()
  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white/85 backdrop-blur shadow-sm overflow-hidden p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gray-900">
            <User2 className="w-6 h-6" />
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{profile.name}</h2>
          </div>
          <p className="mt-1 text-base md:text-lg font-bold text-gray-700 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> {profile.title}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.skills.map((sk) => (
              <SkillBadge key={sk.label} icon={sk.icon} label={sk.label} active={s.activeSkill === sk.label} onClick={() => s.setActiveSkill(s.activeSkill === sk.label ? null : sk.label)} />
            ))}
          </div>
          {s.activeSkill && (
            <div className="mt-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-3">
              <span className="font-bold">{s.activeSkill}:</span> {profile.skillDetails[s.activeSkill] || 'No additional details.'}
            </div>
          )}
        </div>
        <div className="w-44">
          <Availability level={s.availability} setLevel={s.setAvailability} />
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600">Projects</h3>
        <div className="mt-3 space-y-3">
          {profile.projects.slice(0, s.expanded ? profile.projects.length : 2).map((p) => (
            <ProjectItem key={p.title} icon={p.icon} title={p.title} desc={p.desc} onExpand={() => s.setExpanded((e) => !e)} linkLabel={s.expanded ? 'Collapse' : 'Expand'} />
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {profile.certifications.map((c) => (
          <button key={c} className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hover:shadow-sm" onClick={() => alert(c)}>
            <Award className="w-3.5 h-3.5" /> {c}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <EngagementBar likes={s.likes} comments={s.comments} onLike={() => s.setLikes((l) => l + 1)} onCommentToggle={() => s.setShowCommentBox((v) => !v)} onShare={() => navigator.clipboard.writeText(window.location.href)} onDM={() => alert('DM sent to poster!')} />
        {s.showCommentBox && (
          <div className="mt-3 flex items-center gap-2">
            <input value={s.commentText} onChange={(e) => s.setCommentText(e.target.value)} placeholder="Write a comment..." className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20" />
            <button onClick={s.addComment} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-black">
              <Send className="w-4 h-4" /> Post
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CardSplit({ profile }) {
  const s = useCardState()
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
      <div className="grid md:grid-cols-5">
        <div className="md:col-span-2 p-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="flex items-center gap-2">
            <User2 className="w-6 h-6" />
            <h2 className="text-2xl font-extrabold">{profile.name}</h2>
          </div>
          <p className="mt-1 text-sm font-semibold opacity-90 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> {profile.title}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.skills.map((sk) => (
              <SkillBadge key={sk.label} icon={sk.icon} label={sk.label} active={s.activeSkill === sk.label} onClick={() => s.setActiveSkill(s.activeSkill === sk.label ? null : sk.label)} tone="glass" />
            ))}
          </div>
          <div className="mt-5">
            <Availability level={s.availability} setLevel={s.setAvailability} variant="pill" />
          </div>
        </div>
        <div className="md:col-span-3 p-6 bg-white/90 backdrop-blur">
          {s.activeSkill && (
            <div className="mb-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-3">
              <span className="font-bold">{s.activeSkill}:</span> {profile.skillDetails[s.activeSkill]}
            </div>
          )}
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600">Projects</h3>
          <div className="mt-2 space-y-2.5">
            {profile.projects.slice(0, s.expanded ? profile.projects.length : 2).map((p) => (
              <ProjectItem key={p.title} icon={p.icon} title={p.title} desc={p.desc} onExpand={() => s.setExpanded((e) => !e)} linkLabel={s.expanded ? 'Collapse' : 'Expand'} />
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {profile.certifications.map((c) => (
              <button key={c} className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-full bg-white text-emerald-700 border border-emerald-300 hover:shadow-sm" onClick={() => alert(c)}>
                <Award className="w-3.5 h-3.5 text-emerald-700" /> {c}
              </button>
            ))}
          </div>
          <div className="mt-5">
            <EngagementBar likes={s.likes} comments={s.comments} onLike={() => s.setLikes((l) => l + 1)} onCommentToggle={() => s.setShowCommentBox((v) => !v)} onShare={() => navigator.clipboard.writeText(window.location.href)} onDM={() => alert('DM sent to poster!')} subtle />
            {s.showCommentBox && (
              <div className="mt-3 flex items-center gap-2">
                <input value={s.commentText} onChange={(e) => s.setCommentText(e.target.value)} placeholder="Write a comment..." className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20" />
                <button onClick={s.addComment} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-black">
                  <Send className="w-4 h-4" /> Post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function CardCompact({ profile }) {
  const s = useCardState()
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">{profile.name}</h2>
            <p className="text-sm font-bold text-gray-700 flex items-center gap-1.5 mt-0.5"><Briefcase className="w-4 h-4" /> {profile.title}</p>
          </div>
          <Availability level={s.availability} setLevel={s.setAvailability} variant="pill" />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {profile.skills.map((sk) => (
            <SkillBadge key={sk.label} icon={sk.icon} label={sk.label} active={s.activeSkill === sk.label} onClick={() => s.setActiveSkill(s.activeSkill === sk.label ? null : sk.label)} tone="soft" />
          ))}
        </div>
        {s.activeSkill && (
          <div className="mt-2 text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded p-2">
            <span className="font-bold">{s.activeSkill}:</span> {profile.skillDetails[s.activeSkill]}
          </div>
        )}
        <div className="mt-3 space-y-2">
          {profile.projects.slice(0, s.expanded ? profile.projects.length : 2).map((p) => (
            <ProjectItem key={p.title} icon={p.icon} title={p.title} desc={p.desc} onExpand={() => s.setExpanded((e) => !e)} linkLabel={s.expanded ? 'Less' : 'More'} dense />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {profile.certifications.map((c) => (
            <button key={c} className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200" onClick={() => alert(c)}>
              <Award className="w-3 h-3" /> {c}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <EngagementBar likes={s.likes} comments={s.comments} onLike={() => s.setLikes((l) => l + 1)} onCommentToggle={() => s.setShowCommentBox((v) => !v)} onShare={() => navigator.clipboard.writeText(window.location.href)} onDM={() => alert('DM sent to poster!')} subtle />
          {s.showCommentBox && (
            <div className="mt-2 flex items-center gap-2">
              <input value={s.commentText} onChange={(e) => s.setCommentText(e.target.value)} placeholder="Write a comment..." className="flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20" />
              <button onClick={s.addComment} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-black">
                <Send className="w-4 h-4" /> Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CardGlass({ profile }) {
  const s = useCardState()
  return (
    <div className="relative rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
      <div className="relative p-6 md:p-8 bg-white/10 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <User2 className="w-6 h-6 text-white" />
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{profile.name}</h2>
            </div>
            <p className="mt-1 text-base md:text-lg font-bold opacity-90 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> {profile.title}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.skills.map((sk) => (
                <SkillBadge key={sk.label} icon={sk.icon} label={sk.label} active={s.activeSkill === sk.label} onClick={() => s.setActiveSkill(s.activeSkill === sk.label ? null : sk.label)} tone="glass" />
              ))}
            </div>
            {s.activeSkill && (
              <div className="mt-3 text-sm text-white/90 bg-white/15 border border-white/25 rounded-lg p-3">
                <span className="font-bold">{s.activeSkill}:</span> {profile.skillDetails[s.activeSkill]}
              </div>
            )}
          </div>
          <div className="w-48">
            <Availability level={s.availability} setLevel={s.setAvailability} />
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/80">Projects</h3>
          <div className="mt-3 space-y-3">
            {profile.projects.slice(0, s.expanded ? profile.projects.length : 2).map((p) => (
              <div key={p.title} className="bg-white/15 border border-white/25 rounded-lg">
                <ProjectItem icon={p.icon} title={p.title} desc={p.desc} onExpand={() => s.setExpanded((e) => !e)} linkLabel={s.expanded ? 'Collapse' : 'Expand'} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {profile.certifications.map((c) => (
            <button key={c} className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-full bg-white/25 text-white border border-white/40 hover:bg-white/30" onClick={() => alert(c)}>
              <Award className="w-3.5 h-3.5" /> {c}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <div className="bg-white/15 border border-white/25 rounded-lg p-3">
            <EngagementBar likes={s.likes} comments={s.comments} onLike={() => s.setLikes((l) => l + 1)} onCommentToggle={() => s.setShowCommentBox((v) => !v)} onShare={() => navigator.clipboard.writeText(window.location.href)} onDM={() => alert('DM sent to poster!')} />
            {s.showCommentBox && (
              <div className="mt-3 flex items-center gap-2">
                <input value={s.commentText} onChange={(e) => s.setCommentText(e.target.value)} placeholder="Write a comment..." className="flex-1 rounded-md border border-white/40 bg-white/20 text-white placeholder-white/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/40" />
                <button onClick={s.addComment} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white text-gray-900 text-sm font-semibold hover:bg-white/90">
                  <Send className="w-4 h-4" /> Post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Carousel({ items, renderItem }) {
  const [index, setIndex] = useState(0)
  const trackRef = useRef(null)
  const startX = useRef(0)
  const currentX = useRef(0)
  const dragging = useRef(false)

  const go = (dir) => setIndex((i) => clamp(i + dir, 0, items.length - 1))
  const to = (i) => setIndex(clamp(i, 0, items.length - 1))

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const onPointerDown = (e) => {
    dragging.current = true
    startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX
    currentX.current = startX.current
  }
  const onPointerMove = (e) => {
    if (!dragging.current) return
    currentX.current = 'touches' in e ? e.touches[0].clientX : e.clientX
    const dx = currentX.current - startX.current
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${dx - index * 100}%)`
    }
  }
  const onPointerUp = () => {
    if (!dragging.current) return
    const dx = currentX.current - startX.current
    dragging.current = false
    if (Math.abs(dx) > 60) {
      if (dx < 0) go(1)
      else go(-1)
    } else {
      to(index)
    }
    if (trackRef.current) {
      trackRef.current.style.transform = ''
    }
  }

  return (
    <div className="relative select-none">
      <div className="overflow-hidden rounded-2xl" onMouseLeave={onPointerUp}>
        <div
          ref={trackRef}
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${index * 100}%)` }}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
        >
          {items.map((it, i) => (
            <div key={i} className="min-w-full p-2 sm:p-4">
              {renderItem(it)}
            </div>
          ))}
        </div>
      </div>
      <button aria-label="Previous" onClick={() => go(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full bg-white/90 border border-gray-200 shadow hover:bg-white">
        <ArrowLeft className="w-4 h-4" />
      </button>
      <button aria-label="Next" onClick={() => go(1)} className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full bg-white/90 border border-gray-200 shadow hover:bg-white">
        <ArrowRight className="w-4 h-4" />
      </button>
      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button key={i} onClick={() => to(i)} className={cn('w-2.5 h-2.5 rounded-full border border-gray-300', i === index ? 'bg-gray-900 border-gray-900' : 'bg-gray-200 hover:bg-gray-300')} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </div>
  )
}

// Demo data
const profiles = [
  {
    name: 'Alex Johnson',
    title: 'Senior Full‑Stack Engineer',
    skills: [
      { icon: Code, label: 'TypeScript' },
      { icon: Database, label: 'MongoDB' },
      { icon: Cloud, label: 'AWS' },
      { icon: GitBranch, label: 'CI/CD' },
      { icon: Shield, label: 'Security' },
    ],
    skillDetails: {
      TypeScript: '5+ years, React, Node, tRPC, Zod, advanced types.',
      MongoDB: 'Schema design, indexes, aggregation pipelines, Atlas.',
      AWS: 'EC2, Lambda, API Gateway, CloudFront, S3, CDK.',
      'CI/CD': 'GitHub Actions, semantic releases, feature flags.',
      Security: 'AuthN/Z, JWT, OAuth, OWASP, Secrets mgmt.',
    },
    projects: [
      { icon: Folder, title: 'Realtime Collaboration Suite', desc: 'WebSocket editor with presence and RBAC. −40% conflicts.' },
      { icon: Globe, title: 'Global E‑commerce Platform', desc: 'Edge caching, microfrontends, −35% TTFB.' },
      { icon: Phone, title: 'Mobile Health Dashboard', desc: 'Offline‑first PWA, secure sync, notifications.' },
    ],
    certifications: ['AWS Solutions Architect', 'Security+'],
  },
  {
    name: 'Priya Sharma',
    title: 'ML Engineer',
    skills: [
      { icon: Code, label: 'Python' },
      { icon: Database, label: 'Vector DB' },
      { icon: Cloud, label: 'GCP' },
      { icon: Star, label: 'MLOps' },
      { icon: Shield, label: 'Compliance' },
    ],
    skillDetails: {
      Python: 'NLP, LLM finetuning, Torch, JAX basics.',
      'Vector DB': 'FAISS, Pinecone, hybrid search, evals.',
      GCP: 'Vertex AI, Dataflow, BigQuery, Cloud Run.',
      MLOps: 'ML pipelines, model registry, drift, CI/CD.',
      Compliance: 'PII handling, HIPAA workflows, audit logs.',
    },
    projects: [
      { icon: Folder, title: 'RAG Service', desc: 'Multi-tenant RAG, cached reranking, citations.' },
      { icon: Globe, title: 'Forecasting Platform', desc: 'XGBoost + Prophet ensemble for demand.' },
      { icon: Phone, title: 'On-device Model', desc: 'Quantized mobile model with NNAPI.' },
    ],
    certifications: ['TensorFlow Developer', 'GCP Professional ML'],
  },
  {
    name: 'Diego Martínez',
    title: 'Frontend Engineer',
    skills: [
      { icon: Code, label: 'React' },
      { icon: Database, label: 'State Mgmt' },
      { icon: Cloud, label: 'Vite' },
      { icon: Star, label: 'Animations' },
      { icon: Shield, label: 'Accessibility' },
    ],
    skillDetails: {
      React: 'Hooks, Suspense, SSR, performance budget.',
      'State Mgmt': 'Zustand, Redux Toolkit, RTK Query.',
      Vite: 'HMR, code-splitting, env, plugins.',
      Animations: 'Framer Motion, spring configs, micro-interactions.',
      Accessibility: 'ARIA patterns, focus mgmt, keyboard nav.',
    },
    projects: [
      { icon: Folder, title: 'Design System', desc: 'Atomic components, tokens, docs site.' },
      { icon: Globe, title: 'Marketing Hub', desc: 'A/B tests, lighthouse 95+, i18n.' },
      { icon: Phone, title: 'Finance App', desc: 'Charts, offline mode, PWA.' },
    ],
    certifications: ['WAI-ARIA Practitioner', 'Scrum Master'],
  },
]

export default function App() {
  const items = useMemo(() => profiles, [])
  const [style, setStyle] = useState('Minimal')

  const render = (p) => {
    switch (style) {
      case 'Split':
        return <CardSplit profile={p} />
      case 'Compact':
        return <CardCompact profile={p} />
      case 'Glass':
        return <CardGlass profile={p} />
      default:
        return <CardMinimal profile={p} />
    }
  }

  const styles = ['Minimal', 'Split', 'Compact', 'Glass']

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100/60 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">T‑Board Feed</h1>
            <p className="mt-1 text-gray-600">Swipe through curated resumes and job listings. Engage directly with each post.</p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1.5 shadow-sm">
            {styles.map((label) => (
              <button key={label} onClick={() => setStyle(label)} className={cn('px-3 py-1.5 text-sm font-semibold rounded-md', style === label ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100')}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <Carousel items={items} renderItem={render} />
      </div>
    </div>
  )
}
