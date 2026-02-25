import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import topSalesReducer from '../features/TopSales/topSalesSlice'
import categoriesReducer from '../features/Categories/categoriesSlice'
import catalogReducer from '../features/Catalog/catalogSlice'
import { rootSaga } from './saga'

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    topSales: topSalesReducer,
    categories: categoriesReducer,
    catalog: catalogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Отключаем thunk, так как используем saga
    }).concat(sagaMiddleware), // Добавляем sagaMiddleware в цепочку middleware
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
