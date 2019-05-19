import { IFDC3Schema } from '../IBlotterEvents';
import { ISearchEventData } from './ISearchEventData';
/**
 * EventArgs sent as part of the onSearchedChanged Event
 */
export interface ISearchChangedEventArgs extends IFDC3Schema {
  data: ISearchEventData[];
}
