import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Category } from '../../domain/catalog/types'

interface CategoriesState {
  items: Category[]
  activeCategoryId: number
  isLoading: boolean
  error: string | null
}

const initialState: CategoriesState = {
  items: [],
  activeCategoryId: 0,
  isLoading: false,
  error: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesRequested: (state) => {
      state.isLoading = true
      state.error = null
    },
    categoriesSucceeded: (state, action: PayloadAction<Category[]>) => {
      state.isLoading = false
      state.items = action.payload
      state.error = null
    },
    activeCategoryChanged: (state, action: PayloadAction<number>) => {
      state.activeCategoryId = action.payload
    },
    categoriesFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const {
  categoriesFailed,
  categoriesRequested,
  categoriesSucceeded,
  activeCategoryChanged,
} = categoriesSlice.actions

export default categoriesSlice.reducer
