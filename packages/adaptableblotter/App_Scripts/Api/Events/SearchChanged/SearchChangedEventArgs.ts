import { FDC3Schema } from '../BlotterEvents';
import { SearchEventData } from './SearchEventData';

/**
 * EventArgs sent as part of the onSearchChanged Event
 *
 * It includes full and comprehensive details of the state of **all the search and filter related functions** in the Adaptable Blotter
 *
 * It also includes a SearchChangedTrigger which tells you **which function** was responsible for the change in Search state.
 */
export interface SearchChangedEventArgs extends FDC3Schema {
  data: SearchEventData[];
}
