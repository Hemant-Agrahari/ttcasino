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
import GameListSlider from '@/component/GameListSlider';

// Method is for language switch
export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return commonStaticProps(locale!);
};

function Home() {
  const { data: gamesList, isLoading } = useGetHomeGameQuery();

  return (
    <div>
      <div className="">
        {/* Silder */}
        <TopBanners />
        {/* Game List */}

        <GameListSlider />
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
