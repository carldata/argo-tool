import { fork } from 'redux-saga/effects';
import { getConfiguarionSaga } from '@business-logic/configuration/sagas';
import {
  loadProjectSaga,
  loadDataSaga,
} from '@screens/project';

export function* mainSaga() {
  yield [
    fork(getConfiguarionSaga),
    fork(loadProjectSaga),
    fork(loadDataSaga),
  ];
}