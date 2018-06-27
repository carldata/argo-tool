import { ISite } from './site';

export interface IMainScreenState {
  sites: ISite[];
  selectedSite: ISite;
  selectedStromEventIndex: number;
}