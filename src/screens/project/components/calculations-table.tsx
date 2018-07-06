import * as React from 'react';
import { ICalculations } from '@screens/project/models';
import * as ReactDataGrid from 'react-data-grid';
import { DataGrid } from '@components/data-grid';
import { D3LegendGridLayout } from '@components/auxiliary/d3-legend-grid-layout';

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
        <DataGrid
          columns={[
            { key: 'channel', name: 'Channel' },
            { key: 'anomalies', name: 'Anomalies' },
            { key: 'prediction', name: 'Prediction' },
            { key: 'rainfall', name: 'Rainfall' }]}
          rows={[
            { channel: 'channel1', anomalies: 1, prediction: 2, rainfall: 3 },
            { channel: 'channel2', anomalies: 4, prediction: 5, rainfall: 6 },
            { channel: 'channel3', anomalies: 7, prediction: 8, rainfall: 9 }]}
          rowClicked={this.props.rowClicked} />
      </div>
    );
  }
}