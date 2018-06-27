import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import axios, { AxiosResponse } from 'axios';
import { select, put, take } from 'redux-saga/effects';
import { SHOW_FLOW_PREDICTION_FOR_DAY } from './action-types';

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