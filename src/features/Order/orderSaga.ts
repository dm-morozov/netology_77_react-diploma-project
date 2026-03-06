import { call, put, takeLatest } from 'redux-saga/effects'
import { orderFailed, orderRequested, orderSucceeded } from './orderSlice'
import { postOrder } from '../../domain/order/api'
import { clearCart } from '../Cart/cartSlice'
import { getErrorMessage } from '../../domain/common/errors'

function* handleOrderRequested(
  action: ReturnType<typeof orderRequested>,
): Generator {
  try {
    yield call(postOrder, action.payload)
    yield put(orderSucceeded())
    yield put(clearCart())
  } catch (error) {
    yield put(orderFailed(getErrorMessage(error)))
  }
}

export function* watchOrder() {
  yield takeLatest(orderRequested.type, handleOrderRequested)
}
