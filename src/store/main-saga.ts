import { fork } from 'redux-saga/effects';
import { getConfiguarionSaga } from '@business-logic/configuration/sagas';
import {
  loadProjectSaga,
} from '@screens/project/sagas';

export function* mainSaga() {
  yield [
    fork(getConfiguarionSaga),
    fork(loadProjectSaga),
  ];
}