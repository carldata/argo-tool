import * as _ from 'lodash';
import axios from 'axios';
import { calculateNumberOfAnomalies } from '../../src/screens/project/algorithms/number-of-anomalies';

describe('calcluate number of anomalies', () => {
  it.only('testing with 7881-11742 for 2018-07-05', (done) => {
    Promise
      .all([axios.get('http://localhost:3900/static-csv/7881-11742.flow.csv'),
            axios.get('http://localhost:3900/static-csv/7881-11742.anomalies.csv')])
      .then((results) => {
        const [flow, anomalies] = results;
        const numberOfAnomalies = calculateNumberOfAnomalies(flow.data, anomalies.data);
        expect(numberOfAnomalies).toBeGreaterThan(0);
        done();
      });
  });
});