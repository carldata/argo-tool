import * as _ from 'lodash';
import { HideGenericModalAction } from './actions';

export type IHideGenericModalActionCreator = () => HideGenericModalAction;

export const hideGenericModal: IHideGenericModalActionCreator = () =>
  _.toPlainObject(new HideGenericModalAction());