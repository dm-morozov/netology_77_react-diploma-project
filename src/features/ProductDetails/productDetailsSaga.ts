import { call, put, takeLatest } from 'redux-saga/effects'
import {
  productDetailsFailed,
  productDetailsRequested,
  productDetailsSucceeded,
} from './productDetailsSlice'
import { getErrorMessage } from '../../domain/common/errors'
import { getItemById } from '../../domain/catalog/api'
import type { ProductDetails } from '../../domain/catalog/types'

function* handleProductDetailsRequested(
  action: ReturnType<typeof productDetailsRequested>,
): Generator {
  try {
    const data: ProductDetails = yield call(getItemById, action.payload)
    yield put(productDetailsSucceeded(data))
  } catch (error) {
    yield put(productDetailsFailed(getErrorMessage(error)))
  }
}

export function* watchProductDetails() {
  yield takeLatest(productDetailsRequested.type, handleProductDetailsRequested)
}
