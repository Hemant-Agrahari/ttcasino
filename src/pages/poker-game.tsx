import React from 'react';
import { GetStaticProps } from 'next';
import { commonStaticProps } from '@/utils/translation';
import dynamic from 'next/dynamic';
import withAuth from '@/utils/withAuth';
import { isMobile } from 'react-device-detect';
import IndividualGame from '@/component/IndividualGame/IndividualGame';

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return commonStaticProps(locale!);
};

const PokerGame: React.FC = () => {
  return <IndividualGame height={isMobile ? '96dvh' : '100vh'} title="Poker" />;
};

export default dynamic(() => Promise.resolve(withAuth(PokerGame)), {
  ssr: false,
});
