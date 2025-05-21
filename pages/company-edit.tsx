import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Building, CheckCircle, ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';
import { Company } from '@/lib/mockData';
import CompanyForm from '@/components/CompanyForm';
import styles from '@/styles/CompanyEdit.module.scss';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function CompanyEditPage() {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Verificar se o usuário está logado
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    // Obter dados da empresa do usuário
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      
      if (user.company) {
        setCompany(user.company);
      } else {
        // Se o usuário não tiver empresa, redirecionar para o registro de empresa
        router.push('/company-register');
      }
    }
    
    setLoading(false);
  }, [router]);
  
  const handleUpdateSuccess = () => {
    // Redirecionar para a página de perfil após atualização bem-sucedida
    router.push('/company-profile');
  };
  
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Carregando dados da empresa...</p>
      </div>
    );
  }
  
  if (!company) {
    return null;
  }
  
  return (
    <>
      <Head>
        <title>Editar Empresa - {company.name}</title>
        <meta name="description" content={`Editar informações da empresa ${company.name} no Arab-Brazil Business Hub`} />
      </Head>
      
      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="/company-profile" className={styles.backLink}>
            <ArrowLeftCircle size={20} />
            <span>Voltar ao Perfil</span>
          </Link>
          <h1 className={styles.title}>Editar Empresa</h1>
        </div>
        
        <div className={styles.content}>
          <div className={styles.formContainer}>
            <CompanyForm 
              isEditing={true} 
              initialData={{
                companyName: company.name,
                country: company.country,
                type: company.type,
                sectors: company.sectors,
                certifications: company.certifications || [],
                description: company.description || ''
              }}
              onSuccess={handleUpdateSuccess}
            />
          </div>
          
          <div className={styles.infoPanel}>
            <div className={styles.infoHeader}>
              <Building size={24} />
              <h2>Editar Informações</h2>
            </div>
            
            <p className={styles.infoText}>
              Mantenha suas informações atualizadas para melhorar a precisão dos matches e encontrar os melhores parceiros comerciais.
            </p>
            
            <div className={styles.tipBox}>
              <CheckCircle size={16} className={styles.tipIcon} />
              <p className={styles.tipText}>
                Adicionar certificações como Halal pode aumentar significativamente seu score de match com empresas árabes.
              </p>
            </div>
            
            <div className={styles.tipBox}>
              <CheckCircle size={16} className={styles.tipIcon} />
              <p className={styles.tipText}>
                Selecione corretamente seu tipo (importador/exportador) para garantir matches complementares.
              </p>
            </div>
            
            <div className={styles.tipBox}>
              <CheckCircle size={16} className={styles.tipIcon} />
              <p className={styles.tipText}>
                Mantenha seus setores de atuação atualizados conforme sua empresa expande para novos mercados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 