import * as React from 'react';
import { connect } from 'react-redux';
import ResponsiveModal from 'react-responsive-modal';
import { IAppState } from '@store/state';
import { bindActionCreators, Dispatch } from 'redux';
import { hideGenericMessageModal, IHideGenericMessageModalActionCreator } from './action-creators';
import { IGenericMessageModalState } from './model';

interface IDispatchProps {
  hideGenericMessageModal: IHideGenericMessageModalActionCreator;
}

const Modal = (props: IGenericMessageModalState & IDispatchProps) =>
  <span id={`modal-${props.show ? 'visible' : 'hidden'}`}>
    <ResponsiveModal
      little
      open={props.show}
      showCloseIcon={props.allowClose}
      onClose={() => props.hideGenericMessageModal() }>
      <h2>{props.header}</h2>
      <p>{props.title}</p>
    </ResponsiveModal>
  </span>;

const mapStateToProps = (state: IAppState): IGenericMessageModalState => {
  return state.genericMessageModalState;
};

const mapDispatchToProps = (dispatch: Dispatch<void>) => {
  return bindActionCreators({
    hideGenericMessageModal,
  }, dispatch);
};


export const GenericMessageModalContainer = connect<IGenericMessageModalState, {}, {}>(mapStateToProps, mapDispatchToProps)(Modal);

export { ShowGenericMessageModalAction, HideGenericMessageModalAction } from './actions';
export { IGenericMessageModalState } from './model';
export { GenericModalActionsTypes, genericMessageModalContainerReducer } from './reducers';

