import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import axios, { AxiosResponse } from 'axios';
import { push } from 'react-router-redux';
import { select, put, take } from 'redux-saga/effects';
import { SHOW_FLOW_PREDICTION_FOR_DAY } from './action-types';
import { PROJECT_SELECTED } from '@screens/select-project/action-types';
import { IAppState } from '@store/state';
import { IProject } from '@models/.';
import { routes } from '@routes';
import { IEndpointSettings } from '@business-logic/configuration';
import { handleErrorInSaga } from '../../common/handle-error-in-saga';
import { ShowGenericMessageModalAction, HideGenericMessageModalAction } from '@components/generic-message-modal';
import { ProjectLoadStartedAction, ProjectLoadSucceededAction } from './actions';

export function* loadProjectSaga() {
  while (true) {
    yield take(PROJECT_SELECTED);
    try {
      yield put(_.toPlainObject(new ShowGenericMessageModalAction()));
      yield put(_.toPlainObject(new ProjectLoadStartedAction()));
      const endpointSettings: IEndpointSettings = yield select((state: IAppState) => state.configuration.endpointSettings);
      const projectId: string = yield select((state: IAppState) => state.selectProjectScreenState.projectId);
      const projectResponse: AxiosResponse<IProject> = yield axios.get<AxiosResponse<IProject>>(`${endpointSettings.flowWorksHttp}/config/${endpointSettings.appId}/${projectId}`);
      yield put(_.toPlainObject(new ProjectLoadSucceededAction(projectResponse.data)));
      yield put(_.toPlainObject(new HideGenericMessageModalAction()));
      yield put(push(_.replace(routes.PROJECT, ':projectId', projectId)));
    } catch (error) {
      yield handleErrorInSaga(error);
    }
  }
}

export function* loadFlowSaga() {
  while (true) {
    yield take(SHOW_FLOW_PREDICTION_FOR_DAY);
  }
}

export function* loadRainfallSaga() {
  while (true) {
    yield take(SHOW_FLOW_PREDICTION_FOR_DAY);
  }
}

export function* loadPredictionSaga() {
  while (true) {
    yield take(SHOW_FLOW_PREDICTION_FOR_DAY);
  }
}