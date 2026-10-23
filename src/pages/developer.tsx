import { useTranslation } from "react-i18next"
import { contactHref } from "@/lib/contact"
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { isCommission } from "@/data/projects"

// Same Linear-style tokens and components as the portfolio page
import "./portfolio.css"

const builds = [
  {
    id: "searchbrand",
    company: "Searchbrand.AI",
    accent: "#4ea7fc",
    stack: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL", "Hono", "Cloud Run", "LangChain", "Stripe", "BigQuery"],
  },
  {
    id: "socratia",
    company: "Socratia",
    accent: "#f2994a",
    stack: ["Next.js", "React 19", "Supabase", "Anthropic", "Zod", "Playwright"],
  },
  {
    id: "audioswitch",
    company: "AudioSwitch",
    accent: "#4cb7a5",
    stack: ["Swift", "SwiftUI", "AppKit", "CoreAudio", "XCTest"],
  },
]

const principles = ["loop", "typed", "ship", "ai"] as const

// Tool names stay untranslated
const stack: { group: string; items: string[] }[] = [
  { group: "frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite"] },
  { group: "backend", items: ["Node.js", "Python", "Hono", "PostgreSQL", "Drizzle ORM", "Supabase"] },
  { group: "ai", items: ["LangChain", "Vertex AI · Gemini", "OpenAI", "Anthropic"] },
  { group: "cloud", items: ["Cloud Run", "Cloud Tasks", "Pub/Sub", "BigQuery", "GitHub Actions"] },
  { group: "native", items: ["Swift", "SwiftUI", "AppKit", "CoreAudio"] },
  { group: "quality", items: ["Vitest", "Playwright", "XCTest"] },
]

export function DeveloperPage() {
  const { t } = useTranslation()

  return (
    <div className="pf w-full max-w-[1120px] mx-auto px-6">
      <header className="pf-reveal mt-16 md:mt-28 mx-auto max-w-[760px] text-center">
        <span data-tilt className="holo avatar-squircle mx-auto mb-8 rotate-[4deg]">
          <img src="/avatar-illustration.webp" alt="" width={104} height={104} />
        </span>
        <p className="pf-eyebrow justify-center mb-6">
          <span className="pf-dot" style={{ background: "#68cc58" }} />
          {t("developer.title")}
        </p>
        <h1 className="pf-h1">{t("developer.headline")}</h1>
        <p className="pf-lead mt-6 mx-auto max-w-[560px]">{t("developer.intro")}</p>
      </header>

      <section className="pf-reveal mt-24 md:mt-32">
        <h2 className="pf-h3 mb-8">{t("developer.builds.title")}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {builds.map((b) => (
            <Link key={b.id} to={`/portfolio#${b.id}`} data-tilt className="pf-card group flex flex-col p-6 md:p-7">
              <p className="pf-eyebrow">
                <span className="pf-dot" style={{ background: b.accent }} />
                {b.company}
                {isCommission(b.id) && <span className="pf-tag !h-5 !text-[11px]">{t("portfolio.commission")}</span>}
              </p>
              <h3 className="pf-card-title mt-2 !text-[17px]">{t(`developer.builds.${b.id}.title`)}</h3>
              <p className="pf-lead mt-3 !text-[15px] flex-1">{t(`developer.builds.${b.id}.body`)}</p>
              <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={t("developer.stack.title")}>
                {b.stack.map((s) => <li key={s} className="pf-tag">{s}</li>)}
              </ul>
              <span className="pf-round mt-6 self-end" aria-hidden="true"><ArrowUpRight size={18} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="pf-reveal mt-24 md:mt-32">
        <h2 className="pf-h3 mb-8">{t("developer.principles.title")}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {principles.map((p, i) => (
            <div key={p} className="pf-card p-6 md:p-7">
              <p className="pf-eyebrow tabular-nums">0{i + 1}</p>
              <h3 className="pf-card-title mt-2 !text-[17px]">{t(`developer.principles.${p}.title`)}</h3>
              <p className="pf-lead mt-2 !text-[15px]">{t(`developer.principles.${p}.body`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pf-reveal mt-24 md:mt-32">
        <h2 className="pf-h3 mb-8">{t("developer.stack.title")}</h2>
        <dl className="border-t border-border">
          {stack.map(({ group, items }) => (
            <div key={group} className="grid gap-3 border-b border-border py-5 md:grid-cols-[200px_1fr] md:items-center">
              <dt className="pf-eyebrow">{t(`developer.stack.${group}`)}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {items.map((s) => <span key={s} className="pf-tag">{s}</span>)}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <aside className="pf-reveal mt-24 md:mt-32 mb-24 md:mb-32 flex flex-col gap-6 border-t border-border pt-12 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="pf-h3">{t("developer.cta.title")}</h2>
          <p className="pf-lead mt-2 max-w-[46ch]">{t("developer.cta.body")}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link to="/portfolio" className="pf-btn">{t("developer.cta.work")}</Link>
          <a href={contactHref(t("portfolio.emailSubject"))} className="pf-btn pf-btn--primary">{t("portfolio.getInTouch")}</a>
        </div>
      </aside>
    </div>
  )
}
