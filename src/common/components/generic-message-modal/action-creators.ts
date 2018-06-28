import * as _ from 'lodash';
import { HideGenericMessageModalAction } from './actions';

export type IHideGenericMessageModalActionCreator = () => HideGenericMessageModalAction;

export const hideGenericModal: IHideGenericMessageModalActionCreator = () =>
  _.toPlainObject(new HideGenericMessageModalAction());