import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Building, Users, MapPin, Award, Tag, BarChart2, Edit } from 'lucide-react';
import Link from 'next/link';
import { Company } from '@/lib/mockData';
import styles from '@/styles/CompanyProfile.module.scss';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function CompanyProfilePage() {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    // Get user company data
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      
      if (user.company) {
        setCompany(user.company);
      } else {
        // If user doesn't have a company, redirect to company registration
        router.push('/company-register');
      }
    }
    
    setLoading(false);
  }, [router]);
  
  // Helper function to get country name
  const getCountryName = (code: string) => {
    const countryMap: Record<string, string> = {
      'BR': 'Brasil',
      'SA': 'Arábia Saudita',
      'AE': 'Emirados Árabes Unidos',
      'QA': 'Catar',
      'KW': 'Kuwait',
      'BH': 'Barein',
      'OM': 'Omã',
      'EG': 'Egito',
      'JO': 'Jordânia',
      'LB': 'Líbano'
    };
    
    return countryMap[code] || code;
  };
  
  // Helper function to get company type display text
  const getCompanyTypeText = (type: string) => {
    switch (type) {
      case 'importer': return 'Importadora';
      case 'exporter': return 'Exportadora';
      case 'both': return 'Importadora e Exportadora';
      default: return type;
    }
  };
  
  // Helper function to get sector name
  const getSectorName = (sector: string) => {
    const sectorMap: Record<string, string> = {
      'agriculture': 'Agricultura',
      'food': 'Alimentos e Bebidas',
      'textile': 'Têxtil',
      'technology': 'Tecnologia',
      'construction': 'Construção',
      'manufacturing': 'Manufatura',
      'healthcare': 'Saúde',
      'energy': 'Energia',
      'tourism': 'Turismo'
    };
    
    return sectorMap[sector] || sector;
  };
  
  // Helper function to get certification display name
  const getCertificationName = (cert: string) => {
    switch (cert) {
      case 'halal': return 'Halal';
      case 'iso9001': return 'ISO 9001';
      case 'iso14001': return 'ISO 14001';
      case 'iso22000': return 'ISO 22000';
      case 'haccp': return 'HACCP';
      case 'gmp': return 'GMP';
      case 'other': return 'Outra';
      default: return cert;
    }
  };
  
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Carregando perfil da empresa...</p>
      </div>
    );
  }
  
  if (!company) {
    return null;
  }
  
  return (
    <>
      <Head>
        <title>Perfil da Empresa - {company.name}</title>
        <meta name="description" content={`Perfil da empresa ${company.name} no Arab-Brazil Business Hub`} />
      </Head>
      
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.logoContainer}>
              {company.logo ? (
                <img 
                  src={company.logo} 
                  alt={`Logo de ${company.name}`} 
                  className={styles.companyLogo} 
                />
              ) : (
                <div className={styles.logoPlaceholder}>
                  <Building size={48} />
                </div>
              )}
            </div>
            
            <div className={styles.companyInfo}>
              <h1 className={styles.companyName}>{company.name}</h1>
              <div className={styles.companyMeta}>
                <div className={styles.metaItem}>
                  <MapPin size={16} />
                  <span>{getCountryName(company.country)}</span>
                </div>
                <div className={styles.metaItem}>
                  <Users size={16} />
                  <span>{getCompanyTypeText(company.type)}</span>
                </div>
              </div>
              
              <Link href="/company-edit" className={styles.editButton}>
                <Edit size={14} />
                <span>Editar Perfil</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <Tag size={20} />
                <span>Setores de Atuação</span>
              </h2>
              <div className={styles.sectorsList}>
                {company.sectors.map((sector) => (
                  <div key={sector} className={styles.sectorTag}>
                    {getSectorName(sector)}
                  </div>
                ))}
              </div>
            </div>
            
            {company.certifications && company.certifications.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <Award size={20} />
                  <span>Certificações</span>
                </h2>
                <div className={styles.certificationsList}>
                  {company.certifications.map((cert) => (
                    <div 
                      key={cert} 
                      className={`${styles.certBadge} ${cert === 'halal' ? styles.halal : styles.standard}`}
                    >
                      {getCertificationName(cert)}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {company.description && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <Building size={20} />
                  <span>Sobre a Empresa</span>
                </h2>
                <p className={styles.description}>{company.description}</p>
              </div>
            )}
          </div>
          
          <div className={styles.sidebar}>
            <div className={styles.statsCard}>
              <h3 className={styles.statsTitle}>Estatísticas de Match</h3>
              
              <div className={styles.statsContent}>
                <div className={styles.statItem}>
                  <div className={styles.statIcon}>
                    <BarChart2 size={20} />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>3</span>
                    <span className={styles.statLabel}>Empresas Compatíveis</span>
                  </div>
                </div>
                
                <div className={styles.statItem}>
                  <div className={styles.statIcon}>
                    <Users size={20} />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>0</span>
                    <span className={styles.statLabel}>Conexões</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.actionArea}>
                <Link href="/match" className={styles.matchButton}>
                  Encontrar Parceiros
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 