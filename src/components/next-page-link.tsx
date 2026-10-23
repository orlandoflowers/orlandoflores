import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ArrowRight } from "lucide-react"

// Secondary "next page" link at the end of a page, quieter than its Get in touch block
export function NextPageLink({ to, label }: { to: string; label: string }) {
  const { t } = useTranslation()
  return (
    <Link to={to} className="pf-reveal group mt-16 md:mt-20 mb-24 md:mb-32 flex items-center justify-between gap-4 border-t border-border pt-6">
      <span>
        <span className="pf-eyebrow">{t("navigation.next")}</span>
        <span className="block mt-1 text-[17px] font-medium tracking-[-0.011em] text-foreground/85 group-hover:text-foreground transition-colors">
          {label}
        </span>
      </span>
      <span className="pf-round" aria-hidden="true"><ArrowRight size={18} /></span>
    </Link>
  )
}
