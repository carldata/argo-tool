import { IUiSettings } from './ui-settings';

export interface IConfigurationState {
  endpoint: {
    dateFormat: string;
    urls: {
      sites: string;
      envelope: string;
      rdiiStormEvent: string;
    }
  };
  uiSettings: IUiSettings;
}