import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { Action } from 'redux';
import * as actionTypes from './action-types';
import { ISite } from './models/site';
import { IStormEvent } from '@components/prediction-chart';
import { IValidated } from '@models/.';

// tslint:disable:max-classes-per-file
class SitesLoadStartedAction implements Action {
  public readonly type = actionTypes.SITES_LOAD_STARTED;
}

class SitesLoadSucceededAction implements Action {
  public readonly type = actionTypes.SITES_LOAD_SUCCEEDED;
  constructor(public sites: ISite[]) { }
}

class ShowSitesAction implements Action {
  public readonly type = actionTypes.SHOW_SITES;
}

class SelectSiteAction implements Action {
  public readonly type = actionTypes.SITE_SELECTED;
  constructor(public site: string) { }
}

class SelectRdiiStormEventAction implements Action {
  public readonly type = actionTypes.RDII_STORM_EVENT_SELECTED;
  constructor(public index: number) { }
}

class RdiiStormEventLoadStartedAction implements Action {
  public readonly type = actionTypes.RDII_STORM_EVENT_LOAD_STARTED;
}

class RdiiStormEventLoadSucceededAction implements Action {
  public readonly type = actionTypes.RDII_STORM_EVENT_LOAD_SUCCEEDED;
  public stormEvent: IStormEvent<Date>;
  constructor(stormEvent: IStormEvent<string>) {
    this.stormEvent = { ...stormEvent, index: _.map(stormEvent.index, (el: string) => dateFns.parse(el))};
  }
}

class RdiiStormEventValidatedAction implements Action {
  public readonly type = actionTypes.RDII_STORM_EVENT_VALIDATED;
  constructor(public rdiiStormEvent: IStormEvent<Date> & IValidated) { }
}

export {
  SitesLoadStartedAction,
  SitesLoadSucceededAction,
  ShowSitesAction,
  SelectSiteAction,
  SelectRdiiStormEventAction,
  RdiiStormEventLoadStartedAction,
  RdiiStormEventLoadSucceededAction,
  RdiiStormEventValidatedAction,
};