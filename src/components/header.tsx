import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { useState } from "react"
import confetti from 'canvas-confetti'
import { useSkills } from "@/lib/skill-context"
import { useTranslation } from "react-i18next"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { selectedSkills } = useSkills()
  const { t } = useTranslation()
  const navigate = useNavigate()

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

    window.location.href = `mailto:of@orlandoflores.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const menuItems = [
    { labelKey: "navigation.home", path: "/" },
    { labelKey: "navigation.designer", path: "/designer" },
    { labelKey: "navigation.developer", path: "/developer" },
    { labelKey: "navigation.contact", action: handleEmailClick },
  ]

  const handleMenuItemClick = (item: typeof menuItems[0]) => {
    if (item.action) {
      item.action()
    } else if (item.path) {
      navigate(item.path)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="xs=fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between py-4 px-6">
          {/* Mobile Menu Icon */}
          <button
            className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Logo */}
          <Link to="/" className="hidden md:block text-xl font-medium hover:text-primary transition-colors">
            Orlando Flores
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation />
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ModeToggle />
            <Button
              variant="outline"
              className="hidden md:flex rounded-full px-6 cursor-pointer"
              onClick={handleEmailClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {getButtonText()}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Fullscreen Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/20 backdrop-blur-3xl">
          {/* Close button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 left-6 p-3 hover:bg-white/20 dark:hover:bg-black/20 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>
          
          <nav className="flex flex-col items-center justify-center h-full w-full gap-6 px-6">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuItemClick(item)}
                className="w-full max-w-md py-8 text-center text-2xl font-medium rounded-2xl border border-white/20 dark:border-white/10 bg-white/50 dark:bg-black/30 backdrop-blur-xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
              >
                {t(item.labelKey)}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}