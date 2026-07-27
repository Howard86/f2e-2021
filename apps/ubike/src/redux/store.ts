import { configureStore } from '@reduxjs/toolkit';
import { localApi } from '@/services/local';
import reducer from './reducer';

const isDev = process.env.NODE_ENV !== 'production';

const configureAppStore = () => {
  const store = configureStore({
    devTools: isDev,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localApi.middleware),
    reducer,
  });

  return store;
};

const store = configureAppStore();

export default store;
