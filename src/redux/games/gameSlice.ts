import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../middleware';
import { routes } from '@/utils/routes';
import {
  providerResponse,
  gameTypeResponse,
  gameListResponse,
  subCategoryResponse,
  gameUrlResponse,
  categoryResponse,
} from '@/types/game';

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProvider: builder.query<
      providerResponse,
      {
        skip?: number;
        limit?: number;
        sort?: string;
        categoryName?: string;
        subcategoryName?: string;
      }
    >({
      query: ({
        skip = 0,
        limit = '',
        sort = 'asc',
        categoryName = '',
        subcategoryName = '',
      }) => ({
        url: routes.getProviders,
        method: 'GET',
        params: { skip, limit, sort, categoryName, subcategoryName },
      }),
    }),

    getHomeGame: builder.query<gameTypeResponse, void>({
      query: () => ({
        url: routes.homeGame,
        method: 'GET',
        keepUnusedDataFor: 120,
      }),
    }),

    getAllCategory: builder.query<categoryResponse, { sort: 'asc' | 'desc' }>({
      query: ({ sort = 'asc' }) => ({
        url: routes.getAllCategory,
        method: 'GET',
        params: { sort },
        keepUnusedDataFor: 120,
      }),
    }),

    getSubCategory: builder.query<
      subCategoryResponse,
      { categoryName?: string; providerName?: string; sort?: string }
    >({
      query: ({ categoryName = '', providerName = '', sort = 'asc' }) => ({
        url: routes.subcategory,
        method: 'GET',
        params: { categoryName, providerName, sort },
      }),
    }),

    getModelSubCategory: builder.query<
      subCategoryResponse,
      { categoryName?: string; providerName?: string; sort?: string }
    >({
      query: ({ categoryName = '', providerName = '', sort = 'asc' }) => ({
        url: routes.subcategory,
        method: 'GET',
        params: { categoryName, providerName, sort },
      }),
    }),

    getGameUrl: builder.query<gameUrlResponse, { gameId: string }>({
      query: ({ gameId }) => ({
        url: `${routes.generateUrl}/${gameId}`,
        method: 'GET',
      }),
    }),

    getIndividualGameUrl: builder.query<
      gameUrlResponse,
      { categoryId: string; name: string; isMobile: boolean }
    >({
      query: ({ categoryId, isMobile, name }) => ({
        url: routes.getIndividualGameUrl,
        method: 'GET',
        params: { categoryId, isMobile: isMobile, name },
      }),
    }),

    getGameList: builder.query<
      gameListResponse,
      {
        skip?: number;
        limit?: number;
        sort?: string;
        isMobile?: boolean;
        search?: string;
        categoryName?: string;
        subcategoryName?: string;
        providerName?: string;
      }
    >({
      query: ({
        skip = 0,
        limit = 12,
        sort = 'asc',
        isMobile = false,
        search = '',
        categoryName = '',
        subcategoryName = '',
        providerName = '',
      }) => ({
        url: routes.gamesList,
        method: 'GET',
        params: {
          skip,
          limit,
          sort,
          isMobile,
          search,
          categoryName,
          subcategoryName,
          providerName,
        },
      }),
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useLazyGetGameListQuery,
  useLazyGetSubCategoryQuery,
  useLazyGetModelSubCategoryQuery,
  useGetHomeGameQuery,
  useLazyGetProviderQuery,
  useLazyGetGameUrlQuery,
  useLazyGetIndividualGameUrlQuery,
} = gamesApi;
