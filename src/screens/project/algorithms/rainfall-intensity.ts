import * as _ from 'lodash';
import { ITimeSeries } from '../models/index';
import { convertCsvStringToTimeSeries } from './auxiliary';
import { IUnixTimePoint } from '../../../../node_modules/time-series-scroller';

export const calculateRainfallIntensity = (rainfall: ITimeSeries | string): number => {
  const csvRows = _.isString(rainfall) ? convertCsvStringToTimeSeries(rainfall) : rainfall;
  const duration1h: number = 60 * 60 * 1000;
  return _.chain(csvRows)
    .map((el, index, arr) => _.sum(window(index, duration1h, arr)))
    .max()
    .value();
};

const window = (index: number, duration: number, arr: IUnixTimePoint[]): number[] => {
  return _.chain(arr)
    .slice(0, index + 1)
    .filter((el) => el.unix >= (arr[index].unix - duration))
    .map((el) => el.value)
    .value();
};