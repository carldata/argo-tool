import { IUnixTimePoint } from 'time-series-scroller';
import { IProjectConfiguration } from './flow-prediction-configuration';
import { IProjectCalculations } from '@screens/project/models/flow-prediction-calculations';


export type ITimeSeries = IUnixTimePoint[];

export interface IProjectScreenState {
  projectConfiguration: IProjectConfiguration;
  projectCalculation: IProjectCalculations;
  selectedDate: Date;
  selectedFlowPredictionIndex: number;
}