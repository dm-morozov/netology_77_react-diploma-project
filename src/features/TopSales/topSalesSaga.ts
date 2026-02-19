import { call, put, takeLatest } from 'redux-saga/effects'
import {
  topSalesFailed,
  topSalesRequested,
  topSalesSucceeded,
} from './topSalesSlice'
import { getTopSales } from '../../domain/catalog/api'

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'Unknown Error...'
}

function* handleTopSales(): Generator {
  try {
    const data = yield call(getTopSales)
    yield put(topSalesSucceeded(data))
  } catch (error) {
    yield put(topSalesFailed(getErrorMessage(error)))
  }
}

export function* watchTopSales() {
  yield takeLatest(topSalesRequested.type, handleTopSales)
}
