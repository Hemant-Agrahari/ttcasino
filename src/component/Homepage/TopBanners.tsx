import React, { Fragment } from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import CustomImage from '../common/CustomImage';
import { useGetBannerQuery } from '@/redux/cms/cmsSlice';
import { bannerList } from '@/types/cms';

const TopBanners: React.FC = () => {
  const base_url = process.env.NEXT_PUBLIC_IMAGE_URL;
  const { data: banners } = useGetBannerQuery();
  const { t } = useTranslation();

  let settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };

  return (
    <div key={'top-banner-div'} className="homeBanner-slider pt-md-4 pt-3">
      <div className="vip-slider py-1">
        {banners?.data && (
          <Slider {...settings}>
            {banners?.data &&
              banners.data.length > 0 &&
              banners.data?.map((item: bannerList) => (
                <Fragment key={item._id}>
                  {item.image ? (
                    <div className="homeBanner">
                      <div className="homeBannerDesktop">
                        <CustomImage
                          src={`${base_url}${item.image}`}
                          alt={t('Image')}
                          loading="eager"
                          className="BannerBigHomeSlider"
                          width={1024}
                          height={349}
                        />
                      </div>
                    </div>
                  ) : null}
                </Fragment>
              ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default TopBanners;
