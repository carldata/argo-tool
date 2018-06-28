import { IConfigurationState } from '@business-logic/configuration';
import { IGenericModalState } from '@components/generic-modal';
import { ISelectProjectScreenState } from '@screens/select-project';
import { IProjectScreenState } from '@screens/project';

export interface IAppState {
  modalState: IGenericModalState;
  configuration: IConfigurationState;
  selectProjectScreenState: ISelectProjectScreenState;
  projectScreenState: IProjectScreenState;
}