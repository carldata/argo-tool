import * as _ from 'lodash';
import { IUnixTimePoint } from 'time-series-scroller';
import { IDateSignal, ISample } from './models/signal-sample';

export const convertToDateSignal = (timing: Date[], values: number[]): IDateSignal =>
  _.take(
    _.map(
      _.zip(timing, values),
           (el) => ({ index: el[0], value: el[1] } as ISample<Date>)
    ),
    _.min([_.isArray(timing) ? timing.length : 0, _.isArray(values) ? values.length : 0])
  );