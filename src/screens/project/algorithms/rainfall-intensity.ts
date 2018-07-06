import * as _ from 'lodash';
import { csvLoadingCalculations, EnumRawCsvFormat, IUnixTimePoint } from 'time-series-scroller';
import { ITimeSeries } from '@screens/project/models/project-screen-state';

const convertToTimeSeries = (csvString: string): ITimeSeries =>
  csvLoadingCalculations.extractUnixTimePoints(_.split(csvString, '\n'), {
    rawFormat: EnumRawCsvFormat.DateTimeThenValue,
    timeStampColumnName: 'time',
    valueColumnName: 'value',
  });

export const calculateRainfallIntensity = (arg: ITimeSeries|string): number => {
  const csvRows = _.isString(arg) ? convertToTimeSeries(arg) : arg;
  return -1;
};