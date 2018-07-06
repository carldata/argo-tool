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
    this.state = { selectedIndexes: [] };
  }

  public shouldComponentUpdate(nextProps: IDataGridComponentProps) {
    return ((_.size(this.props.rows) !== _.size(nextProps.rows)) || (JSON.stringify(this.props.columns) !== JSON.stringify(nextProps.columns)));
  }

  private onRowSelected = (rows) => {
    // this.props.rowClicked(rows);
    alert(rows);
  }

  private onRowsSelected = (rows) => {
    //
  }

  private onRowsDeselected = (rows) => {
    //
  }

  public render() {
    return (
      <div>
        <ReactDataGrid
          columns={this.props.columns}
          rowGetter={(i: number) => this.props.rows[i]}
          rowsCount={this.props.rows.length}
          minHeight={500}
          rowRenderer={RowRenderer}
          enableRowSelect='single'
          onRowClick={this.onRowSelected}
          rowKey='rawValue'
          rowSelection={{
            showCheckbox: false,
            enableShiftSelect: false,
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            selectBy: {
              indexes: this.state.selectedIndexes,
            }
          }} />
      </div>
    );
  }
}