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
  prediction: array()
    .of(number())
    .required(),
  flow: array()
    .of(number())
    .required(),
  rainfall: array()
    .of(number())
    .required(),
})
.test('index and flow arrays have the same length',
      null,
      (prediction: IPrediction<string>) =>
      _.isArray(prediction.index) &&
      _.isArray(prediction.flow) &&
      (prediction.index.length === prediction.flow.length))
.test('index and prediction arrays have the same length',
      null,
      (prediction: IPrediction<string>) =>
      _.isArray(prediction.index) &&
      (!_.isArray(prediction.prediction)) ||
       ((_.isArray(prediction.prediction) && (prediction.index.length === prediction.flow.length))))
.test('index and rainfall arrays have the same length',
      null,
      (prediction: IPrediction<string>) =>
      _.isArray(prediction.index) &&
      _.isArray(prediction.rainfall) &&
      (prediction.index.length === prediction.rainfall.length))