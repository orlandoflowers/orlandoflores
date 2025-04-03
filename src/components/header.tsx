import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import confetti from 'canvas-confetti'
import { useSkills } from "@/lib/skill-context"
import { useTranslation } from "react-i18next"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Header() {
  const [isHovered, setIsHovered] = useState(false)
  const { selectedSkills } = useSkills()
  const { t } = useTranslation()

  const getButtonText = () => {
    if (selectedSkills.length === 0) {
      return isHovered ? t("hero.contactHover") : t("header.contact")
    }
    return isHovered 
      ? t("hero.contactWithSkill", { skill: selectedSkills[0] }) 
      : t("header.contact")
  }

  const handleEmailClick = () => {
    // ¡Sapeo máximo! Clarity registra que querí contactarme (pa' que quede constancia po) 📊
    window.clarity?.('track', 'headerEmailClick');

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })

    const subject = selectedSkills[0] 
      ? t("email.subjectWithSkill", { skill: selectedSkills[0] })
      : t("email.subject")
    
    const body = selectedSkills[0] 
      ? t("email.bodyWithSkill", { skill: selectedSkills[0] })
      : t("email.body")

    window.location.href = `mailto:orlandoflores.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <header className="xs=fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
      <div className="flex items-center justify-between py-4 px-6">
        <h1 className="text-xl font-medium">Orlando Flores</h1>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ModeToggle />
          <Button
            variant="outline"
            className="rounded-full px-6 cursor-pointer"
            onClick={handleEmailClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {getButtonText()}
          </Button>
        </div>
      </div>
    </header>
  )
} 