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

  private onRowSelected = (row) => {
    this.setState({ selectedIndexes: [row] });
    this.props.rowClicked(row);
  }

  private onRowsSelected = (rows) => {
    const head: number = _.head(rows.map(r => r.rowIdx));
    this.setState({ selectedIndexes: [head] });
    this.props.rowClicked(head);
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
          rowSelection={{
            showCheckbox: true,
            enableShiftSelect: false,
            onRowsSelected: this.onRowsSelected,
            selectBy: {
              indexes: this.state.selectedIndexes,
            },
          }} />
      </div>
    );
  }
}