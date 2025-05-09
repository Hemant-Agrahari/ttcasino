import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import CustomImage from '@/component/common/CustomImage';
import Loader from '@/component/common/mui-component/Loader';
import { useRouter } from 'next/router';
import { useLazyGetPromotionsByIdQuery } from '@/redux/cms/cmsSlice';
import { toast } from 'react-toastify';
import { handleError } from '@/utils/errorHandler';
import { RTKError } from '@/types/user';
import { promotionById } from '@/types/cms';

const PromotionsDynamic = () => {
  const base_url = process.env.NEXT_PUBLIC_IMAGE_URL;
  const [getPromotion] = useLazyGetPromotionsByIdQuery();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [promotionBanner, setPromotionBanner] = useState<promotionById>();
  const router = useRouter();
  const { promotionId } = router.query;

  const fetchPromotionById = async () => {
    if (typeof promotionId === 'string') {
      try {
        const res = await getPromotion({ promotionId }).unwrap();
        if (res.status === 'success') {
          setPromotionBanner(res.data);
        } else {
          toast.error(res.message);
        }
      } catch (error: unknown) {
        handleError(error as RTKError);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (promotionId) {
      fetchPromotionById();
    }
  }, [promotionId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container margin-top-12">
          <div className="promotion-banner text-center">
            <CustomImage
              src={`${base_url}${promotionBanner?.banner}`}
              alt={promotionBanner?.name || 'Banner'}
              width={1421}
              height={300}
            />
          </div>
          {promotionBanner?.description ? (
            <div className="promo-rules">
              <div className="promoRules-title">Rules</div>
              <ul className="promoRules-ul">
                <p
                  dangerouslySetInnerHTML={{
                    __html: promotionBanner?.description,
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
