'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Building, PlusCircle, MapPin, Users, Award, Edit, ExternalLink } from 'lucide-react';
import { User, Company, mockUser, getConnections, getSuggestedConnections } from '@/lib/mockData';
import CompanyCard from '../CompanyCard';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const { t } = useTranslation('common');
  const [user, setUser] = useState<User | null>(null);
  const [connections, setConnections] = useState<Company[]>([]);
  const [suggestions, setSuggestions] = useState<Company[]>([]);
  
  useEffect(() => {
    // Attempt to get user from localStorage
    const userData = localStorage.getItem('user');
    
    if (userData) {
      // Parse user data from localStorage
      const parsedUser = JSON.parse(userData);
      setUser({
        ...mockUser,
        ...parsedUser
      });
    } else {
      // Use mock user data if no user in localStorage
      setUser(mockUser);
    }
  }, []);
  
  useEffect(() => {
    if (user) {
      // Get connections
      const userConnections = getConnections(user);
      setConnections(userConnections);
      
      // Get suggested connections apenas se o usuário tiver uma empresa
      if (user.company) {
        const userSuggestions = getSuggestedConnections(user, 6);
        setSuggestions(userSuggestions);
      }
    }
  }, [user]);
  
  const handleConnect = (company: Company) => {
    if (user) {
      // Add connection
      const updatedConnections = [...user.connections, company.id];
      
      // Update user state
      setUser({
        ...user,
        connections: updatedConnections,
      });
      
      // Update connections list
      setConnections([...connections, company]);
      
      // Remove from suggestions
      setSuggestions(suggestions.filter(suggestion => suggestion.id !== company.id));
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify({
        ...user,
        connections: updatedConnections,
      }));
    }
  };
  
  const handleViewProfile = (company: Company) => {
    // In a real app, this would navigate to the company profile
    console.log('View profile:', company);
    
    // For demo purposes, just alert
    alert(`Viewing profile for ${company.name}`);
  };
  
  const getMatchReason = (company: Company): string => {
    // Determina o motivo principal do match baseado em fatores chave
    if (!user?.company) return '';
    
    // Verifica se o tipo é complementar (importador x exportador)
    if (
      (user.company.type === 'importer' && company.type === 'exporter') ||
      (user.company.type === 'exporter' && company.type === 'importer')
    ) {
      const commonSectors = user.company.sectors.filter(sector => 
        company.sectors.includes(sector)
      );
      
      if (commonSectors.length > 0) {
        return `${t(`companyRegister.${company.type}`)} de ${t(`sectors.${commonSectors[0]}`)}`;
      }
      
      return t(`companyRegister.${company.type}`);
    }
    
    // Caso não seja complementar em tipo, verifica setores em comum
    const commonSectors = user.company.sectors.filter(sector => 
      company.sectors.includes(sector)
    );
    
    if (commonSectors.length > 0) {
      return `${t('dashboard.sector')}: ${t(`sectors.${commonSectors[0]}`)}`;
    }
    
    // Por fim, verifica certificações em comum
    const commonCerts = user.company.certifications.filter(cert => 
      company.certifications.includes(cert)
    );
    
    if (commonCerts.length > 0 && commonCerts.includes('halal')) {
      return t('dashboard.halalCertification');
    }
    
    if (commonCerts.length > 0) {
      return `${t('dashboard.certification')}: ${commonCerts[0].toUpperCase()}`;
    }
    
    return t('dashboard.businessOpportunity');
  };
  
  if (!user) {
    return <div>{t('common.loading')}</div>;
  }
  
  // Verifica se o usuário tem uma empresa cadastrada
  const hasCompany = !!user.company;
  
  // Helper function to get country name
  const getCountryName = (code: string) => {
    return t(`countries.${code}`);
  };
  
  // Helper function to get company type display text
  const getCompanyTypeText = (type: string) => {
    return t(`companyRegister.${type}`);
  };
  
  // Helper function to get sector name
  const getSectorName = (sector: string) => {
    return t(`sectors.${sector}`);
  };
  
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.heading}>{t('dashboard.title')}</h1>
      </div>
      
      {!hasCompany ? (
        <div className={styles.noCompanyCard}>
          <div className={styles.noCompanyIcon}>
            <Building size={48} />
          </div>
          <h2 className={styles.noCompanyTitle}>{t('dashboard.registerCompany')}</h2>
          <p className={styles.noCompanyText}>
            {t('dashboard.registerCompanyDescription')}
          </p>
          <Link href="/company-register" className={styles.registerCompanyButton}>
            <PlusCircle size={20} />
            <span>{t('dashboard.registerCompanyButton')}</span>
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.welcomeCard}>
            <div className={styles.welcomeContent}>
              <h2 className={styles.welcomeTitle}>
                {t('dashboard.title')}, {user.name}
              </h2>
              <p className={styles.welcomeText}>
                {t('dashboard.welcomeMessage')}
              </p>
              <Link href="/match" className={styles.welcomeButton}>
                {t('match.title')}
              </Link>
            </div>
          </div>
          
          {/* Minha Empresa Section */}
          <div className={styles.myCompanySection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <Building size={20} className={styles.sectionIcon} />
                <span>{t('dashboard.myCompany')}</span>
              </h2>
              <Link href="/company-profile" className={styles.viewAllLink}>
                <span>{t('dashboard.viewFullProfile')}</span>
                <ExternalLink size={16} />
              </Link>
            </div>
            
            <div className={styles.myCompanyCard}>
              <div className={styles.myCompanyHeader}>
                <div className={styles.logoContainer}>
                  {user.company?.logo ? (
                    <img 
                      src={user.company.logo} 
                      alt={t('dashboard.companyLogoAlt', { name: user.company.name })} 
                      className={styles.companyLogo} 
                    />
                  ) : (
                    <div className={styles.logoPlaceholder}>
                      <Building size={36} />
                    </div>
                  )}
                </div>
                
                <div className={styles.companyInfo}>
                  <h3 className={styles.companyName}>{user.company?.name}</h3>
                  <div className={styles.companyMeta}>
                    <div className={styles.metaItem}>
                      <MapPin size={14} />
                      <span>{getCountryName(user.company?.country || '')}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <Users size={14} />
                      <span>{getCompanyTypeText(user.company?.type || '')}</span>
                    </div>
                  </div>
                  
                  <Link href="/company-edit" className={styles.editProfileButton}>
                    <Edit size={14} />
                    <span>{t('dashboard.editProfile')}</span>
                  </Link>
                </div>
              </div>
              
              <div className={styles.myCompanyDetails}>
                <div className={styles.detailSection}>
                  <h4 className={styles.detailTitle}>{t('dashboard.sectorsTitle')}</h4>
                  <div className={styles.sectorsList}>
                    {user.company?.sectors.slice(0, 3).map((sector) => (
                      <div key={sector} className={styles.sectorTag}>
                        {getSectorName(sector)}
                      </div>
                    ))}
                    {user.company?.sectors && user.company.sectors.length > 3 && (
                      <div className={styles.moreSectors}>
                        +{(user.company.sectors.length - 3)} {t('common.more')}
                      </div>
                    )}
                  </div>
                </div>
                
                {user.company?.certifications && user.company?.certifications.length > 0 && (
                  <div className={styles.detailSection}>
                    <h4 className={styles.detailTitle}>{t('dashboard.certificationsTitle')}</h4>
                    <div className={styles.certificationsList}>
                      {user.company?.certifications.slice(0, 2).map((cert) => (
                        <div 
                          key={cert} 
                          className={`${styles.certBadge} ${cert === 'halal' ? styles.halal : styles.standard}`}
                        >
                          {cert === 'halal' ? t('companyRegister.halal') : cert.toUpperCase()}
                        </div>
                      ))}
                      {user.company?.certifications.length > 2 && (
                        <div className={styles.moreCerts}>
                          +{user.company?.certifications.length - 2} {t('common.more')}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>{t('dashboard.connections')}</h3>
              <p className={styles.statValue}>{connections.length}</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>{t('dashboard.views')}</h3>
              <p className={styles.statValue}>{user.profileViews}</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>{t('match.title')}</h3>
              <p className={styles.statValue}>{suggestions.length}</p>
            </div>
          </div>
          
          {/* Connections Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('dashboard.connections')}</h2>
              <Link href="/connections" className={styles.viewAllLink}>
                {t('dashboard.viewAll')}
              </Link>
            </div>
            
            {connections.length === 0 ? (
              <div className={styles.emptyState}>
                <p className={styles.message}>{t('dashboard.noConnectionsYet')}</p>
                <Link href="/match" className={styles.action}>
                  {t('match.title')}
                </Link>
              </div>
            ) : (
              <div className={styles.connectionsGrid}>
                {connections.slice(0, 3).map((company) => (
                  <CompanyCard
                    key={company.id}
                    company={company}
                    onConnect={handleConnect}
                    onViewProfile={handleViewProfile}
                    isConnected={true}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Suggestions Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('dashboard.suggestions')}</h2>
              <Link href="/match" className={styles.viewAllLink}>
                <span>{t('dashboard.viewAll')}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            
            {suggestions.length === 0 ? (
              <div className={styles.emptyState}>
                <p className={styles.message}>{t('dashboard.noSuggestionsAvailable')}</p>
              </div>
            ) : (
              <>
                <div className={styles.matchExplanation}>
                  {t('dashboard.suggestionsExplanation')}
                </div>
                <div className={styles.suggestionsGrid}>
                  {suggestions.map((company) => (
                    <div key={company.id} className={styles.suggestionCard}>
                      <div className={styles.matchReason}>
                        <span className={styles.matchReasonIcon}>✓</span>
                        <span className={styles.matchReasonText}>{getMatchReason(company)}</span>
                      </div>
                      <CompanyCard
                        company={company}
                        onConnect={handleConnect}
                        onViewProfile={handleViewProfile}
                        isConnected={false}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;