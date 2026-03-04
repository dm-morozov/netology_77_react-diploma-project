import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProductDetails } from '../../domain/catalog/types'

interface ProductDetailsState {
  item: ProductDetails | null
  isLoading: boolean
  error: string | null
}

const initialState: ProductDetailsState = {
  item: null,
  isLoading: false,
  error: null,
}

const ProductDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    productDetailsRequested: (state, _action: PayloadAction<number>) => {
      state.isLoading = true
      state.error = null
      state.item = null
    },

    productDetailsSucceeded: (state, action: PayloadAction<ProductDetails>) => {
      state.isLoading = false
      state.item = action.payload
      state.error = null
    },

    productDetailsFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },

    productDetailsReset: (state) => {
      state.isLoading = false
      state.error = null
      state.item = null
    },
  },
})

export const {
  productDetailsRequested,
  productDetailsSucceeded,
  productDetailsFailed,
  productDetailsReset,
} = ProductDetailsSlice.actions

export default ProductDetailsSlice.reducer
