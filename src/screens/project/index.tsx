import 'react-responsive-modal/lib/react-responsive-modal.css';
import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from '@store/state';
import { IMainScreenState } from './models/main-screen-state';
import {
  ISelectSiteActionCreator,
  ISelectRdiiStormEventActionCreator,
  IShowSitesActionCreator,
  selectSite,
  selectRdiiStormEvent,
  showSites,
} from './action-creators';
import { IUiSettings } from '@business-logic/configuration/models/ui-settings';

interface IScreenProps extends IMainScreenState {
  uiSettings: IUiSettings;
}

interface IDispatchProps {
  showSites: IShowSitesActionCreator;
  selectSite: ISelectSiteActionCreator;
  selectRdiiStormEvent: ISelectRdiiStormEventActionCreator;
}

const MainScreen = (props: IScreenProps & IDispatchProps) =>
  <div>
    <h5>Project Screen</h5>
  </div>;

const mapStateToProps = (state: IAppState): IScreenProps => {
  return { ...state.mainScreenState, uiSettings: state.configuration.uiSettings };
};

const mapDispatchToProps = (dispatch: Dispatch<void>) => {
  return bindActionCreators({
    selectSite,
    showSites,
    selectRdiiStormEvent,
  }, dispatch);
};

export { IMainScreenState } from './models/main-screen-state';
export { mainScreenReducer, MainScreenActionsTypes } from './reducers';
export {
  loadSitesSaga,
  loadStormEventSaga,
} from './sagas';

export const MainScreenContainer = connect<IScreenProps, IDispatchProps, {}>(mapStateToProps, mapDispatchToProps)(MainScreen);