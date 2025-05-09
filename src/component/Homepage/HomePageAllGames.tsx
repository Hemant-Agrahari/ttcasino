import React from 'react';
import { useRouter } from 'next/router';
import CustomImage from '@/component/common/CustomImage';
import { gameData } from '@/types/game';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import BackToTop from '../common/BacktoTop';
interface _gameData {
  gameList: gameData[];
}

const HomePageGamesAllGames: React.FC<_gameData> = ({ gameList }) => {
  const router = useRouter();

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
      <div className="homeTab-content mt-3">
        <>
          {gameList && gameList.length > 0
            ? gameList.map((item: gameData) => (
              <div
                className="game-card"
                key={item._id}
                onClick={(event) =>
                  handleGameRedirection(event, item.customGameId, item.providerName)
                }
              >
                <div className="game-img-wrapper">
                  <CustomImage
                    src={item.imageUrl || '/assets/images/gameImage.png'}
                    alt={item.displayName}
                    height={240}
                    width={200}
                    className="game-img"
                    unoptimized
                  />
                  <div className="game-overlay">
                    <PlayCircleIcon className="overlay-icon" />
                    <p className="overlay-name">{item.displayName}</p>
                  </div>
                </div>
              </div>

            ))
            : ''}
        </>
      </div>
      {gameList.length ? <BackToTop /> : ''}
    </>
  );
};

export default HomePageGamesAllGames;
