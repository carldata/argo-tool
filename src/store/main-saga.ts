import { fork } from 'redux-saga/effects';
import { initializationSaga } from '@business-logic/sagas';
import {
  loadFlowSaga,
  loadPredictionSaga,
  loadRainfallSaga,
} from '@screens/project/sagas';

export function* mainSaga() {
  yield [
    fork(initializationSaga),
    fork(loadFlowSaga),
    fork(loadPredictionSaga),
    fork(loadRainfallSaga),
  ];
}