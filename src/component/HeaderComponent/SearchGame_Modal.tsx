import React, { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { CustomButton } from '../common';
import { useAppDispatch } from '@/redux/hooks';
import { closeSearchModal } from '@/redux/models/modelReducer';
import { useLazyGetGameListQuery } from '@/redux/games/gameSlice';
import { gameData } from '@/types/game';
import { toast } from 'react-toastify';
import { handleError } from '@/utils/errorHandler';
import { RTKError } from '@/types/user';
import useDebounce from '@/utils/useDebounce';
import { isMobile } from 'react-device-detect';
import Loader from '../common/mui-component/Loader';
import HomeGames from '../Homepage/HomeGames';
import HeaderFilterBar from '../common/HeaderSearch';
const SearchGame_Modal = () => {
  const dispatch = useAppDispatch();
  const [getGameList] = useLazyGetGameListQuery();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gameList, setGameList] = useState<gameData[]>([]);
  const [provider, setProvider] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [subCategory, setSubCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sorting, setSorting] = useState<string>('new');
  const gameLimits = useRef<number>(0);
  const totalRecords = useRef<number>(0);
  const handleSearch = (value: string) => setSearchQuery(value);
  const handleSorting = (value: string) => setSorting(value);
  const handleProvider = (value: string) => setProvider(value);
  const handleCategory = (value: string) => setCategory(value);
  const handleSubCategory = (value: string) => setSubCategory(value);

  const capitalize = (str: string) =>
    str?.charAt(0).toUpperCase() + str?.slice(1);

  const fetchGame = async (
    skip: number,
    category?: string,
    subCategory?: string,
  ) => {
    const params = {
      skip: skip,
      limit: 15,
      sort: sorting,
      isMobile: isMobile,
      search: searchQuery,
      categoryName: capitalize(category as string) || '',
      subcategoryName: subCategory || '',
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
    fetchGame(gameLimits.current, category as string, subCategory as string);
  };

  useEffect(() => {
    handleSorting('new');
    handleProvider('');
  }, [category, subCategory]);

  useEffect(() => {
    handleSearch('');
    handleSubCategory('');
  }, [category]);

  useEffect(() => {
    setGameList([]);
    gameLimits.current = 0;
    setIsLoading(true);
    debounce(0, category as string, subCategory as string);
  }, [searchQuery, category, subCategory, provider, sorting]);

  return (
    <div className="modal-content search-modal-container">
      <div className="modal_closebtn">
        <CustomButton
          type="button"
          className="close_form_btn"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => dispatch(closeSearchModal())}
        >
          <CloseIcon className="text-white" />
        </CustomButton>
      </div>
      <div className="modal-body p-0  pt-3">
        <div className="row">
          <div className="col-12">
            <HeaderFilterBar
              category={capitalize(category as string)}
              subcategory={subCategory}
              searchQuery={searchQuery}
              sorting={sorting}
              provider={provider}
              handleSearch={handleSearch}
              handleSorting={handleSorting}
              handleProvider={handleProvider}
              handleCategory={handleCategory}
              handleSubCategory={handleSubCategory}
            />
            <div className="row  py-md-3 py-3 px-0 modal-slots-Game">
              <div className="modal-game-list">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchGame_Modal;
