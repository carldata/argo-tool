import { IFlowPredictionConfiguration } from './flow-prediction-configuration';
import { ITimeSeries } from './project-screen-state';

export interface IFlowPredictionCalculations extends IFlowPredictionConfiguration {
  dailyPredictionError: number;
  dailyAnomalies: number;
  rainfallIntensity: number;
  rainfallData: ITimeSeries;
  flowData: ITimeSeries;
  predictionData: ITimeSeries;
}

export type IProjectCalculations = IFlowPredictionCalculations[];