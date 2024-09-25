"use client"
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './services/auth'
import authSlice from './services/authSlice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice
  },
  devTools: false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
})

const initializeApp = async () => {
  await store.dispatch(authApi.endpoints.refreshToken.initiate({}, {forceRefetch: true}));
}

initializeApp()