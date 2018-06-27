import { IStormEvent } from '@components/prediction-chart';
import { IValidated } from '@models/.';

export interface ISite {
  name: string;
  stormEvents: Array<IStormEvent<Date> & IValidated>;
}