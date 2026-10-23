import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// New pages open at the top; hash links (e.g. /portfolio#socratia) scroll themselves
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
