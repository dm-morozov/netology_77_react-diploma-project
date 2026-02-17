import { createSlice } from '@reduxjs/toolkit'
import type { ServicesState } from '../../domain/service/types'
import {
  detailsFailed,
  detailsRequested,
  detailsSucceeded,
  listFailed,
  listRequested,
  listSucceeded,
} from './actions'

const initialState: ServicesState = {
  list: {
    data: [],
    loading: false,
    error: null,
  },
  details: {
    data: null,
    loading: false,
    error: null,
  },
}

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LIST
      .addCase(listRequested, (state) => {
        state.list.loading = true
        state.list.error = null
      })
      .addCase(listSucceeded, (state, action) => {
        state.list.loading = false
        state.list.data = action.payload
        state.list.error = null
      })
      .addCase(listFailed, (state, action) => {
        state.list.loading = false
        state.list.error = action.payload
      })
      // DETAILS
      .addCase(detailsRequested, (state) => {
        state.details.loading = true
        state.details.error = null
        // Чтобы не показывать старые детали добавим data = null
        state.details.data = null
      })
      .addCase(detailsSucceeded, (state, action) => {
        state.details.loading = false
        state.details.data = action.payload
        state.details.error = null
      })
      .addCase(detailsFailed, (state, action) => {
        state.details.loading = false
        state.details.error = action.payload
      })
  },
})

export const servicesReducer = servicesSlice.reducer
