import { BlotterEventArgs, AdaptableBlotterEventData } from './BlotterEvents';

/**
 * Event Args used as part of the **on('ColumnStateChanged')** event.
 *
 * Includes just the name of the new selected Layout.
 */
export interface ColumnStateChangedEventArgs extends BlotterEventArgs {
  data: ColumnStateChangedEventData[];
}

export interface ColumnStateChangedEventData extends AdaptableBlotterEventData {
  id: ColumnStateChangedInfo;
}

export interface ColumnStateChangedInfo {
  currentLayout: string;
}
