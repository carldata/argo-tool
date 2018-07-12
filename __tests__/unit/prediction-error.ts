import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import axios from 'axios';
import { calculatePredictionError } from '../../src/screens/project/algorithms/prediction-error';

describe('calcluate prediction error', () => {
  it.only('testing with 7881-11742 for 2018-07-05', (done) => {
    Promise
      .all([axios.get('http://localhost:3900/static-csv/7881-11742.data.csv'),
            axios.get('http://localhost:3900/static-csv/7881-11742.predictions.csv')])
      .then((results) => {
        const [flow, predictions] = results;
        const error = calculatePredictionError(flow.data, predictions.data);
        expect(error).toBeGreaterThan(13.74);
        expect(error).toBeLessThan(13.745);
        done();
      });
  });
});