import { useEffect } from 'react';
import Logo from '../../public/assets/images/logo.png';
import SidbarArrow from '../../public/assets/images/icon-sidebar.png';
import Link from 'next/link';
import { Button, Dialog } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/component/common/LanguageSwitcher';
import CustomImage from '@/component/common/CustomImage';
import {
  setOpenLoginModel,
  setLoginModelTab,
  closeSearchModal,
  openSearchModal,
  setToggleSidebar,
} from '@/redux/models/modelReducer';
import { useSocket } from '@/services/socketProvider';
import HeaderBalanceDeposit from '@/component/HeaderComponent/HeaderBalanceDeposit';
import HeaderVip from '@/component/HeaderComponent/HeaderVip';
import Notification from '@/component/HeaderComponent/Notification';
import {
  removeUser,
  setMaintenance,
  updateUser,
} from '@/redux/user/userReducer';
import SearchGame_Modal from '@/component/HeaderComponent/SearchGame_Modal';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { toast } from 'react-toastify';

interface forceLogout {
  socketId: string;
  message: string;
}

interface currentBalance {
  result: {
    userId: string;
    totalBalance: number;
  };
}

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { isConnected, listenEvent, removeListener } = useSocket();
  const user = useAppSelector((state) => state.user.user);
  const isSidebar = useAppSelector((state) => state.models.isSidebar);
  const authToken = useAppSelector((state) => state.user.authToken);
  const dispatch = useAppDispatch();
  const searchParams = new URLSearchParams(window.location.search);
  const referralCode = searchParams.get('referralcode');
  const agentId = searchParams.get('agentId');
  const isSearchModalOpen = useAppSelector(
    (state) => state.models.isSearchModalOpen,
  );

  const handleLoginSignupTab = (id: number) => {
    dispatch(setOpenLoginModel());
    dispatch(setLoginModelTab(id));
  };

  const handleForceLogout = (response: forceLogout) => {
    dispatch(removeUser());
    toast.error(response.message);
  };

  const handleMaintenance = (response: { isMaintenance: boolean }) => {
    dispatch(setMaintenance(response.isMaintenance));
  };

  const handleCurrentBalance = (response: currentBalance) => {
    if (response?.result.userId === user?._id) {
      dispatch(
        updateUser({
          totalBalance: response.result.totalBalance,
        }),
      );
    }
  };

  const handleToggleSidebar = () => {
    dispatch(setToggleSidebar());
  };

  useEffect(() => {
    if (referralCode || agentId) {
      dispatch(setLoginModelTab(1));
      dispatch(setOpenLoginModel());
    }
  }, [referralCode, agentId]);

  //TODO: remove any type
  useEffect(() => {
    if (isConnected) {
      listenEvent('currentBalance', handleCurrentBalance);
      listenEvent('maintenanceMode', handleMaintenance);
      listenEvent('forceLogout', handleForceLogout);
    } else {
      console.log('socket disconnected');
    }

    return () => {
      if (isConnected) {
        removeListener('currentBalance');
        removeListener('maintenanceMode');
        removeListener('forceLogout');
      }
    };
  }, [user?._id, isConnected]);

  return (
    <>
      <header className="header">
        <div className="header_toggle">
          <CustomImage
            src={SidbarArrow}
            width={50}
            height={50}
            alt={t('Picture of the author')}
            onClick={handleToggleSidebar}
            className={`sideBarArrow ${isSidebar ? 'sideBarArrowOper' : ''}`}
          />
          <Link href="/">
            <CustomImage
              src={Logo}
              width={95}
              height={70}
              className="logo-img"
              alt="TT-Casino"
            />
          </Link>
        </div>
        {user && authToken ? (
          <div className="afterLogin">
            {/* <div className="search-input my-1 d-none d-md-block">
              <CustomMuiOutlinedInput
                className="search-bar"
                placeholder={t('Search games')}
                startAdornment={
                  <InputAdornment position="start">
                    <CustomImage
                      src="/assets/images/search_icon.png"
                      alt={t('Search games')}
                      width={30}
                      height={24}
                    />
                  </InputAdornment>
                }
                value={searchQuery}
                onChange={(e) => dispatch(handleSearch(e.target.value))}
                fullWidth
              />
            </div> */}
            <div
              className="header-search-bar my-1 d-none d-md-flex cursor-pointer"
              onClick={() => dispatch(openSearchModal())}
            >
              <SearchOutlinedIcon className="text-white" />
            </div>
            <div className="balance-deposit">
              <HeaderBalanceDeposit />
            </div>
            <div className="headerProfile header-paper">
              <HeaderVip />
            </div>
            <div className="headerMsg">
              <Notification />
            </div>
            <div className="language-switcher">
              <LanguageSwitcher />
            </div>
          </div>
        ) : (
          <div className="loginSignUp-btn">
            {/* <div className="search-input my-1 d-none d-md-block">
              <CustomMuiOutlinedInput
                placeholder={t('Search games')}
                className="search-input-container"
                startAdornment={
                  <InputAdornment position="start">
                    <CustomImage
                      src="/assets/images/search_icon.png"
                      alt={t('Search games')}
                      width={30}
                      height={24}
                    />
                  </InputAdornment>
                }
                value={searchQuery}
                onChange={(e) => dispatch(handleSearch(e.target.value))}
                fullWidth
              />
            </div> */}
            <div
              className="header-search-bar my-1 d-none d-md-flex cursor-pointer"
              onClick={() => dispatch(openSearchModal())}
            >
              <SearchOutlinedIcon className="text-white" />
            </div>
            <Button
              type="button"
              className="btn login-btn text-capitalize"
              onClick={() => handleLoginSignupTab(0)}
            >
              {t('Log in')}
            </Button>
            <Button
              type="button"
              className="btn signUp-btn  btn-gradient text-capitalize"
              onClick={() => handleLoginSignupTab(1)}
            >
              {t('Register')}
            </Button>
            <div>
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </header>

      <Dialog
        className="signUpModaluniversal search-modal"
        open={isSearchModalOpen}
        onClose={() => dispatch(closeSearchModal())}
        scroll="body"
      >
        <SearchGame_Modal />
      </Dialog>
    </>
  );
};

export default Header;
