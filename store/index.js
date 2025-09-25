import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { propertiesApi } from "@/store/features/propertiesApi";
import searchReducer from "@/store/slices/searchSlice";
import { authApi } from "@/store/features/authApi";
import authReducer from "@/store/slices/authSlice";
import { profileApi } from "./features/profileApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
        [authApi.reducerPath]: authApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [propertiesApi.reducerPath]: propertiesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", 'persist/REHYDRATE',],
            },
        }).concat(propertiesApi.middleware, authApi.middleware, profileApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);
