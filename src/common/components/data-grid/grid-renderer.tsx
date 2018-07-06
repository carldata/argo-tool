import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDataGrid from 'react-data-grid';
import { IDataGridRow } from '@components/data-grid/state';

interface IRowRendererProps {
  row: IDataGridRow;
}

export class RowRenderer extends React.Component<IRowRendererProps> {
  public render() {
    return (<div style={this.getRowStyle()}>
      <ReactDataGrid.Row  {...this.props} />
    </div>);
  }
  public getRowStyle = () => ({ color: 'black', cursor: 'pointer' });
  public getRowBackground = () => this.props.row.anomalies == this.props.row.anomalies ? 'green' : 'red';
}