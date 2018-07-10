import { IPredictionConfig } from './prediction-config';

export interface IProject {
  projectId: string;
  projectName: string;
  predictionConfigs: IPredictionConfig[];
}