import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { skills, useSkills } from "@/lib/skill-context"
import { useState, useEffect } from "react"
import confetti from 'canvas-confetti'
import { useTranslation } from "react-i18next"

export function Hero() {
  const { selectedSkills, toggleSkill } = useSkills()
  const [isHovered, setIsHovered] = useState(false)
  const { t } = useTranslation()
  
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
    const imgPortfolio = new Image();
    imgPortfolio.src = '/portfolio.webp';
    imgPortfolio.fetchPriority = 'low';
  }, []);

  const getButtonText = () => {
    if (selectedSkills.length === 0) {
      return isHovered ? t("hero.contactHover") : t("hero.contactButton")
    }
    return isHovered 
      ? t("hero.contactWithSkill", { skill: selectedSkills[0] }) 
      : t("hero.contactButton")
  }

  const handleEmailClick = () => {
    // Le contamos al Clarity que alguien quiere mandar un mail (¡posible peguita a la vista!) 💼
    if (window.clarity) {
      window.clarity("event", "email_click", {
        skill: selectedSkills.length > 0 ? selectedSkills[0] : "none"
      });
    }

    // ¡Tirando confeti po! Porque un clic sin confeti es como un completo sin palta 🎉
    confetti({
      particleCount: 200,
      spread: 180,
      angle: 90,
      origin: { y: 0.6 },
      gravity: 0.4,
      decay: 0.94,
      startVelocity: 30,
      scalar: 1.2,
      ticks: 600,
    });

    // ¡Correo al vuelo! Ojalá no caiga en spam o estamos fritos 🤞
    const subject = selectedSkills.length > 0 
      ? t("email.subjectWithSkill", { skill: selectedSkills[0] })
      : t("email.subject");
    
    const body = selectedSkills.length > 0 
      ? t("email.bodyWithSkill", { skill: selectedSkills[0] })
      : t("email.body");

    window.location.href = `mailto:of@orlandoflores.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSkillClick = (skill: string) => {
    toggleSkill(skill);
    // Sapéandote las habilidades que te interesan (pa' cachar no más, típico chileno) 👀
    window.clarity?.('track', 'skillSelected', { skill });
  };

  return (
    <section className="h-[calc(100vh-4rem)] md:h-[60vh] flex items-center justify-center px-4 bg-background text-foreground">
      <div className="w-full mx-auto flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center gap-6 md:gap-12">
        <div className="flex flex-col md:flex-row items-start md:items-start gap-6 md:gap-12 w-full md:w-auto">
          <div className="shrink-0">
            <div 
              className="w-28 h-28 md:w-48 md:h-48 aspect-square overflow-hidden" 
              style={{ contain: 'layout paint' }}
            >
              <img 
                src="/profile.webp" 
                alt="Orlando Flores"
                width="192" 
                height="192"
                fetchPriority="high"
                loading="eager"
                className="w-full h-full object-cover transition-all duration-300" 
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 md:gap-4 max-w-2xl text-left">
            <h1 className="text-4xl md:text-6xl font-medium leading-none">
              {t("hero.description")}
            </h1>
            <div className="mt-1 md:mt-2">
              <p className="text-muted-foreground mb-2 text-sm md:text-base">{t("hero.contactHelp")}</p>
              <div className="flex flex-wrap gap-2 md:gap-4 justify-start">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant={selectedSkills.includes(skill) ? "default" : "outline"}
                    className={`
                      px-2 md:px-3 py-1 md:py-1 rounded-full text-sm md:text-sm cursor-pointer transition-colors
                      ${selectedSkills.includes(skill) 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                        : "bg-muted hover:bg-muted/80"
                      }
                    `}
                    onClick={() => {
                      handleSkillClick(skill);
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-3 md:mt-4 flex justify-start">
              <Button
                id="button-email-me"
                data-umami-event="cta-email-me"
                className="rounded-full px-6 w-full md:w-auto cursor-pointer text-sm md:text-base"
                onClick={handleEmailClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {getButtonText()}
              </Button>
            </div>
          </div>
        </div>
        <div className="rounded-2xl hidden md:block overflow-hidden transition-all duration-700 ease-in-out h-[550px] w-[400px]" style={{ contain: 'layout paint' }}>
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