import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import RegisterForm from '@/components/RegisterForm';

export async function getStaticProps({ locale }: { locale?: string }) {
  if (!locale) {
    locale = 'pt'; // Usa o locale padrão se não for fornecido
  }
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function RegisterPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [router]);
  
  return (
    <>
      <Head>
        <title>Register - Arab-Brazil Business Hub</title>
        <meta name="description" content="Create an account on Arab-Brazil Business Hub" />
      </Head>
      
      <div className="py-4">
        <RegisterForm />
      </div>
    </>
  );
}