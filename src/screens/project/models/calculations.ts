import { ITimeSeries } from '@screens/project/models/project-screen-state';
import { ICalculationsConfiguration } from '@screens/project/models/calculations-configuration';

export interface ICalculations extends ICalculationsConfiguration {
  dailyPredictionError: number;
  dailyAnomalies: number;
  rainfallIntensity: number;
  rainfallTimeSeries: ITimeSeries;
  flowTimeSeries: ITimeSeries;
  predictionTimeSeries: ITimeSeries;
  anomaliesTimeSeries: ITimeSeries;
}