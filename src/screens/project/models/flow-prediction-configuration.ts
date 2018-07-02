export interface IFlowPredictionConfiguration {
  flowChannelId: string;
  flowChannelName: string;
  rainChannelId: string;
  rainChannelName: string;
}

export type IProjectConfiguration = IFlowPredictionConfiguration[];