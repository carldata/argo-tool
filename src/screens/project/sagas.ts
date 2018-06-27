import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import axios, { AxiosResponse } from 'axios';
import { select, put, take } from 'redux-saga/effects';
import {
  SitesLoadStartedAction,
  SitesLoadSucceededAction,
} from './actions';
import { IAppState } from '@store/state';
import { IConfigurationState } from '@business-logic/configuration';
import { RDII_STORM_EVENT_SELECTED } from '@screens/project/action-types';
import { IStormEvent } from '@components/prediction-chart';
import { IValidated } from '@models/.';

export function* loadSitesSaga() {
  yield put(_.toPlainObject(new SitesLoadStartedAction()));
  const url: IConfigurationState = yield select((state: IAppState) => state.configuration.endpoint.urls.sites);
  const response: AxiosResponse = yield axios.get(`${url}`);
  yield put(_.toPlainObject(new SitesLoadSucceededAction(response.data)));
}

export function* loadStormEventSaga() {
  function* shouldLoadRdii() {
    const rdiis: Array<IStormEvent<Date> & IValidated> = yield select((state: IAppState) => state.mainScreenState.selectedSite.stormEvents);
    const rdiiIndex: number = yield select((state: IAppState) => state.mainScreenState.selectedStromEventIndex);
    return ((rdiis.length > rdiiIndex && !_.isObject(rdiis[rdiiIndex])) || (_.isObject(rdiis[rdiiIndex]) && !rdiis[rdiiIndex].isValid));
  }

  while (true) {
    yield take(RDII_STORM_EVENT_SELECTED);
    if (yield shouldLoadRdii()) {
      
    }
  }
}