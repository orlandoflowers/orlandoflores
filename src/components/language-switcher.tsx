import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  const languages = [
    { code: "en", flag: "🇬🇧", name: "English" },
    { code: "es", flag: "🇨🇱", name: "Español" },
    { code: "fr", flag: "🇫🇷", name: "Français" },
  ];

  const getCurrentFlag = () => {
    const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];
    return currentLang.flag;
  };

  const getNextFlag = () => {
    const currentIndex = languages.findIndex(lang => lang.code === i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    return languages[nextIndex].flag;
  };

  const cycleLanguage = () => {
    const currentIndex = languages.findIndex(lang => lang.code === i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLangCode = languages[nextIndex].code;
    
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
        : t("language." + (i18n.language || "en"))}
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
          : t("language." + (i18n.language || "en"))}
      </span>
    </Button>
  );

  function getNextLanguageCode() {
    const currentIndex = languages.findIndex(lang => lang.code === i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    return languages[nextIndex].code;
  }
} 