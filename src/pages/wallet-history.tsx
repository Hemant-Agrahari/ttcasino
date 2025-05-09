import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useRouter } from 'next/router';
import {
  DepositTab,
  GameHistory,
  WithdrawTab,
} from '@/component/PersonalCenter';
import dynamic from 'next/dynamic';
import { commonStaticProps } from '@/utils/translation';
import { GetStaticProps } from 'next';
import { useTranslation } from 'react-i18next';
import CustomImage from '@/component/common/CustomImage';
import withAuth from '@/utils/withAuth';

// Method is for language switch
export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return commonStaticProps(locale!);
};

const WalletHistory: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  // Tabs Functionality
  const [activeTab, setActiveTab] = useState<string>('tab1');

  const handleChangeTab = (
    event: React.ChangeEvent<{}>,
    newValue: React.SetStateAction<string>,
  ) => {
    setActiveTab(newValue);
  };

  return (
    <div className="container wallet-history-container">
      <div className="DepositTab">
        <div className="m-2 d-flex align-items-center">
          <CustomImage
            src="/assets/images/ProfileBackButton.png"
            alt={t('Back button')}
            onClick={() => router.back()}
            width={25}
            height={25}
            className="cursor-pointer"
          />
          <div className="m-2 font-weight-800 text-white font-size-18">
            {t('Wallet History')}
          </div>
        </div>
        <div className="walletHistoryPage-tab">
          <TabContext value={activeTab}>
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
            >
              <Tab
                label={t('Deposit')}
                value="tab1"
                className="toInvite"
                disableRipple
              />
              <Tab
                label={t('Withdraw')}
                value="tab2"
                className="forms"
                disableRipple
              />
              <Tab
                label={t('Game History')}
                value="tab3"
                className="statistics"
                disableRipple
              />
            </TabList>

            <TabPanel value="tab1" className="m-2">
              <DepositTab />
            </TabPanel>
            <TabPanel value="tab2" className="m-2">
              <WithdrawTab />
            </TabPanel>
            <TabPanel value="tab3" className="m-2">
              <GameHistory />
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(withAuth(WalletHistory)), {
  ssr: false,
});
