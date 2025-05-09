import {
  Button,
  ClickAwayListener,
  Grow,
  LinearProgress,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import CustomImage from '@/component/common/CustomImage';
import { userProfilePhoto } from '@/utils/userProfilePhotos';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { copyToClipboard } from '@/utils/commonMethod';
import vip_banner from '../../../public/assets/images/vip_banner.png';
import Link from 'next/link';
import { useLogoutMutation } from '@/redux/user/userSlice';
import { removeUser } from '@/redux/user/userReducer';
import { toast } from 'react-toastify';
import { handleError } from '@/utils/errorHandler';
import { RTKError } from '@/types/user';
import { useSocket } from '@/services/socketProvider';
import { setCloseSidebar } from '@/redux/models/modelReducer';

const HeaderVip: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [logoutService] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const searchParams = new URLSearchParams(window.location.search);
  const referralCode = searchParams.get('referralcode');
  const agentId = searchParams.get('agentId');
  const anchorRef = useRef<any>(null);
  const { t } = useTranslation();
  const { isConnected, emitEvent } = useSocket();
  const user = useAppSelector((state) => state.user.user);
  const depositPercentage = user?.vipLevelDetails?.depositPer;
  const betPercentage = user?.vipLevelDetails?.betPer;

  const handleToggle = () => {
    if (window.matchMedia('(max-width: 992px)').matches) {
      dispatch(setCloseSidebar());
    }
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef?.current && anchorRef.current?.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown: React.KeyboardEventHandler<HTMLUListElement> = (
    event,
  ) => {
    if (event?.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logoutService(null).unwrap();
      if (res.status === 'success') {
        dispatch(removeUser());
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error: unknown) {
      dispatch(removeUser());
      handleError(error as RTKError);
    }
  };

  const result =
    depositPercentage === undefined
      ? 0
      : depositPercentage >= 100
        ? 100
        : depositPercentage > 0
          ? parseFloat(depositPercentage.toFixed(2))
          : 0;

  const betResult =
    betPercentage === undefined
      ? 0
      : betPercentage >= 100
        ? 100
        : betPercentage > 0
          ? parseFloat(betPercentage.toFixed(2))
          : 0;

  useEffect(() => {
    if (referralCode || agentId) {
      handleLogout();
    }
  }, [referralCode, agentId]);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef && anchorRef?.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (user?._id && isConnected) {
      emitEvent('playerConnect', { playerId: user?._id });
    }
  }, [user?._id, isConnected]);

  return (
    <>
      <Button
        disableRipple
        aria-controls={open ? 'headerProfile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        className={`headerProfile-btn ${open ? 'active' : 'undefine'}`}
        variant="contained"
        disableElevation
        onClick={handleToggle}
        endIcon={<KeyboardArrowDown />}
        ref={anchorRef}
      >
        <span className="profile-img">
          <CustomImage
            src={userProfilePhoto[Number(user?.avatar) || 0]?.image}
            alt={t('UserPhoto')}
            key={userProfilePhoto[Number(user?.avatar) || 0]?.id}
            width={10}
            height={10}
          />
        </span>
        <span className="profile-name">
          {t('VIP')} - {user?.level}
        </span>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper className="header-paper">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <div className="hpMenu-top" onClick={handleClose}>
                    <div className="user-info">
                      <div className="user-img">
                        <CustomImage
                          src={
                            userProfilePhoto[Number(user?.avatar) || 0]?.image
                          }
                          alt={t('UserPhoto')}
                          key={userProfilePhoto[Number(user?.avatar) || 0]?.id}
                          width={25}
                          height={25}
                        />
                      </div>
                      <div className="user-name">{user?.playerId}</div>
                      <Button
                        className="btn userCopy-btn"
                        onClick={() =>
                          copyToClipboard(`${user?.playerId}`, t('ID Copied!'))
                        }
                      ></Button>
                    </div>
                    <div className="user-levelScore">
                      <div className="userLevel">
                        <div className="vipImg">
                          <CustomImage src={vip_banner} alt={t('VIP')} />
                        </div>
                        <div className="levalName">VIP {user?.level}</div>
                      </div>
                      <div className="userScore">
                        <div className="userScore-col deposit">
                          <div className="title-value">
                            <div className="title">{t('Deposit')}</div>
                            <div className="amount">
                              <CustomImage
                                src="/assets/images/coin.png"
                                alt={t('coin')}
                                width={14}
                                height={14}
                                className="coin-margin"
                              />
                              {user?.vipLevelDetails?.currenDeposit?.toFixed(2)}
                              /
                              <span className="yellow-shade">
                                <CustomImage
                                  src="/assets/images/coin.png"
                                  alt={t('coin')}
                                  width={14}
                                  height={14}
                                  className="coin-margin ms-1"
                                />
                                {user?.vipLevelDetails?.nextLevelDeposit}
                              </span>
                            </div>
                          </div>
                          <div className="process-score">
                            <LinearProgress
                              variant="determinate"
                              value={result || 0}
                              className="header-result-linear-progress"
                            />
                            <div className="progressValue">{result}%</div>
                          </div>
                        </div>
                        <div className="userScore-col betAmount">
                          <div className="title-value">
                            <div className="title">{t('Bet Amount')}</div>
                            <div className="amount">
                              <CustomImage
                                src="/assets/images/coin.png"
                                alt={t('coin')}
                                width={14}
                                height={14}
                                className="coin-margin"
                              />
                              {user?.vipLevelDetails?.currentBet?.toFixed(2)}/
                              <span className="purple-shade">
                                <CustomImage
                                  src="/assets/images/coin.png"
                                  alt={t('coin')}
                                  width={14}
                                  height={14}
                                  className="coin-margin ms-1"
                                />
                                {user?.vipLevelDetails?.nextLevelBet}
                              </span>
                            </div>
                          </div>
                          <div className="bet-score">
                            <LinearProgress
                              variant="determinate"
                              value={betResult}
                              className="header-bet-result-linear-progress"
                            />
                            <div className="progressValue">{betResult}%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="link-container">
                    <div className="hpMenu-botm d-flex justify-content-between link-container-list">
                      <ul className="profilePane-ul">
                        <li className="me-md-2" onClick={handleToggle}>
                          <Link href="/ranking-vip">
                            <CustomImage
                              src={'/assets/images/SidecrownImg.png'}
                              alt="custom-image"
                              height={35}
                              width={40}
                              className="vipRoutesImg"
                            />
                            {t('Vip Level')}
                          </Link>
                        </li>
                      </ul>
                      <ul className="profilePane-ul">
                        <li onClick={handleToggle}>
                          <Link href="/referral" className="referral">
                            <CustomImage
                              src={'/assets/images/SidemoneyImg.png'}
                              alt="side-money"
                              height={35}
                              width={40}
                              className="vipRoutesImg"
                            />
                            {t('Referral')}
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="hpMenu-botm d-flex justify-content-between personal-link-container">
                      <ul className="profilePane-ul">
                        <li className="me-md-2" onClick={handleToggle}>
                          <Link
                            href="/personal-center"
                            className="personal-center"
                          >
                            <CustomImage
                              src={'/assets/images/SidecontactImg.png'}
                              alt={t('Personal Center')}
                              height={35}
                              width={40}
                              className="vipRoutesImg"
                            />
                            {t('Personal Center')}
                          </Link>
                        </li>
                      </ul>
                      <ul className="profilePane-ul">
                        <li onClick={handleToggle}>
                          <Link href="/game-history" className="game-history">
                            <CustomImage
                              src={'/assets/images/SidegameImgSide.png'}
                              alt={t('Game History')}
                              height={35}
                              width={40}
                              className="vipRoutesImg"
                            />
                            {t('Game History')}
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="hpMenu-botm hpmenu-botm-logout">
                      <div className="profile-logout">
                        <Link href="/" onClick={handleLogout}>
                          {t('Log out')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default HeaderVip;
