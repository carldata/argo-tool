import * as _ from 'lodash';
import * as actionTypes from '@screens/project/action-types';
import {
  ProjectLoadSucceededAction, TimeSeriesLoadStartedAction, TimeSeriesLoadSucceededAction, SelectedDateChangedAction,
} from './actions';
import { IProjectScreenState, ICalculations } from './models';
import { calculateNumberOfAnomalies } from './algorithms/number-of-anomalies';
import { calculatePredictionError } from './algorithms/prediction-error';
import { calculateRainfallIntensity } from './algorithms/rainfall-intensity';

const initialState: IProjectScreenState = {
  project: null,
  projectConfigurations: [],
  calculations: [],
  selectedDate: new Date(),
  selectedCalculationIndex: -1,
} as IProjectScreenState;

export type ProjectScreenActionsTypes = ProjectLoadSucceededAction|
                                        TimeSeriesLoadSucceededAction|
                                        SelectedDateChangedAction;

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
            dailyAnomalies: calculateNumberOfAnomalies(r[1], r[3]),
            dailyPredictionError: calculatePredictionError(r[1], r[4]),
            rainfallIntensity: calculateRainfallIntensity(r[2]),
          }
        )),
      };
    case actionTypes.SELECTED_DATE_CHANGED:
      return { ...state, selectedDate: action.date };
    default:
      return state;
  }
};