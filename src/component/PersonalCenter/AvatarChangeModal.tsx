import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Close, Settings } from '@mui/icons-material';
import { Dialog, IconButton } from '@mui/material';
import { useState } from 'react';
import { CustomButton } from '@/component/common';
import { userProfilePhoto } from '@/utils/userProfilePhotos';
import { toast } from 'react-toastify';
import { updateUser } from '@/redux/user/userReducer';
import { useTranslation } from 'react-i18next';
import CustomImage from '../common/CustomImage';
import { useAvatarUpdateMutation } from '@/redux/player/playerSlice';
import { handleError } from '@/utils/errorHandler';
import { RTKError } from '@/types/user';

const AvatarChangeModal: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const [updateAvatarApi, { isLoading }] = useAvatarUpdateMutation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [openUserDisplay, setOpenUserDisplay] = useState<boolean>(false);
  const [activeElement, setActiveElement] = useState<string | undefined>(
    user?.avatar,
  );

  const handleUserProfile = (elementId: string) => {
    setActiveElement(elementId);
  };

  const handleUserProfileData = async () => {
    try {
      const updateAvatarRes = await updateAvatarApi({
        avatar: activeElement ?? user?.avatar ?? '',
      }).unwrap();

      if (updateAvatarRes.status === 'success') {
        toast.success(updateAvatarRes.message);
        setOpenUserDisplay(false);
        dispatch(
          updateUser({
            avatar: activeElement,
          }),
        );
      } else {
        toast.error(updateAvatarRes?.message);
      }
    } catch (error: unknown) {
      handleError(error as RTKError);
    }
  };

  return (
    <>
      <Dialog
        className="signUpModaluniversal avatar-modal"
        open={openUserDisplay}
        onClose={() => setOpenUserDisplay(false)}
        scroll="body"
      >
        <div className="modal_closebtn">
          <IconButton
            type="button"
            className="close_form_btn"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setOpenUserDisplay(false);
              setActiveElement('');
            }}
          >
            <Close className=" text-white" />
          </IconButton>
        </div>
        <h5 className="text-white mt-1 mb-3 text-align-center font-weight-800 font-size-18">
          {t('Change Avatar')}
        </h5>
        <div className="">
          <div className="userimgName d-flex justify-content-center">
            <div className="MainUserLogo">
              <CustomImage
                src={
                  user?.avatar && userProfilePhoto[Number(user.avatar)]?.image
                    ? userProfilePhoto[Number(user.avatar)]?.image
                    : ''
                }
                alt={t('User image')}
                width={100}
                height={70}
              />
            </div>
          </div>

          <div className="userDisplayPC mt-3 d-flex align-items-center justify-content-around flex-wrap">
            {userProfilePhoto?.map((element) => {
              return (
                <div
                  key={element.id}
                  onClick={() => handleUserProfile(element.id)}
                  className={`MainUserLogo ${
                    element?.id === String(activeElement || user?.avatar)
                      ? 'normalActive'
                      : ''
                  }`}
                >
                  <CustomImage
                    src={element.image}
                    alt="User image"
                    width={68}
                    height={68}
                  />
                </div>
              );
            })}
          </div>
          <div className="userDisplayButton mt-3">
            <CustomButton
              className="userLeaveButton"
              onClick={() => {
                setOpenUserDisplay(false);
                setActiveElement('');
              }}
            >
              {t('Leave')}
            </CustomButton>
            <CustomButton
              className="userSaveButton mx-3"
              isLoading={isLoading}
              onClick={handleUserProfileData}
            >
              {t('Save')}
            </CustomButton>
          </div>
        </div>
      </Dialog>
      <div className="icon-userInfo" onClick={() => setOpenUserDisplay(true)}>
        <Settings className="text-white" />
      </div>
    </>
  );
};

export default AvatarChangeModal;
