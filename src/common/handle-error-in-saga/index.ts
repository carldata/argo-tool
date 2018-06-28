import * as _ from 'lodash';
import { takeEvery, call, all, put, select } from 'redux-saga/effects';
import { BackendOperationErrorAction } from './actions';
import { ShowGenericMessageModalAction } from '@components/generic-message-modal';

export function* handleErrorInSaga(error) {
  if (error instanceof Error) {
    yield put(_.toPlainObject(new BackendOperationErrorAction(JSON.stringify(error.message))));
    yield put(_.toPlainObject(new ShowGenericMessageModalAction('An error occurred', `Details: ${error.message}`, true)));
    return;
  }
  yield put(_.toPlainObject(new BackendOperationErrorAction(_.toString(error))));
  yield put(_.toPlainObject(new ShowGenericMessageModalAction('An error occurred', '', true)));
}