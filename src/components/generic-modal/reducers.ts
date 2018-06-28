import * as _ from 'lodash';
import * as actionTypes from './action-types';
import { ShowGenericModalAction, HideGenericModalAction } from './actions';
import { IGenericModalState } from './model';

const initialState: IGenericModalState = { show: false } as IGenericModalState;

export type GenericModalActionsTypes = ShowGenericModalAction|HideGenericModalAction;

export const genericModalContainerReducer = (state: IGenericModalState = initialState, action: GenericModalActionsTypes): IGenericModalState => {
  switch (action.type) {
    case actionTypes.SHOW_GENERIC_MODAL:
      return { title: action.title, header: action.header, show: true, allowClose: action.allowClose } as IGenericModalState;
    case actionTypes.HIDE_GENERIC_MODAL:
      return { title: '', header: '', show: false } as IGenericModalState;
    default:
      return state;
  }
};