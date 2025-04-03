import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSkills } from "@/lib/skill-context"

export function Contact() {
  const { selectedSkills } = useSkills()
  
  return (
    <section id="contact" className="py-20 bg-black text-white md:hidden">
      <div className="container">
        <div className="flex justify-center pb-10">
          <h2 className="text-4xl font-bold">Contact</h2>
        </div>
        
        {selectedSkills.length > 0 && (
          <div className="max-w-3xl mx-auto mb-10">
            <p className="text-center mb-6 text-gray-300">You selected these skills:</p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {selectedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="default"
                  className="px-3 py-1 rounded-full text-sm bg-white text-black"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="max-w-3xl mx-auto">
          <Button asChild size="lg" className="rounded-full px-8 w-full bg-white text-black hover:bg-white/90">
            <a href="mailto:of@orlandoflores.com">Contact Me</a>
          </Button>
        </div>
      </div>
    </section>
  )
} 