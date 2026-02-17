import { call, put, takeLatest } from 'redux-saga/effects'
import {
  detailsFailed,
  detailsRequested,
  detailsSucceeded,
  listFailed,
  listRequested,
  listSucceeded,
} from './actions'
import { getServiceById, getServices } from '../../domain/service/serviceApi'

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'Произошла неизвестная ошибка'
}

function* handleListRequested(): Generator {
  try {
    const data = yield call(getServices)
    yield put(listSucceeded(data))
  } catch (error) {
    yield put(listFailed(getErrorMessage(error)))
  }
}

function* handleDetailsRequested(
  action: ReturnType<typeof detailsRequested>,
): Generator {
  try {
    const data = yield call(getServiceById, action.payload)
    yield put(detailsSucceeded(data))
  } catch (error) {
    yield put(detailsFailed(getErrorMessage(error)))
  }
}

export function* watchServicesSaga() {
  yield takeLatest(listRequested.type, handleListRequested)
  yield takeLatest(detailsRequested.type, handleDetailsRequested)
}
