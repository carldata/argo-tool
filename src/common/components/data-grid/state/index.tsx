export interface IDataGridState {
  rows: IDataGridRow[];
}

export interface IDataGridRow {
  dailyPredictionError: number;
  dailyAnomalies: number;
  rainfallIntensity: number;
}
