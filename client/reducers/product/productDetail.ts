import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { Product } from 'interfaces'
import { baseUrl } from 'utils'

export const detailProduct = createAsyncThunk<Product, string>(
    'PRODUCT_DETAILS',
    async (productId) => {
        const response = await fetch(`${baseUrl}/api/products/${productId}`)
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data?.message ?? response.statusText)
        }
        return data as Product
    }
)

export type ProductDetailsState = {
    loading: boolean
    product?: Product
    error?: string
}

const initialProductDetailsState: ProductDetailsState = {
    loading: false,
}

export const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: initialProductDetailsState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(detailProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(detailProduct.fulfilled, (state, { payload }) => {
            state.loading = false
            state.product = payload
        })
        builder.addCase(detailProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})