// Soft holographic sheen for cards and buttons, adapted from the vgpu "holographic-card"
// example: a pointer-tracked light spot, a faint pearlescent band, and (opt-in) a gentle
// tilt toward the pointer. The example renders one WebGPU canvas; here the same ideas run
// as CSS on regular DOM, driven by a single delegated listener. Styles live in index.css.

const HOLO = ".holo, .pf-card, .pf-btn"
const MAX_TILT_DEG = 5 // the example tilts up to ~9°; kept softer here

export function installHolo(): () => void {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
  let active: HTMLElement | null = null
  let frame = 0
  let last: PointerEvent | null = null

  const reset = (el: HTMLElement) => {
    el.removeAttribute("data-holo-on")
    el.style.removeProperty("--holo-rx")
    el.style.removeProperty("--holo-ry")
  }

  const update = () => {
    frame = 0
    const event = last
    if (!event) return
    const target = (event.target as Element | null)?.closest<HTMLElement>(HOLO) ?? null
    if (target !== active) {
      if (active) reset(active)
      active = target
    }
    if (!active) return

    const rect = active.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    active.setAttribute("data-holo-on", "")
    active.style.setProperty("--holo-x", `${x * 100}%`)
    active.style.setProperty("--holo-y", `${y * 100}%`)

    // Like the example, tilt only follows the pointer when motion is allowed
    if (active.hasAttribute("data-tilt") && !motion.matches) {
      active.style.setProperty("--holo-rx", `${(0.5 - y) * 2 * MAX_TILT_DEG}deg`)
      active.style.setProperty("--holo-ry", `${(x - 0.5) * 2 * MAX_TILT_DEG}deg`)
    }
  }

  const move = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return
    last = event
    if (!frame) frame = requestAnimationFrame(update)
  }

  const leave = () => {
    last = null
    if (active) reset(active)
    active = null
  }

  document.addEventListener("pointermove", move, { passive: true })
  document.documentElement.addEventListener("pointerleave", leave)
  window.addEventListener("blur", leave)

  // Mirrors the example's dispose(): remove every listener and pending frame
  return () => {
    cancelAnimationFrame(frame)
    document.removeEventListener("pointermove", move)
    document.documentElement.removeEventListener("pointerleave", leave)
    window.removeEventListener("blur", leave)
    if (active) reset(active)
  }
}
