import { Action } from 'redux';
import * as actionTypes from './action-types';

// tslint:disable:max-classes-per-file
export class ProjectSelectedAction implements Action {
  public readonly type = actionTypes.PROJECT_SELECTED;
  constructor(public projectId: string) { } 
}

export class ProjectConfigurationLoadStartedAction implements Action {
  public readonly type = actionTypes.PROJECT_CONFIGURATION_LOAD_STARTED;
}

export class ProjectConfigurationLoadSucceededAction implements Action {
  public readonly type = actionTypes.PROJECT_CONFIGURATION_LOAD_SUCCEEDED;
}