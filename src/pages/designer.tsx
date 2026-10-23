import { useTranslation } from "react-i18next"
import { contactHref } from "@/lib/contact"
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { isCommission } from "@/data/projects"

// Same Linear-style tokens and components as the portfolio page
import "./portfolio.css"

const work = [
  { id: "searchbrand", company: "Searchbrand.AI", accent: "#4ea7fc" },
  { id: "socratia", company: "Socratia", accent: "#f2994a" },
  { id: "audienceview", company: "AudienceView", accent: "#b56cf0" },
  { id: "betterfly", company: "Betterfly", accent: "#68cc58" },
]

const principles = ["problem", "prototype", "systems", "measure"] as const

type ToolkitGroup = { label: string; items: string[] }

export function DesignerPage() {
  const { t } = useTranslation()
  const toolkit = t("designer.toolkit.groups", { returnObjects: true }) as ToolkitGroup[]

  return (
    <div className="pf w-full max-w-[1120px] mx-auto px-6">
      <header className="pf-reveal mt-16 md:mt-28 mx-auto max-w-[760px] text-center">
        <span data-tilt className="holo avatar-squircle mx-auto mb-8 -rotate-[4deg]">
          <img src="/avatar-illustration.webp" alt="" width={104} height={104} />
        </span>
        <p className="pf-eyebrow justify-center mb-6">
          <span className="pf-dot" style={{ background: "#b56cf0" }} />
          {t("designer.title")}
        </p>
        <h1 className="pf-h1">{t("designer.headline")}</h1>
        <p className="pf-lead mt-6 mx-auto max-w-[560px]">{t("designer.intro")}</p>
      </header>

      <section className="pf-reveal mt-24 md:mt-32">
        <h2 className="pf-h3 mb-8">{t("designer.principles.title")}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {principles.map((p, i) => (
            <div key={p} className="pf-card p-6 md:p-7">
              <p className="pf-eyebrow tabular-nums">0{i + 1}</p>
              <h3 className="pf-card-title mt-2 !text-[17px]">{t(`designer.principles.${p}.title`)}</h3>
              <p className="pf-lead mt-2 !text-[15px]">{t(`designer.principles.${p}.body`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pf-reveal mt-24 md:mt-32">
        <h2 className="pf-h3 mb-8">{t("designer.work.title")}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {work.map((w) => {
            const tags = t(`designer.work.${w.id}.tags`, { returnObjects: true }) as string[]
            return (
              <Link key={w.id} to={`/portfolio#${w.id}`} data-tilt className="pf-card group flex flex-col p-6 md:p-7">
                <p className="pf-eyebrow">
                  <span className="pf-dot" style={{ background: w.accent }} />
                  {w.company}
                  {isCommission(w.id) && <span className="pf-tag !h-5 !text-[11px]">{t("portfolio.commission")}</span>}
                </p>
                <h3 className="pf-card-title mt-2 !text-[17px]">{t(`designer.work.${w.id}.title`)}</h3>
                <p className="pf-lead mt-3 !text-[15px] flex-1">{t(`designer.work.${w.id}.body`)}</p>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <ul className="flex flex-wrap gap-1.5">
                    {Array.isArray(tags) && tags.map((tag) => <li key={tag} className="pf-tag">{tag}</li>)}
                  </ul>
                  <span className="pf-round" aria-hidden="true"><ArrowUpRight size={18} /></span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="pf-reveal mt-24 md:mt-32">
        <h2 className="pf-h3 mb-8">{t("designer.toolkit.title")}</h2>
        <dl className="border-t border-border">
          {Array.isArray(toolkit) && toolkit.map(({ label, items }) => (
            <div key={label} className="grid gap-3 border-b border-border py-5 md:grid-cols-[200px_1fr] md:items-center">
              <dt className="pf-eyebrow">{label}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {items.map((s) => <span key={s} className="pf-tag">{s}</span>)}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <aside className="pf-reveal mt-24 md:mt-32 mb-24 md:mb-32 flex flex-col gap-6 border-t border-border pt-12 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="pf-h3">{t("designer.cta.title")}</h2>
          <p className="pf-lead mt-2 max-w-[46ch]">{t("designer.cta.body")}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link to="/portfolio" className="pf-btn">{t("developer.cta.work")}</Link>
          <a href={contactHref(t("portfolio.emailSubject"))} className="pf-btn pf-btn--primary">{t("portfolio.getInTouch")}</a>
        </div>
      </aside>
    </div>
  )
}
