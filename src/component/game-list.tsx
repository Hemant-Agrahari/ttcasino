import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CustomImage from '../component/common/CustomImage';
import { useGetAllCategoryQuery } from '@/redux/games/gameSlice';
import { Dialog } from '@mui/material';
import { AffiliateModal } from '../component/Affiliate';
import useToggleModel from '@/customHooks/toggleModel';
import { useAppDispatch } from '@/redux/hooks';
import { openSearchModal } from '@/redux/models/modelReducer';
import { useTranslation } from 'react-i18next';
interface _props {
  isUpperSlider?: boolean;
  slug?: string;
}

interface _upperMenu {
  _id: string;
  title: string;
  img: string;
  path: string;
  value: string;
}

const GameList: React.FC<_props> = ({slug}) => {
  const router = useRouter();
  const base_url = process.env.NEXT_PUBLIC_IMAGE_URL;
  const { data: categories } = useGetAllCategoryQuery({ sort: 'asc' });
  const [upperMenu, setUpperMenu] = useState<_upperMenu[]>([]);
  const {
    open: openAffiliate,
    handleOpen: handleAffiliateOpen,
    handleClose: handleAffiliateClose,
  } = useToggleModel(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { mainType } = router.query;

  const handleSearchModel = () => {
    dispatch(openSearchModal());
  };

  const upperMenuStatic = [
    {
      _id: '1',
      title: 'Search games',
      img: '/assets/images/search_icon.png',
      path: '/search_games',
      value: 'Search games',
    },
    {
      _id: '2',
      title: 'Home',
      img: '/assets/images/home.svg',
      path: '/',
      value: 'allgames',
    },
    {
      _id: '3',
      title: 'Promotions',
      img: '/assets/images/promotions.svg',
      path: '/promotion-center',
      value: 'allgames',
    },
    {
      _id: '4',
      title: 'Affiliate',
      img: '/assets/images/affiliate.svg',
      path: '/Affiliate',
      value: 'allgames',
    },
    {
      _id: '5',
      title: 'Ranking VIP',
      img: '/assets/images/rankvip.svg',
      path: '/ranking-vip',
      value: 'allgames',
    },
    {
      _id: '6',
      title: 'Live Support',
      img: '/assets/images/livesupport.svg',
      path: '/contact-us',
      value: 'allgames',
    },
    {
      _id: '7',
      title: 'Telegram',
      img: '/assets/images/telegram.svg',
      path: '#',
      value: 'allgames',
    },
  ];

  const handleUpperMenu = (
    path: string | null,
    mainType: string,
    mainTypeId: string,
  ) => {
    if (
      path === '/games-category' ||
      path === '/sport-bet' ||
      path === '/poker-game'
    ) {
      router.push({ pathname: path, query: { mainType, mainTypeId } });
    } else if (path === '/Affiliate') {
      handleAffiliateOpen();
    } else if (path === '/search_games') {
      handleSearchModel();
    } else {
      router.push(path!);
    }
  };

  const checkPath = (categoryName: string): string => {
    if (categoryName === 'Sports Betting') {
      return '/sport-bet';
    } else if (categoryName === 'Poker') {
      return '/poker-game';
    } else {
      return '/games-category';
    }
  };

  useEffect(() => {
    if (categories) {
      const category = categories.data.map((item) => ({
        _id: item._id,
        title: item.categoryName,
        img: item.imageUrl
          ? `${base_url}${item.imageUrl}`
          : '/assets/images/slots.svg',
        path: checkPath(item.categoryName),
        value: item.categoryName,
      }));
      setUpperMenu([
        upperMenuStatic[0],
        upperMenuStatic[1],
        ...category,
        ...upperMenuStatic.slice(2),
      ]);
    }
  }, [categories]);

  return (
    <div className="mt-xl-5 mt-4 vip-slider" id="Game_Section">
      <div>
          <div className="Game_Section">
            {upperMenu &&
              upperMenu.length > 0 &&
              upperMenu.map((item: _upperMenu, index: number) => (
                <Fragment key={index}>
                  {item.title ? (
                    <div
                      className={
                        mainType === item.value ||
                        (slug === item.value && router.pathname === item.path)
                          ? 'g_section_sub g_HignLight'
                          : 'g_section_sub'
                      }
                      onClick={() =>
                        handleUpperMenu(item.path, item.value, item._id)
                      }
                    >
                      <CustomImage
                        src={item.img}
                        width={50}
                        height={50}
                        alt={t(item.title)}
                      />
                      <div className="title_template text-capitalize">
                        {t(item.title)}
                      </div>
                    </div>
                  ) : null}
                </Fragment>
              ))}
          </div>
      </div>
      <Dialog
        open={openAffiliate}
        className="affiliateModal"
        scroll="body"
        maxWidth="md"
      >
        <AffiliateModal handleCloseAffiliate={handleAffiliateClose} />
      </Dialog>
    </div>
  );
};

export default GameList;
