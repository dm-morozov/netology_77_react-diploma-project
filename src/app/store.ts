import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { servicesReducer } from '../store/services/reducer'
import { rootSaga } from './saga'

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    services: servicesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Отключаем thunk, так как используем saga
    }).concat(sagaMiddleware), // Добавляем sagaMiddleware в цепочку middleware
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
