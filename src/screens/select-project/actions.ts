import { Action } from 'redux';
import * as actionTypes from './action-types';
import { IProject } from '@models/project';

// tslint:disable:max-classes-per-file
export class ProjectSelectedAction implements Action {
  public readonly type = actionTypes.PROJECT_SELECTED;
  constructor(public projectId: string) { }
}