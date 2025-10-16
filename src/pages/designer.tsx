import { useTranslation } from "react-i18next"
import { Palette, Lightbulb, Target, Wrench, Users, TrendingUp, BookOpen } from "lucide-react"
import { useState } from "react"

export function DesignerPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("designer.title")}</h1>
          <p className="text-xl text-muted-foreground">
            {t("designer.intro")}
          </p>
        </div>

        {/* Content Sections - Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
          {/* Philosophy - Wide */}
          <section 
            className="group/philosophy p-6 rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-xl shadow-lg md:cursor-pointer md:col-span-2"
            onMouseEnter={() => setExpandedCards(prev => new Set(prev).add('philosophy'))}
            onClick={() => toggleCard('philosophy')}
          >
            <div className="flex flex-col items-start text-left gap-4">
              <div className="p-3 rounded-xl bg-black/5 text-foreground group-hover/philosophy:bg-black/10 transition-colors flex-shrink-0">
                <Palette className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  {t("designer.philosophy.title")}
                </h2>
                <p className={`text-muted-foreground leading-relaxed text-sm opacity-100 md:opacity-0 ${expandedCards.has('philosophy') ? 'md:!opacity-100' : ''} transition-opacity duration-300`}>
                  {t("designer.philosophy.content")}
                </p>
              </div>
            </div>
          </section>

          {/* Process - Regular */}
          <section 
            className="group/process p-6 rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-xl shadow-lg md:cursor-pointer md:col-span-1"
            onMouseEnter={() => setExpandedCards(prev => new Set(prev).add('process'))}
            onClick={() => toggleCard('process')}
          >
            <div className="flex flex-col items-start text-left gap-4">
              <div className="p-3 rounded-xl bg-black/5 text-foreground group-hover/process:bg-black/10 transition-colors flex-shrink-0">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  {t("designer.process.title")}
                </h2>
                <p className={`text-muted-foreground leading-relaxed text-sm opacity-100 md:opacity-0 ${expandedCards.has('process') ? 'md:!opacity-100' : ''} transition-opacity duration-300`}>
                  {t("designer.process.content")}
                </p>
              </div>
            </div>
          </section>

          {/* Vision - Regular */}
          <section 
            className="group/vision p-6 rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-xl shadow-lg md:cursor-pointer md:col-span-1"
            onMouseEnter={() => setExpandedCards(prev => new Set(prev).add('vision'))}
            onClick={() => toggleCard('vision')}
          >
            <div className="flex flex-col items-start text-left gap-4">
              <div className="p-3 rounded-xl bg-black/5 text-foreground group-hover/vision:bg-black/10 transition-colors flex-shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  {t("designer.vision.title")}
                </h2>
                <p className={`text-muted-foreground leading-relaxed text-sm opacity-100 md:opacity-0 ${expandedCards.has('vision') ? 'md:!opacity-100' : ''} transition-opacity duration-300`}>
                  {t("designer.vision.content")}
                </p>
              </div>
            </div>
          </section>

          {/* Tools - Regular */}
          <section 
            className="group/tools p-6 rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-xl shadow-lg md:cursor-pointer md:col-span-1"
            onMouseEnter={() => setExpandedCards(prev => new Set(prev).add('tools'))}
            onClick={() => toggleCard('tools')}
          >
            <div className="flex flex-col items-start text-left gap-4">
              <div className="p-3 rounded-xl bg-black/5 text-foreground group-hover/tools:bg-black/10 transition-colors flex-shrink-0">
                <Wrench className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  {t("designer.tools.title")}
                </h2>
                <p className={`text-muted-foreground leading-relaxed text-sm opacity-100 md:opacity-0 ${expandedCards.has('tools') ? 'md:!opacity-100' : ''} transition-opacity duration-300`}>
                  {t("designer.tools.content")}
                </p>
              </div>
            </div>
          </section>

          {/* Collaboration - Wide */}
          <section 
            className="group/collaboration p-6 rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-xl shadow-lg md:cursor-pointer md:col-span-2"
            onMouseEnter={() => setExpandedCards(prev => new Set(prev).add('collaboration'))}
            onClick={() => toggleCard('collaboration')}
          >
            <div className="flex flex-col items-start text-left gap-4">
              <div className="p-3 rounded-xl bg-black/5 text-foreground group-hover/collaboration:bg-black/10 transition-colors flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  {t("designer.collaboration.title")}
                </h2>
                <p className={`text-muted-foreground leading-relaxed text-sm opacity-100 md:opacity-0 ${expandedCards.has('collaboration') ? 'md:!opacity-100' : ''} transition-opacity duration-300`}>
                  {t("designer.collaboration.content")}
                </p>
              </div>
            </div>
          </section>

          {/* Learning - Regular */}
          <section 
            className="group/learning p-6 rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-xl shadow-lg md:cursor-pointer md:col-span-1"
            onMouseEnter={() => setExpandedCards(prev => new Set(prev).add('learning'))}
            onClick={() => toggleCard('learning')}
          >
            <div className="flex flex-col items-start text-left gap-4">
              <div className="p-3 rounded-xl bg-black/5 text-foreground group-hover/learning:bg-black/10 transition-colors flex-shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  {t("designer.learning.title")}
                </h2>
                <p className={`text-muted-foreground leading-relaxed text-sm opacity-100 md:opacity-0 ${expandedCards.has('learning') ? 'md:!opacity-100' : ''} transition-opacity duration-300`}>
                  {t("designer.learning.content")}
                </p>
              </div>
            </div>
          </section>

          {/* Impact - Large (Last) */}
          <section 
            className="group/impact p-6 rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-xl shadow-lg md:cursor-pointer md:col-span-4"
            onMouseEnter={() => setExpandedCards(prev => new Set(prev).add('impact'))}
            onClick={() => toggleCard('impact')}
          >
            <div className="flex flex-col items-start text-left gap-4">
              <div className="p-3 rounded-xl bg-black/5 text-foreground group-hover/impact:bg-black/10 transition-colors flex-shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  {t("designer.impact.title")}
                </h2>
                <p className={`text-muted-foreground leading-relaxed text-sm opacity-100 md:opacity-0 ${expandedCards.has('impact') ? 'md:!opacity-100' : ''} transition-opacity duration-300`}>
                  {t("designer.impact.content")}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
