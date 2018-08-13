import * as _ from 'lodash';
import { takeEvery, call, all, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { BackendOperationErrorAction } from './actions';
import { ShowGenericMessageModalAction } from '@components/generic-message-modal';
import { setCookie } from '../cookie-auxiliary';
import { routes } from '../../routes';

export function* handleErrorInSaga(error) {
  const errorMessage = error instanceof Error ? JSON.stringify(error.message) : _.toString(error);
  if (_.trim(errorMessage) === 'Token is invalid') {
    setCookie('fw_jwt', '', -100);
    yield put(push(routes.LOGIN));
  } else {
    yield put(_.toPlainObject(new BackendOperationErrorAction(errorMessage)));
    yield put(_.toPlainObject(new ShowGenericMessageModalAction('An error occurred', errorMessage, true)));
  }

}