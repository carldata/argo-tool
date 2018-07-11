import * as React from 'react';
import { ICalculations } from '@screens/project/models';
import { DataGrid } from './data-grid';

export interface ICalculationsTableProps {
  calculations: ICalculations[];
  rowClicked: (index: number) => void;
}

export class CalculationsTable extends React.Component<ICalculationsTableProps> {
  constructor(props: ICalculationsTableProps) {
    super(props);

  }

  public render() {
    return (
      <div>
        <div>
          <DataGrid
            columns={[
              { key: 'dailyPredictionError', name: 'Daily Prediction Error' },
              { key: 'dailyAnomalies', name: 'Daily Anomalies' },
              { key: 'rainfallIntensity', name: 'Rainfall Intensity' }]}
            rows={this.props.calculations}
            rowClicked={this.props.rowClicked} />
        </div>
      </div>
    );
  }
}