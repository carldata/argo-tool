import { IUnixTimePoint } from 'time-series-scroller';
import { ICalculations } from '@screens/project/models';
import { IProject } from '@models/project';

export type ITimeSeries = IUnixTimePoint[];

export interface IProjectScreenState {
  project: IProject;
  calculations: ICalculations[];
  selectedDate: Date;
}