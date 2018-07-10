import * as _ from 'lodash';
import { IUnixTimePoint } from 'time-series-scroller';
import { IPrediction } from '@components/prediction-chart';
import { ITimeSeries } from '@screens/project/models';

export const createPredictionFromTimeSeries = (flowTimeSeries: ITimeSeries, predictionTimeSeries: ITimeSeries, rainfallTimeSeries: ITimeSeries): IPrediction<Date> => {
  const flowMap: Map<number, number> = _.reduce<IUnixTimePoint[], Map<number, number>>(
    flowTimeSeries,
    (acc, el: IUnixTimePoint) => {
      acc.set(el.unix, el.value);
      return acc;
    },
    new Map<number, number>());
  const predictionMap: Map<number, number> = _.reduce<IUnixTimePoint[], Map<number, number>>(
    predictionTimeSeries,
    (acc, el: IUnixTimePoint) => {
      acc.set(el.unix, el.value);
      return acc;
    },
    new Map<number, number>());
  const rainfallMap: Map<number, number> = _.reduce<IUnixTimePoint[], Map<number, number>>(
    rainfallTimeSeries,
    (acc, el: IUnixTimePoint) => {
      acc.set(el.unix, el.value);
      return acc;
    },
    new Map<number, number>());
  return {
    index: Array.from(flowMap.keys()).map((el) => new Date(el)),
    flow: Array.from(flowMap.values()),
    prediction: Array.from(flowMap.keys()).map((el) => predictionMap.has(el) ? predictionMap.get(el) : 0),
    rainfall: Array.from(flowMap.keys()).map((el) => rainfallMap.has(el) ? rainfallMap.get(el) : 0),
  };
};