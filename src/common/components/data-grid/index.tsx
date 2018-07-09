import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDataGrid from 'react-data-grid';
import { IDataGridRow } from './state';
import { RowRenderer } from './grid-renderer';

export interface IDataGridComponentProps {
  columns: ReactDataGrid.Column[];
  rows: IDataGridRow[];
  rowClicked: (index: number) => void;
}

interface IDataGridComponentState {
  selectedIndexes: any[];
}

interface IDataGridHeader {
  label: string;
  key: string;
}

export class DataGrid extends React.Component<IDataGridComponentProps, IDataGridComponentState> {
  constructor(props: IDataGridComponentProps, context: any) {
    super(props, context);
    this.state = { selectedIndexes: [0] };
  }

  // public shouldComponentUpdate(nextProps: IDataGridComponentProps) {
  //   return ((_.size(this.props.rows) !== _.size(nextProps.rows)) || (JSON.stringify(this.props.columns) !== JSON.stringify(nextProps.columns)));
  // }

  private onRowSelected = (row) => {
    const exists = _.includes(this.state.selectedIndexes, row);

    if (exists) {
      this.setState({ selectedIndexes: [] });
    } else {
      this.setState({ selectedIndexes: [row] });
    }
  }

  private onRowsSelected = (rows) => {
    const head = _.head(rows.map(r => r.rowIdx));
    this.setState({ selectedIndexes: [head] });
  }

  private onRowsDeselected = (row) => {
    let rowIndexes = row.map(r => r.rowIdx);
    this.setState({ selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1) });
  }

  public render() {
    return (
      <div>
        <ReactDataGrid
          columns={this.props.columns}
          rowGetter={(i: number) => this.props.rows[i]}
          rowsCount={this.props.rows.length}
          minHeight={200}
          rowRenderer={RowRenderer}
          enableRowSelect='single'
          onRowClick={this.onRowSelected}
          // rowKey='rawValue'
          rowSelection={{
            showCheckbox: true,
            enableShiftSelect: false,
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            selectBy: {
              indexes: this.state.selectedIndexes,
            },
          }} />
      </div>
    );
  }
}