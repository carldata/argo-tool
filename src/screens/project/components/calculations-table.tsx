import * as React from 'react';
import { ICalculations } from '@screens/project/models';

export interface ICalculationsTableProps {
  calculations: ICalculations[];
  rowClicked: (index: number) => void;
}

export const CalculationsTable = (props: ICalculationsTableProps) =>
  <div>
    <h3>This is calculations table</h3>
    <div>Good luck !</div>
  </div>;