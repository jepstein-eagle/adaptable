import {
  DisplayAction,
  MathOperation,
  LeafExpressionOperator,
  CellSummaryOperation,
  MessageType,
  CellSummaryOptionalOperation,
} from '../../PredefinedConfig/Common/Enums';
import { ChartVisibility, AxisTotal } from '../../PredefinedConfig/Common/ChartEnums';
import { AdaptableBlotterTheme } from '../../PredefinedConfig/RunTimeState/ThemeState';
import { LIGHT_YELLOW, BLACK, getHexForName } from '../../View/UIHelper';

export const MISSING_COLUMN: string = ' [MISSING]';
export const DEFAULT_LAYOUT: string = 'Ab_Default_Layout';
export const LIGHT_THEME: string = 'light';
export const DARK_THEME: string = 'dark';

export const USER_NAME: string = 'anonymous';
export const BLOTTER_ID: string = 'adaptable_blotter_id';
export const MENU_PREFIX: string = 'ab_';
export const READ_ONLY_STYLE: string = 'ab_readonly';

export const ALL_COLUMN_VALUES: string = 'ALL_COLUMN_VALUES';
export const FILTER_ALWAYS: 'Always' | 'Never' | 'Throttle' = 'Always';
export const FILTER_NEVER: 'Always' | 'Never' | 'Throttle' = 'Never';
export const FILTER_THROTTLE: 'Always' | 'Never' | 'Throttle' = 'Throttle';
export const EMPTY_STRING: string = '';
export const EMPTY_ARRAY: any[] = [];

export const HALF_SECOND: number = 500;

export const YEAR_ADD: number = 1985;
export const MONTH_ADD: number = 47;

/*
Redux / State Defaults
Try to put all our Redux / State defaults here and ONLY reference from here - avoid magic numbers / strings.
Please!!!
*/
// Alert
export const ALERT_DEFAULT_MAX_ALERTS_IN_STORE: number = 20;
// Calendar
export const CALENDAR_DEFAULT_CURRENT_CALENDER: string = 'United States';
// Charts
export const CHART_DEFAULT_REFRESH_RATE: number = 3; // refresh the chart every 3 seconds if stuff chnanges
// Quick Search
export const QUICK_SEARCH_DEFAULT_DISPLAY_ACTION: DisplayAction = DisplayAction.HighlightCell;
export const QUICK_SEARCH_DEFAULT_BACK_COLOR: string = getHexForName(LIGHT_YELLOW);
export const QUICK_SEARCH_DEFAULT_FORE_COLOR: string = getHexForName(BLACK);
// Flashing Cells
export const FLASHING_CELLS_DEFAULT_DURATION: 250 | 500 | 750 | 1000 = 500;
export const UPDATED_ROWS_DEFAULT_DURATION: 250 | 500 | 750 | 1000 = 1000;
// Selected Cells
export const SMART_EDIT_DEFAULT_VALUE: number = 1;
export const SMART_EDIT_DEFAULT_OPERATION: Exclude<MathOperation, MathOperation.Replace> =
  MathOperation.Multiply;
// Cells Summary
export const CELL_SUMMARY_DEFAULT_OPERATION: CellSummaryOperation | CellSummaryOptionalOperation =
  CellSummaryOperation.Sum;
// system
export const SYSTEM_DEFAULT_CHART_VISIBILITY: ChartVisibility = ChartVisibility.Hidden;
// export const SYSTEM_DEFAULT_SYSTEM_STATUS_COLOUR: 'Red' | 'Amber' | 'Green' | 'Blue' =
//  StatusColour.Green;
export const SYSTEM_DEFAULT_SYSTEM_STATUS_TYPE: 'Error' | 'Warning' | 'Success' | 'Info' =
  MessageType.Info;
// theme
export const THEME_DEFAULT_CURRENT_THEME: string = LIGHT_THEME;

/**
 * Object Factory
 */
export const CHART_DEFAULT_YAXIS_TOTAL: AxisTotal = AxisTotal.Sum;
export const PLUS_MINUS_DEFAULT_NUDGE_VALUE: number = 1;
export const ALERT_DEFAULT_OPERATOR: LeafExpressionOperator = LeafExpressionOperator.AnyChange;
export const ALERT_DEFAULT_RANGE_OPERAND_TYPE: 'Value' | 'Column' = 'Column';
export const ALERT_DEFAULT_MESSAGE_TYPE: 'Success' | 'Info' | 'Warning' | 'Error' = 'Error';
export const ALERT_DEFAULT_SHOW_POPUP: boolean = true;
export const ALERT_DEFAULT_HIGHLIGHT_CELL: boolean = true;
export const ALERT_DEFAULT_HIGHLIGHT_ROW: boolean = true;

/**
 * Constants for State (primarily for audit property events) - good idea?
 */
