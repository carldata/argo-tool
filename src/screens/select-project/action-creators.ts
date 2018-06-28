import * as _ from 'lodash';
import { ProjectSelectedAction } from './actions';

export type ISelectProjectActionCreator = (projetId: string) => ProjectSelectedAction;

export const selectProject: ISelectProjectActionCreator = (projetId: string) =>
  _.toPlainObject(new ProjectSelectedAction(projetId));