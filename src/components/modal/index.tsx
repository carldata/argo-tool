import * as React from 'react';
import { connect } from 'react-redux';
import ResponsiveModal from 'react-responsive-modal';
import { IAppState } from '@store/state';
import { bindActionCreators, Dispatch } from 'redux';
import { hideModal, IHideModalActionCreator } from './action-creators';
import { IModalState } from './model';

interface IDispatchProps {
  hideModal: IHideModalActionCreator;
}

const Modal = (props: IModalState & IDispatchProps) =>
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

const mapStateToProps = (state: IAppState): IModalState => {
  return state.modalState;
};

const mapDispatchToProps = (dispatch: Dispatch<void>) => {
  return bindActionCreators({
    hideModal,
  }, dispatch);
};


export const ModalContainer = connect<IModalState, {}, {}>(mapStateToProps, mapDispatchToProps)(Modal);

export { ShowModalAction, HideModalAction } from './actions';
export { IModalState } from './model';
export { ModalActionsTypes, modalContainerReducer } from './reducers';

