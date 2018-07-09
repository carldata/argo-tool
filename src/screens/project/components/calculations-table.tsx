import * as React from 'react';
import { ICalculations } from '@screens/project/models';
import * as ReactDataGrid from 'react-data-grid';
import { DataGrid } from '@components/data-grid';
import { D3LegendGridLayout } from '@components/auxiliary/d3-legend-grid-layout';
import { bindActionCreators } from '../../../../node_modules/redux';

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
        <div>
          <button
            id='next'
            type='button'
            className='btn btn-primary'
            onClick={(e) => { alert('going to next screen, but check if row selected'); }}>
            Next Screen
          </button>
        </div>
      </div>
    );
  }
}