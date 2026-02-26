import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  catalogFailed,
  catalogLoadMoreRequested,
  catalogLoadMoreSucceeded,
  catalogRequested,
  catalogSucceeded,
} from './catalogSlice'
import { getItems } from '../../domain/catalog/api'
import { getErrorMessage } from '../../domain/common/errors'
import type { RootState } from '../../app/store'

function* handleCatalogRequested(): Generator {
  try {
    const categoryId = yield select(
      (state: RootState) => state.categories.activeCategoryId,
    )

    const searchQuery = yield select(
      (state: RootState) => state.catalog.searchQuery,
    )

    const data = yield call(getItems, {
      categoryId: categoryId as number,
      offset: 0,
      q: searchQuery,
    })
    yield put(catalogSucceeded(data))
  } catch (error) {
    yield put(catalogFailed(getErrorMessage(error)))
  }
}

function* handleLoadMoreRequested(): Generator {
  try {
    const categoryId = yield select(
      (state: RootState) => state.categories.activeCategoryId,
    )

    const offset = yield select((state: RootState) => state.catalog.offset)

    const searchQuery = yield select(
      (state: RootState) => state.catalog.searchQuery,
    )

    const data = yield call(getItems, {
      categoryId: categoryId as number,
      offset: offset as number,
      q: searchQuery,
    })

    yield put(catalogLoadMoreSucceeded(data))
  } catch (error) {
    yield put(catalogFailed(getErrorMessage(error)))
  }
}

export function* watchCatalog() {
  yield takeLatest(catalogRequested.type, handleCatalogRequested)
  yield takeLatest(catalogLoadMoreRequested.type, handleLoadMoreRequested)
}
