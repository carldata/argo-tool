import * as _ from 'lodash';
import { SelectedDateChangedAction } from './actions';

export type ISelectedDateChangedActionCreator = (date: Date) => SelectedDateChangedAction;

export const selectedDateChanged: ISelectedDateChangedActionCreator = (date: Date) =>
  _.toPlainObject(new SelectedDateChangedAction(date));