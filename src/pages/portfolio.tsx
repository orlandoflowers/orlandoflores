import { useEffect, useRef, useState, type CSSProperties } from "react"
import { useTranslation } from "react-i18next"
import { contactHref } from "@/lib/contact"
import { useLocation, Link } from "react-router-dom"
import { projects, type MediaItem, type Project, type ProjectTag } from "@/data/projects"
import { cn } from "@/lib/utils"
import { ArrowUpRight, BookOpen, Briefcase, Handshake, Component, FlaskConical, Globe, LayoutGrid, Mic, Monitor, Smartphone, Sparkles, X, type LucideIcon } from "lucide-react"

import "./portfolio.css"

type Filter = "all" | "case-study" | ProjectTag

const filters: { id: Filter; icon: LucideIcon }[] = [
  { id: "all", icon: LayoutGrid },
  { id: "work", icon: Briefcase },
  { id: "commission", icon: Handshake },
  { id: "personal", icon: FlaskConical },
  { id: "ai", icon: Sparkles },
  { id: "mobile", icon: Smartphone },
  { id: "web", icon: Globe },
  { id: "native", icon: Monitor },
  { id: "voice", icon: Mic },
  { id: "design-system", icon: Component },
  { id: "case-study", icon: BookOpen },
]

const matches = (project: Project, filter: Filter) =>
  filter === "all" || (filter === "case-study" ? !!project.caseStudy : project.tags.includes(filter))

// Newest first; "2022–2023" sorts by 2023. Ties keep their order in projects.ts.
const lastYear = (p: Project) => Number(p.year.slice(-4))
const byDate = [...projects].sort((a, b) => lastYear(b) - lastYear(a))

function CaseStudy({ project, className }: { project: Project; className?: string }) {
  const { t } = useTranslation()
  const dialog = useRef<HTMLDialogElement>(null)
  const scrollArea = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const viewer = dialog.current
    if (!viewer) return
    let previousOverflow = ""
    const restore = () => { document.body.style.overflow = previousOverflow }
    const lock = () => {
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
    }
    viewer.addEventListener("close", restore)
    viewer.addEventListener("portfolio:open", lock)
    return () => {
      viewer.removeEventListener("close", restore)
      viewer.removeEventListener("portfolio:open", lock)
      if (viewer.open) restore()
    }
  }, [])

  const title = `${project.company} — ${t("portfolio.caseStudy.title")}`

  return (
    <>
      <button
        type="button"
        aria-label={`${t("portfolio.caseStudy.open")} — ${project.company}`}
        aria-haspopup="dialog"
        onClick={() => {
          dialog.current?.dispatchEvent(new Event("portfolio:open"))
          dialog.current?.showModal()
          scrollArea.current?.scrollTo(0, 0)
        }}
        className={cn("pf-card group relative flex w-full flex-col overflow-hidden text-left cursor-zoom-in md:h-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground", className)}
      >
        <span className="relative block aspect-[4/3] md:aspect-auto md:flex-1 md:min-h-0 overflow-hidden">
          <img src={project.caseStudy} alt={title} loading="lazy" decoding="async"
            className="block w-full h-full object-cover object-top motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.015] origin-top" />
        </span>
        <span className="pf-card-label">
          <span className="min-w-0">
            <span className="pf-eyebrow"><span className="pf-dot" style={{ background: project.accent }} />{t("portfolio.caseStudy.title")}</span>
            <span className="pf-card-title">{t("portfolio.caseStudy.open")}</span>
          </span>
          <span className="flex shrink-0 items-center gap-2.5" aria-hidden="true">
            <span className="pf-hint">{t("portfolio.caseStudy.enlarge")}</span>
            <span className="pf-round"><ArrowUpRight size={18} /></span>
          </span>
        </span>
      </button>
      <dialog ref={dialog} aria-label={title}
        className="fixed inset-0 m-auto w-[calc(100%-1rem)] max-w-[1100px] h-[94dvh] max-h-none p-0 rounded-2xl bg-background text-foreground backdrop:bg-black/75 backdrop:backdrop-blur-sm overflow-hidden"
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close() }}>
        <div className="h-16 px-4 md:px-6 flex items-center justify-between gap-4 border-b border-border">
          <p className="text-sm font-medium truncate">{title}</p>
          <button type="button" autoFocus onClick={() => dialog.current?.close()}
            aria-label={t("portfolio.caseStudy.close")}
            className="shrink-0 p-2 rounded-full hover:bg-muted focus-visible:outline-2 cursor-pointer">
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <div ref={scrollArea} className="h-[calc(100%-4rem)] overflow-y-auto overscroll-contain">
          <img src={project.caseStudy} alt={title} loading="lazy" className="block w-full h-auto" />
        </div>
      </dialog>
    </>
  )
}

