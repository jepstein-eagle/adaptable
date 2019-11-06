import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ActionColumn } from '../../PredefinedConfig/DesignTimeState/ActionColumnState';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../../Utilities/Interface/Selection/SelectedRowInfo';
import { Visibility } from '../../PredefinedConfig/Common/Enums';
import { ApplicationToolbarButton } from '../../PredefinedConfig/DesignTimeState/ApplicationState';

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

/**
 * Event Args used as part of the **onColumnStateChanged** event.
 *
 * Includes just the name of the new selected Layout.
 */
export interface ColumnStateChangedEventArgs {
  currentLayout: string;
}

/**
 * Event Args used as part of the **onAlertFired** event.
 *
 * Includes the Alert has been fired - this will contain details of the Alert Definition that triggered the Alert, and (optionally) what Data Change was responsible.
 */
export interface AlertFiredEventArgs {
  alert: AdaptableAlert;
}

/**
 * Event Args used as part of the **onActionColumnClicked** event.
 *
 * Includes the Action Column that was clicked, the row that contained the cell that was clicked (and its Primary Key value).
 */
export interface ActionColumnClickedEventArgs {
  actionColumn: ActionColumn;
  primaryKeyValue: any;
  rowData: any;
}

/**
 * Event Args used as part of the **onSelectionChanged** event.
 *
 * Includes full details of all Selected Cells and Rows (if the latter has been activated).
 */
export interface SelectionChangedEventArgs {
  selectedCellInfo: SelectedCellInfo;
  selectedRowInfo: SelectedRowInfo;
}

/**
 * Event Args used as part of the **onThemeChanged** event.
 *
 * Includes just the name of the new selected theme.
 */
export interface ThemeChangedEventArgs {
  themeName: string;
}

export interface ToolbarVisibilityChangedEventArgs {
  toolbar: string;
  visibility: 'Visible' | 'Hidden';
}

export interface ApplicationToolbarButtonClickedEventArgs {
  applicationToolbarButton: ApplicationToolbarButton;
}

export interface AdaptableBlotterEventData {
  name: string;
  type: string;
}
