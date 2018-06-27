import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { Action } from 'redux';
import * as actionTypes from './action-types';

// tslint:disable:max-classes-per-file
export class ShowFlowPredictionForDayAction implements Action {
  public readonly type = actionTypes.SHOW_FLOW_PREDICTION_FOR_DAY;
  constructor(public day: Date) { }
}

export class FlowLoadStartedAction implements Action {
  public readonly type = actionTypes.FLOW_LOAD_STARTED;
}

export class FlowLoadSucceededAction implements Action {
  public readonly type = actionTypes.FLOW_LOAD_SUCCEEDED;
}

export class FlowLoadFailedAction implements Action {
  public readonly type = actionTypes.FLOW_LOAD_FAILED;
}