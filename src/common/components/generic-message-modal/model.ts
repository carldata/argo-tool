import { HideGenericMessageModalAction } from './actions';

export interface IGenericMessageModalState {
  header: string;
  title: string;
  show: boolean;
  allowClose: boolean;
  hideModal: HideGenericMessageModalAction;
}