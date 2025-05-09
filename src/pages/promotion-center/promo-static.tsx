import dynamic from 'next/dynamic';
import CustomImage from '@/component/common/CustomImage';
import Loader from '@/component/common/mui-component/Loader';
import { useGetStaticPromotionQuery } from '@/redux/cms/cmsSlice';

const PromotionsDynamic = () => {
  const base_url = process.env.NEXT_PUBLIC_IMAGE_URL;
  const { data: staticPromotion, isLoading } = useGetStaticPromotionQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container margin-top-12">
          <div className="promotion-banner text-center">
            <CustomImage
              src={`${base_url}${staticPromotion?.data?.banner}`}
              alt={staticPromotion?.data?.name || 'Banner'}
              width={1421}
              height={300}
            />
          </div>
          {staticPromotion?.data?.description ? (
            <div className="promo-rules">
              <div className="promoRules-title">Rules</div>
              <ul className="promoRules-ul">
                <p
                  dangerouslySetInnerHTML={{
                    __html: staticPromotion?.data?.description,
                  }}
                ></p>
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(PromotionsDynamic), {
  ssr: false,
});
