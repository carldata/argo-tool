import * as _ from 'lodash';
import * as actionTypes from '@screens/project/action-types';
import {
  ProjectLoadSucceededAction, TimeSeriesLoadStartedAction, TimeSeriesLoadSucceededAction,
} from './actions';
import { IProjectScreenState } from '@screens/project/models/project-screen-state';
import { ICalculations } from '@screens/project/models';

const initialState: IProjectScreenState = {
  project: null,
  projectConfigurations: [],
  calculations: [],
  selectedDate: new Date(),
  selectedCalculationIndex: -1,
} as IProjectScreenState;

export type ProjectScreenActionsTypes = ProjectLoadSucceededAction|
                                        TimeSeriesLoadSucceededAction;

export const projectScreenReducer = (state: IProjectScreenState = initialState, action: ProjectScreenActionsTypes): IProjectScreenState => {
  switch (action.type) {
    case actionTypes.PROJECT_LOAD_SUCCEEDED:
      return { ...state, project: action.project };
    case actionTypes.TIME_SERIES_LOAD_SUCCEEDED:
      return { ...state,
        calculations: _.zip(
          action.predictionConfigs,
          action.flows,
          action.rainfalls,
          action.anomalies,
          action.predictions)
        .map((r) => ({
            flowChannelId: r[0].flowChannelId,
            flowChannelName: r[0].flowChannelName,
            rainfallChannelId: r[0].rainfallChannelId,
            rainfallChannelName: r[0].rainfallChannelName,
            flowTimeSeries: r[1],
            rainfallTimeSeries: r[2],
            anomaliesTimeSeries: r[3],
            predictionTimeSeries: r[4],
            dailyAnomalies: -1,
            dailyPredictionError: -1,
            rainfallIntensity: -1,
          }
        )),
      };
    default:
      return state;
  }
};