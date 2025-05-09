import React from 'react';
import { useRouter } from 'next/router';
import BackToTop from '@/component/common/BacktoTop';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '@/component/common';
import CustomImage from '@/component/common/CustomImage';
import { gameData } from '@/types/game';
import { NoGamesMessage } from './NoGamesMessage';

interface _props {
  gameList: gameData[];
  handleGameLimit: () => void;
  totalGames: number;
}

const HomeGames: React.FC<_props> = ({
  handleGameLimit,
  gameList,
  totalGames,
}: any) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleGameRedirection = (
    event: React.MouseEvent<HTMLDivElement>,
    gameId: string,
    providerName: string,
  ) => {
    event.preventDefault();
    if (gameId && providerName) {
      router.push({
        pathname: '/play-game',
        query: { gameId: gameId, provider: providerName },
      });
    }
  };

  return (
    <>
      {gameList && gameList.length > 0 ? (
        <div className="homeTab-content mt-3">
          {gameList.map((item: gameData) => (
            <div
              className="homeTabContent-col"
              key={item._id}
              onClick={(event) =>
                handleGameRedirection(
                  event,
                  item.customGameId,
                  item.providerName,
                )
              }
            >
              <div className="gameImg">
                <CustomImage
                  src={
                    item.imageUrl
                      ? item.imageUrl
                      :  '/assets/images/gameImage.png'
                  }
                  alt={item.displayName}
                  height={140}
                  width={200}
                  className="img-lazy"
                  unoptimized
                />
              </div>
              <h6>{item.displayName}</h6>
            </div>
          ))}
        </div>
      ) : (
        <NoGamesMessage isShowHeading={false} />
      )}

      <div className="d-flex justify-content-center">
        {totalGames > gameList.length && (
          <div className="loginSignUp-btn">
            <CustomButton
              type="button"
              className="btn signUp-btn"
              onClick={() => handleGameLimit()}
            >
              {t('Load more')}
            </CustomButton>
          </div>
        )}
        {gameList.length ? <BackToTop /> : ''}
      </div>
    </>
  );
};

export default HomeGames;
