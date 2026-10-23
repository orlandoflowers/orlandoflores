import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ArrowUpRight } from "lucide-react"
import { contactHref } from "@/lib/contact"
import { RotatingText } from "@/components/ui/rotating-text"

export function Hero() {
  const { t } = useTranslation()
  
  // Get descriptions array from translations
  const descriptions = t("hero.descriptions", { returnObjects: true }) as string[]
  
  // ¡Operación precarga! Pa' que la weá cargue raja antes que digan "oh, qué lenta la página" 🚀
  
  // Imagen de perfil po, más importante que el primer copete del viernes 🍺
  useEffect(() => {
    const imgProfile = new Image();
    imgProfile.src = '/profile.webp';
    imgProfile.fetchPriority = 'high';
    imgProfile.onload = () => {
      // ¡Wena CTM! Ya cargó la foto - Google nos va a dar la estrellita de oro 🏆
    };
    
    // La otra imagen: prioridad baja (como cuando deci "mañana hago ejercicio" pero sabí que no) 🏃‍♂️
    // Only shown from xl (1280px) up, so don't fetch it on smaller screens
    if (window.matchMedia('(min-width: 1280px)').matches) {
      const imgPortfolio = new Image();
      imgPortfolio.src = '/portfolio.webp';
      imgPortfolio.fetchPriority = 'low';
    }
  }, []);

  // Same "Get in touch" as the portfolio: a plain email link, tracked in Clarity
  const handleEmailClick = () => {
    window.clarity?.("event", "email_click", { source: "home" })
  }

  return (
    <section className="flex-1 py-6 md:py-0 md:flex-none md:h-[60vh] flex items-center overflow-visible justify-center px-4 bg-background text-foreground">
      <div className="w-full mx-auto flex flex-col md:flex-row overflow-visible items-start md:items-center justify-start md:justify-center gap-6 md:gap-12">
        <div className="flex flex-col md:flex-row items-start md:items-start overflow-visible gap-5 md:gap-12 w-full md:w-auto">
          <div className="shrink-0">
            {/* Hovering swaps the photo for the illustrated avatar used on the other pages */}
            <div 
              className="group relative w-28 h-28 md:w-48 md:h-48 aspect-square profile-image-container overflow-visible"
            >
              <img 
                src="/profile.webp" 
                alt="Orlando Flores"
                width="192" 
                height="192"
                fetchPriority="high"
                loading="eager"
                className="w-full h-full object-cover profile-image transition duration-500 ease-out group-hover:opacity-0 group-hover:scale-95 motion-reduce:transition-none" 
              />
              <span
                aria-hidden="true"
                className="avatar-squircle absolute inset-0 opacity-0 scale-95 transition duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 motion-reduce:transition-none"
                style={{ width: "100%", height: "100%" }}
              >
                <img src="/avatar-illustration.webp" alt="" width={192} height={192} decoding="async" />
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-5 md:gap-4 max-w-2xl text-left">
            {/* Always 2–3 lines: max-w caps the measure (no phrase fits on one line), and on phones
                the size scales with the column so the longest phrase (es) still needs ≤ 3 lines */}
            <h1 className="max-w-[19em] text-[clamp(22px,calc((100vw-32px)/11),36px)] leading-[1.15] md:text-[40px] md:leading-[1.15] xl:text-5xl xl:leading-[1.1] font-medium">
              <RotatingText texts={descriptions} stagger={70} pauseDuration={2600} />
            </h1>
            <div className="pf mt-1 md:mt-2 flex flex-wrap items-center gap-2">
              <a
                id="button-email-me"
                data-umami-event="cta-email-me"
                href={contactHref(t("portfolio.emailSubject"))}
                onClick={handleEmailClick}
                className="pf-btn pf-btn--primary"
              >
                {t("portfolio.getInTouch")}
              </a>
              <a href="https://www.linkedin.com/in/orflores" target="_blank" rel="noopener noreferrer" className="pf-btn">
                LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div className="superellipse-rounded hidden xl:block overflow-hidden transition-all duration-700 ease-in-out h-[550px] w-[400px]" style={{ contain: 'layout paint' }}>
          <img 
            src="/portfolio.webp" 
            alt="Portfolio item"
            width="400" 
            height="550"
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-700 ease-in-out" 
          />
        </div>
      </div>
    </section>
  )
} 