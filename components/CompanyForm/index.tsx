'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Building, CheckCircle2, AlertTriangle } from 'lucide-react';
import { countries, sectors, certifications, mockCompanies, calculateMatchScore } from '@/lib/mockData';
import LanguageSwitcher from '../LanguageSwitcher';
import styles from './CompanyForm.module.scss';

interface CompanyFormData {
  companyName: string;
  country: string;
  type: 'importer' | 'exporter' | 'both';
  sectors: string[];
  certifications: string[];
  description?: string;
}

interface CompanyFormProps {
  isEditing?: boolean;
  initialData?: CompanyFormData;
  onSuccess?: () => void;
}

const CompanyForm = ({ isEditing = false, initialData, onSuccess }: CompanyFormProps) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    trigger,
    reset,
  } = useForm<CompanyFormData>({
    defaultValues: initialData || {
      sectors: [],
      certifications: [],
    },
  });
  
  // Preenche o formulário com os dados iniciais quando estiver editando
  useEffect(() => {
    if (isEditing && initialData) {
      reset(initialData);
    }
  }, [isEditing, initialData, reset]);
  
  const watchedFields = watch();
  
  const calculateTopMatches = (company: any) => {
    // Calcula os melhores matches com base na nova empresa
    return mockCompanies
      .map(otherCompany => ({
        ...otherCompany,
        matchScore: calculateMatchScore(company, otherCompany)
      }))
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
      .slice(0, 5); // Top 5 matches
  };
  
  const nextStep = async () => {
    let canProceed = false;
    
    if (currentStep === 1) {
      // Validar campos do passo 1
      canProceed = await trigger(['companyName', 'country']);
    } else if (currentStep === 2) {
      // Validar campos do passo 2
      canProceed = await trigger(['type', 'sectors']);
    }
    
    if (canProceed) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const onSubmit = async (data: CompanyFormData) => {
    setIsLoading(true);
    setFormError('');
    
    try {
      // Mock API call - in a real app, this would send data to a server
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isEditing) {
        // Atualiza os dados da empresa existente
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          
          if (user.company) {
            // Mantém o ID e outras informações existentes que não são editáveis no formulário
            const updatedCompany = {
              ...user.company,
              name: data.companyName,
              country: data.country,
              type: data.type,
              sectors: data.sectors,
              certifications: data.certifications,
              description: data.description,
            };
            
            localStorage.setItem('user', JSON.stringify({
              ...user,
              company: updatedCompany,
            }));
            
            // Chama o callback de sucesso se fornecido
            if (onSuccess) {
              onSuccess();
            } else {
              router.push('/company-profile');
            }
          }
        }
      } else {
        // Comportamento existente para criação de nova empresa
        // Cria objeto de empresa completo
        const newCompany = {
          ...data,
          id: Math.random().toString(36).substring(2, 9),
          name: data.companyName,
          logo: null,
          description: data.description || null
        };
        
        // Calcula melhores matches para essa nova empresa
        const topMatches = calculateTopMatches(newCompany);
        console.log('Top matches calculados:', topMatches);
        
        // Store company data in localStorage for demo purposes
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          localStorage.setItem('user', JSON.stringify({
            ...user,
            company: newCompany,
          }));
        } else {
          // Cria um novo usuário caso não exista
          localStorage.setItem('user', JSON.stringify({
            id: Math.random().toString(36).substring(2, 9),
            name: 'Novo Usuário',
            email: 'user@example.com',
            company: newCompany,
            connections: [],
            profileViews: 0
          }));
        }
        
        // Define que o usuário está logado
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect to dashboard after successful registration
        router.push('/dashboard');
      }
    } catch (error) {
      setFormError('Ocorreu um erro ao enviar o formulário');
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderProgressBar = () => {
    return (
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div className={styles.stepIndicators}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div 
              key={index} 
              className={`${styles.stepDot} ${index + 1 <= currentStep ? styles.active : ''}`}
              onClick={() => index + 1 < currentStep && setCurrentStep(index + 1)}
            >
              <span className={styles.stepNumber}>{index + 1}</span>
              <span className={styles.stepLabel}>
                {index === 0 ? 'Básico' : index === 1 ? 'Negócios' : 'Certificações'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className={styles.companyForm}>
      <div className={styles.formHeader}>
        <Building className={styles.formIcon} size={28} />
        <h1 className={styles.title}>
          {isEditing ? 'Editar Empresa' : t('companyRegister.title')}
        </h1>
        <p className={styles.subtitle}>
          {isEditing 
            ? 'Atualize as informações da sua empresa para melhorar seus matches'
            : 'Cadastre sua empresa para encontrar parceiros ideais de negócios'}
        </p>
      </div>
      
      {renderProgressBar()}
      
      <form className={styles.formBody} onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 1 && (
          <div className={styles.formStep}>
            <h2 className={styles.stepTitle}>Informações Básicas</h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="companyName">{t('companyRegister.companyName')}</label>
              <input
                id="companyName"
                type="text"
                className={`${styles.input} ${errors.companyName ? styles.errorInput : ''}`}
                placeholder="Insira o nome da sua empresa"
                {...register('companyName', {
                  required: 'Nome da empresa é obrigatório',
                })}
              />
              {errors.companyName && <p className={styles.error}>{errors.companyName.message}</p>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="country">{t('companyRegister.country')}</label>
              <select
                id="country"
                className={`${styles.select} ${errors.country ? styles.errorInput : ''}`}
                {...register('country', {
                  required: 'País é obrigatório',
                })}
              >
                <option value="">-- Selecione um país --</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && <p className={styles.error}>{errors.country.message}</p>}
            </div>
            
            <div className={styles.formTip}>
              <AlertTriangle size={16} />
              <p>A localização da sua empresa é um fator crucial para encontrar parceiros ideais</p>
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className={styles.formStep}>
            <h2 className={styles.stepTitle}>Perfil de Negócios</h2>
            
            <div className={styles.formGroup}>
              <label>{t('companyRegister.type')}</label>
              <div className={styles.radioGroup}>
                <div className={styles.radioOption}>
                  <input
                    id="type-importer"
                    type="radio"
                    value="importer"
                    {...register('type', {
                      required: 'Tipo de empresa é obrigatório',
                    })}
                  />
                  <label htmlFor="type-importer" className={styles.radioLabel}>
                    {t('companyRegister.importer')}
                  </label>
                </div>
                <div className={styles.radioOption}>
                  <input
                    id="type-exporter"
                    type="radio"
                    value="exporter"
                    {...register('type', {
                      required: 'Tipo de empresa é obrigatório',
                    })}
                  />
                  <label htmlFor="type-exporter" className={styles.radioLabel}>
                    {t('companyRegister.exporter')}
                  </label>
                </div>
                <div className={styles.radioOption}>
                  <input
                    id="type-both"
                    type="radio"
                    value="both"
                    {...register('type', {
                      required: 'Tipo de empresa é obrigatório',
                    })}
                  />
                  <label htmlFor="type-both" className={styles.radioLabel}>
                    {t('companyRegister.both')}
                  </label>
                </div>
              </div>
              {errors.type && <p className={styles.error}>{errors.type.message}</p>}
            </div>
            
            <div className={styles.formGroup}>
              <label>{t('companyRegister.sectors')}</label>
              <Controller
                name="sectors"
                control={control}
                rules={{ required: 'Pelo menos um setor é obrigatório' }}
                render={({ field }) => (
                  <div className={styles.checkboxGroup}>
                    {sectors.map((sector) => (
                      <div key={sector} className={styles.checkboxOption}>
                        <input
                          type="checkbox"
                          id={`sector-${sector}`}
                          value={sector}
                          onChange={(e) => {
                            const value = e.target.value;
                            const isChecked = e.target.checked;
                            
                            if (isChecked) {
                              field.onChange([...field.value, value]);
                            } else {
                              field.onChange(field.value.filter((val: string) => val !== value));
                            }
                          }}
                          checked={field.value.includes(sector)}
                        />
                        <label htmlFor={`sector-${sector}`} className={styles.checkboxLabel}>
                          {t(`sectors.${sector}`)}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              />
              {errors.sectors && <p className={styles.error}>{errors.sectors.message}</p>}
            </div>
            
            <div className={styles.formTip}>
              <CheckCircle2 size={16} />
              <p>Selecionar os setores corretos aumenta a chance de encontrar parceiros compatíveis</p>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className={styles.formStep}>
            <h2 className={styles.stepTitle}>Certificações e Detalhes</h2>
            
            <div className={styles.formGroup}>
              <label>{t('companyRegister.certifications')}</label>
              <Controller
                name="certifications"
                control={control}
                render={({ field }) => (
                  <div className={styles.checkboxGroup}>
                    {certifications.map((certification) => (
                      <div key={certification} className={styles.checkboxOption}>
                        <input
                          type="checkbox"
                          id={`certification-${certification}`}
                          value={certification}
                          onChange={(e) => {
                            const value = e.target.value;
                            const isChecked = e.target.checked;
                            
                            if (isChecked) {
                              field.onChange([...field.value, value]);
                            } else {
                              field.onChange(field.value.filter((val: string) => val !== value));
                            }
                          }}
                          checked={field.value.includes(certification)}
                        />
                        <label htmlFor={`certification-${certification}`} className={styles.checkboxLabel}>
                          {certification === 'halal' ? 
                            <span className={styles.halalBadge}>Halal</span> : 
                            certification === 'iso9001' || certification === 'iso14001' || certification === 'iso22000' ? 
                              <span className={styles.isoBadge}>ISO {certification.substring(3)}</span> : 
                              certification}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Descrição da Empresa</label>
              <textarea
                className={styles.textarea}
                placeholder="Descreva sua empresa, produtos e serviços oferecidos..."
                rows={4}
                {...register('description')}
              />
              <p className={styles.helpText}>Uma boa descrição ajuda potenciais parceiros a entender melhor o seu negócio</p>
            </div>
            
            <div className={styles.formTip}>
              <CheckCircle2 size={16} />
              <p>A certificação Halal é muito valorizada para empresas que desejam fazer negócios com países árabes</p>
            </div>
          </div>
        )}
        
        {formError && <p className={styles.formError}>{formError}</p>}
        
        <div className={styles.formFooter}>
          {currentStep > 1 && (
            <button
              type="button"
              className={styles.backButton}
              onClick={prevStep}
            >
              Voltar
            </button>
          )}
          
          {currentStep < totalSteps ? (
            <button
              type="button"
              className={styles.nextButton}
              onClick={nextStep}
            >
              Próximo
            </button>
          ) : (
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading 
                ? (isEditing ? 'Atualizando...' : 'Cadastrando...') 
                : (isEditing ? 'Atualizar Empresa' : 'Cadastrar Empresa')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;