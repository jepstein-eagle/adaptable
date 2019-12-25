import { BlotterEventArgs, AdaptableBlotterEventData } from './BlotterEvents';
import { ActionColumn } from '../../PredefinedConfig/ActionColumnState';

/**
 * General Stuff - does this appear?
 */

/**
 * Event Args used as part of the **on('ActionColumnClicked')** event.
 *
 * Includes the Action Column that was clicked, the row that contained the cell that was clicked (and its Primary Key value).
 */
export interface ActionColumnClickedEventArgs extends BlotterEventArgs {
  data: ActionColumnClickedEventData[];
}

export interface ActionColumnClickedEventData extends AdaptableBlotterEventData {
  id: ActionColumnClickedInfo;
}

export interface ActionColumnClickedInfo {
  actionColumn: ActionColumn;
  primaryKeyValue: any;
  rowData: any;
}
