import { appWithTranslation } from 'next-i18next';
import Layout from '@/components/Layout';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import i18n from '../lib/i18nInit';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Carrega o idioma salvo no localStorage
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      
      // Configura a direção do texto para RTL se for árabe
      if (savedLang === 'ar') {
        document.body.classList.add('rtl');
      } else {
        document.body.classList.remove('rtl');
      }
    }
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp);