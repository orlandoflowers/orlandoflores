import { useEffect } from 'react';

declare global {
  interface Window {
    clarity: any;
  }
}

export function ClarityAnalytics() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://www.clarity.ms/tag/123456789";
  
    document.head.appendChild(script);
  
  }, []);
  
  return null;
} 