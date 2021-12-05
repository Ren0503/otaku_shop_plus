import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { Product, ProductList } from 'interfaces'
import { baseUrl } from 'utils'

export const listProducts = createAsyncThunk<
    ProductList,
    { keyword: string; pageNumber?: number }
>('PRODUCT_LIST', async (args) => {
    const { keyword } = args
    const pageNumber = args.pageNumber ?? 1
    const response = await fetch(
        `${baseUrl}/api/products?keyword=${keyword ?? ''}&page=${pageNumber}`
    )
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data?.message ?? response.statusText)
    }
    return data as ProductList
})

export type ProductListState = {
    loading: boolean
    products: Product[]
    error?: string
    page: number
    pages: number
}

const initialProductListState: ProductListState = {
    loading: false,
    products: [],
    page: 1,
    pages: 1,
}

export const productListSlice = createSlice({
    name: 'productList',
    initialState: initialProductListState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listProducts.pending, (state) => {
            state.loading = true
            state.products = []
            state.page = 1
            state.pages = 1
        })
        builder.addCase(listProducts.fulfilled, (state, { payload }) => {
            state.loading = false
            state.products = payload.products
            state.pages = payload.pages
            state.page = payload.page
        })
        builder.addCase(listProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})