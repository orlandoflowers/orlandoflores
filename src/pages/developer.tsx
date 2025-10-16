import { useTranslation } from "react-i18next"
import { Code2, Terminal, Database, Boxes, GitBranch, Rocket, Zap } from "lucide-react"
import { useState } from "react"

export function DeveloperPage() {
  const { t } = useTranslation()
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  const toggleCard = (cardName: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(cardName)) {
        newSet.delete(cardName)
      } else {
        newSet.add(cardName)
      }
      return newSet
    })
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">{t("developer.title")}</h1>
          <p className="text-xl text-muted-foreground font-mono">
            {t("developer.intro")}
          </p>
        </div>

        {/* Content Sections - Bento Grid (Flipped) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
          {/* Delivery - Large (First, flipped from Impact) */}
          <section 
            className="group/delivery p-6 rounded-2xl border border-green-500/20 bg-white/40 dark:bg-[#1e1e1e] backdrop-blur-xl shadow-lg md:cursor-pointer md:col-span-4"
            onMouseEnter={() => setExpandedCards(prev => new Set(prev).add('delivery'))}
            onClick={() => toggleCard('delivery')}
          >
            <div className="flex flex-col items-start text-left gap-4">
              <div className="p-3 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 group-hover/delivery:bg-green-500 group-hover/delivery:text-white transition-colors flex-shrink-0">
                <Rocket className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 font-mono text-green-600 dark:text-green-400">
                  {t("developer.delivery.title")}
                </h2>
                <p className={`text-muted-foreground leading-relaxed text-sm font-mono opacity-100 md:opacity-0 ${expandedCards.has('delivery') ? 'md:!opacity-100' : ''} transition-opacity duration-300`}>
                  {t("developer.delivery.content")}
                </p>
              </div>
            </div>
          </section>

          {/* Mindset - Regular */}
          <section 
            className="group/mindset p-6 rounded-2xl border border-blue-500/20 bg-white/40 dark:bg-[#1e1e1e] backdrop-blur-xl shadow-lg md:cursor-pointer md:col-span-1"
            onMouseEnter={() => setExpandedCards(prev => new Set(prev).add('mindset'))}
            onClick={() => toggleCard('mindset')}
          >
            <div className="flex flex-col items-start text-left gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover/mindset:bg-blue-500 group-hover/mindset:text-white transition-colors flex-shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 font-mono text-blue-600 dark:text-blue-400">
                  {t("developer.mindset.title")}
                </h2>
                <p className={`text-muted-foreground leading-relaxed text-sm font-mono opacity-100 md:opacity-0 ${expandedCards.has('mindset') ? 'md:!opacity-100' : ''} transition-opacity duration-300`}>
                  {t("developer.mindset.content")}
                </p>
              </div>
            </div>
          </section>

          {/* Backend - Wide */}
          <section 
            className="group/backend p-6 rounded-2xl border border-purple-500/20 bg-white/40 dark:bg-[#1e1e1e] backdrop-blur-xl shadow-lg md:cursor-pointer md:col-span-2"
            onMouseEnter={() => setExpandedCards(prev => new Set(prev).add('backend'))}
            onClick={() => toggleCard('backend')}
          >
            <div className="flex flex-col items-start text-left gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover/backend:bg-purple-500 group-hover/backend:text-white transition-colors flex-shrink-0">
                <Database className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 font-mono text-purple-600 dark:text-purple-400">
                  {t("developer.backend.title")}
                </h2>
                <p className={`text-muted-foreground leading-relaxed text-sm font-mono opacity-100 md:opacity-0 ${expandedCards.has('backend') ? 'md:!opacity-100' : ''} transition-opacity duration-300`}>
                  {t("developer.backend.content")}
                </p>
              </div>
            </div>
          </section>

          {/* Frontend - Regular */}
          <section 
            className="group/frontend p-6 rounded-2xl border border-cyan-500/20 bg-white/40 dark:bg-[#1e1e1e] backdrop-blur-xl shadow-lg md:cursor-pointer md:col-span-1"
            onMouseEnter={() => setExpandedCards(prev => new Set(prev).add('frontend'))}
            onClick={() => toggleCard('frontend')}
          >
            <div className="flex flex-col items-start text-left gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover/frontend:bg-cyan-500 group-hover/frontend:text-white transition-colors flex-shrink-0">
                <Code2 className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 font-mono text-cyan-600 dark:text-cyan-400">
                  {t("developer.frontend.title")}
                </h2>
                <p className={`text-muted-foreground leading-relaxed text-sm font-mono opacity-100 md:opacity-0 ${expandedCards.has('frontend') ? 'md:!opacity-100' : ''} transition-opacity duration-300`}>
                  {t("developer.frontend.content")}
                </p>
              </div>
            </div>
          </section>

          {/* Products - Regular */}
          <section 
            className="group/products p-6 rounded-2xl border border-yellow-500/20 bg-white/40 dark:bg-[#1e1e1e] backdrop-blur-xl shadow-lg md:cursor-pointer md:col-span-1"
            onMouseEnter={() => setExpandedCards(prev => new Set(prev).add('products'))}
            onClick={() => toggleCard('products')}
          >
            <div className="flex flex-col items-start text-left gap-4">
              <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 group-hover/products:bg-yellow-500 group-hover/products:text-white transition-colors flex-shrink-0">
                <Boxes className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 font-mono text-yellow-600 dark:text-yellow-400">
                  {t("developer.products.title")}
                </h2>
                <p className={`text-muted-foreground leading-relaxed text-sm font-mono opacity-100 md:opacity-0 ${expandedCards.has('products') ? 'md:!opacity-100' : ''} transition-opacity duration-300`}>
                  {t("developer.products.content")}
                </p>
              </div>
            </div>
          </section>

          {/* Approach - Regular */}
          <section 
            className="group/approach p-6 rounded-2xl border border-orange-500/20 bg-white/40 dark:bg-[#1e1e1e] backdrop-blur-xl shadow-lg md:cursor-pointer md:col-span-1"
            onMouseEnter={() => setExpandedCards(prev => new Set(prev).add('approach'))}
            onClick={() => toggleCard('approach')}
          >
            <div className="flex flex-col items-start text-left gap-4">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover/approach:bg-orange-500 group-hover/approach:text-white transition-colors flex-shrink-0">
                <GitBranch className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 font-mono text-orange-600 dark:text-orange-400">
                  {t("developer.approach.title")}
                </h2>
                <p className={`text-muted-foreground leading-relaxed text-sm font-mono opacity-100 md:opacity-0 ${expandedCards.has('approach') ? 'md:!opacity-100' : ''} transition-opacity duration-300`}>
                  {t("developer.approach.content")}
                </p>
              </div>
            </div>
          </section>

          {/* Stack - Wide */}
          <section 
            className="group/stack p-6 rounded-2xl border border-emerald-500/20 bg-white/40 dark:bg-[#1e1e1e] backdrop-blur-xl shadow-lg md:cursor-pointer md:col-span-2"
            onMouseEnter={() => setExpandedCards(prev => new Set(prev).add('stack'))}
            onClick={() => toggleCard('stack')}
          >
            <div className="flex flex-col items-start text-left gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover/stack:bg-emerald-500 group-hover/stack:text-white transition-colors flex-shrink-0">
                <Terminal className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 font-mono text-emerald-600 dark:text-emerald-400">
                  {t("developer.stack.title")}
                </h2>
                <p className={`text-muted-foreground leading-relaxed text-sm font-mono opacity-100 md:opacity-0 ${expandedCards.has('stack') ? 'md:!opacity-100' : ''} transition-opacity duration-300`}>
                  {t("developer.stack.content")}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
