import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from '@store/state';
import { ISelectProjectScreenState } from './models/select-project-screen-state';
import {
  ISelectProjectActionCreator, selectProject,
} from './action-creators';

interface IScreenProps extends ISelectProjectScreenState {
}

interface IDispatchProps {
  selectProject: ISelectProjectActionCreator;
}

const MainScreen = (props: IScreenProps & IDispatchProps) =>
  <div>
    <h5>Project Screen</h5>
  </div>;

const mapStateToProps = (state: IAppState): IScreenProps => {
  return { ...state.selectProjectScreenState };
};

const mapDispatchToProps = (dispatch: Dispatch<void>) => {
  return bindActionCreators({
    selectProject,
  }, dispatch);
};

export { ISelectProjectScreenState } from './models';
export { selectProjectScreenReducer, SelectProjectScreenActionsTypes } from './reducers';
export {
  loadProjectSaga,
} from './sagas';

export const MainScreenContainer = connect<IScreenProps, IDispatchProps, {}>(mapStateToProps, mapDispatchToProps)(MainScreen);