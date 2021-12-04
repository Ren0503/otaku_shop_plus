import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { CreateReviewInput } from 'interfaces/product'
import { baseUrl } from 'utils'

import { ReduxState } from 'store'
import { UserLoginState } from 'reducers/user'

export const createProductReview = createAsyncThunk<
    void,
    CreateReviewInput & { productId: string }
>(
    'PRODUCT_CREATE_REVIEW',
    async (payload: CreateReviewInput & { productId: string }, thunkAPI) => {
        const state: ReduxState = thunkAPI.getState()
        const userLogin: UserLoginState = state.userLogin
        const token = userLogin.userInfo?.token
        const { productId } = payload

        if (!token) {
            throw new Error('no user login token')
        }
        const response = await fetch(`${baseUrl}/api/products/${productId}/reviews/`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data?.message ?? response.statusText)
        }
    }
)

export interface ProductCreateReviewState {
    loading: boolean
    success?: boolean
    error?: string
}

const initialProductCreateReviewState: ProductCreateReviewState = { loading: false }


export const createProductReviewSlice = createSlice({
    name: 'productCreateReview',
    initialState: initialProductCreateReviewState,
    reducers: {
        reset: (state) => {
            state.error = undefined
            state.loading = false
            state.success = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createProductReview.pending, (state) => {
            state.loading = true
            state.error = undefined
        })
        builder.addCase(createProductReview.fulfilled, (state) => {
            state.loading = false
            state.success = true
        })
        builder.addCase(createProductReview.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})