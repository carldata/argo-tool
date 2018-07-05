import * as _ from 'lodash';
import { object, string, number, date, array } from 'yup';
import { IPrediction } from '@components/prediction-chart';

const dateFromToSchema = object({
  from: date()
    .required(),
  to: date()
    .required(),
});

export const rdiiStormEventSchema = object({
  index: array()
    .required(),
  dwp: array()
    .of(number())
    .required(),
  flow: array()
    .of(number())
    .required(),
  rainfall: array()
    .of(number())
    .required(),
  rdii1: array()
    .of(number())
    .required(),
  rdii2: array()
    .of(number()),
  rdii3: array()
    .of(number()),
})
.test('index and flow arrays have the same length',
      null,
      (rdiiStormEvent: IPrediction<string>) =>
      _.isArray(rdiiStormEvent.index) &&
      _.isArray(rdiiStormEvent.flow) &&
      (rdiiStormEvent.index.length === rdiiStormEvent.flow.length))
.test('index and prediction arrays have the same length',
      null,
      (rdiiStormEvent: IPrediction<string>) =>
      _.isArray(rdiiStormEvent.index) &&
      (!_.isArray(rdiiStormEvent.prediction)) ||
       ((_.isArray(rdiiStormEvent.prediction) && (rdiiStormEvent.index.length === rdiiStormEvent.flow.length))))
.test('index and rainfall arrays have the same length',
      null,
      (rdiiStormEvent: IPrediction<string>) =>
      _.isArray(rdiiStormEvent.index) &&
      _.isArray(rdiiStormEvent.rainfall) &&
      (rdiiStormEvent.index.length === rdiiStormEvent.rainfall.length))