'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Building, Menu, X, User, LogOut, Settings, PlusCircle, BadgeInfo } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [showCompanyTooltip, setShowCompanyTooltip] = useState(false);
  const [userName, setUserName] = useState('');
  const [hasCompany, setHasCompany] = useState(true);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const companyButtonRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Redirect to login if not logged in
    if (!isLoggedIn && 
        !router.pathname.includes('/login') && 
        !router.pathname.includes('/register')) {
      router.push('/login');
    }
    
    // Get user name from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name || '');
      setHasCompany(!!user.company);
    }
  }, [router]);
  
  useEffect(() => {
    // Mostrar tooltip de dica para cadastro de empresa após 1 segundo se não tiver empresa
    if (!hasCompany) {
      const timer = setTimeout(() => {
        setShowCompanyTooltip(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [hasCompany]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Impedir rolagem do body quando menu estiver aberto
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
  };
  
  // Adicionar função para fechar o menu mobile quando clicar em um link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };
  
  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('isLoggedIn');
    
    // Redirect to login
    router.push('/login');
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
      setIsUserDropdownOpen(false);
    }
    
    if (companyButtonRef.current && !companyButtonRef.current.contains(event.target as Node)) {
      setShowCompanyTooltip(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (!userName) return 'U';
    
    const nameParts = userName.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };
  
  const isLoginPage = router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/company-register';
  
  useEffect(() => {
    // Limpar o overflow do body quando o componente for desmontado
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  if (isLoginPage) {
    return (
      <div className={styles.layout}>
        <main className={styles.main}>
          <div className="container">
            {children}
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className="container">
          <nav className={styles.navbar}>
            <Link href="/dashboard" className={styles.logo}>
              <Building size={24} className={styles.logoIcon} />
              <span>Arab-Brazil Hub</span>
            </Link>
            
            <ul className={styles.menuItems}>
              <li>
                <Link 
                  href="/dashboard" 
                  className={classNames(styles.menuItem, {
                    [styles.active]: router.pathname === '/dashboard',
                  })}
                >
                  {t('navigation.dashboard')}
                </Link>
              </li>
              {hasCompany && (
                <li>
                  <Link 
                    href="/match" 
                    className={classNames(styles.menuItem, {
                      [styles.active]: router.pathname === '/match',
                    })}
                  >
                    {t('navigation.match')}
                  </Link>
                </li>
              )}
              {!hasCompany && (
                <li className={styles.registerCompanyContainer}>
                  <Link 
                    ref={companyButtonRef}
                    href="/company-register" 
                    className={classNames(styles.menuItem, styles.registerCompanyButton, {
                      [styles.active]: router.pathname === '/company-register',
                      [styles.pulse]: !router.pathname.includes('/company-register'),
                    })}
                    onMouseEnter={() => setShowCompanyTooltip(true)}
                    onMouseLeave={() => setShowCompanyTooltip(false)}
                  >
                    <PlusCircle size={16} />
                    <span>{t('navigation.registerCompany')}</span>
                  </Link>
                  
                  {showCompanyTooltip && (
                    <div className={styles.companyTooltip}>
                      <BadgeInfo size={16} />
                      <span>{t('navigation.registerCompanyTooltip')}</span>
                    </div>
                  )}
                </li>
              )}
            </ul>
            
            <div className={styles.actions}>
              <LanguageSwitcher />
              
              <div className={styles.userDropdown} ref={userDropdownRef}>
                <button className={styles.userButton} onClick={toggleUserDropdown}>
                  <div className={styles.avatar}>
                    {getUserInitials()}
                  </div>
                </button>
                
                <div className={classNames(styles.dropdownMenu, {
                  [styles.open]: isUserDropdownOpen,
                })}>
                  <Link href="/profile" className={styles.menuItem}>
                    <User size={16} /> {t('navigation.profile')}
                  </Link>
                  {!hasCompany && (
                    <Link href="/company-register" className={`${styles.menuItem} ${styles.highlightMenuItem}`}>
                      <PlusCircle size={16} /> {t('navigation.registerCompany')}
                    </Link>
                  )}
                  {hasCompany && (
                    <Link href="/company-profile" className={styles.menuItem}>
                      <Building size={16} /> {t('dashboard.myCompany')}
                    </Link>
                  )}
                  <Link href="/settings" className={styles.menuItem}>
                    <Settings size={16} /> {t('navigation.settings')}
                  </Link>
                  <button className={`${styles.menuItem} ${styles.logout}`} onClick={handleLogout}>
                    <LogOut size={16} /> {t('navigation.logout')}
                  </button>
                </div>
              </div>
              
              <button 
                className={styles.mobileMenuButton} 
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            {/* Overlay do menu mobile */}
            <div 
              className={classNames(styles.mobileMenuOverlay, {
                [styles.open]: isMobileMenuOpen,
              })} 
              onClick={closeMobileMenu}
            ></div>
          
            {/* Menu mobile */}
            {isMobileMenuOpen && (
              <div className={classNames(styles.mobileMenu, {
                [styles.open]: isMobileMenuOpen,
              })}>
                <ul className={styles.menuItems}>
                  <li>
                    <Link 
                      href="/dashboard" 
                      className={styles.menuItem}
                      onClick={closeMobileMenu}
                    >
                      {t('navigation.dashboard')}
                    </Link>
                  </li>
                  {hasCompany && (
                    <>
                      <li>
                        <Link 
                          href="/company-profile" 
                          className={`${styles.menuItem} ${styles.highlightMobileMenuItem}`}
                          onClick={closeMobileMenu}
                        >
                          <Building size={16} />
                          <span>{t('dashboard.myCompany')}</span>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/match" 
                          className={styles.menuItem}
                          onClick={closeMobileMenu}
                        >
                          {t('navigation.match')}
                        </Link>
                      </li>
                    </>
                  )}
                  {!hasCompany && (
                    <li>
                      <Link 
                        href="/company-register" 
                        className={`${styles.menuItem} ${styles.highlightMobileMenuItem}`}
                        onClick={closeMobileMenu}
                      >
                        <PlusCircle size={16} /> 
                        <span>{t('navigation.registerCompany')}</span>
                        <span className={styles.importantBadge}>{t('navigation.important')}</span>
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link 
                      href="/profile" 
                      className={styles.menuItem}
                      onClick={closeMobileMenu}
                    >
                      {t('navigation.profile')}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/settings" 
                      className={styles.menuItem}
                      onClick={closeMobileMenu}
                    >
                      {t('navigation.settings')}
                    </Link>
                  </li>
                  <li>
                    <button 
                      className={`${styles.menuItem} ${styles.logout}`}
                      onClick={() => {
                        closeMobileMenu();
                        handleLogout();
                      }}
                    >
                      {t('navigation.logout')}
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </div>
      </header>
      
      {/* Banner de cadastro de empresa, visível apenas para usuários sem empresa */}
      {!hasCompany && !router.pathname.includes('/company-register') && (
        <div className={styles.registerCompanyBanner}>
          <div className="container">
            <div className={styles.bannerContent}>
              <Building size={20} />
              <p>{t('navigation.registerCompanyBannerText')}</p>
              <Link href="/company-register" className={styles.bannerButton}>
                {t('navigation.registerNow')}
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <main className={styles.main}>
        <div className="container">
          {children}
        </div>
      </main>
      
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <Building size={20} />
              <span>Arab-Brazil Business Hub</span>
            </div>
            
            <div className={styles.footerNav}>
              <Link href="/about" className={styles.footerLink}>{t('footer.about')}</Link>
              <Link href="/contact" className={styles.footerLink}>{t('footer.contact')}</Link>
              <Link href="/privacy" className={styles.footerLink}>{t('footer.privacy')}</Link>
              <Link href="/terms" className={styles.footerLink}>{t('footer.terms')}</Link>
            </div>
            
            <div className={styles.footerCopyright}>
              &copy; {new Date().getFullYear()} Arab-Brazil Business Hub. {t('footer.rights')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;