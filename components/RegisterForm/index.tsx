'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import styles from './RegisterForm.module.scss';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();
  
  const password = watch('password');
  
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setRegisterError('');
    
    try {
      // Mock registration - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        name: data.name,
        email: data.email,
      }));
      
      // Store as logged in
      localStorage.setItem('isLoggedIn', 'true');
      
      // Redirect to company registration page
      router.push('/company-register');
    } catch (error) {
      setRegisterError('An error occurred during registration');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className={styles.registerForm}>
      <div className={styles.formHeader}>
        <h1 className={styles.title}>{t('register.title')}</h1>
      </div>
      
      <form className={styles.formBody} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="name">{t('register.name')}</label>
          <input
            id="name"
            type="text"
            className={styles.input}
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="email">{t('register.email')}</label>
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
          <label htmlFor="password">{t('register.password')}</label>
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
        
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">{t('register.confirmPassword')}</label>
          <input
            id="confirmPassword"
            type="password"
            className={styles.input}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
        </div>
        
        {registerError && <p className={styles.error}>{registerError}</p>}
        
        <div className={styles.formFooter}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : t('register.submit')}
          </button>
          
          <Link href="/login" className={styles.loginLink}>
            {t('register.loginLink')}
          </Link>
        </div>
      </form>
      
      <div className={styles.languageSwitcherContainer}>
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default RegisterForm;