import * as _ from 'lodash';
import { ITimeSeries } from '../models/index';
import { csvLoadingCalculations, EnumRawCsvFormat, IUnixTimePoint } from 'time-series-scroller';
import { convertCsvStringToTimeSeries } from './auxiliary';

export const calculatePredictionError = (flow: ITimeSeries|string, predictions: ITimeSeries|string): number => {
  const flowRows = _.isString(flow) ? convertCsvStringToTimeSeries(flow) : flow;
  const predictionRows = _.isString(predictions) ? convertCsvStringToTimeSeries(predictions, 'time', 'mean') : predictions;
  const flowMap: Map<number, number> = _.reduce(flowRows, (map, el) => {
    map.set(el.unix, el.value);
    return map;
  }, new Map<number, number>());
  const predictionMap: Map<number, number> = _.reduce(predictionRows, (map, el) => {
    map.set(el.unix, el.value);
    return map;
  }, new Map<number, number>());
  const mape = Array // as defined by https://en.wikipedia.org/wiki/Mean_absolute_percentage_error
    .from(flowMap.keys())
    .reduce((acc, k) => {
      if (predictionMap.has(k)) {
        return {
          sum: acc.sum + Math.abs((flowMap.get(k) - predictionMap.get(k)) / flowMap.get(k)),
          n: acc.n + 1,
        };
      }
      return acc;
    }, {
      sum: 0, // sum of abs(A(t) - F(t))/A(t)
      n: 0, // number of t's,
    });

  return mape.n > 0 ? 100.0 * mape.sum / mape.n : 0;
};