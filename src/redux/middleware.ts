import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { RootState } from './store';
import { removeUser, setMaintenance } from './user/userReducer';
import { getLocalStorageItem } from '@/utils';

// Define base query with authorization header
export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const authToken: string = getLocalStorageItem('token') || '';
    const language = getLocalStorageItem('language');

    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`);
    }
    headers.set('accept-language', language || 'fa');
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, store, extraOptions) => {
  let result = await baseQuery(args, store, extraOptions);
  const authState = (store.getState() as RootState).user.user;
  const errorCode = [401, 503];

  if (
    result.error &&
    typeof result.error.status === 'number' &&
    errorCode.includes(result.error.status)
  ) {
    if (result.error.status === 503) {
      store.dispatch(setMaintenance(true));
    }

    store.dispatch(removeUser());

    if (!authState?.token) return result;

    // Update token to use refresh token
    // store.dispatch(adjustUsedToken(authState.refreshToken as string));

    // Try to refresh the token
    // const refreshResult = await baseQuery(
    //   '/refresh-token',
    //   store,
    //   extraOptions,
    // );

    // if (refreshResult.data) {
    // Store the new tokens
    // store.dispatch(
    //   authTokenChange({
    //     accessToken: (refreshResult.data as any).accessToken,
    //     refreshToken: authState.refreshToken as string,
    //   }),
    // );
    // Retry the original request
    // result = await baseQuery(args, store, extraOptions);
    // } else {
    // }
  }
  return result;
};
