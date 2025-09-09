import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: "/api",
});


export const propertiesApi = createApi({
    reducerPath: "propertiesApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["Property"],
    endpoints: (builder) => ({
        getProperties: builder.query({
            query: () => "/properties"
        })
    }),
});

export const {
    useGetPropertiesQuery
} = propertiesApi;
