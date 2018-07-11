import * as _ from 'lodash';
import axios from 'axios';
import { calculateNumberOfAnomalies } from '../../src/screens/project/algorithms/number-of-anomalies';

describe('calcluate number of anomalies', () => {
  it.only('testing with 7881-11742 for 2018-07-05', (done) => {
    axios
      .get('http://localhost:3900/static-csv/7881-11742.anomalies.csv')
      .then((anomalies) => {
        const numberOfAnomalies = calculateNumberOfAnomalies(anomalies.data);
        expect(numberOfAnomalies).toEqual(288);
        done();
      });
  });
});