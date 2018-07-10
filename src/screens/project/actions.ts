import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { Action } from 'redux';
import * as actionTypes from './action-types';
import { IProject } from '@models/project';
import { ITimeSeries } from '@screens/project/models';
import { IPredictionConfig } from '@models/prediction-config';


// tslint:disable:max-classes-per-file
export class ProjectLoadStartedAction implements Action {
  public readonly type = actionTypes.PROJECT_LOAD_STARTED;
}

export class ProjectLoadSucceededAction implements Action {
  public readonly type = actionTypes.PROJECT_LOAD_SUCCEEDED;
  constructor(public project: IProject) { }
}

export class ShowFlowPredictionForDayAction implements Action {
  public readonly type = actionTypes.SHOW_FLOW_PREDICTION_FOR_DAY;
  constructor(public day: Date) { }
}

export class TimeSeriesLoadStartedAction implements Action {
  public readonly type = actionTypes.TIME_SERIES_LOAD_STARTED;
}

export class TimeSeriesLoadSucceededAction implements Action {
  public readonly type = actionTypes.TIME_SERIES_LOAD_SUCCEEDED;
  constructor(public predictionConfigs: IPredictionConfig[],
              public flows: ITimeSeries[],
              public rainfalls: ITimeSeries[],
              public predictions: ITimeSeries[],
              public anomalies: ITimeSeries[]) { }
}