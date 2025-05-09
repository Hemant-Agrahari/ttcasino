import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Dialog } from '@mui/material';
import Login from '@/component/auth/Login';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setCloseLoginModel,
  setCloseSidebar,
  setLoginModelTab,
} from '@/redux/models/modelReducer';
import { usePrefetch } from '@/redux/cms/cmsSlice';
import ClearSearchOnRouteChange from './ClearSearch';
import { useLazyGetPlayerDetailsQuery } from '@/redux/user/userSlice';
import { removeUser, setUser } from '@/redux/user/userReducer';
import { handleError } from '@/utils/errorHandler';
import { RTKError } from '@/types/user';
import { toast } from 'react-toastify';
import NewHeader from './NewHeader';

const Footer = dynamic(() => import('./Footer'), { ssr: false });
const Header = dynamic(() => import('./Header'), { ssr: false });
const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });
const StickyBar = dynamic(() => import('./StickyBar'), { ssr: false });
const Maintenance = dynamic(() => import('@/component/Homepage/maintenance'), {
  ssr: false,
});
const TopBanners = dynamic(() => import('@/component/Homepage/TopBanners'), {
  ssr: false,
});

const Provider =dynamic(()=>import('./Providers'),{ssr:false})

interface _props {
  children: React.ReactNode;
}

const Layout: React.FC<_props> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const prefetchCms = usePrefetch('getCmsPage');
  const [getPlayerDetails] = useLazyGetPlayerDetailsQuery();
  const isLoginModel = useAppSelector((state) => state.models.isLoginModel);
  const loginModelTab = useAppSelector((state) => state.models.loginModelTab);
  const isMaintenance = useAppSelector((state) => state.user.isMaintenance);
  const isSidebar = useAppSelector((state) => state.models.isSidebar);
  const user = useAppSelector((state) => state.user);

  const handleCloseLoginModal = () => {
    dispatch(setCloseLoginModel());
  };

  const handleTab = (index: number) => {
    dispatch(setLoginModelTab(index));
  };

  const handleCloseSidebar = () => {
    dispatch(setCloseSidebar());
  };

  const fetchPlayerDetails = async () => {
    try {
      const res = await getPlayerDetails().unwrap();
      if (res.status === 'success') {
        dispatch(setUser(res.data));
      } else {
        toast.error(res.message);
      }
    } catch (error: unknown) {
      dispatch(removeUser());
      handleError(error as RTKError);
    }
  };

  useEffect(() => {
    handleCloseSidebar();
  }, [router.asPath]);

  useEffect(() => {
    if (prefetchCms) {
      prefetchCms({ cmsTag: 'footer' });
    }
  }, [prefetchCms]);

  useEffect(() => {
    if (user.user?.token) {
      fetchPlayerDetails();
    }
  }, [user.user?.token]);

  if (router.pathname === '/poker-game') {
    return <>{children}</>;
  }

  return (
    <>
      <NewHeader/>
      <Provider/>
      {/* <Sidebar /> */}
      <ClearSearchOnRouteChange />

      {isMaintenance ? (
        <div className="container-fluid maintenanceContainer">
          <TopBanners />
          <h2>Hemant</h2>
          <Maintenance />
        </div>
      ) : (
        <main
          className={isSidebar ? 'sideBarOpen' : ''}
          style={
            router.pathname === '/sport-bet' ? { marginBottom: '0px' } : {}
          }
        >
          {children}
        </main>
      )}
      {router.pathname !== '/sport-bet' ? <StickyBar /> : null}
      <Footer isSidebar={isSidebar} />

      <Dialog
        className="signUpModaluniversal"
        open={isLoginModel}
        onClose={handleCloseLoginModal}
        scroll="body"
      >
        <Login
          handleCloseLoginModal={handleCloseLoginModal}
          tabIndex={loginModelTab}
          setTabIndex={handleTab}
        />
      </Dialog>
    </>
  );
};

export default Layout;
