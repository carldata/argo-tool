import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import axios from 'axios';
import { calculateRainfallIntensity } from '../../src/screens/project/algorithms/rainfall-intensity';

describe('rainfall intensity with 1h rolling window', () => {
  it('should be greater than 0', (done) => {
    axios.get('http://localhost:3900/static-csv/3231-3048.rainfall.csv').then((response) => { 
      const intensity = calculateRainfallIntensity(response.data);
      expect(intensity).toBeGreaterThan(0);
      done();
    });
  });
  it('result should to be equal 7', () => {

    const input = `time,value
    2018-01-01T00:00:00,0.0
    2018-01-01T01:00:00,1.0
    2018-01-01T02:00:00,2.0
    2018-01-01T02:59:59,0.0
    2018-01-01T03:00:00,3.0
    2018-01-01T03:30:00,0.0
    2018-01-01T04:00:00,4.0`.split(' ').join('');

    const intensity = calculateRainfallIntensity(input);
    expect(intensity).toEqual(7.0);
  });
});
