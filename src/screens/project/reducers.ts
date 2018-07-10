import * as _ from 'lodash';
import * as actionTypes from '@screens/project/action-types';
import {
  FlowLoadSucceededAction,
  ProjectLoadSucceededAction,
} from './actions';
import { IProjectScreenState } from '@screens/project/models/project-screen-state';

const initialState: IProjectScreenState = {
  project: null,
  projectConfigurations: [],
  calculations: [],
  selectedDate: new Date(),
  selectedCalculationIndex: -1,
} as IProjectScreenState;

export type ProjectScreenActionsTypes = ProjectLoadSucceededAction|
                                        FlowLoadSucceededAction;

export const projectScreenReducer = (state: IProjectScreenState = initialState, action: ProjectScreenActionsTypes): IProjectScreenState => {
  switch (action.type) {
    case actionTypes.PROJECT_LOAD_SUCCEEDED:
      return { ...state, project: action.project };
    case actionTypes.FLOW_LOAD_SUCCEEDED:
      return state;
    default:
      return state;
  }
};