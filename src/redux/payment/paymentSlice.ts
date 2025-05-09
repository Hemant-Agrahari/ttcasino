import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../middleware';
import { routes } from '@/utils/routes';
import {
  createDepositResponse,
  currencyRateResponse,
  depositPackageResponse,
  depositRequest,
  getCurrencyResponse,
  withdrawRequest,
  withdrawResponse,
} from '@/types/payment';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCurrency: builder.query<getCurrencyResponse, void>({
      query: () => ({
        url: routes.getCurrency,
        method: 'GET',
      }),
    }),
    getDepositPackage: builder.query<depositPackageResponse, void>({
      query: () => ({
        url: routes.depositPackage,
        method: 'GET',
      }),
    }),
    getRates: builder.query<currencyRateResponse, { currency_name: string }>({
      query: ({ currency_name }) => ({
        url: routes.getRates,
        method: 'GET',
        params: { currency_name },
      }),
    }),
    createDeposit: builder.mutation<createDepositResponse, depositRequest>({
      query: (data) => ({
        url: routes.createDeposit,
        method: 'POST',
        body: data,
      }),
    }),
    withdrawRequest: builder.mutation<withdrawResponse, withdrawRequest>({
      query: (data) => ({
        url: routes.withdrawRequest,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCurrencyQuery,
  useGetDepositPackageQuery,
  useLazyGetRatesQuery,
  useCreateDepositMutation,
  useWithdrawRequestMutation,
} = paymentApi;
