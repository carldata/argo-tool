import * as React from 'react';
import { connect } from 'react-redux';
import ResponsiveModal from 'react-responsive-modal';
import { IAppState } from '@store/state';
import { bindActionCreators, Dispatch } from 'redux';
import { hideGenericModal, IHideGenericModalActionCreator } from './action-creators';
import { IGenericModalState } from './model';

interface IDispatchProps {
  hideModal: IHideGenericModalActionCreator;
}

const Modal = (props: IGenericModalState & IDispatchProps) =>
  <span id={`modal-${props.show ? 'visible' : 'hidden'}`}>
    <ResponsiveModal
      little
      open={props.show}
      showCloseIcon={props.allowClose}
      onClose={() => props.hideModal() }>
      <h2>{props.header}</h2>
      <p>{props.title}</p>
    </ResponsiveModal>
  </span>;

const mapStateToProps = (state: IAppState): IGenericModalState => {
  return state.modalState;
};

const mapDispatchToProps = (dispatch: Dispatch<void>) => {
  return bindActionCreators({
    hideGenericModal,
  }, dispatch);
};


export const GenericModalContainer = connect<IGenericModalState, {}, {}>(mapStateToProps, mapDispatchToProps)(Modal);

export { ShowGenericModalAction, HideGenericModalAction } from './actions';
export { IGenericModalState } from './model';
export { GenericModalActionsTypes, genericModalContainerReducer } from './reducers';

