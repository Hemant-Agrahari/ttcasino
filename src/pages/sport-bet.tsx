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

const SportBet: React.FC = () => {
  return (
    <IndividualGame
      className="mt-3"
      height={isMobile ? '600px' : '850px'}
      title="Sport-bet"
    />
  );
};

export default dynamic(() => Promise.resolve(withAuth(SportBet)), {
  ssr: false,
});
