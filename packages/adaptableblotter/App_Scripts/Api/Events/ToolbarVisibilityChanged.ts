import { BlotterEventArgs, AdaptableBlotterEventData } from './BlotterEvents';

/**
 * Event Args used as part of the **on('ToolbarVisibilityChanged)** event.
 *
 * Includes the Action Column that was clicked, the row that contained the cell that was clicked (and its Primary Key value).
 */
export interface ToolbarVisibilityChangedEventArgs extends BlotterEventArgs {
  data: ToolbarVisibilityChangedEventData[];
}

export interface ToolbarVisibilityChangedEventData extends AdaptableBlotterEventData {
  id: ToolbarVisibilityChangedInfo;
}

export interface ToolbarVisibilityChangedInfo {
  toolbar: string;
  visibility: 'Visible' | 'Hidden';
}
