import { createContext, useContext, useState, ReactNode } from "react"

// Translation keys for skills
export const skillKeys = [
  "skills.designUXUI",
  "skills.developReact",
  "skills.developIntegral",
  "skills.other",
]

type SkillContextType = {
  selectedSkills: string[]
  toggleSkill: (skill: string) => void
}

const SkillContext = createContext<SkillContextType | undefined>(undefined)

export function SkillProvider({ children }: { children: ReactNode }) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills([])
    } else {
      setSelectedSkills([skill])
    }
  }

  return (
    <SkillContext.Provider value={{ selectedSkills, toggleSkill }}>
      {children}
    </SkillContext.Provider>
  )
}

export function useSkills() {
  const context = useContext(SkillContext)
  if (context === undefined) {
    throw new Error("useSkills must be used within a SkillProvider")
  }
  return context
} 