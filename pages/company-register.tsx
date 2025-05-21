import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Building, BarChart, Globe, Handshake } from 'lucide-react';
import CompanyForm from '@/components/CompanyForm';
import styles from '@/styles/CompanyRegister.module.scss';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function CompanyRegisterPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      router.push('/login');
    }
    
    // Check if user already has a company
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.company) {
        router.push('/dashboard');
      }
    }
  }, [router]);
  
  return (
    <>
      <Head>
        <title>Cadastro de Empresa - Arab-Brazil Business Hub</title>
        <meta name="description" content="Cadastre sua empresa no Arab-Brazil Business Hub e encontre oportunidades de negócios" />
      </Head>
      
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.infoSection}>
            <div className={styles.infoHeader}>
              <Building size={32} className={styles.headerIcon} />
              <h2>Por que cadastrar sua empresa?</h2>
            </div>
            
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <Globe size={24} className={styles.benefitIcon} />
                <div className={styles.benefitText}>
                  <h3>Alcance Global</h3>
                  <p>Conecte-se com empresas do Brasil e do mundo árabe</p>
                </div>
              </div>
              
              <div className={styles.benefitItem}>
                <BarChart size={24} className={styles.benefitIcon} />
                <div className={styles.benefitText}>
                  <h3>Matches Inteligentes</h3>
                  <p>Nosso algoritmo encontra os parceiros ideais para seu negócio</p>
                </div>
              </div>
              
              <div className={styles.benefitItem}>
                <Handshake size={24} className={styles.benefitIcon} />
                <div className={styles.benefitText}>
                  <h3>Novas Oportunidades</h3>
                  <p>Descubra novos mercados e expanda seus negócios</p>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialsSection}>
              <blockquote className={styles.testimonial}>
                "O Arab-Brazil Business Hub nos ajudou a encontrar parceiros comerciais ideais no Oriente Médio, expandindo nossa exportação em 30%."
                <footer>
                  <strong>João Silva</strong>, Café do Brasil
                </footer>
              </blockquote>
            </div>
            
            <div className={styles.imageSection}>
              <Image 
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" 
                alt="Parceria de negócios" 
                width={400} 
                height={300} 
                className={styles.partnershipImage}
              />
            </div>
          </div>
          
          <div className={styles.formSection}>
            <CompanyForm />
          </div>
        </div>
      </div>
    </>
  );
}