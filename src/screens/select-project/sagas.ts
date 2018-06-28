import * as _ from 'lodash';
import axios, { AxiosResponse } from 'axios';
import { push } from 'react-router-redux';
import { select, put, take, call } from 'redux-saga/effects';
import { PROJECT_SELECTED } from './action-types';
import { IAppState } from '@store/state';
import { IProject } from '@models/.';
import { routes } from '@routes';
import { ProjectLoadStartedAction, ProjectLoadSucceededAction } from '@screens/select-project/actions';
import { IEndpointSettings } from '@business-logic/configuration';
import { handleErrorInSaga } from '../../common/handle-error-in-saga';
import { ShowGenericMessageModalAction, HideGenericMessageModalAction } from '@components/generic-message-modal';


export function* loadProjectSaga() {
  while (true) {
    yield take(PROJECT_SELECTED);
    try {
      yield put(_.toPlainObject(new ShowGenericMessageModalAction()));
      yield put(_.toPlainObject(new ProjectLoadStartedAction()));
      const endpointSettings: IEndpointSettings = yield select((state: IAppState) => state.configuration.endpointSettings);
      const projectId: string = yield select((state: IAppState) => state.selectProjectScreenState.projectId);
      const project: IProject = yield axios.get<AxiosResponse<IProject>>(`${endpointSettings.flowWorksHttp}/config/${endpointSettings.appId}/${projectId}`);
      yield put(_.toPlainObject(new ProjectLoadSucceededAction()));
      yield put(_.toPlainObject(new HideGenericMessageModalAction()));
      yield put(push(_.replace(routes.PROJECT, ':projectId', projectId)));
    } catch (error) {
      yield handleErrorInSaga(error);
    }
  }
}