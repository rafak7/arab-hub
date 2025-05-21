import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Dashboard from '@/components/Dashboard';

export async function getStaticProps({ locale }: { locale?: string }) {
  if (!locale) {
    locale = 'pt'; // Default to Portuguese if locale is not provided
  }
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard - Arab-Brazil Business Hub</title>
        <meta name="description" content="Your dashboard on Arab-Brazil Business Hub" />
      </Head>
      
      <Dashboard />
    </>
  );
}