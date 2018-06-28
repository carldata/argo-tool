import * as _ from 'lodash';
import * as actionTypes from './action-types';
import {
  ProjectLoadSucceededAction, ProjectSelectedAction,
} from './actions';
import { ISelectProjectScreenState } from './models/select-project-screen-state';
import { IAppState } from '@store/state';

const initialState: ISelectProjectScreenState = { projectId: '' } as ISelectProjectScreenState;

export type SelectProjectScreenActionsTypes = ProjectSelectedAction|
                                              ProjectLoadSucceededAction;

export const selectProjectScreenReducer = (state: ISelectProjectScreenState = initialState, action: SelectProjectScreenActionsTypes): ISelectProjectScreenState => {
  switch (action.type) {
    case actionTypes.PROJECT_SELECTED:
      return {
        ...state,
        projectId: action.projectId,
      } as ISelectProjectScreenState;
    default:
      return state;
  }
};