import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";
const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: 'include',
})
const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery,
    tagTypes: ['Orders'],
    endpoints: (builder)=>({
        createOrder: builder.mutation({
            query: (newOrder)=>({
                url:'/create-order',
                method:'POST',
                body: newOrder
            }),
            invalidatesTags: ['Orders']
        }),
        getOrdersByEmail : builder.query({
            query:(email)=>`/email/${email}`,
            providesTags:['Orders']
        })
    })
})

export const {useCreateOrderMutation, useGetOrdersByEmailQuery}=ordersApi;
export default ordersApi