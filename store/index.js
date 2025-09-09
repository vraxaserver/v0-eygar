import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import { propertiesApi } from "@/store/features/propertiesApi";
import searchReducer from '@/store/slices/searchSlice';


export const store = configureStore({
    reducer: {
        search: searchReducer,
        [propertiesApi.reducerPath]: propertiesApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    })
      .concat(propertiesApi.middleware),
})

setupListeners(store.dispatch)
