'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Search, RefreshCcw, Info } from 'lucide-react';
import Link from 'next/link';
import { 
  Company, 
  User, 
  mockCompanies, 
  countries, 
  sectors, 
  filterCompanies, 
  calculateMatchScore
} from '@/lib/mockData';
import CompanyCard from '../CompanyCard';
import styles from './MatchList.module.scss';

const MatchList = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [connections, setConnections] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [filters, setFilters] = useState({
    country: '',
    sector: '',
    type: '',
  });
  const [showMatchInfo, setShowMatchInfo] = useState(false);
  
  useEffect(() => {
    // Obter dados do usuário do localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      if (parsedUser.connections) {
        setConnections(parsedUser.connections);
      }
    }
  }, []);
  
  useEffect(() => {
    if (!user?.company) return;
    
    // Aplicar filtros
    const filtered = filterCompanies(mockCompanies, {
      country: filters.country || undefined,
      sector: filters.sector || undefined,
      type: filters.type as any || undefined,
    });
    
    // Calcular score de match para cada empresa
    const companiesWithScore = filtered.map(company => {
      const matchScore = calculateMatchScore(user.company!, company);
      return { ...company, matchScore };
    });
    
    // Ordenar por score de match (maiores primeiro)
    companiesWithScore.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    
    setFilteredCompanies(companiesWithScore);
  }, [filters, user]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleResetFilters = () => {
    setFilters({
      country: '',
      sector: '',
      type: '',
    });
  };
  
  const handleToggleMatchInfo = () => {
    setShowMatchInfo(!showMatchInfo);
  };
  
  const handleConnect = (company: Company) => {
    // In a real app, this would be an API call
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const updatedConnections = [...(user.connections || []), company.id];
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify({
        ...user,
        connections: updatedConnections,
      }));
      
      // Update state
      setConnections(updatedConnections);
      setUser({...user, connections: updatedConnections});
    }
  };
  
  const handleViewProfile = (company: Company) => {
    // In a real app, this would navigate to the company profile page
    console.log('View profile:', company);
    
    // For demo purposes, just alert
    alert(`Viewing profile for ${company.name}`);
  };
  
  const isConnected = (companyId: string) => {
    return connections.includes(companyId);
  };
  
  if (!user?.company) {
    return (
      <div className={styles.noCompanyState}>
        <h2>{t('match.needCompany')}</h2>
        <p>{t('match.registerToFind')}</p>
        <Link href="/company-register" className={styles.registerButton}>
          {t('match.registerCompany')}
        </Link>
      </div>
    );
  }
  
  return (
    <div className={styles.matchList}>
      <div className={styles.header}>
        <h1 className={styles.heading}>
          {t('match.title')}
          <button 
            className={styles.infoButton} 
            onClick={handleToggleMatchInfo}
            title={t('match.infoTooltip')}
          >
            <Info size={16} />
          </button>
        </h1>
        
        {showMatchInfo && (
          <div className={styles.matchInfoPanel}>
            <h3>{t('match.howWeCalculate')}</h3>
            <p>{t('match.factorsDescription')}</p>
            <ul>
              <li><strong>{t('match.factors.typeCompatibility')}</strong> {t('match.factors.typeDescription')}</li>
              <li><strong>{t('match.factors.sectorMatch')}</strong> {t('match.factors.sectorDescription')}</li>
              <li><strong>{t('match.factors.certifications')}</strong> {t('match.factors.certificationsDescription')}</li>
              <li><strong>{t('match.factors.geography')}</strong> {t('match.factors.geographyDescription')}</li>
              <li><strong>{t('match.factors.specialCombinations')}</strong> {t('match.factors.specialDescription')}</li>
            </ul>
            <button className={styles.closeButton} onClick={handleToggleMatchInfo}>{t('common.close')}</button>
          </div>
        )}
      </div>
      
      <div className={styles.filterBar}>
        <div className={styles.filterGroup}>
          <label htmlFor="country">{t('match.country')}</label>
          <select
            id="country"
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
          >
            <option value="">{t('match.filter')} {t('match.country')}</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label htmlFor="sector">{t('match.sector')}</label>
          <select
            id="sector"
            name="sector"
            value={filters.sector}
            onChange={handleFilterChange}
          >
            <option value="">{t('match.filter')} {t('match.sector')}</option>
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {t(`sectors.${sector}`)}
              </option>
            ))}
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label htmlFor="type">{t('match.type')}</label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="">{t('match.filter')} {t('match.type')}</option>
            <option value="importer">{t('companyRegister.importer')}</option>
            <option value="exporter">{t('companyRegister.exporter')}</option>
            <option value="both">{t('companyRegister.both')}</option>
          </select>
        </div>
        
        <div className={styles.filterActions}>
          <button className={`${styles.filterButton} ${styles.reset}`} onClick={handleResetFilters}>
            <RefreshCcw size={16} />
          </button>
        </div>
      </div>
      
      <div className={styles.results}>
        {filteredCompanies.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.message}>{t('match.noMatches')}</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onConnect={handleConnect}
                onViewProfile={handleViewProfile}
                isConnected={isConnected(company.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchList;