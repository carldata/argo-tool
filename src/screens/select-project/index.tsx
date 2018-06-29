import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from '@store/state';
import { ISelectProjectScreenState } from './models/select-project-screen-state';
import {
  ISelectProjectActionCreator, selectProject,
} from './action-creators';
import { GenericMessageModalContainer } from '@components/generic-message-modal';

interface IScreenProps extends ISelectProjectScreenState {
}

interface IDispatchProps {
  selectProject: ISelectProjectActionCreator;
}

const SelectProjectScreen = (props: IScreenProps & IDispatchProps) =>
  <div>
    <h5>Select project screen</h5>
    <input
      type='button'
      className='btn primary'
      value='Navigate to project page !'
      onClick={() => props.selectProject('to_be_changed')}
    />
    <GenericMessageModalContainer />
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

export const SelectProjectScreenContainer = connect<IScreenProps, IDispatchProps, {}>(mapStateToProps, mapDispatchToProps)(SelectProjectScreen);