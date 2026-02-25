import { call, put, takeLatest } from 'redux-saga/effects'
import {
  categoriesRequested,
  categoriesFailed,
  categoriesSucceeded,
} from './categoriesSlice'

import { getCategories } from '../../domain/catalog/api'
import { getErrorMessage } from '../../domain/common/errors'

function* handleCategory(): Generator {
  try {
    const data = yield call(getCategories)
    yield put(categoriesSucceeded(data))
  } catch (error) {
    yield put(categoriesFailed(getErrorMessage(error)))
  }
}

export function* watchCategories() {
  yield takeLatest(categoriesRequested.type, handleCategory)
}
