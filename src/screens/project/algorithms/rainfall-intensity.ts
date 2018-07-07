import * as _ from 'lodash';
import { ITimeSeries } from '../models/index';
import { convertCsvStringToTimeSeries } from './auxiliary';

export const calculateRainfallIntensity = (rainfall: ITimeSeries|string): number => {
  const csvRows = _.isString(rainfall) ? convertCsvStringToTimeSeries(rainfall) : rainfall;
  return -1;
};