import { Button, Input, InputAdornment } from '@mui/material';
import React from 'react';
import { CustomMuiTooltip } from '@/component/common';
import { HelpOutlineOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { copyToClipboard } from '@/utils/commonMethod';
import CustomImage from '../common/CustomImage';
import { referralData } from '@/types/player';

interface ToInviteProps {
  referralData: referralData;
}

const InvitePartner: React.FC<ToInviteProps> = ({ referralData }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="partner-revenue toInviteTab">
        <div className="partner">
          <div className="revenue-row">
            <div className="revenue-col">
              <label>{t('Bonus Today')}</label>
              <span className="value">
                $
                {referralData.todayBonus
                  ? referralData.todayBonus?.toFixed(2)
                  : '0.00'}
              </span>
            </div>
            <div className="revenue-col">
              <label>{t('Yesterday Bonus')}</label>
              <span className="value">
                $
                {referralData.yesterdayBonus
                  ? referralData.yesterdayBonus?.toFixed(2)
                  : '0.00'}
              </span>
            </div>
          </div>
          <div className="partner-title">{t('Invite a Partner')}</div>
          <div className="invite-copy">
            <div className="formgroup">
              <label>{t('Invite URL')}:</label>
              <Input
                value={
                  referralData.inviteUrl
                    ? referralData.inviteUrl
                    : 'Invite URL not Generated'
                }
                disableUnderline
                readOnly
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      title="Copy the invite URL"
                      disableRipple
                      disabled={!referralData?.inviteUrl}
                      variant="outlined"
                      onClick={() =>
                        copyToClipboard(
                          referralData.inviteUrl ? referralData.inviteUrl : '',
                          t('Link Copied!'),
                        )
                      }
                      className="border-0"
                    >
                      <CustomImage
                        src="/assets/images/userCopy-iocn.png"
                        alt="user-copy"
                        width={12}
                        height={12}
                      />
                    </Button>
                  </InputAdornment>
                }
              />
            </div>
            <div className="formgroup">
              <label>{t('Copy the Invite Code')}:</label>
              <Input
                value={
                  referralData.inviteCode
                    ? referralData.inviteCode
                    : 'Invite Code Not Generated'
                }
                disableUnderline
                readOnly
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      title="Copy the invite Code"
                      disabled={!referralData?.inviteCode}
                      disableRipple
                      variant="outlined"
                      onClick={() =>
                        copyToClipboard(
                          referralData.inviteCode
                            ? referralData.inviteCode
                            : '',
                          t('Code Copied!'),
                        )
                      }
                      className="border-0"
                    >
                      <CustomImage
                        src={'/assets/images/userCopy-iocn.png'}
                        alt={t('Image')}
                        width={12}
                        height={12}
                      />
                    </Button>
                  </InputAdornment>
                }
              />
            </div>
          </div>
        </div>
        {/* <div className="revenue">
          <div className="revenue-row">
          <div className="today-bonus-title">{t('Bonus')}</div>
            <div className="revenue-col">
              <label>{t('Today Bonus')}</label>
              <div className="today-bonus-value">
                $
                {referralData.todayBonus
                  ? referralData.todayBonus?.toFixed(2)
                  : '0.00'}
              </div>
            </div>
            <div className="revenue-col">
              <label>{t('Yesterday Bonus')}</label>
              <div className="today-bonus-value">
                $
                {referralData.yesterdayBonus
                  ? referralData.yesterdayBonus?.toFixed(2)
                  : '0.00'}
              </div>
            </div>
          </div>
        </div> */}
         <div className="partner">
          <div className="revenue-row">
            <div className="revenue-col">
              <label>{t('Bonus Today')}</label>
              <span className="value">
                $
                {referralData.todayBonus
                  ? referralData.todayBonus?.toFixed(2)
                  : '0.00'}
              </span>
            </div>
            <div className="revenue-col">
              <label>{t('Yesterday Bonus')}</label>
              <span className="value">
                $
                {referralData.yesterdayBonus
                  ? referralData.yesterdayBonus?.toFixed(2)
                  : '0.00'}
              </span>
            </div>
          </div>
          <div className="partner-title">{t('Bonus')}</div>
          <div className="invite-copy">
            <div className="formgroup">
              <label>{t('Today Bonus')}:</label>
              <div className="today-bonus-value">
                $
                {referralData.todayBonus
                  ? referralData.todayBonus?.toFixed(2)
                  : '0.00'}
              </div>
            </div>
            <div className="formgroup">
              <label>{t('Yesterday Bonus')}:</label>
              <div className="today-bonus-value">
                $
                {referralData.yesterdayBonus
                  ? referralData.yesterdayBonus?.toFixed(2)
                  : '0.00'}
              </div>
            </div>
          </div>
        </div>    
      </div>
    </>
  );
};

export default InvitePartner;
