export interface IDataGridState {
  rows: IDataGridRow[];
}

export interface IDataGridRow {
  channel: string;
  prediction: number;
  anomalies: number;
  rainfall: number;
}