function AutoplayVideo({ item }: { item: MediaItem }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  useEffect(() => {
    const video = ref.current
    if (!video || reducedMotion) return
    // Solo reproducimos lo que está en pantalla, pa' no fundir la batería 🔋
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { rootMargin: "240px 0px" }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      controls={reducedMotion}
      poster={item.poster}
      aria-label={item.alt}
      className="block w-full h-full object-cover rounded-2xl bg-muted"
    >
      <source src={item.src} type="video/mp4" />
    </video>
  )
}

function Media({ item }: { item: MediaItem }) {
  if (item.type === "video") return <AutoplayVideo item={item} />
  return (
    <img
      src={item.src}
      alt={item.alt}
      loading="lazy"
      decoding="async"
      className="block w-full h-full object-cover rounded-2xl bg-muted"
    />
  )
}

function Caption({ text, accent }: { text: string; accent: string }) {
  // "Desktop · Brand setup…" → small label + headline, like Linear's feature cards
  const [label, title] = text.includes(" · ") ? text.split(" · ", 2) : ["", text]
  return (
    <figcaption className="pf-card-label">
      <span className="min-w-0">
        {label && <span className="pf-eyebrow"><span className="pf-dot" style={{ background: accent }} />{label}</span>}
        <span className="pf-card-title">{title}</span>
      </span>
    </figcaption>
  )
}

function ProjectSection({ project }: { project: Project }) {
  const { t } = useTranslation()
  const base = `portfolio.projects.${project.id}`
  const description = t(`${base}.description`, { returnObjects: true }) as string[]
  const domain = project.link?.replace(/^https?:\/\/(www\.)?/, "")

  return (
    <section id={project.id} className="pf-reveal mb-28 md:mb-40 scroll-mt-24">
      <header className="mb-8 md:mb-10 max-w-[680px]">
        <p className="pf-eyebrow mb-3">
          <span className="pf-dot" style={{ background: project.accent }} />
          {t(`${base}.name`, { defaultValue: project.name })}
          {project.tags.includes("commission") && <span className="pf-tag !h-5 !text-[11px]">{t("portfolio.commission")}</span>}
        </p>
        <h2 className="pf-h2">{project.company}</h2>
        <div className="pf-lead mt-4 space-y-3">
          {Array.isArray(description) && description.map((p, i) => <p key={i}>{p}</p>)}
          {domain && project.linkAsText && <p className="pf-meta">{domain}</p>}
          {domain && !project.linkAsText && (
            <p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="pf-meta inline-flex items-center gap-1 hover:text-foreground transition-colors">
                {domain} <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </p>
          )}
        </div>
      </header>

      <div className={`project-bento project-bento--${project.id}`}>
        {project.caseStudy && <div className="bento-case"><CaseStudy project={project} /></div>}
        {project.rows.flatMap((row) => row.items).map((item) => (
          <figure key={item.src} className="bento-media pf-card"
            style={{ "--media-aspect": item.aspect, "--media-area": item.captionKey === "home-standard" ? "home" : item.captionKey === "design-system" ? "system" : item.captionKey } as CSSProperties}>
            <div className="bento-screen"><Media item={item} /></div>
            <Caption text={t(`${base}.media.${item.captionKey}`)} accent={project.accent} />
          </figure>
        ))}
      </div>
    </section>
  )
}

export function PortfolioPage() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<Filter>("all")
  const { hash } = useLocation()

  // Deep links like /portfolio#socratia (from /developer) land on the project
  useEffect(() => {
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
  }, [hash])

  const visible = byDate.filter((p) => matches(p, filter))

  return (
    <div className="pf w-full max-w-[1120px] mx-auto px-6">
      <header className="pf-reveal mt-16 md:mt-28 mx-auto max-w-[760px] text-center">
        <Link to="/" aria-label={t("navigation.home")} data-tilt className="holo avatar-squircle mx-auto mb-8 focus-visible:outline-none focus-visible:scale-110 transition-[scale]">
          <img src="/avatar-illustration.webp" alt="" width={104} height={104} />
        </Link>
        <p className="pf-eyebrow justify-center mb-6">
          <span className="text-foreground/85">Orlando Flores</span>
        </p>
        <h1 className="pf-h1">{t("portfolio.role")}</h1>
        <p className="pf-lead mt-6 mx-auto max-w-[520px] text-balance!">{t("portfolio.bio")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <a href={contactHref(t("portfolio.emailSubject"))} className="pf-btn pf-btn--primary">{t("portfolio.getInTouch")}</a>
          <a href="https://www.linkedin.com/in/orflores" target="_blank" rel="noopener noreferrer" className="pf-btn">
            LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </header>

      <nav aria-label={t("portfolio.filterLabel")} className="mt-20 md:mt-28 mb-14 md:mb-20 mx-auto max-w-[820px] flex flex-wrap justify-center gap-2">
        {filters.map(({ id, icon: Icon }) => (
          <button
            key={id}
            type="button"
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
            className="pf-chip"
          >
            <Icon size={14} aria-hidden="true" />
            {t(`portfolio.filters.${id}`)}
            <span className="pf-chip-count">{byDate.filter((p) => matches(p, id)).length}</span>
          </button>
        ))}
      </nav>

      {visible.map((project) => (
        <ProjectSection key={project.id} project={project} />
      ))}

      <aside className="pf-reveal mb-24 md:mb-32 flex flex-col gap-6 border-t border-border pt-12 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="pf-h3">{t("portfolio.cta.title")}</h2>
          <p className="pf-lead mt-2 max-w-[46ch]">{t("portfolio.cta.body")}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <a href="https://www.linkedin.com/in/orflores" target="_blank" rel="noopener noreferrer" className="pf-btn">LinkedIn</a>
          <a href={contactHref(t("portfolio.emailSubject"))} className="pf-btn pf-btn--primary">{t("portfolio.getInTouch")}</a>
        </div>
      </aside>
    </div>
  )
}
