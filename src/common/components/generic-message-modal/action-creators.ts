import * as _ from 'lodash';
import { HideGenericMessageModalAction } from './actions';

export type IHideGenericMessageModalActionCreator = () => HideGenericMessageModalAction;

export const hideGenericMessageModal: IHideGenericMessageModalActionCreator = () =>
  _.toPlainObject(new HideGenericMessageModalAction());