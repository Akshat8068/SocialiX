import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/baseApi";
import authReducer from "./slices/auth.slice"
import themeReducer from "./slices/theme.slice"
export const store = configureStore({
  reducer: {
    auth:authReducer,
    theme:themeReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),

  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;