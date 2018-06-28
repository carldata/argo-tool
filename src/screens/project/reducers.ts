import * as _ from 'lodash';
import * as actionTypes from './action-types';
import {
  FlowLoadFailedAction,
  FlowLoadSucceededAction,
} from './actions';
import { IProjectScreenState } from './models/project-screen-state';

const initialState: IProjectScreenState = {
  project: {
    flowPredictions: []
  },
  selectedFlowPredictionIndex: -1,
} as IProjectScreenState;

export type ProjectScreenActionsTypes = FlowLoadFailedAction|
                                        FlowLoadSucceededAction;

export const projectScreenReducer = (state: IProjectScreenState = initialState, action: ProjectScreenActionsTypes): IProjectScreenState => {
  switch (action.type) {
    case actionTypes.FLOW_LOAD_SUCCEEDED:
      return state;
    default:
      return state;
  }
};