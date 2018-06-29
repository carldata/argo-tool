import { IUiSettings } from './ui-settings';

export interface IEndpointSettings {
  /**
   *  The ID of application used in https://github.com/carldata/flow-works-http/wiki/Config-Module
   */

  appId: string;
  /**
   * Format of date as used in HTTP requests
   */

  dateFormat: string;
  /**
   * Url to FlowWorks HTTP
   */
  flowWorksHttp: string;
}

export interface IConfigurationState {
  endpointSettings: IEndpointSettings;
  uiSettings: IUiSettings;
}