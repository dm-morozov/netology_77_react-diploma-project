import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProductShop } from '../../domain/catalog/types'

interface CatalogState {
  items: ProductShop[]
  isLoading: boolean
  error: string | null
  isLoadingMore: boolean // загружается ли ещё
  hasMore: boolean // есть ли ещё элементы
  offset: number // количество уже загруженных элементов
  searchQuery: string // запрос поиска
}

const initialState: CatalogState = {
  items: [],
  isLoading: false,
  error: null,
  isLoadingMore: false,
  hasMore: true,
  offset: 0,
  searchQuery: '',
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    catalogRequested: (state) => {
      state.isLoading = true
      state.error = null
      state.items = []
      state.offset = 0
      state.hasMore = true
    },
    catalogSucceeded: (state, action: PayloadAction<ProductShop[]>) => {
      state.isLoading = false
      state.items = action.payload
      state.offset = action.payload.length
      state.hasMore = action.payload.length === 6
    },
    catalogFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.isLoadingMore = false
      state.error = action.payload
    },
    catalogLoadMoreRequested: (state) => {
      state.isLoadingMore = true
      state.error = null
    },
    catalogLoadMoreSucceeded: (state, action: PayloadAction<ProductShop[]>) => {
      state.isLoadingMore = false
      state.items = state.items.concat(action.payload)
      state.offset += action.payload.length
      state.hasMore = action.payload.length === 6
    },
    catalogReset: (state) => {
      state.items = []
      state.offset = 0
      state.hasMore = true
      state.isLoading = false
      state.isLoadingMore = false
      state.error = null
    },
    catalogSearchChanged: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.error = null
    },
  },
})

export const {
  catalogRequested,
  catalogSucceeded,
  catalogFailed,
  catalogLoadMoreRequested,
  catalogLoadMoreSucceeded,
  catalogReset,
  catalogSearchChanged,
} = catalogSlice.actions

export default catalogSlice.reducer
