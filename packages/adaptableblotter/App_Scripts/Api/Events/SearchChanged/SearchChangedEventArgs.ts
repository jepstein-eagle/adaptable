import { FDC3Schema } from '../BlotterEvents';
import { SearchEventData } from './ISearchEventData';

/**
 * EventArgs sent as part of the onSearchedChanged Event
 */
export interface SearchChangedEventArgs extends FDC3Schema {
  data: SearchEventData[];
}
