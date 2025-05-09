import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../middleware';
import {
  loginRequest,
  signUpResponse,
  forgetPasswordRequest,
  forgetPasswordResponse,
  signUpRequest,
  logoutResponse,
  resetPasswordRequest,
  resetPasswordResponse,
} from '@/types/user';
import { routes } from '@/utils/routes';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Get user data
    signIn: builder.mutation<signUpResponse, loginRequest>({
      query: (credentials) => ({
        url: routes.signIn,
        method: 'POST',
        body: credentials,
      }),
    }),

    getPlayerDetails: builder.query<signUpResponse, void>({
      query: () => ({
        url: routes.getPlayerDetails,
        method: 'GET',
      }),
    }),

    signUp: builder.mutation<signUpResponse, signUpRequest>({
      query: (credentials) => ({
        url: routes.signUp,
        method: 'POST',
        body: credentials,
      }),
    }),

    forgetPassword: builder.mutation<
      forgetPasswordResponse,
      forgetPasswordRequest
    >({
      query: (credentials) => ({
        url: routes.forgotPassword,
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<logoutResponse, null>({
      query: () => ({
        url: routes.logout,
        method: 'POST',
      }),
    }),
    resetPassword: builder.mutation<
      resetPasswordResponse,
      resetPasswordRequest
    >({
      query: (credentials) => ({
        url: routes.resetpassword,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useForgetPasswordMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useLazyGetPlayerDetailsQuery,
} = userApi;
