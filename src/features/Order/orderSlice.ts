import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { OrderPayload } from '../../domain/order/types'

interface OrderState {
  isLoading: boolean
  error: string | null
  success: boolean
}

const initialState: OrderState = {
  isLoading: false,
  error: null,
  success: false,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderRequested: (state, _action: PayloadAction<OrderPayload>) => {
      state.isLoading = true
      state.success = false
      state.error = null
    },

    orderSucceeded: (state) => {
      state.isLoading = false
      state.error = null
      state.success = true
    },

    orderFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.success = false
      state.error = action.payload
    },

    orderReset: (state) => {
      state.isLoading = false
      state.error = null
      state.success = false
    },
  },
})

export const { orderRequested, orderSucceeded, orderFailed, orderReset } =
  orderSlice.actions
export default orderSlice.reducer
