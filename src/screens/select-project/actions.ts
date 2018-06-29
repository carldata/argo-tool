import { Action } from 'redux';
import * as actionTypes from './action-types';

// tslint:disable:max-classes-per-file
export class ProjectSelectedAction implements Action {
  public readonly type = actionTypes.PROJECT_SELECTED;
  constructor(public projectId: string) { } 
}

export class ProjectLoadStartedAction implements Action {
  public readonly type = actionTypes.PROJECT_LOAD_STARTED;
}

export class ProjectLoadSucceededAction implements Action {
  public readonly type = actionTypes.PROJECT_LOAD_SUCCEEDED;
}