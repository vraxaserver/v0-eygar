import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const propertyApi = createApi({
    reducerPath: "propertyApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api"
    }),
    // Define tag types for cache invalidation
    tagTypes: ['Property'],
    endpoints: (builder) => ({
        getProperties: builder.query({
            query: () => "/properties",
            // Provide tags for this query
            providesTags: (result, error, arg) => 
                result
                    ? [
                        // Tag each individual property
                        ...result.map(({ id }) => ({ type: 'Property', id })),
                        // Tag the entire list
                        { type: 'Property', id: 'LIST' }
                    ]
                    : [{ type: 'Property', id: 'LIST' }]
        }),
        
        getProperty: builder.query({
            query: (id) => `/properties/${id}`,
            providesTags: (result, error, id) => [{ type: 'Property', id }]
        }),
        
        addProperty: builder.mutation({
            query: (newProperty) => ({
                url: "/properties",
                method: "POST",
                body: newProperty
            }),
            // Invalidate the properties list when a new property is added
            invalidatesTags: [{ type: 'Property', id: 'LIST' }]
        }),
        
        updateProperty: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/properties/${id}`,
                method: "PUT",
                body: patch
            }),
            // Invalidate both the specific property and the list
            invalidatesTags: (result, error, { id }) => [
                { type: 'Property', id },
                { type: 'Property', id: 'LIST' }
            ]
        }),
        
        deleteProperty: builder.mutation({
            query: (id) => ({
                url: `/properties/${id}`,
                method: "DELETE"
            }),
            // Invalidate both the specific property and the list
            invalidatesTags: (result, error, id) => [
                { type: 'Property', id },
                { type: 'Property', id: 'LIST' }
            ]
        })
    })
})

export const {
    useGetPropertiesQuery,
    useGetPropertyQuery,
    useAddPropertyMutation,
    useUpdatePropertyMutation,
    useDeletePropertyMutation
} = propertyApi