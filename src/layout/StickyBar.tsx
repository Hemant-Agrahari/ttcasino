import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { setToggleSidebar } from '@/redux/models/modelReducer';
import { useAppDispatch } from '@/redux/hooks';
import CustomImage from '@/component/common/CustomImage';
import { useGetAllCategoryQuery } from '@/redux/games/gameSlice';

interface _menuItem {
  _id: string;
  title: string;
  img: string;
  path: string;
  value: string;
}

const StickyBar: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: categories } = useGetAllCategoryQuery({ sort: 'asc' });
  const { t } = useTranslation();
  const { mainTypeId } = router.query;
  const [menuItem, setMenuItem] = useState<_menuItem[]>([]);
  const base_url = process.env.NEXT_PUBLIC_IMAGE_URL;

  const menuItemList: _menuItem[] = [
    {
      _id: '1',
      title: 'Home',
      path: '/',
      img: '/assets/images/home.svg',
      value: 'Home',
    },
  ];

  const handleToggleSidebar = () => {
    dispatch(setToggleSidebar());
  };

  const handleUpperMenu = (
    path: string,
    mainType: string,
    mainTypeId: string,
  ) => {
    if (
      path === '/games-category' ||
      path === '/sport-bet' ||
      path === '/poker-game'
    ) {
      router.push({ pathname: path, query: { mainType, mainTypeId } });
    } else {
      router.push(path);
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

  const checkActiveMenu = (item: _menuItem): boolean => {
    if (typeof mainTypeId === 'string' && item._id === mainTypeId) {
      return true;
    } else if (
      router.pathname === item.path &&
      router.pathname !== '/games-category' &&
      item._id !== mainTypeId
    ) {
      return true;
    } else {
      return false;
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
      setMenuItem([menuItemList[0], ...category]);
    }
  }, [categories]);

  return (
    <>
      <div className="bottom-nav d-md-none">
        {menuItem && menuItem.length > 1 ? (
          <div
            className="nav-item cursor-pointer"
            onClick={handleToggleSidebar}
          >
            <span className="menu-img">
              <CustomImage
                src={'/assets/images/browse-icon.png'}
                alt={t('Browse')}
                width={25}
                height={25}
              />
            </span>
            <span className="nav-label">{t('Browse')}</span>
          </div>
        ) : null}
        {menuItem &&
          menuItem.length > 1 &&
          menuItem.slice(0, 5).map((item) => {
            return (
              <div
                key={item._id}
                className="nav-item cursor-pointer"
                onClick={() => handleUpperMenu(item.path, item.value, item._id)}
              >
                <span
                  className={`${checkActiveMenu(item) ? 'active-icon' : ''} menu-img d-flex align-items-center justify-content-center`}
                >
                  <CustomImage
                    src={item.img}
                    alt={`${t(item.title)}`}
                    width={24}
                    height={20}
                  />
                </span>
                <span
                  className={`nav-label ${checkActiveMenu(item) ? 'active-label' : ''} `}
                >
                  {t(item.title)}
                </span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default StickyBar;
