import { call, put, takeLatest } from 'redux-saga/effects'
import {
  catalogFailed,
  catalogRequested,
  catalogSucceeded,
} from './catalogSlice'
import { getItems } from '../../domain/catalog/api'
import { getErrorMessage } from '../../domain/common/errors'

function* handleCatalog(): Generator {
  try {
    const data = yield call(getItems)
    yield put(catalogSucceeded(data))
  } catch (error) {
    yield put(catalogFailed(getErrorMessage(error)))
  }
}

export function* watchCatalog() {
  yield takeLatest(catalogRequested.type, handleCatalog)
}
