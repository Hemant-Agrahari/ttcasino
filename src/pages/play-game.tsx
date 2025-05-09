import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { GetStaticProps } from 'next';
import { commonStaticProps } from '@/utils/translation';
import dynamic from 'next/dynamic';
import Loader from '@/component/common/mui-component/Loader';
import withAuth from '@/utils/withAuth';
import { useLazyGetGameUrlQuery } from '@/redux/games/gameSlice';
import { RTKError } from '@/types/user';
import { handleError } from '@/utils/errorHandler';
import { useAppDispatch } from '@/redux/hooks';
import { closeSearchModal } from '@/redux/models/modelReducer';

// Method is for language switch
export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return commonStaticProps(locale!);
};

const PlayGame: React.FC = () => {
  const router = useRouter();
  const [getGameUrl, { isLoading }] = useLazyGetGameUrlQuery();
  const [gameUrl, setGameUrl] = useState<string>('');
  const dispatch = useAppDispatch();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { gameId, provider } = router.query;

  const fetchGameUrl = async () => {
    try {
      const res = await getGameUrl({ gameId: gameId as string }).unwrap();
      if (res.status === 'success') {
        setGameUrl(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (error: unknown) {
      handleError(error as RTKError);
      router.push('/');
    } finally {
      dispatch(closeSearchModal());
    }
  };

  const checkRoutes = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    try {
      const iframeWindow = (e.target as HTMLIFrameElement).contentWindow;
      const iframeLocation = iframeWindow?.location;

      const myOrigin = window.location.origin;
      const iframeOrigin = iframeLocation?.origin;

      if (iframeOrigin === myOrigin) {
        console.warn('Iframe is loading our own website! Redirecting...');
        router.push('/');
      }
    } catch (error) {
      console.error('Cross-origin access blocked.', error);
    }
  };

  useEffect(() => {
    if (gameId) {
      fetchGameUrl();
    }
  }, [gameId, provider]);

  return (
    <div className="container-fluid px-1">
      {isLoading ? (
        <Loader />
      ) : (
        <iframe
          ref={iframeRef}
          onLoad={checkRoutes}
          src={gameUrl}
          title="TT-Casino"
          width="100%"
          height="700px"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin"
        />
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(withAuth(PlayGame)), {
  ssr: false,
});
