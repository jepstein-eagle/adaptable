import { AdaptableEventArgs, AdaptableEventData } from './AdaptableEvents';

/**
 * Event Args used as part of the **on('ColumnStateChanged')** event.
 *
 * Includes just the name of the new selected Layout.
 */
export interface ColumnStateChangedEventArgs extends AdaptableEventArgs {
  data: ColumnStateChangedEventData[];
}

export interface ColumnStateChangedEventData extends AdaptableEventData {
  id: ColumnStateChangedInfo;
}

export interface ColumnStateChangedInfo {
  currentLayout: string;
}
