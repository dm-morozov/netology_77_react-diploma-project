import { all } from 'redux-saga/effects'
import { watchServicesSaga } from '../store/services/sagas'

export function* rootSaga() {
  yield all([watchServicesSaga()])
}
