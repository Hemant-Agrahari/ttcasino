import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../middleware';
import {
  avatarUpdateRequest,
  avatarUpdateResponse,
  referralLinkResponse,
  notificationResponse,
  updateNotificationRequest,
  becomeAffiliateRequest,
  becomeAffiliateResponse,
  updateNotificationResponse,
} from '@/types/player';
import { routes } from '@/utils/routes';

export const playerApi = createApi({
  reducerPath: 'playerApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    avatarUpdate: builder.mutation<avatarUpdateResponse, avatarUpdateRequest>({
      query: (payload) => ({
        url: routes.updateAvatar,
        method: 'POST',
        body: payload,
      }),
    }),

    getReferralLink: builder.query<referralLinkResponse, void>({
      query: () => ({
        url: routes.getReferralLink,
        method: 'GET',
      }),
    }),

    getNotification: builder.query<notificationResponse, void>({
      query: () => ({
        url: routes.getNotification,
        method: 'GET',
      }),
    }),

    updateNotification: builder.mutation<
      updateNotificationResponse,
      updateNotificationRequest
    >({
      query: (payload) => ({
        url: routes.updateNotification,
        method: 'POST',
        body: payload,
      }),
    }),

    becomeAffiliate: builder.mutation<
      becomeAffiliateResponse,
      becomeAffiliateRequest
    >({
      query: (payload) => ({
        url: routes.becomeAffiliate,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useAvatarUpdateMutation,
  useGetReferralLinkQuery,
  useLazyGetNotificationQuery,
  useUpdateNotificationMutation,
  useBecomeAffiliateMutation,
} = playerApi;
