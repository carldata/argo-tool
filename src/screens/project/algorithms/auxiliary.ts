import * as _ from 'lodash';
import { csvLoadingCalculations, EnumRawCsvFormat } from 'time-series-scroller';
import { ITimeSeries } from '../models';

export const convertCsvStringToTimeSeries = (csvString: string,
                                             timeStampColumnName: string = 'time',
                                             valueColumnName: string = 'value'): ITimeSeries =>
  csvLoadingCalculations.extractUnixTimePoints(_.split(csvString, '\n'), {
    rawFormat: EnumRawCsvFormat.DateTimeThenValue,
    timeStampColumnName,
    valueColumnName,
  });
