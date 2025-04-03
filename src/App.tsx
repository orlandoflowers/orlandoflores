import { ThemeProvider } from '@/components/theme-provider'
import { SkillProvider } from '@/lib/skill-context'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Experience } from '@/components/experience'
import { Footer } from '@/components/footer'
import { ClarityAnalytics } from "@/components/clarity"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="orlando-portfolio-theme">
      <SkillProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
          <ClarityAnalytics />
          <Header />
          <main className="flex-1 flex flex-col">
            <div className="flex flex-col md:h-full md:overflow-hidden">
              <Hero />
              <Experience />
            </div>
          </main>
          <Footer />
        </div>
      </SkillProvider>
    </ThemeProvider>
  )
}

export default App
