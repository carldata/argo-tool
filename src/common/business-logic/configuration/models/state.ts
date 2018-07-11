import { IUiSettings } from './ui-settings';
import { IEndpointSettings } from './endpoint-settings';

export interface IConfigurationState {
  endpointSettings: IEndpointSettings;
  uiSettings: IUiSettings;
}