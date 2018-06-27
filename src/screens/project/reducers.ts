import * as _ from 'lodash';
import * as actionTypes from './action-types';
import {
  SitesLoadStartedAction,
  SitesLoadSucceededAction,
} from './actions';
import { IMainScreenState } from './models/main-screen-state';

const initialState: IMainScreenState = { sites: [] } as IMainScreenState;

export type MainScreenActionsTypes = SitesLoadStartedAction|
                                     SitesLoadSucceededAction;

export const mainScreenReducer = (state: IMainScreenState = initialState, action: MainScreenActionsTypes): IMainScreenState => {
  switch (action.type) {
    case actionTypes.SITES_LOAD_STARTED:
      return { ...state, projects: [] } as IMainScreenState;
    case actionTypes.SITES_LOAD_SUCCEEDED:
      // return { ...state, sites: action.sites, mode: EnumViewState.Sites } as IMainScreenState;
      return state;
    default:
      return state;
  }
};