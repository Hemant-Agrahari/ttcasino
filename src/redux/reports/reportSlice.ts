import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../middleware';
import { routes } from '@/utils/routes';
import {
  bonusHistoryResponse,
  depositHistoryResponse,
  gameHistoryResponse,
  queryParam,
  userPlayedGameResponse,
  withdrawHistoryResponse,
} from '@/types/reports';

export const reportApi = createApi({
  reducerPath: 'reportApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPlayedGames: builder.query<userPlayedGameResponse, void>({
      query: () => ({
        url: routes.getPlayedGameList,
        method: 'GET',
      }),
    }),

    getBonusHistory: builder.query<bonusHistoryResponse, queryParam>({
      query: ({ startDate, endDate, skip, limit }) => ({
        url: routes.bonusHistory,
        method: 'GET',
        params: { startDate, endDate, skip, limit },
      }),
    }),

    getGameHistory: builder.query<
      gameHistoryResponse,
      { gameName: string } & queryParam
    >({
      query: ({ gameName, startDate, endDate, skip, limit }) => ({
        url: routes.gameReport,
        method: 'GET',
        params: { gameName, startDate, endDate, skip, limit },
      }),
    }),

    getDepositHistory: builder.query<depositHistoryResponse, queryParam>({
      query: ({ startDate, endDate, skip, limit }) => ({
        url: routes.transactionReport,
        method: 'GET',
        params: {
          type: 'deposit',
          startDate,
          endDate,
          skip,
          limit,
        },
      }),
    }),

    getWithdrawHistory: builder.query<withdrawHistoryResponse, queryParam>({
      query: ({ startDate, endDate, skip, limit }) => ({
        url: routes.transactionReport,
        method: 'GET',
        params: {
          type: 'withdraw',
          startDate,
          endDate,
          skip,
          limit,
        },
      }),
    }),
  }),
});

export const {
  useGetPlayedGamesQuery,
  useLazyGetBonusHistoryQuery,
  useLazyGetDepositHistoryQuery,
  useLazyGetGameHistoryQuery,
  useLazyGetWithdrawHistoryQuery,
} = reportApi;
