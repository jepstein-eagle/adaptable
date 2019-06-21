import { AdaptableBlotterEventData } from '../BlotterEvents';
import { SearchChangedInfo } from './SearchChangedInfo';

export interface SearchEventData extends AdaptableBlotterEventData {
  id: SearchChangedInfo;
}
