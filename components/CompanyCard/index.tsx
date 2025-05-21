import { MouseEvent } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/lib/i18n';
import { Company } from '@/lib/mockData';
import styles from './CompanyCard.module.scss';

interface CompanyCardProps {
  company: Company;
  onConnect: (company: Company) => void;
  onViewProfile: (company: Company) => void;
  isConnected?: boolean;
}

const CompanyCard = ({ company, onConnect, onViewProfile, isConnected = false }: CompanyCardProps) => {
  const { t } = useTranslation('common');
  const { isRTL } = useLanguage();
  
  const handleConnect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onConnect(company);
  };
  
  const handleViewProfile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onViewProfile(company);
  };
  
  // Get country name from code
  const getCountryName = (code: string) => {
    const countryMap: Record<string, string> = {
      'BR': 'Brazil',
      'SA': 'Saudi Arabia',
      'AE': 'UAE',
      'QA': 'Qatar',
      'KW': 'Kuwait',
      'BH': 'Bahrain',
      'OM': 'Oman',
      'EG': 'Egypt',
      'JO': 'Jordan',
      'LB': 'Lebanon'
    };
    
    return countryMap[code] || code;
  };
  
  // Get type display text
  const getTypeText = (type: string) => {
    switch (type) {
      case 'importer': return t('companyRegister.importer');
      case 'exporter': return t('companyRegister.exporter');
      case 'both': return t('companyRegister.both');
      default: return type;
    }
  };
  
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        {company.matchScore && (
          <div className={styles.matchScore}>
            {company.matchScore}% {t('match.title')}
          </div>
        )}
        <div className={styles.countryBadge}>
          {getCountryName(company.country)}
        </div>
        {company.logo ? (
          <Image
            src={company.logo}
            alt={company.name}
            className={styles.logo}
            width={300}
            height={120}
          />
        ) : (
          <div className={styles.logoPlaceholder} />
        )}
      </div>
      
      <div className={styles.cardBody}>
        <h3 className={styles.companyName}>{company.name}</h3>
        <span className={styles.companyType}>{getTypeText(company.type)}</span>
        
        {company.certifications && company.certifications.length > 0 && (
          <div className={styles.certificationList}>
            {company.certifications.map((cert) => (
              <div 
                key={cert} 
                className={`${styles.certification} ${cert === 'halal' ? styles.halal : styles.iso}`}
                title={cert === 'halal' ? 'Halal Certified' : cert.toUpperCase()}
              >
                {cert === 'halal' ? 'H' : 'ISO'}
              </div>
            ))}
          </div>
        )}
        
        {company.description && (
          <p className={styles.description}>{company.description}</p>
        )}
        
        <div className={styles.sectorList}>
          {company.sectors.map((sector) => (
            <span key={sector} className={styles.sector}>
              {t(`sectors.${sector}`)}
            </span>
          ))}
        </div>
      </div>
      
      <div className={styles.cardFooter}>
        <button 
          className={`${styles.actionButton} ${styles.connect}`}
          onClick={handleConnect}
          disabled={isConnected}
        >
          {isConnected ? <Check size={18} /> : t('match.connect')}
        </button>
        <button 
          className={`${styles.actionButton} ${styles.view}`}
          onClick={handleViewProfile}
        >
          {t('match.viewProfile')}
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;