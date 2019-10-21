import { AdaptableBlotterEventData } from '../BlotterEvents';
import { SearchChangedInfo } from './SearchChangedInfo';

/**
 * Provides details of the state of all Search and Filter related functions in the Adaptable Blotter.
 */
export interface SearchEventData extends AdaptableBlotterEventData {
  id: SearchChangedInfo;
}
