import { useState } from 'react';
import { GetStaticProps } from 'next';
import { commonStaticProps } from '@/utils/translation';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import { ToInvite, BonusHistory } from '@/component/Referral';
import CustomMuiTab from '@/component/common/mui-component/CustomMuiTab';
import withAuth from '@/utils/withAuth';
import { useGetReferralLinkQuery } from '@/redux/player/playerSlice';

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return commonStaticProps(locale!);
};

const Referral: React.FC = () => {
  const { t } = useTranslation();
  const [referralTabValue, setReferralTabValue] = useState<number>(0);
  const { data } = useGetReferralLinkQuery();
  const referralData = data?.data;
  const tabLabels = [t('Invite'), t('Bonus History')];
  const tabClassNames = ['toInvite', 'statistics', 'forms'];

  const referralTabHandle = (event: React.SyntheticEvent, newValue: number) => {
    setReferralTabValue(newValue);
  };

  return (
    <div className="container margin-top-14 referral-page">
      <div className="referalPage-tab">
        <CustomMuiTab
          value={referralTabValue}
          onChange={referralTabHandle}
          tabLabels={tabLabels}
          tabClassName={tabClassNames}
          tabsClassName=""
        />
        {referralTabValue === 0 && referralData && (
          <ToInvite referralData={referralData} />
        )}
        {referralTabValue === 1 && <BonusHistory />}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(withAuth(Referral)), {
  ssr: false,
});
