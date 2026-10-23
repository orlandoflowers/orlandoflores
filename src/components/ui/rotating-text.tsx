import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface RotatingTextProps {
  texts: string[]
  className?: string
  /** Delay between each word appearing, in ms */
  stagger?: number
  /** How long a fully shown phrase stays on screen, in ms */
  pauseDuration?: number
}

// Must match the durations in index.css (.rotating-word / .rotating-out)
const WORD_IN_MS = 600
const OUT_MS = 400

// Each phrase is laid out in full from the start, so line breaks never change while it
// animates; the words just fade in one by one, then the whole line fades out.
// Every phrase is also rendered invisibly in the same grid cell, so the box is always as
// tall as the longest phrase at the current width and language, with no fixed heights.
export function RotatingText({ texts, className, stagger = 70, pauseDuration = 2600 }: RotatingTextProps) {
  const [index, setIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)

  const words = (texts[index] ?? "").split(" ")

  useEffect(() => {
    if (texts.length < 2) return
    const shown = words.length * stagger + WORD_IN_MS + pauseDuration
    const timer = setTimeout(
      () => {
        if (leaving) {
          setLeaving(false)
          setIndex((i) => (i + 1) % texts.length)
        } else {
          setLeaving(true)
        }
      },
      leaving ? OUT_MS : shown
    )
    return () => clearTimeout(timer)
  }, [index, leaving, texts.length, words.length, stagger, pauseDuration])

  return (
    <span className={cn("grid", className)}>
      {texts.map((text, i) => (
        <span key={`reserve-${i}`} aria-hidden="true" className="invisible [grid-area:1/1]">
          {text}
        </span>
      ))}
      <span key={index} className={cn("[grid-area:1/1]", leaving && "rotating-out")}>
        {words.map((word, i) => (
          <span key={i}>
            <span className="rotating-word" style={{ animationDelay: `${i * stagger}ms` }}>
              {word}
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </span>
  )
}
