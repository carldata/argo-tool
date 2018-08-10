import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import axios, { AxiosResponse } from 'axios';
import { push } from 'react-router-redux';
import { select, put, take } from 'redux-saga/effects';
import { PROJECT_LOAD_SUCCEEDED, SELECTED_DATE_CHANGED } from './action-types';
import { PROJECT_SELECTED } from '@screens/select-project/action-types';
import { IAppState } from '@store/state';
import { IProject } from '@models/.';
import { routes } from '@routes';
import { IEndpointSettings } from '@business-logic/configuration';
import { handleErrorInSaga } from '../../common/handle-error-in-saga';
import { ShowGenericMessageModalAction, HideGenericMessageModalAction } from '@components/generic-message-modal';
import { ProjectLoadStartedAction, ProjectLoadSucceededAction, TimeSeriesLoadSucceededAction, TimeSeriesLoadStartedAction } from './actions';
import { convertCsvStringToTimeSeries } from '@screens/project/algorithms/auxiliary';
import { ITimeSeries, IProjectScreenState } from '@screens/project/models';
import { getCookie } from '../../common/cookie-auxiliary';
import { checkResponseForError } from '../../common/response-error-checking';

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
      yield put(push((routes.PROJECT)));
    } catch (error) {
      yield handleErrorInSaga(error);
    }
  }
}

/**
 * Due to inconsistencies in HTTP endpoints, we fetch "a little too much" data, that finally have to be post filtered
 */
const postFilterResults = (date: Date, series: ITimeSeries[]): ITimeSeries[] => {
  const dateFrom = dateFns.startOfDay(date);
  const dateTo = dateFns.startOfDay(dateFns.addHours(dateFrom, 25));
  return series.map((s) => s.filter((c) => dateFns.isAfter(c.unix, dateFrom) && dateFns.isBefore(c.unix, dateTo)));
};

export function* loadDataSaga() {
  while (true) {
    yield take([PROJECT_LOAD_SUCCEEDED, SELECTED_DATE_CHANGED]);
    try {
      const projectScreenState: IProjectScreenState = yield select((state: IAppState) => state.projectScreenState);
      if (_.isUndefined(projectScreenState.project) || _.isNull(projectScreenState.project)) {
        yield put(push(routes.SELECT_PROJECT));
        return;
      }

      yield put(_.toPlainObject(new ShowGenericMessageModalAction()));
      yield put(_.toPlainObject(new TimeSeriesLoadStartedAction()));

      const project: IProject = yield select((state: IAppState) => state.projectScreenState.project);
      const date: Date = yield select((state: IAppState) => state.projectScreenState.selectedDate);
      const httpQueryDateFrom = dateFns.addMinutes(dateFns.startOfDay(date), -30);
      const httpQueryDateTo = dateFns.addMinutes(dateFns.startOfDay(date), (24 * 60) + 30);

      const endpointSettings: IEndpointSettings = yield select((state: IAppState) => state.configuration.endpointSettings);

      const token = getCookie('fw_jwt');

      const flowPromises = project.predictionConfigs.map((c) =>
        axios.get<AxiosResponse<IProject>>(`${endpointSettings.flowWorksHttp}/data/channel/${c.flowChannelId}/data?` +
          `startDate=${dateFns.format(httpQueryDateFrom, endpointSettings.dateTimeFormat)}&` +
          `endDate=${dateFns.format(httpQueryDateTo, endpointSettings.dateTimeFormat)}`));
      const rainfallPromises = project.predictionConfigs.map((c) =>
        axios.get<AxiosResponse<IProject>>(`${endpointSettings.flowWorksHttp}/data/channel/${c.rainfallChannelId}/data?` +
          `startDate=${dateFns.format(httpQueryDateFrom, endpointSettings.dateTimeFormat)}&` +
          `endDate=${dateFns.format(httpQueryDateTo, endpointSettings.dateTimeFormat)}`));
      const anomaliesPromises = project.predictionConfigs.map((c) =>
        axios.get<AxiosResponse<IProject>>(
          `${endpointSettings.flowWorksHttp}/anomalies/find?editedFlowChannelId=${c.editedChannelId}&rawFlowChannelId=${c.flowChannelId}&rainfallChannelId=${c.rainfallChannelId}&` +
          `startDate=${dateFns.format(httpQueryDateFrom, endpointSettings.dateTimeFormat)}&` +
          `endDate=${dateFns.format(httpQueryDateTo, endpointSettings.dateTimeFormat)}&token=${token}`));
      const predictionsPromises = project.predictionConfigs.map((c) =>
        axios.get<AxiosResponse<IProject>>(`${endpointSettings.flowWorksHttp}/prediction/predict/${c.flowChannelId}?` +
          `startDate=${dateFns.format(httpQueryDateFrom, endpointSettings.dateTimeFormat)}&` +
          `endDate=${dateFns.format(httpQueryDateTo, endpointSettings.dateTimeFormat)}`));

      const flowResults: string[] = _.map(yield Promise.all(flowPromises), (resp) => checkResponseForError(resp.data));
      const rainfallResults: string[] = _.map(yield Promise.all(rainfallPromises), (resp) => checkResponseForError(resp.data));
      const anomaliesResults: string[] = _.map(yield Promise.all(anomaliesPromises), (resp) => checkResponseForError(resp.data));
      const predictionsResults: string[] = _.map(yield Promise.all(predictionsPromises), (resp) => checkResponseForError(resp.data));

      const flowTimeSeries: ITimeSeries[] = flowResults.map((r) => convertCsvStringToTimeSeries(r));
      const rainfallTimeSeries: ITimeSeries[] = rainfallResults.map((r) => convertCsvStringToTimeSeries(r));
      const anomaliesTimeSeries: ITimeSeries[] = anomaliesResults.map((r) => convertCsvStringToTimeSeries(r));
      const predictionsTimeSeries: ITimeSeries[] = predictionsResults.map((r) => convertCsvStringToTimeSeries(r, 'time', 'mean'));

      if (endpointSettings.backlessDevelopment) {
        yield put(_.toPlainObject(new TimeSeriesLoadSucceededAction(project.predictionConfigs,
          flowTimeSeries,
          rainfallTimeSeries,
          anomaliesTimeSeries,
          predictionsTimeSeries)));
      } else {
        yield put(_.toPlainObject(new TimeSeriesLoadSucceededAction(project.predictionConfigs,
          postFilterResults(date, flowTimeSeries),
          postFilterResults(date, rainfallTimeSeries),
          postFilterResults(date, anomaliesTimeSeries),
          postFilterResults(date, predictionsTimeSeries))));
      }

      yield put(_.toPlainObject(new HideGenericMessageModalAction()));
    } catch (error) {
      yield handleErrorInSaga(error);
    }
  }
}