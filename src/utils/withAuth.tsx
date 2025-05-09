import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setOpenLoginModel,
  setLoginModelTab,
  setPreviousRoute,
} from '@/redux/models/modelReducer';

/**
 * **withAuth HOC (Higher-Order Component)**
 *
 * This HOC is used to **protect pages** by ensuring only authenticated users can access them.
 * If a user is **not authenticated** (i.e., no `user.token`), they are **redirected to the homepage (`/`)**.
 *
 * @param {React.ComponentType} WrappedComponent - The component to be wrapped and protected.
 * @returns {React.FC} A new component that checks authentication before rendering.
 */

const withAuth = (WrappedComponent: any) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const authToken = useAppSelector((state) => state.user.authToken);

    useEffect(() => {
      if (!authToken) {
        document.title = 'Redirecting...';
        dispatch(setOpenLoginModel());
        dispatch(setLoginModelTab(0));
        dispatch(setPreviousRoute(router.asPath));
        router.replace('/');
      }
    }, [authToken, router]);

    if (!authToken) return null;

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
