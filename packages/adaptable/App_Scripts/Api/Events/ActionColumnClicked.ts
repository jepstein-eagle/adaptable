import { AdaptableEventArgs, AdaptableEventData } from './AdaptableEvents';
import { ActionColumn } from '../../PredefinedConfig/ActionColumnState';

/**
 * Event Args used as part of the **on('ActionColumnClicked')** event.
 *
 * Includes the Action Column that was clicked, the row that contained the cell that was clicked (and its Primary Key value).
 */
export interface ActionColumnClickedEventArgs extends AdaptableEventArgs {
  data: ActionColumnClickedEventData[];
}

export interface ActionColumnClickedEventData extends AdaptableEventData {
  id: ActionColumnClickedInfo;
}

export interface ActionColumnClickedInfo {
  actionColumn: ActionColumn;
  primaryKeyValue: any;
  rowData: any;
}
