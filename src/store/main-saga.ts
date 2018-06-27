import { fork } from 'redux-saga/effects';
import { initializationSaga } from '@business-logic/sagas';
import { loadStormEventSaga } from '@screens/project/sagas';

export function* mainSaga() {
  yield [
    fork(initializationSaga),
    fork(loadStormEventSaga),
  ];
}