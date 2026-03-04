import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {
  loadCartFromStorage,
  saveCartToStorage,
} from '../../domain/cart/storage'
import type { CartItem } from '../../domain/cart/types'

interface AddToCartPayload {
  id: number
  title: string
  size: string
  price: number
  count: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: loadCartFromStorage(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const payload = action.payload
      const existing = state.items.find(
        (item) => item.id === payload.id && item.size === payload.size,
      )

      if (existing) {
        // В Redux Toolkit можно писать "мутационный" код.
        // Под капотом Immer создает новый immutable state.
        // функция по прежнему остается чистой
        existing.count += payload.count // existing.count ссылка на объект state.items в памяти
      } else {
        state.items.push({
          id: payload.id,
          title: payload.title,
          size: payload.size,
          price: payload.price, // фиксируем цену на момент добавления
          count: payload.count,
        })
      }

      saveCartToStorage(state.items)
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ id: number; size: string }>,
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(item.id === action.payload.id && item.size === action.payload.size),
      )

      saveCartToStorage(state.items)
    },

    clearCart: (state) => {
      state.items = []
      saveCartToStorage(state.items)
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
