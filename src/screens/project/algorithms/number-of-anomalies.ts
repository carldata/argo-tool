import * as _ from 'lodash';
import { ITimeSeries } from '../models/index';
import { csvLoadingCalculations, EnumRawCsvFormat, IUnixTimePoint } from 'time-series-scroller';
import { convertCsvStringToTimeSeries } from './auxiliary';

export const calculateNumberOfAnomalies = (anomalies: ITimeSeries|string): number => {
  const anomaliesRows = _.isString(anomalies) ? convertCsvStringToTimeSeries(anomalies) : anomalies;
  return anomaliesRows.length;
};