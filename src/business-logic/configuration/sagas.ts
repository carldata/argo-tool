import * as _ from 'lodash';
import axios from 'axios';
import { put } from 'redux-saga/effects';
import { ConfigurationLoadStartedAction, ConfigurationLoadSucceededAction } from './actions';

type ILoadConfigurationAsyncActionCreator = () => void;

export function* getConfiguarionSaga() {
  yield put(_.toPlainObject(new ConfigurationLoadStartedAction()));
  try {
    const flowWorksResponse = yield axios.get('auto-iandi/dist/configuration.json');
    if (_.isObject(flowWorksResponse)) {
      yield put(_.toPlainObject(new ConfigurationLoadSucceededAction(flowWorksResponse.data)));
    }
  } catch {
  };
  try {
    const localResponse = yield axios.get('configuration.json');
    if (_.isObject(localResponse)) {
      yield put(_.toPlainObject(new ConfigurationLoadSucceededAction(localResponse.data)));
    }
  } catch {
  };
}