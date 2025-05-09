import Slider from 'react-slick';
import VIPImg from '../../../public/assets/images/levelVip.png';
import { useTranslation } from 'react-i18next';
import CustomImage from '../common/CustomImage';
import { useGetLevelQuery } from '@/redux/levelBonus/levelBonusSlice';
import React from 'react';
import { levelData } from '@/types/levelBonus';

export type levelPageData = {
  levelData: levelData[];
  averagePercentage: number;
};

const VipSlider: React.FC = () => {
  const { data, isLoading } = useGetLevelQuery();
  const { t } = useTranslation();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="vip-slider py-1" id="vip-slider">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <h3>{t('Loading...')}</h3>
        </div>
      ) : (
        <Slider {...settings}>
          {data?.data &&
            data.data.levelData?.map((item, i) => (
              <div className="advantage" key={i + 1}>
                <div className="advantage-contenr">
                  <div className="topSlider-img">
                    <CustomImage
                      src={VIPImg}
                      alt={t('level')}
                      className="level-slider"
                    />
                  </div>
                  <div className="slider-container p-2 pb-md-5 pb-3">
                    <div className="slider-text-main">
                      <h6 className="vip-text mt-2">
                        {t('VIP')} {item?.level}
                      </h6>
                      <h6 className="text-white fs-6 ">
                        {t('Update Conditions')}
                      </h6>
                    </div>
                    <div className="row mt-3">
                      <div className="col-6">
                        <div className="btn-SliderBox">
                          <div className="vip-btn-text">
                            {t('Total Deposits')}
                          </div>
                          <div className="vip-btn-text2 ">
                            $ {item?.totalDeposit || 0}
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="btn-SliderBox">
                          <div className="vip-btn-text">{t('Total Bets')}</div>
                          <div className="vip-btn-text2">
                            $ {item?.totalBets || 0}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="slider-cashback mt-3">
                      <h6 className="sliderCashback-title">
                        {t('LEVEL PROTECTION')}
                      </h6>
                      <div className="sliderCashback-col">
                        <h6 className="cashback-name">
                          {t('DEPOSIT')}
                          <span>
                            ${item?.levelProtection}/{t('MONTH')}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <hr className="opacity-1" />
                    <div className="slider-cashback">
                      <h6 className="sliderCashback-title">
                        {t('WITHDRAWAL PRIVILEGES')}
                      </h6>
                      <div className="sliderCashback-col">
                        <h6 className="cashback-name">
                          {t('Number of Withdrawals')}:
                          <span> {item?.totalWithdraws || 0}</span>
                        </h6>
                      </div>
                      <div className="sliderCashback-col">
                        <h6 className="cashback-name">
                          {t('Number of Withdrawals')}:
                          <span> {item.maximumWithdrawPrice || 0}</span>
                        </h6>
                      </div>
                      <div className="sliderCashback-col">
                        <h6 className="cashback-name">
                          {t('Withdrawals Fee')}:
                          <span> {item?.withdrawFee || 0}%</span>
                        </h6>
                      </div>
                      <div className="sliderCashback-col">
                        <h6 className="cashback-name">
                          {t('Free Withdrawal Amount')}:
                          <span> ${item?.freeWithdraw || 0}</span>
                        </h6>
                      </div>
                    </div>
                    <hr className="opacity-1" />
                    <div className="slider-cashback mb-10">
                      <div className="sliderCashback-title">
                        {t('CASHBACK')}
                      </div>
                      <div className="sliderCashback-col">
                        <h6 className="cashback-name">
                          {t('Original Games')}
                          <span> {item?.cashbackOriginalGames || 0}%</span>
                        </h6>
                      </div>
                      <div className="sliderCashback-col">
                        <h6 className="cashback-name">
                          {t('Live Casino')}
                          <span> {item?.cashbackLiveCasino || 0}%</span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      )}
    </div>
  );
};

export default VipSlider;
