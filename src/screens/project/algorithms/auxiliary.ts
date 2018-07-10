import * as _ from 'lodash';
import * as papa from 'papaparse';

import { csvLoadingCalculations, EnumRawCsvFormat } from 'time-series-scroller';
import { ITimeSeries } from '../models';

export const convertCsvStringToTimeSeries = (csvString: string,
                                             timeStampColumnName: string = 'time',
                                             valueColumnName: string = 'value'): ITimeSeries => {
  const parseResult = papa.parse(csvString, {
    header: true,
  });
  return csvLoadingCalculations.extractUnixTimePoints(parseResult.data, {
    rawFormat: EnumRawCsvFormat.DateTimeThenValue,
    timeStampColumnName,
    valueColumnName,
  });
}