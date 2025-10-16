import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { SkillProvider } from '@/lib/skill-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ClarityAnalytics } from "@/components/clarity"
import { HomePage } from '@/pages/home'
import { DesignerPage } from '@/pages/designer'
import { DeveloperPage } from '@/pages/developer'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="orlando-portfolio-theme">
      <SkillProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
            <ClarityAnalytics />
            <Header />
            <main className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/designer" element={<DesignerPage />} />
                <Route path="/developer" element={<DeveloperPage />} />
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
