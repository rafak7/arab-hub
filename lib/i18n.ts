import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import i18n from './i18nInit';

export type Language = 'pt' | 'en' | 'ar';

export const useLanguage = () => {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>('pt');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang) {
      setLanguage(savedLang);
      setIsRTL(savedLang === 'ar');
      document.documentElement.lang = savedLang;
      if (savedLang === 'ar') {
        document.body.classList.add('rtl');
      } else {
        document.body.classList.remove('rtl');
      }
      i18n.changeLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsRTL(newLanguage === 'ar');
    localStorage.setItem('language', newLanguage);
    document.documentElement.lang = newLanguage;
    
    if (newLanguage === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
    
    i18n.changeLanguage(newLanguage).then(() => {
      if (router.locale !== newLanguage) {
        router.push(router.pathname, router.pathname, { locale: newLanguage });
      }
    });
  };

  return { language, isRTL, changeLanguage };
};