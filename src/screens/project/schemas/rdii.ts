import * as _ from 'lodash';
import { object, string, number, date, array } from 'yup';
import { IStormEvent } from '@components/prediction-chart';

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
.test('index and rdii1 arrays have the same length',
      null,
      (rdiiStormEvent: IStormEvent<string>) =>
      _.isArray(rdiiStormEvent.index) &&
      _.isArray(rdiiStormEvent.rdii1) &&
      (rdiiStormEvent.index.length === rdiiStormEvent.rdii1.length))
.test('index and rdii2 arrays have the same length',
      null,
      (rdiiStormEvent: IStormEvent<string>) =>
      _.isArray(rdiiStormEvent.index) &&
      (!_.isArray(rdiiStormEvent.rdii2)) ||
       ((_.isArray(rdiiStormEvent.rdii2) && (rdiiStormEvent.index.length === rdiiStormEvent.rdii2.length))))
.test('index and rdii3 arrays have the same length',
      null,
      (rdiiStormEvent: IStormEvent<string>) =>
      _.isArray(rdiiStormEvent.index) &&
      (!_.isArray(rdiiStormEvent.rdii3)) ||
      (_.isArray(rdiiStormEvent.rdii3) && (rdiiStormEvent.index.length === rdiiStormEvent.rdii3.length)))
.test('index and rainfall arrays have the same length',
      null,
      (rdiiStormEvent: IStormEvent<string>) =>
      _.isArray(rdiiStormEvent.index) &&
      _.isArray(rdiiStormEvent.rainfall) &&
      (rdiiStormEvent.index.length === rdiiStormEvent.rainfall.length))
.test('index and dwp arrays have the same length',
      null,
      (rdiiStormEvent: IStormEvent<string>) =>
      _.isArray(rdiiStormEvent.index) &&
      _.isArray(rdiiStormEvent.dwp) &&
      (rdiiStormEvent.index.length === rdiiStormEvent.dwp.length))
.test('index and flow arrays have the same length',
      null,
      (rdiiStormEvent: IStormEvent<string>) =>
      _.isArray(rdiiStormEvent.index) &&
      _.isArray(rdiiStormEvent.flow) &&
      (rdiiStormEvent.index.length === rdiiStormEvent.flow.length));