import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProductShop } from '../../domain/catalog/types'

interface TopSalesState {
  items: ProductShop[]
  isLoading: boolean
  error: string | null
}

const initialState: TopSalesState = {
  items: [],
  isLoading: false,
  error: null,
}

const topSalesSlice = createSlice({
  name: 'topSales',
  initialState,
  reducers: {
    topSalesRequested: (state) => {
      state.isLoading = true
      state.error = null
    },
    topSalesSucceeded: (state, action: PayloadAction<ProductShop[]>) => {
      state.isLoading = false
      state.items = action.payload
    },
    topSalesFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { topSalesFailed, topSalesRequested, topSalesSucceeded } =
  topSalesSlice.actions

export default topSalesSlice.reducer
