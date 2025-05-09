import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../middleware';
import { routes } from '@/utils/routes';
import { invitationBonusResponse, levelResponse } from '@/types/levelBonus';

export const levelBonusApi = createApi({
  reducerPath: 'levelBonusApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getLevel: builder.query<levelResponse, void>({
      query: () => ({
        url: routes.level,
        method: 'GET',
      }),
    }),

    getInvitationBonus: builder.query<invitationBonusResponse, void>({
      query: () => ({
        url: routes.invitationBonus,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetLevelQuery, useGetInvitationBonusQuery } = levelBonusApi;