export const CURRENT_ADVANCED_SEARCH_STATE_PROPERTY: string = 'CurrentAdvancedSearch';
export const CURRENT_CHART_NAME_STATE_PROPERTY: string = 'CurrentChartName';
export const BULK_UPDATE_VALUE_STATE_PROPERTY: string = 'BulkUpdateValue';
export const CURRENT_CALENDAR_STATE_PROPERTY: string = 'CurrentCalendar';
export const SUMMARY_OPERATION_STATE_PROPERTY: string = 'SummaryOperation';
export const CURRENT_LAYOUT_STATE_PROPERTY: string = 'CurrentLayout';
export const CURRENT_DATA_SOURCE_STATE_PROPERTY: string = 'CurrentDataSource';
export const CURRENT_REPORT_STATE_PROPERTY: string = 'CurrentReport';
export const FLASHING_CELL_DEFAULT_UP_COLOR_STATE_PROPERTY: string = 'DefaultUpColor';
export const FLASHING_CELL_DEFAULT_DOWN_COLOR_STATE_PROPERTY: string = 'DefautDownColor';
export const FLASHING_CELL_DEFAULT_DURATION_STATE_PROPERTY: string = 'DefaultDuration';
export const CURRENT_THEME_STATE_PROPERTY: string = 'CurrentTheme';
export const QUICK_SEARCH_TEXT_STATE_PROPERTY: string = 'QuickSearchText';
export const QUICK_SEARCH_DISPLAY_ACTION_STATE_PROPERTY: string = 'DisplayAction';
export const QUICK_SEARCH_STYLE_STATE_PROPERTY: string = 'Style';
export const SMART_EDIT_VALUE_STATE_PROPERTY: string = 'SmartEditValue';
export const SMART_EDIT_MATH_OPERATION_STATE_PROPERTY: string = 'MathOperationz';

// consts for Themes
export const SYSTEM_THEMES: Array<AdaptableBlotterTheme> = [
  {
    Name: LIGHT_THEME,
    Description: 'Light Theme',
  },
  {
    Name: DARK_THEME,
    Description: 'Dark Theme',
  },
];

// these are the internal events that the AB fires that other strategies and classes listen to
// this is NOT quite right as we need to define each one twice but its not a big problem
// and at least we are able to listen to the events nicely
export type PRIVATE_CELLS_SELECTED_EVENT = 'CellsSelected';
export const PRIVATE_CELLS_SELECTED_EVENT: string = 'CellsSelected';
export type PRIVATE_ROWS_SELECTED_EVENT = 'RowsSelected';
export const PRIVATE_ROWS_SELECTED_EVENT: string = 'RowsSelected';
export type PRIVATE_SEARCH_APPLIED_EVENT = 'SearchApplied';
export const PRIVATE_SEARCH_APPLIED_EVENT: string = 'SearchApplied';
export type PRIVATE_GRID_REFRESHED_EVENT = 'GridRefreshed';
export const PRIVATE_GRID_REFRESHED_EVENT: string = 'GridRefreshed';
export type PRIVATE_GRID_RELOADED_EVENT = 'GridReloaded';
export const PRIVATE_GRID_RELOADED_EVENT: string = 'GridReloaded';
export type PRIVATE_KEY_DOWN_EVENT = 'KeyDown';
export const PRIVATE_KEY_DOWN_EVENT: string = 'KeyDown';

// these are now external events that will replace the current event model
export type BLOTTER_READY_EVENT = 'BlotterReady';
export const BLOTTER_READY_EVENT: string = 'BlotterReady';
export type TOOLBAR_VISIBLE_EVENT = 'ToolbarVisible';
export const TOOLBAR_VISIBLE_EVENT: string = 'ToolbarVisible';
export type SEARCH_CHANGED_EVENT = 'SearchChanged';
export const SEARCH_CHANGED_EVENT: string = 'SearchChanged';
export type APPLICATION_TOOLBAR_BUTTON_CLICKED_EVENT = 'ApplicationToolbarButtonClicked';
export const APPLICATION_TOOLBAR_BUTTON_CLICKED_EVENT: string = 'ApplicationToolbarButtonClicked';

export type THEME_CHANGED_EVENT = 'ThemeChanged';
export const THEME_CHANGED_EVENT: string = 'ThemeChanged';
export type COLUMN_STATE_CHANGED_EVENT = 'ColumnStateChanged';
export const COLUMN_STATE_CHANGED_EVENT: string = 'ColumnStateChanged';
export type ALERT_FIRED_EVENT = 'AlertFired';
export const ALERT_FIRED_EVENT: string = 'AlertFired';
export type ACTION_COLUMN_CLICKED_EVENT = 'ActionColumnClicked';
export const ACTION_COLUMN_CLICKED_EVENT: string = 'ActionColumnClicked';
export type SELECTION_CHANGED_EVENT = 'SelectionChanged';
export const SELECTION_CHANGED_EVENT: string = 'SelectionChanged';

export const ALL_DATA_REPORT = 'All Data';
export const VISIBLE_DATA_REPORT = 'Visible Data';
export const SELECTED_CELLS_REPORT = 'Selected Cells';
export const SELECTED_ROWS_REPORT = 'Selected Rows';
