import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ActionColumn } from '../../PredefinedConfig/ActionColumnState';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../../Utilities/Interface/Selection/SelectedRowInfo';
import { ApplicationToolbarButton } from '../../PredefinedConfig/ApplicationState';
import { Report } from '../../PredefinedConfig/ExportState';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';

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

/**
 * Event Args used as part of the **on('AlertFired')** event.
 *
 * Includes the Alert has been fired - this will contain details of the Alert Definition that triggered the Alert, and (optionally) what Data Change was responsible.
 */
export interface AlertFiredEventArgs extends BlotterEventArgs {
  data: AlertFiredEventData[];
}

export interface AlertFiredEventData extends AdaptableBlotterEventData {
  id: AlertFiredInfo;
}

export interface AlertFiredInfo {
  alert: AdaptableAlert;
}

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

/**
 * Event Args used as part of the **on('SelectionChanged')** event.
 *
 * Includes full details of all Selected Cells and Rows (if the latter has been activated).
 */
export interface SelectionChangedEventArgs extends BlotterEventArgs {
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
 * Event Args used as part of the **on('ThemeChanged')** event.
 *
 * Includes just the name of the new selected theme.
 */
export interface ThemeChangedEventArgs extends BlotterEventArgs {
  data: ThemeChangedEventData[];
}

export interface ThemeChangedEventData extends AdaptableBlotterEventData {
  id: ThemeChangedInfo;
}

export interface ThemeChangedInfo {
  themeName: string;
}

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

/**
 * Event Args used as part of the **on('LiveReportUpdated)** event.
 *
 * Includes the Action Column that was clicked, the row that contained the cell that was clicked (and its Primary Key value).
 */
export interface LiveReportUpdatedEventArgs extends BlotterEventArgs {
  data: LiveReportUpdatedEventData[];
}

export interface LiveReportUpdatedEventData extends AdaptableBlotterEventData {
  id: LiveReportUpdatedInfo;
}

/**
 * The main args used in the **on('LiveReportUpdated)** event.
 *
 * This event fires when any LiveData is being used (i.e. being sent to Excel via Glue42 or OpenFin or to iPushPull)
 *
 * It is fired whenever anything changes regarding this.
 *
 * The `trigger` property defines **why** the event fired.
 */
export interface LiveReportUpdatedInfo {
  /**
   * Which of the Adaptable Blotter partners is being used to send live data.
   */
  partner: 'iPushPull' | 'Glue42' | 'OpenFin';

  /**
   * What triggered the event being fired.
   */
  trigger: 'Connected' | 'Disconnected' | 'ExportStarted' | 'ExportStopped' | 'LiveDataUpdated';

  /**
   * What are the current 'Live Reports' in the State.
   */
  currentLiveReports?: LiveReport[];
}

export interface ApplicationToolbarButtonClickedEventArgs extends BlotterEventArgs {
  data: ApplicationToolbarButtonClickedEventData[];
}

export interface ApplicationToolbarButtonClickedEventData extends AdaptableBlotterEventData {
  id: ApplicationToolbarButtonClickedInfo;
}

export interface ApplicationToolbarButtonClickedInfo {
  applicationToolbarButton: ApplicationToolbarButton;
}

export interface LiveReport {
  PageName: string; // for Excel this will be the workbook name, for iPushpull the page name.  for Glue42?
  Report: Report;
  ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull;
}
