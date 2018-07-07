import * as _ from 'lodash';
import { ITimeSeries } from '../models/index';
import { csvLoadingCalculations, EnumRawCsvFormat, IUnixTimePoint } from 'time-series-scroller';
import { convertCsvStringToTimeSeries } from './auxiliary';

export const calculatePredictionError = (flow: ITimeSeries|string, predictions: ITimeSeries|string): number => {
  const flowRows = _.isString(flow) ? convertCsvStringToTimeSeries(flow) : flow;
  const predictionRows = _.isString(predictions) ? convertCsvStringToTimeSeries(predictions) : predictions;
  return -1;
};