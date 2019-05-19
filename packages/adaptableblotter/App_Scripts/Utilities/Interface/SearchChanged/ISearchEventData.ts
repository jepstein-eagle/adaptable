import { ISearchChangedInfo } from './ISearchChangedInfo';
import { IAdaptableBlotterEventData } from '../IBlotterEvents';
export interface ISearchEventData extends IAdaptableBlotterEventData {
  id: ISearchChangedInfo;
}
