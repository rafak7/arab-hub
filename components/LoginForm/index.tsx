'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Building } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import styles from './LoginForm.module.scss';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError('');
    
    try {
      // Mock authentication - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email with a password length >= 6
      if (data.password.length >= 6) {
        // Store user as logged in
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      setLoginError('An error occurred during login');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className={styles.loginForm}>
      <div className={styles.formHeader}>
        <div className={styles.logo}>
          <Building size={50} />
        </div>
        <h1 className={styles.title}>Arab-Brazil Business Hub</h1>
      </div>
      
      <form className={styles.formBody} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="email">{t('login.email')}</label>
          <input
            id="email"
            type="email"
            className={styles.input}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="password">{t('login.password')}</label>
          <input
            id="password"
            type="password"
            className={styles.input}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>
        
        {loginError && <p className={styles.error}>{loginError}</p>}
        
        <div className={styles.formFooter}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : t('login.submit')}
          </button>
          
          <Link href="/forgot-password" className={styles.forgotPassword}>
            {t('login.forgotPassword')}
          </Link>
          
          <Link href="/register" className={styles.registerLink}>
            {t('login.registerLink')}
          </Link>
        </div>
      </form>
      
      <div className={styles.languageSwitcherContainer}>
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default LoginForm;