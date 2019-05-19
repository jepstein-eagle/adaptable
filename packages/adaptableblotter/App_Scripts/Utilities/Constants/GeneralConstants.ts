import {
  DisplayAction,
  MathOperation,
  StatusColour,
  LeafExpressionOperator,
  CellSummaryOperation,
} from '../Enums';
import { ChartVisibility, AxisTotal } from '../ChartEnums';

export const MISSING_COLUMN: string = ' [MISSING]';
export const DEFAULT_LAYOUT: string = 'Ab_Default_Layout';
export const LIGHT_THEME: string = 'Light Theme';
export const DARK_THEME: string = 'Dark Theme';

export const USER_NAME: string = 'anonymous';
export const BLOTTER_ID: string = 'adaptable_blotter_id';
export const MENU_PREFIX: string = 'ab_';
export const READ_ONLY_STYLE: string = 'ab_readonly';

export const ALL_COLUMN_VALUES: string = 'ALL_COLUMN_VALUES';
export const FILTER_ALWAYS: 'Always' | 'Never' | 'Throttle' = 'Always';
export const FILTER_NEVER: 'Always' | 'Never' | 'Throttle' = 'Never';
export const EMPTY_STRING: string = '';
export const EMPTY_ARRAY: any[] = [];

export const HALF_SECOND: number = 500;

export const DEFAULT_DARK_GREEN_COLOR: string = '#008000';
export const DEFAULT_DARK_RED_COLOR: string = '#FF0000';

export const YEAR_ADD: number = 1985;
export const MONTH_ADD: number = 47;

/*
Redux / State Defaults
Try to put all our Redux / State defaults here and ONLY reference from here - avoid magic numbers / strings.  
Please!!!
*/
// Alert
export const ALERT_DEFAULT_MAX_ALERTS_IN_STORE: number = 5;
// Calendar
export const CALENDAR_DEFAULT_CURRENT_CALENDER: string = 'United States';
// Charts
export const CHART_DEFAULT_REFRESH_RATE: number = 3; // refresh the chart every 3 seconds if stuff chnanges
// Quick Search
export const QUICK_SEARCH_DEFAULT_DISPLAY_ACTION: DisplayAction = DisplayAction.HighlightCell;
export const QUICK_SEARCH_DEFAULT_BACK_COLOR: string = '#FFFFCC';
export const QUICK_SEARCH_DEFAULT_FORE_COLOR: string = '#000000';
// Flashing Cells
export const FLASHING_CELLS_DEFAULT_DURATION: 250 | 500 | 750 | 1000 = 500;
// Selected Cells
export const SMART_EDIT_DEFAULT_VALUE: number = 1;
export const SMART_EDIT_DEFAULT_OPERATION: 'Add' | 'Subtract' | 'Multiply' | 'Divide' =
  MathOperation.Multiply;
// Cells Summary
export const CELL_SUMMARY_DEFAULT_OPERATION:
  | 'Sum'
  | 'Average'
  | 'Mode'
  | 'Median'
  | 'Distinct'
  | 'Max'
  | 'Min'
  | 'Count'
  | 'VWap'
  | 'Only' = CellSummaryOperation.Sum;
// system
export const SYSTEM_DEFAULT_CHART_VISIBILITY: ChartVisibility = ChartVisibility.Hidden;
export const SYSTEM_DEFAULT_SYSTEM_STATUS_COLOUR: 'Red' | 'Amber' | 'Green' | 'Blue' =
  StatusColour.Green;
// theme
export const THEME_DEFAULT_CURRENT_THEME: string = LIGHT_THEME;

/**
 * Object Factory
 */
export const CHART_DEFAULT_YAXIS_TOTAL: AxisTotal = AxisTotal.Sum;
export const PLUS_MINUS_DEFAULT_NUDGE_VALUE: number = 1;
export const ALERT_DEFAULT_OPERATOR: LeafExpressionOperator = LeafExpressionOperator.None;
export const ALERT_DEFAULT_RANGE_OPERAND_TYPE: 'Value' | 'Column' = 'Column';
export const ALERT_DEFAULT_MESSAGE_TYPE: 'Success' | 'Info' | 'Warning' | 'Error' = 'Error';
export const ALERT_DEFAULT_SHOW_AS_POPUP: boolean = true;

/**
 * Constants for State (primarily for audit property events) - good idea?
 */
export const CURRENT_ADVANCED_SEARCH: string = 'CurrentAdvancedSearch';
export const BULK_UPDATE_VALUE: string = 'BulkUpdateValue';
export const CURRENT_CALENDAR: string = 'CurrentCalendar';
export const SUMMARY_OPERATION: string = 'SummaryOperation';
export const CURRENT_LAYOUT: string = 'CurrentLayout';
