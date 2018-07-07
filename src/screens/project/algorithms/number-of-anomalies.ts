import * as _ from 'lodash';
import { ITimeSeries } from '../models/index';
import { csvLoadingCalculations, EnumRawCsvFormat, IUnixTimePoint } from 'time-series-scroller';
import { convertCsvStringToTimeSeries } from './auxiliary';

export const calculateNumberOfAnomalies = (flow: ITimeSeries|string, anomalies: ITimeSeries|string): number => {
  const flowRows = _.isString(flow) ? convertCsvStringToTimeSeries(flow) : flow;
  const anomaliesRows = _.isString(anomalies) ? convertCsvStringToTimeSeries(anomalies) : anomalies;
  return -1;
};