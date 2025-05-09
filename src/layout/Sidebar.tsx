import React, { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AffiliateModal } from '@/component/Affiliate';
import { Dialog, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useTranslation } from 'react-i18next';
import CustomImage from '@/component/common/CustomImage';
import useToggleModel from '@/customHooks/toggleModel';
import { useGetAllCategoryQuery } from '@/redux/games/gameSlice';
import { openSearchModal, setCloseSidebar } from '@/redux/models/modelReducer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Sidebar: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const authToken = useAppSelector((state) => state.user.authToken);
  const isSidebar = useAppSelector((state) => state.models.isSidebar);
  const { data: categories } = useGetAllCategoryQuery({ sort: 'asc' });
  const [showMenu, setShowMenu] = useState<string>('');
  const {
    open: openAffiliate,
    handleOpen: handleAffiliateOpen,
    handleClose: handleAffiliateClose,
  } = useToggleModel(false);
  const { mainType, subType } = router.query;
  const base_url = process.env.NEXT_PUBLIC_IMAGE_URL;

  const handleUserAuth = () => {
    router.push('/ranking-vip');
  };

  const handleArrowClick = (
    e: React.MouseEvent<HTMLDivElement>,
    game: string,
    gameId: string,
    isCloseSidebar: boolean,
  ) => {
    e.stopPropagation();
    if (isCloseSidebar) {
      handleCloseSidebar();
    }

    if (showMenu === game) {
      handleShowMenu('');
    } else {
      handleShowMenu(game);
    }

    handleRedirection(game, '', gameId);
  };

  const handleMainType = (
    e: React.MouseEvent<HTMLLIElement>,
    mainType: string,
    mainId: string,
  ) => {
    handleShowMenu(mainType);
    handleRedirection(mainType, '', mainId);
  };

  const handleCloseSidebar = () => {
    dispatch(setCloseSidebar());
  };

  const handleSubType = (
    e: React.MouseEvent<HTMLLIElement>,
    mainType: string,
    mainTypeId: string,
    subType: string,
  ) => {
    e.stopPropagation();
    handleCloseSidebar();
    handleShowMenu(mainType);
    handleRedirection(mainType, subType, mainTypeId);
  };

  const handleOpenAffiliate = () => {
    handleShowMenu('affiliate');
    handleAffiliateOpen();
  };

  // const handleSportBetting = () => {
  //   handleShowMenu('sports betting');
  //   router.push({
  //     pathname: '/sport-bet',
  //     query: { mainType: 'sports betting' },
  //   });
  // };

  const handleRedirection = (
    mainType: string,
    subType: string,
    mainTypeId: string,
  ) => {
    if (mainType === 'Sports Betting') {
      router.push({
        pathname: '/sport-bet',
        query: { mainType, mainTypeId },
      });
    } else if (mainType === 'Poker') {
      router.push({
        pathname: '/poker-game',
        query: { mainType, mainTypeId },
      });
    } else {
      router.push({
        pathname: '/games-category',
        query: { mainType, subType, mainTypeId },
      });
    }
  };

  const handleShowMenu = (menuItem: string) => {
    setShowMenu(menuItem);
  };

  const handleSearchModel = () => {
    dispatch(openSearchModal());
  };

  const closeSidebarRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!isSidebar) return;
    const handleOutSide = (e: MouseEvent) => {
      if (
        closeSidebarRef.current &&
        !closeSidebarRef.current.contains(e.target as Node)
      ) {
        dispatch(setCloseSidebar());
      }
    };
    document.addEventListener('mousedown', handleOutSide);
    return () => {
      document.removeEventListener('mousedown', handleOutSide);
    };
  }, [isSidebar]);

  const menuItemsWithTooltips = [
    {
      path: '/',
      imgSrc: '/assets/images/home.svg',
      imgAlt: 'Home',
      imgWidth: 24,
      imgHeight: 24,
      linkName: 'Home',
      tooltipContent: (
        <CustomImage
          src="/assets/images/home.svg"
          alt={'Home'}
          width={24}
          height={24}
        />
      ),
    },
    {
      path: '/promotion-center',
      imgSrc: '/assets/images/promotions.svg',
      imgAlt: 'Promotions',
      imgWidth: 24,
      imgHeight: 24,
      linkName: 'Promotions',
      tooltipContent: (
        <CustomImage
          src="/assets/images/promotions.svg"
          alt={'Promotions'}
          width={24}
          height={24}
        />
      ),
    },
    {
      path: '/ranking-vip',
      imgSrc: '/assets/images/rankvip.svg',
      imgAlt: 'Ranking VIP',
      imgWidth: 20,
      imgHeight: 20,
      linkName: 'Ranking VIP',
      tooltipContent: (
        <CustomImage
          src="/assets/images/rankvip.svg"
          alt={'Ranking VIP'}
          width={20}
          height={20}
        />
      ),
    },
    {
      path: '#',
      imgSrc: '/assets/images/affiliate.svg',
      imgAlt: 'Affiliate',
      imgWidth: 20,
      imgHeight: 20,
      linkName: 'Affiliate',
      tooltipContent: (
        <>
          <CustomImage
            src="/assets/images/affiliate.svg"
            alt={'Affiliate'}
            width={20}
            height={20}
          />
        </>
      ),
    },
    {
      path: '/contact-us',
      imgSrc: '/assets/images/livesupport.svg',
      imgAlt: 'Live Support',
      imgWidth: 20,
      imgHeight: 20,
      linkName: 'LiveSupport',
      tooltipContent: (
        <CustomImage
          src="/assets/images/livesupport.svg"
          alt={'Live Support'}
          width={20}
          height={20}
        />
      ),
    },
    {
      path: '#',
      imgSrc: '/assets/images/telegram.svg',
      imgAlt: 'Telegram',
      imgWidth: 20,
      imgHeight: 20,
      linkName: 'Telegram',
      tooltipContent: (
        <CustomImage
          src="/assets/images/telegram.svg"
          alt={'Telegram'}
          width={20}
          height={20}
        />
      ),
    },
    {
      path: '/',
      imgSrc: '/assets/images/search_icon.png',
      imgAlt: 'Search games',
      imgWidth: 24,
      imgHeight: 24,
      linkName: 'Search games',
      tooltipContent: (
        <CustomImage
          src="/assets/images/search_icon.png"
          alt={'Search games'}
          width={24}
          height={24}
        />
      ),
    },
  ];

  return (
    <div className="d-md-block">
      <div
        className={` sidebar ${isSidebar ? ' sidebarOpen  ' : ' close'}`}
        ref={closeSidebarRef}
      >
        <div
          onClick={handleCloseSidebar}
          className="close-button text-white d-flex d-md-none  justify-content-end"
        >
          <ArrowForwardIosIcon className="close-icon" />
        </div>

        {isSidebar ? (
          <ul className="nav-links">
            {/* search model */}
            <li
              className=" d-md-none d-block"
              onClick={() => handleSearchModel()}
            >
              <Link href="#">
                <div className="link_img">
                  <CustomImage
                    src={menuItemsWithTooltips[6].imgSrc}
                    alt={t(menuItemsWithTooltips[6].imgAlt)}
                    width={menuItemsWithTooltips[6].imgWidth}
                    height={menuItemsWithTooltips[6].imgHeight}
                  />
                </div>
                <span className="link_name">
                  {t(menuItemsWithTooltips[6].linkName)}
                </span>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <a className="link_name" href="#">
                    {t(menuItemsWithTooltips[6].linkName)}
                  </a>
                </li>
              </ul>
            </li>

            <li
              onClick={() => handleShowMenu(menuItemsWithTooltips[0].linkName)}
            >
              <Link
                href={menuItemsWithTooltips[0].path}
                className={
                  router.pathname === menuItemsWithTooltips[0].path
                    ? `${menuItemsWithTooltips[0].linkName.toLowerCase()} active`
                    : ``
                }
              >
                <div className="link_img">
                  <CustomImage
                    src={menuItemsWithTooltips[0].imgSrc}
                    alt={t(menuItemsWithTooltips[0].imgAlt)}
                    width={menuItemsWithTooltips[0].imgWidth}
                    height={menuItemsWithTooltips[0].imgHeight}
                  />
                </div>
                <span className="link_name">
                  {t(menuItemsWithTooltips[0].linkName)}
                </span>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <a className="link_name" href="#">
                    {t(menuItemsWithTooltips[0].linkName)}
                  </a>
                </li>
              </ul>
            </li>

            {categories &&
              categories.data.length > 0 &&
              categories.data.map((item, index) => (
                <Fragment key={index}>
                  {item.categoryName ? (
                    <li
                      className={` ${showMenu === item.categoryName ? 'showMenu' : ''} cursor-pointer`}
                    >
                      <div
                        className={`icon-link ${mainType === item.categoryName ? 'enable' : ''}`}
                        onClick={(e) =>
                          // item.categoryName === 'Sports Betting'
                          //   ? handleSportBetting()
                          //   :
                          handleArrowClick(
                            e,
                            item.categoryName,
                            item._id,
                            item.subCategory && item.subCategory?.length === 1
                              ? true
                              : false,
                          )
                        }
                        style={
                          (item.subCategory && item.subCategory?.length == 1) ||
                          showMenu === ''
                            ? { borderRadius: '10px' }
                            : {}
                        }
                      >
                        <div className="menu-link">
                          <div className="link_img">
                            <CustomImage
                              src={
                                item.imageUrl
                                  ? `${base_url}${item.imageUrl}`
                                  : '/assets/images/slots.svg'
                              }
                              alt={item.categoryName}
                              width={24}
                              height={24}
                            />
                          </div>
                          <span className="link_name">{item.categoryName}</span>
                        </div>

                        {item.subCategory && item.subCategory?.length > 1 && (
                          <svg
                            className={`arrow ${showMenu === item.categoryName ? 'showMenu' : 'showMenu'}`}
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 512 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill="none"
                              stroke-linecap="square"
                              stroke-miterlimit="10"
                              stroke-width="48"
                              d="m112 184 144 144 144-144"
                            ></path>
                          </svg>
                        )}
                      </div>
                      {item.subCategory && item.subCategory?.length > 1 && (
                        <ul className={`sub-menu`}>
                          {item?.subCategory &&
                            item?.subCategory?.length > 1 &&
                            item?.subCategory.map((subGames) => (
                              <Fragment key={subGames._id}>
                                {subGames.name ? (
                                  <li
                                    onClick={(e) =>
                                      handleSubType(
                                        e,
                                        item.categoryName,
                                        item._id,
                                        subGames?.name,
                                      )
                                    }
                                  >
                                    <a
                                      className={`active ${item.subCategory?.length === 1 ? 'py-0' : ''}`}
                                      href="#"
                                    >
                                      <CustomImage
                                        src={
                                          subGames?.image
                                            ? `${base_url}${subGames.image}`
                                            : '/assets/images/slots.svg'
                                        }
                                        alt={subGames?.name}
                                        width={24}
                                        height={24}
                                      />
                                      <span
                                        className={
                                          subGames?.name === subType
                                            ? isSidebar
                                              ? 'subGameActive'
                                              : ''
                                            : ''
                                        }
                                      >
                                        {subGames?.name}
                                      </span>
                                    </a>
                                  </li>
                                ) : null}
                              </Fragment>
                            ))}
                        </ul>
                      )}
                    </li>
                  ) : null}
                </Fragment>
              ))}

            <div className="sidebar_divider" />

            <li
              onClick={() => handleShowMenu(menuItemsWithTooltips[1].linkName)}
            >
              <Link
                href={menuItemsWithTooltips[1].path}
                className={
                  router.pathname === menuItemsWithTooltips[1].path
                    ? `${menuItemsWithTooltips[1].linkName.toLowerCase()} active`
                    : ``
                }
              >
                <div className="link_img">
                  <CustomImage
                    src={menuItemsWithTooltips[1].imgSrc}
                    alt={t(menuItemsWithTooltips[1].imgAlt)}
                    width={menuItemsWithTooltips[1].imgWidth}
                    height={menuItemsWithTooltips[1].imgHeight}
                  />
                </div>
                <span className="link_name">
                  {t(menuItemsWithTooltips[1].linkName)}
                </span>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <a className="link_name" href="#">
                    {t(menuItemsWithTooltips[1].linkName)}
                  </a>
                </li>
              </ul>
            </li>

            {authToken ? (
              <>
                <li
                  onClick={() =>
                    handleShowMenu(menuItemsWithTooltips[2].linkName)
                  }
                >
                  <div
                    className={
                      router.pathname === menuItemsWithTooltips[2].path
                        ? `${menuItemsWithTooltips[2].linkName.toLowerCase()} active`
                        : ``
                    }
                    onClick={handleUserAuth}
                  >
                    <div className="link_img">
                      <CustomImage
                        src={menuItemsWithTooltips[2].imgSrc}
                        alt={t(menuItemsWithTooltips[2].imgAlt)}
                        width={menuItemsWithTooltips[2].imgWidth}
                        height={menuItemsWithTooltips[2].imgHeight}
                      />
                    </div>
                    <span className="link_name">
                      {t(menuItemsWithTooltips[2].linkName)}
                    </span>
                  </div>
                  <ul className="sub-menu blank">
                    <li>
                      <a className="link_name" href="#">
                        {t(menuItemsWithTooltips[2].linkName)}
                      </a>
                    </li>
                  </ul>
                </li>

                <li
                  onClick={() =>
                    handleShowMenu(menuItemsWithTooltips[3].linkName)
                  }
                >
                  <div
                    className={
                      router.pathname === menuItemsWithTooltips[3].path
                        ? `${menuItemsWithTooltips[3].linkName.toLowerCase()} active`
                        : ``
                    }
                    onClick={handleOpenAffiliate}
                  >
                    <div className="link_img">
                      <CustomImage
                        src={menuItemsWithTooltips[3].imgSrc}
                        alt={t(menuItemsWithTooltips[3].imgAlt)}
                        width={menuItemsWithTooltips[3].imgWidth}
                        height={menuItemsWithTooltips[3].imgHeight}
                      />
                    </div>
                    <span className="link_name">
                      {t(menuItemsWithTooltips[3].linkName)}
                    </span>
                  </div>
                  <ul className="sub-menu blank">
                    <li>
                      <a className="link_name" href="#">
                        {t(menuItemsWithTooltips[3].linkName)}
                      </a>
                    </li>
                  </ul>
                </li>
              </>
            ) : null}

            <li
              onClick={() => handleShowMenu(menuItemsWithTooltips[4].linkName)}
            >
              <Link
                href={menuItemsWithTooltips[4].path}
                className={
                  router.pathname === menuItemsWithTooltips[4].path
                    ? `${menuItemsWithTooltips[4].linkName.toLowerCase()} active`
                    : ``
                }
              >
                <div className="link_img">
                  <CustomImage
                    src={menuItemsWithTooltips[4].imgSrc}
                    alt={t(menuItemsWithTooltips[4].imgAlt)}
                    width={menuItemsWithTooltips[4].imgWidth}
                    height={menuItemsWithTooltips[4].imgHeight}
                  />
                </div>
                <span className="link_name">
                  {t(menuItemsWithTooltips[4].imgAlt)}
                </span>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <a className="link_name" href="#">
                    {t(menuItemsWithTooltips[4].linkName)}
                  </a>
                </li>
              </ul>
            </li>

            <li
              onClick={() => handleShowMenu(menuItemsWithTooltips[5].linkName)}
            >
              <Link
                href={menuItemsWithTooltips[5].path}
                className={
                  router.pathname === menuItemsWithTooltips[5].path
                    ? `${menuItemsWithTooltips[5].linkName.toLowerCase()} active`
                    : ``
                }
              >
                <div className="link_img">
                  <CustomImage
                    src={menuItemsWithTooltips[5].imgSrc}
                    alt={t(menuItemsWithTooltips[5].imgAlt)}
                    width={menuItemsWithTooltips[5].imgWidth}
                    height={menuItemsWithTooltips[5].imgHeight}
                  />
                </div>
                <span className="link_name">
                  {t(menuItemsWithTooltips[5].linkName)}
                </span>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <a className="link_name" href="#">
                    {t(menuItemsWithTooltips[5].linkName)}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        ) : (
          <ul className="nav-links">
            {/* search model */}
            <li
              className="d-md-none d-block"
              onClick={() => handleSearchModel()}
            >
              <Link href="#">
                <Tooltip
                  placement="right-end"
                  arrow
                  title={
                    <div className="sidebar-mobile">
                      <div className="nav-links">
                        <ul className="ps-0 mb-0 list-unstyled sub-menu">
                          <li>
                            <div className="link_name px-0">
                              {menuItemsWithTooltips[6].tooltipContent}{' '}
                              {t(menuItemsWithTooltips[6].linkName)}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  }
                >
                  <div className="link_img">
                    <CustomImage
                      src={menuItemsWithTooltips[6].imgSrc}
                      alt={t(menuItemsWithTooltips[6].imgAlt)}
                      width={menuItemsWithTooltips[6].imgWidth}
                      height={menuItemsWithTooltips[6].imgHeight}
                    />
                  </div>
                </Tooltip>
              </Link>
            </li>

            <li
              onClick={() => handleShowMenu(menuItemsWithTooltips[0].linkName)}
            >
              <Link
                href={menuItemsWithTooltips[0].path}
                className={
                  router.pathname === menuItemsWithTooltips[0].path
                    ? `${menuItemsWithTooltips[0].linkName.toLowerCase()} active`
                    : ``
                }
              >
                <Tooltip
                  placement="right-end"
                  arrow
                  title={
                    <div className="sidebar-mobile">
                      <div className="nav-links">
                        <ul className="ps-0 mb-0 list-unstyled sub-menu">
                          <li>
                            <div className="link_name px-0">
                              {menuItemsWithTooltips[0].tooltipContent}{' '}
                              {t(menuItemsWithTooltips[0].linkName)}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  }
                >
                  <div className="link_img">
                    <CustomImage
                      src={menuItemsWithTooltips[0].imgSrc}
                      alt={t(menuItemsWithTooltips[0].imgAlt)}
                      width={menuItemsWithTooltips[0].imgWidth}
                      height={menuItemsWithTooltips[0].imgHeight}
                    />
                  </div>
                </Tooltip>
              </Link>
            </li>

            {categories &&
              categories.data.length > 0 &&
              categories.data.map((item, index) => (
                <Fragment key={index}>
                  {item.categoryName ? (
                    <Tooltip
                      placement="right-start"
                      arrow
                      className="tooltip-sub-menu"
                      slotProps={{
                        tooltip: {
                          sx: {
                            maxHeight: '500px',
                            overflowY: 'auto',

                            // Firefox
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'var(--medium-violet) transparent',

                            // Chrome/Safari
                            '&::-webkit-scrollbar': {
                              width: '6px',
                            },
                            '&::-webkit-scrollbar-track': {
                              background: 'transparent',
                            },
                            '&::-webkit-scrollbar-thumb': {
                              backgroundColor: 'var(--medium-violet)',
                              borderRadius: '10px',
                            },
                            /* Hide the scrollbar arrows */
                            '&::-webkit-scrollbar-button': {
                              display: 'none',
                            },
                          },
                        },
                      }}
                      title={
                        <div className="sidebar-mobile">
                          <div className="nav-links">
                            <ul className={` ps-0 mb-0 list-unstyled sub-menu`}>
                              {item.subCategory &&
                                item.subCategory.length > 1 && (
                                  <li
                                    className="border-bottom py-1 text-capitalize"
                                    style={{ fontSize: '13px' }}
                                    onClick={(e) =>
                                      // item.categoryName === 'Sports Betting'
                                      //   ? handleSportBetting()
                                      //   :
                                      handleMainType(
                                        e,
                                        item.categoryName,
                                        item._id,
                                      )
                                    }
                                  >
                                    <CustomImage
                                      src={
                                        item.imageUrl
                                          ? `${base_url}${item.imageUrl}`
                                          : '/assets/images/slots.svg'
                                      }
                                      alt={item.categoryName}
                                      width={30}
                                      height={30}
                                    />
                                    <span style={{ paddingLeft: '6px' }}>
                                      {item.categoryName}
                                    </span>
                                  </li>
                                )}

                              {item.subCategory &&
                              item.subCategory?.length > 0 ? (
                                item.subCategory.map((subGames) => (
                                  <Fragment key={subGames._id}>
                                    {subGames.name ? (
                                      <li
                                        onClick={(e) =>
                                          // item.categoryName === 'Sports Betting'
                                          //   ? handleSportBetting()
                                          //   :
                                          handleSubType(
                                            e,
                                            item.categoryName,
                                            item._id,
                                            subGames.name,
                                          )
                                        }
                                      >
                                        <div
                                          className={`active px-0 ${item.subCategory?.length === 1 ? 'py-0' : ''}`}
                                        >
                                          <CustomImage
                                            src={
                                              subGames?.image
                                                ? `${base_url}${subGames.image}`
                                                : '/assets/images/slots.svg'
                                            }
                                            alt={subGames?.name}
                                            width={24}
                                            height={24}
                                          />
                                          <span
                                            className={
                                              subGames?.name === subType
                                                ? isSidebar
                                                  ? 'subGameActive'
                                                  : ''
                                                : ''
                                            }
                                          >
                                            {subGames.name}
                                          </span>
                                        </div>
                                      </li>
                                    ) : null}
                                  </Fragment>
                                ))
                              ) : (
                                <li
                                  onClick={(e) =>
                                    // item.categoryName === 'Sports Betting'
                                    //   ? handleSportBetting()
                                    //   :
                                    handleMainType(
                                      e,
                                      item.categoryName,
                                      item._id,
                                    )
                                  }
                                >
                                  <div
                                    className={`active px-0 ${item.subCategory?.length === 1 ? 'py-0' : ''}`}
                                  >
                                    <CustomImage
                                      src={
                                        item?.imageUrl
                                          ? `${base_url}${item.imageUrl}`
                                          : '/assets/images/slots.svg'
                                      }
                                      alt={item?.categoryName}
                                      width={24}
                                      height={24}
                                    />
                                    <span>{item.categoryName}</span>
                                  </div>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      }
                    >
                      <li
                        style={{ cursor: 'pointer' }}
                        className={` ${showMenu === item.categoryName ? 'showMenu' : ''}`}
                        onClick={(e) =>
                          // item.categoryName === 'Sports Betting'
                          //   ? handleSportBetting()
                          //   :
                          handleMainType(e, item.categoryName, item._id)
                        }
                      >
                        <div
                          className={`icon-link ${mainType === item.categoryName ? 'enable' : ''}`}
                        >
                          <div className="menu-link">
                            <div className="link_img">
                              <CustomImage
                                src={
                                  item.imageUrl
                                    ? `${base_url}${item.imageUrl}`
                                    : '/assets/images/slots.svg'
                                }
                                alt={item.categoryName}
                                width={24}
                                height={24}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    </Tooltip>
                  ) : null}
                </Fragment>
              ))}

            <div className="sidebar_divider" />

            <li
              onClick={() => handleShowMenu(menuItemsWithTooltips[1].linkName)}
            >
              <Link
                href={menuItemsWithTooltips[1].path}
                className={
                  router.pathname === menuItemsWithTooltips[1].path
                    ? `${menuItemsWithTooltips[1].linkName.toLowerCase()} active`
                    : ``
                }
              >
                <Tooltip
                  placement="right-end"
                  arrow
                  title={
                    <div className="sidebar-mobile">
                      <div className="nav-links">
                        <ul className="ps-0 mb-0 list-unstyled sub-menu">
                          <li>
                            <div className="link_name px-0">
                              {menuItemsWithTooltips[1].tooltipContent}{' '}
                              {t(menuItemsWithTooltips[1].linkName)}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  }
                >
                  <div className="link_img">
                    <CustomImage
                      src={menuItemsWithTooltips[1].imgSrc}
                      alt={t(menuItemsWithTooltips[1].imgAlt)}
                      width={menuItemsWithTooltips[1].imgWidth}
                      height={menuItemsWithTooltips[1].imgHeight}
                    />
                  </div>
                </Tooltip>
              </Link>
            </li>

            {/* Menus */}
            {authToken ? (
              <>
                <li
                  onClick={() =>
                    handleShowMenu(menuItemsWithTooltips[2].linkName)
                  }
                >
                  <div
                    className={
                      router.pathname === menuItemsWithTooltips[2].path
                        ? `${menuItemsWithTooltips[2].linkName.toLowerCase()} active`
                        : ``
                    }
                    onClick={handleUserAuth}
                  >
                    <Tooltip
                      placement="right-end"
                      arrow
                      title={
                        <div className="sidebar-mobile">
                          <div className="nav-links">
                            <ul className="ps-0 mb-0 list-unstyled sub-menu">
                              <li>
                                <div className="link_name px-0">
                                  {menuItemsWithTooltips[2].tooltipContent}{' '}
                                  {t(menuItemsWithTooltips[2].linkName)}
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      }
                    >
                      <div className="link_img">
                        <CustomImage
                          src={menuItemsWithTooltips[2].imgSrc}
                          alt={t(menuItemsWithTooltips[2].imgAlt)}
                          width={menuItemsWithTooltips[2].imgWidth}
                          height={menuItemsWithTooltips[2].imgHeight}
                        />
                      </div>
                    </Tooltip>
                  </div>
                </li>

                <li onClick={handleOpenAffiliate}>
                  <div
                    className={
                      router.pathname === menuItemsWithTooltips[3].path
                        ? `${menuItemsWithTooltips[3].linkName.toLowerCase()} active`
                        : ``
                    }
                  >
                    <Tooltip
                      placement="right-end"
                      arrow
                      title={
                        <div className="sidebar-mobile">
                          <div className="nav-links">
                            <ul className="ps-0 mb-0 list-unstyled sub-menu">
                              <li>
                                <div className="link_name px-0">
                                  {menuItemsWithTooltips[3].tooltipContent}{' '}
                                  {t(menuItemsWithTooltips[3].linkName)}
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      }
                    >
                      <div className="link_img">
                        <CustomImage
                          src={menuItemsWithTooltips[3].imgSrc}
                          alt={t(menuItemsWithTooltips[3].imgAlt)}
                          width={menuItemsWithTooltips[3].imgWidth}
                          height={menuItemsWithTooltips[3].imgHeight}
                        />
                      </div>
                    </Tooltip>
                  </div>
                </li>
              </>
            ) : null}

            <li
              onClick={() => handleShowMenu(menuItemsWithTooltips[4].linkName)}
            >
              <Link
                href={menuItemsWithTooltips[4].path}
                className={
                  router.pathname === menuItemsWithTooltips[4].path
                    ? `${menuItemsWithTooltips[4].linkName.toLowerCase()} active`
                    : ``
                }
              >
                <Tooltip
                  placement="right-end"
                  arrow
                  title={
                    <div className="sidebar-mobile">
                      <div className="nav-links">
                        <ul className="ps-0 mb-0 list-unstyled sub-menu">
                          <li>
                            <div className="link_name px-0">
                              {menuItemsWithTooltips[4].tooltipContent}{' '}
                              {t(menuItemsWithTooltips[4].imgAlt)}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  }
                >
                  <div className="link_img">
                    <CustomImage
                      src={menuItemsWithTooltips[4].imgSrc}
                      alt={t(menuItemsWithTooltips[4].imgAlt)}
                      width={menuItemsWithTooltips[4].imgWidth}
                      height={menuItemsWithTooltips[4].imgHeight}
                    />
                  </div>
                </Tooltip>
              </Link>
            </li>

            <li
              onClick={() => handleShowMenu(menuItemsWithTooltips[5].linkName)}
            >
              <Link
                href={menuItemsWithTooltips[5].path}
                className={
                  router.pathname === menuItemsWithTooltips[5].path
                    ? `${menuItemsWithTooltips[5].linkName.toLowerCase()} active`
                    : ``
                }
              >
                <Tooltip
                  placement="right-end"
                  arrow
                  title={
                    <div className="sidebar-mobile">
                      <div className="nav-links">
                        <ul className="ps-0 mb-0 list-unstyled sub-menu">
                          <li>
                            <div className="link_name px-0">
                              {menuItemsWithTooltips[5].tooltipContent}{' '}
                              {t(menuItemsWithTooltips[5].linkName)}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  }
                >
                  <div className="link_img">
                    <CustomImage
                      src={menuItemsWithTooltips[5].imgSrc}
                      alt={t(menuItemsWithTooltips[5].imgAlt)}
                      width={menuItemsWithTooltips[5].imgWidth}
                      height={menuItemsWithTooltips[5].imgHeight}
                    />
                  </div>
                </Tooltip>
              </Link>
            </li>
          </ul>
        )}
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

export default Sidebar;
