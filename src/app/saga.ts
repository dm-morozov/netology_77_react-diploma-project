import { all } from 'redux-saga/effects'
import { watchTopSales } from '../features/TopSales/topSalesSaga'
import { watchCategories } from '../features/Categories/categoriesSaga'
import { watchCatalog } from '../features/Catalog/catalogSaga'

export function* rootSaga() {
  yield all([watchTopSales(), watchCategories(), watchCatalog()])
}
