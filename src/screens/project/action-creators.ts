import * as _ from 'lodash';
import { SelectSiteAction, SelectRdiiStormEventAction, ShowSitesAction } from './actions';
import { ISite } from './models/site';

type ISelectSiteActionCreator = (site: string) => SelectSiteAction;
type ISelectRdiiStormEventActionCreator = (index: number) => SelectRdiiStormEventAction;
type IShowSitesActionCreator = () => ShowSitesAction;

const selectSite: ISelectSiteActionCreator = (site: string) =>
  _.toPlainObject(new SelectSiteAction(site));

const selectRdiiStormEvent: ISelectRdiiStormEventActionCreator = (index: number) =>
  _.toPlainObject(new SelectRdiiStormEventAction(index));

const showSites: IShowSitesActionCreator = () =>
  _.toPlainObject(new ShowSitesAction());

export {
  selectSite,
  ISelectSiteActionCreator,
  selectRdiiStormEvent,
  ISelectRdiiStormEventActionCreator,
  showSites,
  IShowSitesActionCreator,
};