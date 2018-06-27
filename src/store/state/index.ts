import { IConfigurationState } from '@business-logic/configuration';
import { IMainScreenState } from '@screens/project/.';
import { IModalState } from '@components/modal';

export interface IAppState {
  modalState: IModalState;
  configuration: IConfigurationState;
  mainScreenState: IMainScreenState;
}