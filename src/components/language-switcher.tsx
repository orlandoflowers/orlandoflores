import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [currentLangCode, setCurrentLangCode] = useState(i18n.language);

  // ¡Sincronizando la weá! Como cuando tratai de bailar cueca pero tení dos pies izquierdos 🪗
  useEffect(() => {
    setCurrentLangCode(i18n.language);
  }, [i18n.language]);

  const languages = [
    { code: "en", flag: "🇬🇧" },
    { code: "es", flag: "🇨🇱" },
    { code: "fr", flag: "🇫🇷" },
  ];

  const getCurrentFlag = () => {
    const currentLang = languages.find(lang => lang.code === currentLangCode) || languages[0];
    return currentLang.flag;
  };

  const cycleLanguage = () => {
    const currentIndex = languages.findIndex(lang => lang.code === currentLangCode);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLangCode = languages[nextIndex].code;
    
    // ¡Le hacemos la psicológica al cerebro! Cambiamos la weá antes que se dé cuenta 🧠
    setCurrentLangCode(nextLangCode);
    // ¡Saltando entre idiomas po! Como pasar de flaite a cuico en un segundo 🚀
    i18n.changeLanguage(nextLangCode);
  };
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="text-lg" 
      onClick={cycleLanguage}
      title={t("language." + (currentLangCode || "en"))}
    >
      {getCurrentFlag()}
      <span className="sr-only">
        {t("language." + (currentLangCode || "en"))}
      </span>
    </Button>
  );
} 