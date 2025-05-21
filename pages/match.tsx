import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MatchList from '@/components/MatchList';

export async function getStaticProps({ locale = 'en' }: { locale?: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function MatchPage() {
  return (
    <>
      <Head>
        <title>Matchmaking - Arab-Brazil Business Hub</title>
        <meta name="description" content="Find business partners on Arab-Brazil Business Hub" />
      </Head>
      
      <MatchList />
    </>
  );
}