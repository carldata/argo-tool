import * as _ from 'lodash';
import { ShowFlowPredictionForDayAction } from './actions';

export type IShowFlowPredictionForDayActionCreator = (day: Date) => ShowFlowPredictionForDayAction;

export const showFlowPredictionForDay: IShowFlowPredictionForDayActionCreator = (day: Date) =>
  _.toPlainObject(new ShowFlowPredictionForDayAction(day));