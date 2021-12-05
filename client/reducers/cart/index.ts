import {
    createAsyncThunk,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit'

import { ShippingAddress, Cart } from 'interfaces'
import { Product } from 'interfaces/product'
import { ReduxState } from 'store'
import { baseUrl } from 'utils'

export interface CartState {
    cartItems: Cart[]
    shippingAddress?: ShippingAddress
    paymentMethod?: string
}

const initialCartState: CartState = {
    cartItems: [],
    paymentMethod: 'PayPal',
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItem: (state: CartState, action: PayloadAction<Cart>) => {
            const item = action.payload
            const existingItem = state.cartItems.find((it) => it.product === item.product)
            if (existingItem) {
                // replace the previous cart item with new one
                state.cartItems = state.cartItems.map((x) => (x.product === item.product ? item : x))
            } else {
                state.cartItems.push(item)
            }
        },
        removeItem: (state: CartState, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter((item) => item.product !== action.payload)
        },
        saveShippingAddress: (state: CartState, action: PayloadAction<ShippingAddress>) => {
            state.shippingAddress = action.payload
        },
        savePaymentMethod: (state: CartState, action: PayloadAction<string>) => {
            state.paymentMethod = action.payload
        },
        reset: (state: CartState) => {
            state.cartItems = []
        },
    },
})

export const addToCart = createAsyncThunk(
    'ADD_TO_CART',
    async (payload: { productId: string; qty: number }, thunkAPI) => {
        const { productId, qty } = payload
        const response = await fetch(`${baseUrl}/api/products/${productId}`)
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data?.message ?? response.statusText)
        }
        const product = data as Product

        const { dispatch, getState } = thunkAPI
        dispatch(
            cartSlice.actions.addItem({
                product: product._id,
                name: product.name,
                countInStock: product.countInStock,
                image: product.image,
                price: product.price,
                qty,
            })
        )

        // also save the store state to local storage
        const storeState = getState() as ReduxState
        const stateToStore = storeState.cart.cartItems
        localStorage.setItem('cartItems', JSON.stringify(stateToStore))

        return data
    }
)