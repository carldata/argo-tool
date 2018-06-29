import * as _ from 'lodash';
import * as actionTypes from './action-types';
import { ShowGenericMessageModalAction, HideGenericMessageModalAction } from './actions';
import { IGenericMessageModalState } from './model';

const initialState: IGenericMessageModalState = { show: false } as IGenericMessageModalState;

export type GenericModalActionsTypes = ShowGenericMessageModalAction|HideGenericMessageModalAction;

export const genericMessageModalContainerReducer = (state: IGenericMessageModalState = initialState, action: GenericModalActionsTypes): IGenericMessageModalState => {
  switch (action.type) {
    case actionTypes.SHOW_GENERIC_MESSAGE_MODAL:
      return { title: action.title, header: action.header, show: true, allowClose: action.allowClose } as IGenericMessageModalState;
    case actionTypes.HIDE_GENERIC_MESSAGE_MODAL:
      return { title: '', header: '', show: false } as IGenericMessageModalState;
    default:
      return state;
  }
};