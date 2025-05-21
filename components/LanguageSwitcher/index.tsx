'use client';

import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';
import { Language, useLanguage } from '@/lib/i18n';
import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher = () => {
  const { t } = useTranslation('common');
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'pt', name: t('language.pt'), flag: '🇧🇷' },
    { code: 'en', name: t('language.en'), flag: '🇺🇸' },
    { code: 'ar', name: t('language.ar'), flag: '🇸🇦' },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (langCode: Language) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      <button className={styles.switcherButton} onClick={toggleDropdown}>
        {currentLanguage?.flag} {currentLanguage?.name}
        <span className={styles.icon}>
          <ChevronDown size={16} />
        </span>
      </button>
      <div className={classNames(styles.dropdown, { [styles.open]: isOpen })}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={classNames(styles.languageOption, {
              [styles.active]: language === lang.code,
            })}
            onClick={() => handleLanguageChange(lang.code)}
          >
            <span className={styles.flag}>{lang.flag}</span>
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;