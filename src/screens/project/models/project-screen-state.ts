import { IUnixTimePoint } from 'time-series-scroller';
import { ICalculations } from '@screens/project/models';

export type ITimeSeries = IUnixTimePoint[];

export interface IProjectScreenState {
  calculations: ICalculations[];
  selectedDate: Date;
  selectedCalculationIndex: number;
}