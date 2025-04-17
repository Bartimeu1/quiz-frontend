import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { authSlice } from './features/auth/auth-slice';
import { testsSlice } from './features/tests/tests-slice';
import { authApi } from './api/auth-api';
import { userApi } from './api/user-api';
import { testsApi } from './api/tests-api';
import { questionsApi } from './api/questions-api';

const persistConfig = {
  key: 'root',
  whitelist: ['auth'],
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  tests: testsSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [testsApi.reducerPath]: testsApi.reducer,
  [questionsApi.reducerPath]: questionsApi.reducer,
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) => {
    const allMiddlewares = [
      authApi.middleware,
      userApi.middleware,
      testsApi.middleware,
      questionsApi.middleware,
    ];

    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...allMiddlewares);
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
