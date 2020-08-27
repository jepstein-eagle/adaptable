import {
  MathOperation,
  LeafExpressionOperator,
  CellSummaryOperation,
  MessageType,
} from '../../PredefinedConfig/Common/Enums';
import { ChartVisibility, AxisTotal } from '../../PredefinedConfig/Common/ChartEnums';
import { AdaptableTheme } from '../../PredefinedConfig/ThemeState';
import { LIGHT_YELLOW, BLACK, getHexForName } from '../../View/UIHelper';

export const MISSING_COLUMN: string = ' [MISSING]';
export const DEFAULT_LAYOUT: string = 'Default Layout';
export const LIGHT_THEME: string = 'light';
export const DARK_THEME: string = 'dark';

export const USER_NAME: string = 'anonymous';
export const ADAPTABLE_ID: string = 'adaptable_id';
export const ADAPTABLE: string = 'AdapTable';
export const MENU_PREFIX: string = 'ab_';
export const READ_ONLY_STYLE: string = 'ab_readonly';

export const ALL_COLUMN_VALUES: string = 'ALL_COLUMN_VALUES';
export const FILTER_ALWAYS: 'Always' | 'Never' | 'Throttle' = 'Always';
export const FILTER_NEVER: 'Always' | 'Never' | 'Throttle' = 'Never';
export const FILTER_THROTTLE: 'Always' | 'Never' | 'Throttle' = 'Throttle';
export const EMPTY_STRING: string = '';
export const EMPTY_ARRAY: any[] = [];

export const HALF_SECOND: number = 500;

export const AG_GRID_GROUPED_COLUMN: string = 'ag-Grid-AutoColumn';

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
export const CELL_SUMMARY_DEFAULT_OPERATION: CellSummaryOperation | string =
  CellSummaryOperation.Sum;
// system
export const SYSTEM_DEFAULT_CHART_VISIBILITY: ChartVisibility = ChartVisibility.Hidden;
// export const SYSTEM_DEFAULT_SYSTEM_STATUS_COLOUR: 'Red' | 'Amber' | 'Green' | 'Blue' =
//  StatusColour.Green;
export const SYSTEM_DEFAULT_SYSTEM_STATUS_TYPE: 'Error' | 'Warning' | 'Success' | 'Info' =
  MessageType.Info;
// theme
export const THEME_DEFAULT_CURRENT_THEME: string = LIGHT_THEME;
// Updated Row
export const UPDATED_ROW_DEFAULT_MAX_ALERTS_IN_STORE: number = Infinity;
// Live Report Throttle Time (used in OpenFin, IPushPull, Glue42 etc.)
export const DEFAULT_LIVE_REPORT_THROTTLE_TIME: number = 2000;
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
export const CURRENT_SHARED_QUERY_STATE_PROPERTY: string = 'CurrentSharedQuery';
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
export const QUICK_SEARCH_STYLE_STATE_PROPERTY: string = 'Style';
export const SMART_EDIT_VALUE_STATE_PROPERTY: string = 'SmartEditValue';
export const SMART_EDIT_MATH_OPERATION_STATE_PROPERTY: string = 'MathOperationz';

// consts for Themes
export const SYSTEM_THEMES: AdaptableTheme[] = [
  {
    Name: LIGHT_THEME,
    Description: 'Light Theme',
  },
  {
    Name: DARK_THEME,
    Description: 'Dark Theme',
  },
];

export const ALL_DATA_REPORT = 'All Data';
export const VISIBLE_DATA_REPORT = 'Visible Data';
export const SELECTED_CELLS_REPORT = 'Selected Cells';
export const SELECTED_ROWS_REPORT = 'Selected Rows';
