import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from '@store/state';
import {
  showFlowPredictionForDay,
  IShowFlowPredictionForDayActionCreator,
} from './action-creators';
import { IUiSettings } from '@business-logic/configuration/models/ui-settings';
import { IProjectScreenState } from './models';
import { GenericMessageModalContainer } from '@components/generic-message-modal';

interface IScreenProps extends IProjectScreenState {
  uiSettings: IUiSettings;
}

interface IDispatchProps {
  showFlowPredictionForDay: IShowFlowPredictionForDayActionCreator;
}

const ProjectScreen = (props: IScreenProps & IDispatchProps) =>
  <div>
    <h5>Project Screen</h5>
    <GenericMessageModalContainer />
  </div>;

const mapStateToProps = (state: IAppState): IScreenProps => {
  return {
    ...state.projectScreenState,
    uiSettings: state.configuration.uiSettings,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<void>) => {
  return bindActionCreators({
    showFlowPredictionForDay,
  }, dispatch);
};

export { IProjectScreenState } from './models/project-screen-state';
export { projectScreenReducer, ProjectScreenActionsTypes } from './reducers';
export {
  loadFlowSaga,
  loadRainfallSaga,
  loadPredictionSaga,
} from './sagas';

export const ProjectScreenContainer = connect<IScreenProps, IDispatchProps, {}>(mapStateToProps, mapDispatchToProps)(ProjectScreen);