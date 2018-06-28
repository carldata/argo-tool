import { getConfiguarionSaga } from '@business-logic/configuration';

export function* initializationSaga() {
  yield getConfiguarionSaga();
}