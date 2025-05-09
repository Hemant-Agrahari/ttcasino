import { Grid } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../common/mui-component/Loader';
import CustomImage from '../common/CustomImage';
import { useGetPromotionsQuery } from '@/redux/cms/cmsSlice';

const PromotionTab = () => {
  const { t } = useTranslation();
  const { data: promotions, isLoading } = useGetPromotionsQuery();
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="homeTabPromotion-content">
          <div className="d-flex flex-row tab-title">
            <h4 className="text-capitalize text-white font-weight-700">
              {t('Static')}
            </h4>
          </div>
          <Grid container spacing={2} className="mt-0 pl-0 pr-2">
            {promotions?.data[0].static?.map((item) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item?._id}>
                  <Link
                    href={`/promotion-center/${item?._id}`}
                    className="promotion-img"
                  >
                    <div className="w-100 position-relative" key={item?._id}>
                      <CustomImage
                        src={`${baseUrl}${item.banner}`}
                        alt={t('Image')}
                        className="rounded-1 d-md-block d-none"
                        width={700}
                        height={200}
                        loading="lazy"
                      />
                      <CustomImage
                        src={`${baseUrl}${item.banner}`}
                        alt={t('Image')}
                        className="rounded-1 d-md-none d-block"
                        width={700}
                        height={150}
                        loading="lazy"
                      />
                    </div>
                  </Link>
                </Grid>
              );
            })}
          </Grid>

          <div className="d-flex mt-5 flex-row tab-title">
            <h4 className="text-capitalize text-white font-weight-700">
              {t('Daily')}
            </h4>
          </div>
          <Grid container spacing={2} className="mt-0 pl-0 pr-2">
            {promotions?.data[0].daily?.map((item) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                  <Link
                    href={`/promotion-center/${item?._id}`}
                    className="promotion-img"
                  >
                    <div className="w-100 position-relative" key={item?._id}>
                      <CustomImage
                        src={`${baseUrl}${item.banner}`}
                        alt={t('Image')}
                        className="rounded-1 d-md-block d-none"
                        width={700}
                        height={200}
                        loading="lazy"
                      />
                      <CustomImage
                        src={`${baseUrl}${item.banner}`}
                        alt={t('Image')}
                        className="rounded-1 d-md-none d-block"
                        width={700}
                        height={150}
                        loading="lazy"
                      />
                    </div>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </>
  );
};

export default PromotionTab;
