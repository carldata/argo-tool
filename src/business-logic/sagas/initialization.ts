import { getConfiguarionSaga } from '@business-logic/configuration';
import { loadSitesSaga } from '@screens/project/.';

export function* initializationSaga() {
  yield getConfiguarionSaga();
  yield loadSitesSaga();
}