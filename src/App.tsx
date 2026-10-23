import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { SkillProvider } from '@/lib/skill-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ClarityAnalytics } from "@/components/clarity"
import { HomePage } from '@/pages/home'
import { DesignerPage } from '@/pages/designer'
import { DeveloperPage } from '@/pages/developer'
import { PortfolioPage } from '@/pages/portfolio'
import { installHolo } from '@/lib/holo'
import { ScrollToTop } from '@/components/scroll-to-top'

function App() {
  useEffect(() => installHolo(), [])

  return (
    <ThemeProvider defaultTheme="system" storageKey="orlando-portfolio-theme">
      <SkillProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
            <ClarityAnalytics />
            <ScrollToTop />
            <Header />
            <main className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/designer" element={<DesignerPage />} />
                <Route path="/developer" element={<DeveloperPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </SkillProvider>
    </ThemeProvider>
  )
}

export default App
