import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import axios from 'axios';
import { calculateRainfallIntensity } from '../../src/screens/project/algorithms/rainfall-intensity';

describe('rainfall intensity with 1h rolling window', () => {
  it.only('test #1', (done) => {
    axios.get('http://localhost:3900/static-csv/3231-3048.rainfall.csv').then((response) => {
      const intensity = calculateRainfallIntensity(response.data);
      expect(intensity).toBeGreaterThan(0);
      done();
    });
  });
});