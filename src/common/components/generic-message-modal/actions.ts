import { Action } from 'redux';
import * as actionTypes from './action-types';

// tslint:disable:max-classes-per-file
export class ShowGenericMessageModalAction implements Action {
  public readonly type = actionTypes.SHOW_GENERIC_MESSAGE_MODAL;
  constructor(public header: string = 'Loading',
              public title: string = 'Please wait...',
              public allowClose: boolean = false) { }
}

export class HideGenericMessageModalAction implements Action {
  public readonly type = actionTypes.HIDE_GENERIC_MESSAGE_MODAL;
}