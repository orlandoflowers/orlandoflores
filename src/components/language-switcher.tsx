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

  // resolvedLanguage is always one of ours ("en"), unlike language ("en-US")
  const current = i18n.resolvedLanguage ?? "en";

  const getCurrentFlag = () => {
    const currentLang = languages.find(lang => lang.code === current) || languages[0];
    return currentLang.flag;
  };

  const getNextFlag = () => {
    const currentIndex = languages.findIndex(lang => lang.code === current);
    const nextIndex = (currentIndex + 1) % languages.length;
    return languages[nextIndex].flag;
  };

  const cycleLanguage = () => {
    const currentIndex = languages.findIndex(lang => lang.code === current);
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
        : t("language." + current)}
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
          : t("language." + current)}
      </span>
    </Button>
  );

  function getNextLanguageCode() {
    const currentIndex = languages.findIndex(lang => lang.code === current);
    const nextIndex = (currentIndex + 1) % languages.length;
    return languages[nextIndex].code;
  }
} 