import { MouseEvent, useEffect, useState } from 'react';
import CustomMuiTypography from '../common/mui-component/CustomMuiTypography';
import { useTranslation } from 'react-i18next';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { handleError } from '@/utils/errorHandler';
import {
  useLazyGetNotificationQuery,
  useUpdateNotificationMutation,
} from '@/redux/player/playerSlice';
import { updateNotificationRequest } from '@/types/player';
import { Button, Menu, Typography } from '@mui/material';
import { NotificationsNoneOutlined } from '@mui/icons-material';
import { useAppSelector } from '@/redux/hooks';
import { RTKError } from '@/types/user';
import { toast } from 'react-toastify';
import { notificationResponse } from '@/types/player';

type notificationListType = notificationResponse['data'];

const Notification: React.FC = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user.user);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [updateNotification] = useUpdateNotificationMutation();
  const [getNotification] = useLazyGetNotificationQuery();
  const [notificationList, setNotificationList] =
    useState<notificationListType>([]);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenPopover((previousOpen) => !previousOpen);
  };

  const handleMarkAsRead = async (type: 'single' | 'many', id?: string) => {
    try {
      let payload: updateNotificationRequest;
      if (type === 'single') {
        payload = { type: 'single', notificationId: id as string };
      } else {
        const unreadNotifications =
          notificationList?.filter((notifications) => !notifications.read) ||
          [];
        if (unreadNotifications.length === 1) {
          payload = {
            type: 'single',
            notificationId: unreadNotifications[0]._id,
          };
        } else {
          payload = { type: 'many' };
        }
      }
      const res = await updateNotification(payload).unwrap();
      if (res?.status === 'success') {
        toast.success(res?.message);
        fetchNotification();
        setOpenPopover(false);
        setAnchorEl(null);
      }
    } catch (error: unknown) {
      handleError(error as RTKError);
    }
  };

  const fetchNotification = async () => {
    try {
      const res = await getNotification().unwrap();
      if (res.status === 'success') {
        setNotificationList(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error) {
        console.log((error as { message: string }).message);
      }
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchNotification();
    }
  }, [user?._id]);

  return (
    <>
      <div className="msgIcon" onClick={handleClick}>
        <NotificationsIcon className="notification-icons" />
        {notificationList?.some((notification) => !notification.read) && (
          <span className="activeMsg"></span>
        )}
      </div>
      <Menu
        onClose={handleClick}
        open={openPopover}
        anchorEl={anchorEl}
        className="notification-list"
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {notificationList &&
          notificationList.length > 0 &&
          notificationList.some((notification: any) => !notification.read) && (
            <div className="d-flex justify-content-end mx-3">
              <Button
                className="font-weight-600 text-white mark-all-read-button"
                onClick={() => handleMarkAsRead('many')}
              >
                {t('Mark all as read')}
              </Button>
            </div>
          )}
        {notificationList && notificationList.length > 0 ? (
          notificationList?.map((notification) => (
            <div
              key={notification._id}
              onClick={() =>
                notification.read
                  ? null
                  : handleMarkAsRead('single', notification._id)
              }
              className="font-weight-600 font-size-18 notification-container"
              style={{
                cursor: notification.read ? '' : 'pointer',
                background: notification.read
                  ? ''
                  : 'var(--gray-400, --crimson)',
              }}
            >
              <div className="d-flex align-items-center p-3">
                <div className="p-2 rounded-circle d-flex align-items-center justify-content-center notification-active-color">
                  <NotificationsNoneOutlined className="font-size-32 notification-icons" />
                </div>
                <div className="flex-grow-1 d-flex justify-content-between align-items-center ms-3">
                  <Typography variant="body1" title="">
                    <strong className="text-white font-weight-600 mb-3">
                      {notification.title}
                    </strong>
                    <br />
                    <p className="font-size-14 font-weight-400 mb-0">
                      {notification.content}
                    </p>
                  </Typography>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center p-3">
            <CustomMuiTypography
              title={t('No notifications')}
              variant="body1"
              className="text-white font-weight-900 ml-1"
            />
          </div>
        )}
      </Menu>
    </>
  );
};

export default Notification;
