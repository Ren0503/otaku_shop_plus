import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { Product } from 'interfaces/product'
import { baseUrl } from 'utils'

export const listTopProducts = createAsyncThunk<Product[], void>('PRODUCT_TOP', async () => {
    const response = await fetch(`${baseUrl}/api/products/top/`)
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data?.message ?? response.statusText)
    }
    return data as Product[]
})

export type ProductTopRatedState = {
    loading: boolean
    products: Product[]
    error?: string
}

const initialProductTopRatedState: ProductTopRatedState = {
    loading: false,
    products: [],
}

export const productTopSlice = createSlice({
    name: 'productTop',
    initialState: initialProductTopRatedState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listTopProducts.pending, (state) => {
            state.loading = true
            state.products = []
            state.error = undefined
        })
        builder.addCase(listTopProducts.fulfilled, (state, { payload }) => {
            state.loading = false
            state.products = payload
        })
        builder.addCase(listTopProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})