import React, { useState } from 'react';
import CustomImage from '../common/CustomImage';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/redux/hooks';
import { CustomButton } from '../common';
import { Dialog } from '@mui/material';
import WalletPopup from '../HeaderModals/WalletPopup';

const HeaderBalanceDeposit: React.FC = () => {
  const { t } = useTranslation();
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);
  const [Wallet_Anchor, setWallet_Anchor] = useState<number>(0);

  const totalBalance = useAppSelector((state) => state.user.user?.totalBalance);

  const handleCloseWalletModal = () => {
    setOpenWalletModal(false);
  };

  return (
    <>
      <div className="balance d-flex">
        <CustomImage
          src="/assets/images/coin.png"
          alt={t('coin')}
          width={22}
          height={22}
        />
        <span>{totalBalance ? totalBalance : '0.00'}</span>
      </div>
      <CustomButton
        className="btn deposit-btn"
        onClick={() => setOpenWalletModal(true)}
      >
        <CustomImage
          src="/assets/images/wallet.png"
          alt={t('coin')}
          width={22}
          height={22}
        />
        <span className="d-none d-md-block ">{t('Deposit')}</span>
      </CustomButton>
      <Dialog
        className="WalletModaluniversal"
        open={openWalletModal}
        onClose={handleCloseWalletModal}
        scroll="body"
      >
        <WalletPopup
          handleCloseWalletModal={handleCloseWalletModal}
          Wallet_Anchor={Wallet_Anchor}
          setWallet_Anchor={setWallet_Anchor}
        />
      </Dialog>
    </>
  );
};

export default HeaderBalanceDeposit;
