import { IConfigurationState } from '@business-logic/configuration';
import { IModalState } from '@components/modal';
import { ISelectProjectScreenState } from '@screens/select-project';
import { IProjectScreenState } from '@screens/project';

export interface IAppState {
  modalState: IModalState;
  configuration: IConfigurationState;
  selectProjectScreenState: ISelectProjectScreenState;
  projectScreenState: IProjectScreenState;
}