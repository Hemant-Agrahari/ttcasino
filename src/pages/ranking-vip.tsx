import { CashbackSection, VipBonus, VipSlider } from '@/component/RankingVip';
import { GetStaticProps } from 'next';
import { commonStaticProps } from '@/utils/translation';
import dynamic from 'next/dynamic';
import withAuth from '@/utils/withAuth';

// Method is for language switch
export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return commonStaticProps(locale!);
};

const VipPage: React.FC = () => {
  return (
    <div className="container ranking-vip-container">
      <VipBonus />
      <CashbackSection />
      <VipSlider />
    </div>
  );
};

export default dynamic(() => Promise.resolve(withAuth(VipPage)), {
  ssr: false,
});
