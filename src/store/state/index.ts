import { IConfigurationState } from '@business-logic/configuration';
import { IGenericMessageModalState } from '@components/generic-message-modal';
import { ISelectProjectScreenState } from '@screens/select-project';
import { IProjectScreenState } from '@screens/project';

export interface IAppState {
  genericMessageModalState: IGenericMessageModalState;
  configuration: IConfigurationState;
  selectProjectScreenState: ISelectProjectScreenState;
  projectScreenState: IProjectScreenState;
}