import * as _ from 'lodash';
import * as actionTypes from './action-types';
import {
  ProjectLoadSucceededAction,
} from './actions';
import { ISelectProjectScreenState } from './models/select-project-screen-state';

const initialState: ISelectProjectScreenState = { projectId: '' } as ISelectProjectScreenState;

export type SelectProjectScreenActionsTypes = ProjectLoadSucceededAction;

export const selectProjectScreenReducer = (state: ISelectProjectScreenState = initialState, action: SelectProjectScreenActionsTypes): ISelectProjectScreenState => {
  switch (action.type) {
    case actionTypes.PROJECT_LOAD_SUCCEEDED:
      return state; // TODO: implement
    default:
      return state;
  }
};