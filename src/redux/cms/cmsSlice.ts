import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../middleware';
import { routes } from '@/utils/routes';
import {
  sendMessageRequest,
  bannerResponse,
  sendMessageResponse,
  cmsResponse,
  faqResponse,
  promotionResponse,
  promotionByIdResponse,
} from '@/types/cms';

export const cmsApi = createApi({
  reducerPath: 'cmsApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getBanner: builder.query<bannerResponse, void>({
      query: () => ({
        url: routes.banners,
        method: 'GET',
        keepUnusedDataFor: 180,
      }),
    }),
    getFaq: builder.query<faqResponse, void>({
      query: () => ({
        url: routes.faq,
        method: 'GET',
      }),
    }),

    getCmsPage: builder.query<cmsResponse, { cmsTag: string }>({
      query: ({ cmsTag }) => ({
        url: `${routes.cms}/${cmsTag}`,
        method: 'GET',
      }),
    }),

    getPromotions: builder.query<promotionResponse, void>({
      query: () => ({
        url: routes.getPromotionPackage,
        method: 'GET',
      }),
    }),

    getStaticPromotion: builder.query<promotionByIdResponse, void>({
      query: () => ({
        url: routes.getStaticPromotion,
        method: 'GET',
      }),
    }),

    getPromotionsById: builder.query<
      promotionByIdResponse,
      { promotionId: string }
    >({
      query: ({ promotionId }) => ({
        url: routes.getPromotionById,
        method: 'GET',
        params: { promotionId },
      }),
    }),

    getSupport: builder.mutation<sendMessageResponse, sendMessageRequest>({
      query: (credentials) => ({
        url: routes.sendMessage,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  usePrefetch,
  useGetBannerQuery,
  useGetCmsPageQuery,
  useGetSupportMutation,
  useGetPromotionsQuery,
  useLazyGetPromotionsByIdQuery,
  useGetStaticPromotionQuery,
  useGetFaqQuery,
} = cmsApi;
