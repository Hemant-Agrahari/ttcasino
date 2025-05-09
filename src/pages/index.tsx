import React from 'react';
import { NoGamesMessage } from '@/component/Homepage/NoGamesMessage';
import TopBanners from '@/component/Homepage/TopBanners';
import HomePageGamesAllGames from '@/component/Homepage/HomePageAllGames';
import { GetStaticProps } from 'next';
import { commonStaticProps } from '@/utils/translation';
import dynamic from 'next/dynamic';
import Loader from '@/component/common/mui-component/Loader';
import { useGetHomeGameQuery } from '@/redux/games/gameSlice';
import Image from 'next/image';
import MenuSlider from '@/layout/MenuSlider';
import GameList from '@/component/game-list';

// Method is for language switch
export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return commonStaticProps(locale!);
};

function Home() {
  const { data: gamesList, isLoading } = useGetHomeGameQuery();

  const categories = [
    { name: 'All Games', icon: '/assets/images/home-1.svg' },
    {
      name: 'Live Tables',
      icon: '/assets/images/livetables.svg',
      active: true,
    },
    { name: 'New', icon: '/assets/images/new.svg' },
    { name: 'Bet Games', icon: '/assets/images/betgames.svg' },
    { name: 'First Games', icon: '/assets/images/1stp.svg' },
    { name: 'Blacl Jack', icon: '/assets/images/blackjackicon.svg' },
    { name: 'New', icon: '/assets/images/new.svg' },
    { name: 'Bet Games', icon: '/assets/images/betgames.svg' },
    { name: 'First Games', icon: '/assets/images/1stp.svg' },
    { name: 'Blacl Jack', icon: '/assets/images/blackjackicon.svg' },
    { name: 'New', icon: '/assets/images/new.svg' },
    { name: 'Bet Games', icon: '/assets/images/betgames.svg' },
    { name: 'First Games', icon: '/assets/images/1stp.svg' },
    { name: 'Blacl Jack', icon: '/assets/images/blackjackicon.svg' },
    { name: 'New', icon: '/assets/images/new.svg' },
    { name: 'Bet Games', icon: '/assets/images/betgames.svg' },
    { name: 'First Games', icon: '/assets/images/1stp.svg' },
    { name: 'Blacl Jack', icon: '/assets/images/blackjackicon.svg' },
    { name: 'New', icon: '/assets/images/new.svg' },
    { name: 'Bet Games', icon: '/assets/images/betgames.svg' },
    { name: 'First Games', icon: '/assets/images/1stp.svg' },
    { name: 'Blacl Jack', icon: '/assets/images/blackjackicon.svg' },
  ];

  return (
    <div>
      <div className="">
        {/* Silder */}
        <TopBanners />
        {/* Game List */}
        <div className="scroll-container">
          {categories.map((item, index) => (
            <div
              key={index}
              className={`scroll-item ${item.active ? 'active' : ''}`}
            >
              <img src={item.icon} alt={item.name} className="icon" />
              <span className="label">{item.name}</span>
            </div>
          ))}
        </div>

        {/* <GameList/> */}

        {/* search bar */}
        <div className="search-wrapper">
          <div className="search-container">
            <input
              type="text"
              placeholder="Quick Search"
              className="search-input"
              name="searchName"
            />
          </div>
        </div>

        {/* =========== Types wise game mapping =============== */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="row pb-3 pt-md-2 px-0">
            <div className="col-12">
              <div>
                {gamesList?.data && gamesList?.data.length ? (
                  [...gamesList?.data]
                    .sort((a, b) => a.orderNo - b.orderNo)
                    .map((item, index) =>
                      item.games.length > 1 ? (
                        <div key={index}>
                          {/* <div className="d-flex flex-row tab-title">
                            <h4 className="text-capitalize text-white font-weight-700">
                              {item.categoryName}
                            </h4>
                          </div> */}
                          <HomePageGamesAllGames gameList={item.games} />
                        </div>
                      ) : null,
                    )
                ) : (
                  <NoGamesMessage />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
