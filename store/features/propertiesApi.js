import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PROPERTIES_API_URL = process.env.PROPERTIES_API_URL || "http://127.0.0.1:8001/api/v1/properties/";

const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: PROPERTIES_API_URL,
});


export const propertiesApi = createApi({
    reducerPath: "propertiesApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["Property"],
    endpoints: (builder) => ({
        getProperties: builder.query({
            query: () => "/"
        }),
        getFeaturedProperties: builder.query({
            query: () => "/featured"
        })
    }),
});

export const {
    useGetPropertiesQuery,
    useGetFeaturedPropertiesQuery
} = propertiesApi;
