import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { clearQuery } from '@/redux/gameSearch/searchSlice';

const ClearSearchOnRouteChange: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleRouteChange = () => {
      dispatch(clearQuery());
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, dispatch]);

  return null; // This component doesn't render anything
};

export default ClearSearchOnRouteChange;
