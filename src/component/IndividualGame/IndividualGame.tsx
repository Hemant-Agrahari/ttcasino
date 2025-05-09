import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Loader from '@/component/common/mui-component/Loader';
import { useLazyGetIndividualGameUrlQuery } from '@/redux/games/gameSlice';
import { RTKError } from '@/types/user';
import { handleError } from '@/utils/errorHandler';
import { isMobile } from 'react-device-detect';

interface _props {
  title: string;
  height: string;
  className?: string;
}

const IndividualGame: React.FC<_props> = ({ height, title, className }) => {
  const router = useRouter();
  const { mainType, mainTypeId } = router.query;
  const [getGameUrl] = useLazyGetIndividualGameUrlQuery();
  const [isLoading, setIsLoading] = useState(true);
  const [gameUrl, setGameUrl] = useState<string>('');

  const fetchGameUrl = async (name: string, categoryId: string) => {
    try {
      const res = await getGameUrl({ isMobile, categoryId, name }).unwrap();
      if (res.status === 'success') {
        setGameUrl(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (error: unknown) {
      handleError(error as RTKError);
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      mainType &&
      mainTypeId &&
      typeof mainType === 'string' &&
      typeof mainTypeId === 'string'
    ) {
      fetchGameUrl(mainType, mainTypeId);
    }
  }, [mainType, mainTypeId]);

  return (
    <div className="similarGames container-fluid px-1">
      {isLoading ? (
        <Loader />
      ) : (
        <iframe
          src={gameUrl}
          title={title}
          width="100%"
          className={className}
          style={{ height: height }}
          height={height}
          allowFullScreen
        />
      )}
    </div>
  );
};

export default IndividualGame;
