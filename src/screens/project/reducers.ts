import * as _ from 'lodash';
import * as actionTypes from '@screens/project/action-types';
import {
  FlowLoadSucceededAction,
} from '@screens/project/actions';
import { IProjectScreenState } from '@screens/project/models/project-screen-state';

const initialState: IProjectScreenState = {
  projectConfigurations: [],
  calculations: [],
  selectedDate: new Date(),
  selectedCalculationIndex: -1,
} as IProjectScreenState;

export type ProjectScreenActionsTypes = FlowLoadSucceededAction;

export const projectScreenReducer = (state: IProjectScreenState = initialState, action: ProjectScreenActionsTypes): IProjectScreenState => {
  switch (action.type) {
    case actionTypes.FLOW_LOAD_SUCCEEDED:
      return state;
    default:
      return state;
  }
};