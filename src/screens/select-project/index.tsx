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

interface IScreenState extends ISelectProjectScreenState {
  projectId: string;
}

interface IDispatchProps {
  selectProject: ISelectProjectActionCreator;
}

class SelectProjectScreen extends React.Component<IScreenProps & IDispatchProps, IScreenState> {
  constructor(props: IScreenProps & IDispatchProps) {
    super(props);
    this.state = {
      projectId: 'fc120ff8-fb22-490e-873a-99aa3e59aa9c',
    }
  }

  public render() {
    return <div>
      <h5>Select project screen</h5>
      <div className='input-group'>
        <label htmlFor='basic-url'>Enter secret project ID:</label>
        &nbsp;
        <input
          id='projectId'
          type='text'
          placeholder=''
          value={this.state.projectId}
          onChange={(e) => this.setState({ projectId: e.currentTarget.value }) }
        />
        &nbsp;
        <button
          type='button'
          className='btn btn-primary'
          value=''
          onClick={() => this.props.selectProject(this.state.projectId)}>
          Navigate !
        </button>
      </div>
      <GenericMessageModalContainer />
    </div>;
  }
  
}

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