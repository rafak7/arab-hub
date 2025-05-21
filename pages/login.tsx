import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LoginForm from '@/components/LoginForm';

export const getStaticProps: GetStaticProps = async ({ locale = 'pt' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default function LoginPage() {
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
        <title>Login - Arab-Brazil Business Hub</title>
        <meta name="description" content="Log in to your Arab-Brazil Business Hub account" />
      </Head>
      
      <div className="py-4">
        <LoginForm />
      </div>
    </>
  );
}