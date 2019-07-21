import { FDC3Schema } from '../BlotterEvents';
import { SearchEventData } from './SearchEventData';

/**
 * EventArgs sent as part of the onSearchChanged Event
 */
export interface SearchChangedEventArgs extends FDC3Schema {
  data: SearchEventData[];
}
