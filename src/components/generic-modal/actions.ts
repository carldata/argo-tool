import { Action } from 'redux';
import * as actionTypes from './action-types';

// tslint:disable:max-classes-per-file
class ShowGenericModalAction implements Action {
  public readonly type = actionTypes.SHOW_GENERIC_MODAL;
  constructor(public header: string, public title: string, public allowClose: boolean = false) { }
}

class HideGenericModalAction implements Action {
  public readonly type = actionTypes.HIDE_GENERIC_MODAL;
}

export {
  ShowGenericModalAction,
  HideGenericModalAction,
};