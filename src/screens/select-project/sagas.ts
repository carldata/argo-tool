import * as _ from 'lodash';
import axios, { AxiosResponse } from 'axios';
import { select, put, take } from 'redux-saga/effects';
import { PROJECT_SELECTED } from './action-types';

export function* loadProjectSaga() {
  while (true) {
    yield take(PROJECT_SELECTED);
    // .. implement logic
  }
}