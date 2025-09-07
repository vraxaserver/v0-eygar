import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import searchReducer from './slices/searchSlice';
import { propertyApi } from './features/propertyApi';


export const store = configureStore({
    reducer: {
        search: searchReducer,
        [propertyApi.reducerPath]: propertyApi.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        propertyApi.middleware
    ])
});

setupListeners(store.dispatch);
