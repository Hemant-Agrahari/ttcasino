import React, { useEffect, useRef, useState } from 'react';
import HomeGames from '@/component/Homepage/HomeGames';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { commonStaticProps } from '@/utils/translation';
import dynamic from 'next/dynamic';
import useDebounce from '@/utils/useDebounce';
import Loader from '@/component/common/mui-component/Loader';
import GameFilterBar from '@/component/common/GameSearch';
import { isMobile } from 'react-device-detect';
import { useLazyGetGameListQuery } from '@/redux/games/gameSlice';
import { handleError } from '@/utils/errorHandler';
import { RTKError } from '@/types/user';
import { gameData } from '@/types/game';
import { toast } from 'react-toastify';

// Method is for language switch
export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return commonStaticProps(locale!);
};

function GameCategory(): React.JSX.Element {
  const router = useRouter();
  const [getGameList] = useLazyGetGameListQuery();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gameList, setGameList] = useState<gameData[]>([]);
  const { mainType, mainTypeId, subType } = router.query as any;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sorting, setSorting] = useState<string>('new');
  const [provider, setProvider] = useState<string>('');
  const gameLimits = useRef<number>(0);
  const totalRecords = useRef<number>(0);

  const handleSearch = (value: string) => setSearchQuery(value);
  const handleSorting = (value: string) => setSorting(value);
  const handleProvider = (value: string) => setProvider(value);

  const capitalize = (str: string) =>
    str?.charAt(0).toUpperCase() + str?.slice(1);

  const fetchGame = async (
    skip: number,
    mainType?: string,
    subType?: string,
  ) => {
    const params = {
      skip: skip,
      limit: 24,
      sort: sorting,
      isMobile: isMobile,
      search: searchQuery,
      categoryName: capitalize(mainType as string) || '',
      subcategoryName: subType || '',
      providerName: provider || '',
    };

    try {
      const res = await getGameList(params).unwrap();
      if (res.status === 'success') {
        if (skip === 0) {
          setGameList(res.data.getgameList);
        } else {
          setGameList((prev) => [...prev, ...res.data.getgameList]);
        }
        totalRecords.current = res.data.totalRecords;
      } else {
        toast.error(res.message);
      }
    } catch (error: unknown) {
      handleError(error as RTKError);
    } finally {
      setIsLoading(false);
    }
  };

  const debounce = useDebounce(fetchGame, 500);

  const handleGameLimit = () => {
    gameLimits.current = gameLimits.current + 24;
    fetchGame(gameLimits.current, mainType as string, subType as string);
  };

  useEffect(() => {
    setGameList([]);
    gameLimits.current = 0;
    setIsLoading(true);
    debounce(0, mainType as string, subType as string);
  }, [searchQuery, mainType, subType, provider, sorting]);

  useEffect(() => {
    handleProvider('');
    handleSorting('new');
  }, [mainType, subType]);

  useEffect(() => {
    handleSearch('');
  }, [mainType]);

  return (
    <>
      <div className="gameCategory container-fluid">
        <div className="d-flex  flex-row tab-title mt-3">
          <h4 className="text-capitalize fw-bold">
            {subType ? `${mainType} / ${subType}` : mainType}
          </h4>
        </div>

        <GameFilterBar
          mainType={capitalize(mainType as string)}
          subType={subType}
          searchQuery={searchQuery}
          sorting={sorting}
          provider={provider}
          handleSearch={handleSearch}
          handleSorting={handleSorting}
          handleProvider={handleProvider}
        />

        {isLoading ? (
          <Loader />
        ) : (
          <div className="row  p-md-3 pb-3 pt-2 px-0">
            <div className="col-12">
              <div>
                <HomeGames
                  gameList={gameList}
                  handleGameLimit={handleGameLimit}
                  totalGames={totalRecords.current}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(GameCategory), {
  ssr: false,
});
