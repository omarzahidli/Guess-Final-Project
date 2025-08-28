import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const token = localStorage.getItem('token')

export const guessApi = createApi({
    reducerPath: 'guessApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://guess-backend.onrender.com/api/' }),
    tagTypes: ['Category', 'Products', 'Images', 'Basket'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ email, password }) => ({
                method: 'post',
                url: 'auth/signin',
                body: { email, password}
            })
        }),
        signUp: builder.mutation({
            query: ({firstName, lastName, password, email, dateOfBirth, gender}) => ({
                method: 'post',
                url: 'auth/signup',
                body: {firstName, lastName, password, email, dateOfBirth, gender}
            })
        }),
        addCategory: builder.mutation({
            query: ({ name, slug, parentId }) => ({
                method: 'post',
                url: 'category',
                headers: {
                    'authorization': `Bearer ${token}`
                },
                body: { name, slug, parentId }
            }),
            invalidatesTags: ['Category']
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                method: 'delete',
                url: `category/${id}`,
                headers: {
                    'authorization': `Bearer ${token}`
                },
            }),
            invalidatesTags: ['Category']
        }),
        editCategory: builder.mutation({
            query: ({ params, id }) => ({
                method: 'post',
                url: `category/${id}`,
                headers: {
                    'authorization': `Bearer ${token}`
                },
                body: params
            }),
            invalidatesTags: ['Category']
        }),
        getAllCategories: builder.query({
            query: () => 'category',
            providesTags: ['Category']
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: `product/all`,
                method: "GET",
                headers: {
                    'authorization': `Bearer ${token}`
                },
            }),
            providesTags: ['Products']
        }),
        getProductsById: builder.query({
            query: (id) => ({
                url: `product/category/${id}`,
                method: "GET",
            }),
            providesTags: ['Products']
        }),
        getProductByIdItself: builder.query({
            query: (id) => ({
                url: `product/${id}`,
                method: "GET",
            }),
            providesTags: ['Products']
        }),
        addProduct: builder.mutation({
            query: ({productName, productDesc, productPrice, productColors, productSizes, uploadedImages, productSlug, productCategory}) => ({
                method: 'post',
                url: 'product',
                headers: {
                    'authorization': `Bearer ${token}`
                },
                body: {name: productName, description: productDesc, price: productPrice, colors: productColors, sizes: productSizes, images: uploadedImages, categoryId: productCategory,  slug: productSlug, brandId: 1, stock: 1}
            }),
            invalidatesTags: ['Products',  'Images']
        }),
        editProduct: builder.mutation({
            query: ({id, productName, productDesc, productPrice, productColors, productSizes, uploadedImages, productSlug, productCategory}) => ({
                method: 'post',
                url: `product/${id}`,
                headers: {
                    'authorization': `Bearer ${token}`
                },
                body: {name: productName, description: productDesc, price: productPrice, colors: productColors, sizes: productSizes, images: uploadedImages, categoryId: productCategory,  slug: productSlug, brandId: 1, stock: 1}
            }),
            invalidatesTags: ['Products', 'Images']
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                method: 'delete',
                url: `product/${id}`,
                headers: {
                    'authorization': `Bearer ${token}`
                },
            }),
            invalidatesTags: ['Products']
        }),
        uploadImages: builder.mutation({
            query: (formData) => ({
                method: 'post',
                url: 'upload/image',
                headers: {
                    'authorization': `Bearer ${token}`
                },
                body: formData
            }),
            invalidatesTags: ['Images']
        }),
        getBasket: builder.query({
            query: (tok) => ({
                method: 'get',
                url: `basket`,
                headers: {
                    'authorization': `Bearer ${tok}`
                }
            }),
            providesTags: ['Basket']
        }),
        add2Basket: builder.mutation({
            query: ({id, color, size, quantity}) => ({
                method: 'post',
                url: `basket/${id}`,
                headers: {
                    'authorization': `Bearer ${token}`
                },
                body: {color, size, quantity}
            }),
            invalidatesTags: ['Basket']
        }),
        deleteFromBasket: builder.mutation({
            query: (id) => ({
                method: 'delete',
                url: `basket/${id}`,
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ['Basket']
        }),
        getUser: builder.query({
            query: () => ({
                method: 'get',
                url: `user`,
                headers: {
                    'authorization': `Bearer ${token}`
                },
            })
        }),
        filterProducts: builder.query({
            query: (string) => ({
                method: 'get',
                url: `product/filter?brandId=1&${string}`,
                headers: {
                    'authorization': `Bearer ${token}`
                },
            })
        }),
    })
})

export const {
    useLoginMutation,
    useSignUpMutation,
    useAddCategoryMutation,
    useGetAllCategoriesQuery,
    useDeleteCategoryMutation,
    useEditCategoryMutation,
    useGetAllProductsQuery,
    useGetProductsByIdQuery,
    useGetProductByIdItselfQuery,
    useAddProductMutation,
    useEditProductMutation,
    useDeleteProductMutation,
    useUploadImagesMutation,
    useGetBasketQuery,
    useAdd2BasketMutation,
    useDeleteFromBasketMutation,
    useFilterProductsQuery,
    useGetUserQuery
} = guessApi