import { Button } from "@/components/ui/button"
import { Linkedin } from "lucide-react"
import { useTranslation } from "react-i18next"

export function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="md=h-16 mt-4 md:mt-0 border-t bg-background py-8">
      <div className="flex h-full items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">
          {t('footer.copyright')}
        </p>
        <Button variant="ghost" size="icon" asChild>
          <a href="https://www.linkedin.com/in/orflores" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </Button>
      </div>
    </footer>
  )
} 