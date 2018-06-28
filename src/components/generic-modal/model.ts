import { HideGenericModalAction } from './actions';

export interface IGenericModalState {
  header: string;
  title: string;
  show: boolean;
  allowClose: boolean;
  hideModal: HideGenericModalAction;
}