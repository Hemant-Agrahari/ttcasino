import ResetPasswordPopup from '@/component/auth/ResetPassword';
import React from 'react';
import { GetStaticProps } from 'next';
import { commonStaticProps } from '@/utils/translation';
import dynamic from 'next/dynamic';

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return commonStaticProps(locale!);
};

const ResetPassword: React.FC = () => {
  return <ResetPasswordPopup />;
};

export default dynamic(() => Promise.resolve(ResetPassword), {
  ssr: false,
});
