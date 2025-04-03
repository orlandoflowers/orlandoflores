import { Button } from "@/components/ui/button"
import { Linkedin } from "lucide-react"
import { useTranslation } from "react-i18next"

export function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="h-16 mt-4 md:mt-0 border-t bg-background">
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {t('footer.copyright')}
        </p>
        <Button variant="ghost" size="icon" asChild>
          <a href="https://linkedin.com/in/orlandoflores" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </Button>
      </div>
    </footer>
  )
} 