import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [currentLangCode, setCurrentLangCode] = useState(i18n.language);
  const [isHovered, setIsHovered] = useState(false);

  // ¡Sincronizando la weá! Como cuando tratai de bailar cueca pero tení dos pies izquierdos 🪗
  useEffect(() => {
    setCurrentLangCode(i18n.language);
  }, [i18n.language]);

  const languages = [
    { code: "en", flag: "🇬🇧", name: "English" },
    { code: "es", flag: "🇨🇱", name: "Español" },
    { code: "fr", flag: "🇫🇷", name: "Français" },
  ];

  const getCurrentFlag = () => {
    const currentLang = languages.find(lang => lang.code === currentLangCode) || languages[0];
    return currentLang.flag;
  };

  const getNextFlag = () => {
    const currentIndex = languages.findIndex(lang => lang.code === currentLangCode);
    const nextIndex = (currentIndex + 1) % languages.length;
    return languages[nextIndex].flag;
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
      className="text-lg relative overflow-hidden" 
      onClick={cycleLanguage}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={isHovered 
        ? t(`language.switch_to_${getNextLanguageCode()}`) 
        : t("language." + (currentLangCode || "en"))}
    >
      <span className={`transition-transform duration-300 ${isHovered ? 'scale-0' : 'scale-100'}`}>
        {getCurrentFlag()}
      </span>
      <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isHovered ? 'scale-100' : 'scale-0'}`}>
        {getNextFlag()}
      </span>
      <span className="sr-only">
        {isHovered 
          ? t(`language.switch_to_${getNextLanguageCode()}`) 
          : t("language." + (currentLangCode || "en"))}
      </span>
    </Button>
  );

  function getNextLanguageCode() {
    const currentIndex = languages.findIndex(lang => lang.code === currentLangCode);
    const nextIndex = (currentIndex + 1) % languages.length;
    return languages[nextIndex].code;
  }
} 