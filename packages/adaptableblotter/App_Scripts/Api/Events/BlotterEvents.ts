import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ActionColumn } from '../../PredefinedConfig/ActionColumnState';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../../Utilities/Interface/Selection/SelectedRowInfo';
import { ApplicationToolbarButton } from '../../PredefinedConfig/ApplicationState';

/**
 * The main object used when publishing events.
 *
 * Based on the FDC3 Schema (see  [FDC3 API](https://fdc3.finos.org/docs/1.0/api/api-intro))
 */
export interface FDC3Schema {
  object: string;
  definition: string;
  version: string;
}

export interface BlotterEventArgs extends FDC3Schema {
  data: any[];
}

export interface AdaptableBlotterEventData {
  name: string;
  type: string;
  id: any;
}

/**
 * Event Args used as part of the **onColumnStateChanged** event.
 *
 * Includes just the name of the new selected Layout.
 */
export interface ColumnStateChangedEventArgs extends FDC3Schema {
  data: ColumnStateChangedEventData[];
}

export interface ColumnStateChangedEventData extends AdaptableBlotterEventData {
  id: ColumnStateChangedInfo;
}

export interface ColumnStateChangedInfo {
  currentLayout: string;
}

/**
 * Event Args used as part of the **onAlertFired** event.
 *
 * Includes the Alert has been fired - this will contain details of the Alert Definition that triggered the Alert, and (optionally) what Data Change was responsible.
 */
export interface AlertFiredEventArgs extends FDC3Schema {
  data: AlertFiredEventData[];
}

export interface AlertFiredEventData extends AdaptableBlotterEventData {
  id: AlertFiredInfo;
}

export interface AlertFiredInfo {
  alert: AdaptableAlert;
}

/**
 * Event Args used as part of the **onActionColumnClicked** event.
 *
 * Includes the Action Column that was clicked, the row that contained the cell that was clicked (and its Primary Key value).
 */
export interface ActionColumnClickedEventArgs extends FDC3Schema {
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

/**
 * Event Args used as part of the **onSelectionChanged** event.
 *
 * Includes full details of all Selected Cells and Rows (if the latter has been activated).
 */
export interface SelectionChangedEventArgs extends FDC3Schema {
  data: SelectionChangedEventData[];
}

export interface SelectionChangedEventData extends AdaptableBlotterEventData {
  id: SelectionChangedInfo;
}

export interface SelectionChangedInfo {
  selectedCellInfo: SelectedCellInfo;
  selectedRowInfo: SelectedRowInfo;
}

/**
 * Event Args used as part of the **onThemeChanged** event.
 *
 * Includes just the name of the new selected theme.
 */
export interface ThemeChangedEventArgs extends FDC3Schema {
  data: ThemeChangedEventData[];
}

export interface ThemeChangedEventData extends AdaptableBlotterEventData {
  id: ThemeChangedInfo;
}

export interface ThemeChangedInfo {
  themeName: string;
}

export interface ToolbarVisibilityChangedEventArgs extends FDC3Schema {
  data: ToolbarVisibilityChangedEventData[];
}

export interface ToolbarVisibilityChangedEventData extends AdaptableBlotterEventData {
  id: ToolbarVisibilityChangedInfo;
}

export interface ToolbarVisibilityChangedInfo {
  toolbar: string;
  visibility: 'Visible' | 'Hidden';
}

export interface ApplicationToolbarButtonClickedEventArgs extends FDC3Schema {
  data: ApplicationToolbarButtonClickedEventData[];
}

export interface ApplicationToolbarButtonClickedEventData extends AdaptableBlotterEventData {
  id: ApplicationToolbarButtonClickedInfo;
}

export interface ApplicationToolbarButtonClickedInfo {
  applicationToolbarButton: ApplicationToolbarButton;
}
