import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import adminReducer from './state/admin';
import storage from 'redux-persist/lib/storage';

const adminPersistConfig = {
  key: 'admin',
  storage,
};

const adminPersistedReducer = persistReducer(adminPersistConfig, adminReducer);

export const store = configureStore({
  reducer: {
    admin: adminPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;