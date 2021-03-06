import * as actionTypes from './action-types';
import { IConfigurationState } from './models/state';
import { ConfigurationLoadSucceededAction, ConfigurationLoadStartedAction } from './actions';

const initialState: IConfigurationState = {
  uiSettings: {
    dateFormat: 'YYYY MM DD',
    decimalDigits: 1,
  },
  endpointSettings: {
    appId: '',
    flowWorksHttp: '',
    dateTimeFormat: '',
  },
} as IConfigurationState;

export type ConfigurationActionTypes = ConfigurationLoadStartedAction|
                                       ConfigurationLoadSucceededAction;

export const configurationReducer = (state: IConfigurationState = initialState, action: ConfigurationActionTypes): IConfigurationState => {
  switch (action.type) {
    case actionTypes.CONFIGURATION_LOAD_SUCCEEDED:
      return { ...action.configuration, loaded: true } as IConfigurationState;
    default:
      return state;
  }
}