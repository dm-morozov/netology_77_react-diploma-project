import { all } from 'redux-saga/effects'
import { watchTopSales } from '../features/TopSales/topSalesSaga'

export function* rootSaga() {
  yield all([watchTopSales()])
}
