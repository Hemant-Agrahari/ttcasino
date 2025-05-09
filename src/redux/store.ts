import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userReducer';
import modelsReducer from './models/modelReducer';
import playerReducer from './player/playerReducer';
import { userApi } from './user/userSlice';
import { playerApi } from './player/playerSlice';
import paymentReducer from './payment/paymentReducer';
import { paymentApi } from './payment/paymentSlice';
import { cmsApi } from './cms/cmsSlice';
import levelBonusReducer from './levelBonus/levelBonusReducer';
import searchReducer from './gameSearch/searchSlice';
import { levelBonusApi } from './levelBonus/levelBonusSlice';
import { gamesApi } from './games/gameSlice';
import { reportApi } from './reports/reportSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    models: modelsReducer,
    levelBonus: levelBonusReducer,
    player: playerReducer,
    search: searchReducer,
    payment: paymentReducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [cmsApi.reducerPath]: cmsApi.reducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
    [levelBonusApi.reducerPath]: levelBonusApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [playerApi.reducerPath]: playerApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware, cmsApi.middleware)
      .concat(playerApi.middleware as any)
      .concat(paymentApi.middleware as any)
      .concat(gamesApi.middleware as any)
      .concat(levelBonusApi.middleware as any)
      .concat(reportApi.middleware as any),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
