import { DisplayAction, SelectedCellOperation, MathOperation } from "../Enums";

export const MISSING_COLUMN: string = " [MISSING]";
export const DEFAULT_LAYOUT: string = "Ab_Default_Layout";
export const LIGHT_THEME: string = "Light Theme";
export const DARK_THEME: string = "Dark Theme";

export const USER_NAME: string = "anonymous"
export const BLOTTER_ID: string = "adaptable_blotter_id"
export const MENU_PREFIX: string = "ab_"
export const READ_ONLY_STYLE: string = "ab_readonly"

export const ALL_COLUMN_VALUES: string = 'ALL_COLUMN_VALUES';
export const EMPTY_STRING: string = 'ALL_COLUMN_VALUES';
export const EMPTY_ARRAY: any[] = [];

/*
Redux / State Defaults
Try to put all our Redux / State defaults here and ONLY reference from here - avoid magic numbers / strings.  
Please!!!
*/
// Alert
export const ALERT_DEFAULT_MAX_ALERTS_IN_STORE: number = 5;
// Calendar
export const CALENDAR_DEFAULT_CURRENT_CALENDER: string = "United States"
// Charts
export const CHART_DEFAULT_SHOW_MODAL: boolean = false;
export const CHART_DEFAULT_REFRESH_RATE: number = 1;
// Quick Search
export const QUICK_SEARCH_DEFAULT_DISPLAY_ACTION: DisplayAction = DisplayAction.HighlightCell;
export const QUICK_SEARCH_DEFAULT_BACK_COLOR: string = '#FFFFCC';
export const QUICK_SEARCH_DEFAULT_FORE_COLOR: string = '#000000';
// Flashing Cells
export const FLASHING_CELLS_DEFAULT_UP_COLOR: string = '#008000';
export const FLASHING_CELLS_DEFAULT_DOWN_COLOR: string = '#FF0000';
export const FLASHING_CELLS_DEFAULT_DURATION: 250 | 500 | 750 | 1000 = 500;
// Selected Cells
export const SMART_EDIT_DEFAULT_VALUE: number = 1;
export const SMART_EDIT_DEFAULT_OPERATION: 'Add' | 'Subtract' | 'Multiply' | 'Divide' = MathOperation.Multiply
// Selected Cells
export const SELECTED_CELLS_DEFAULT_OPERATION: 'Sum' | 'Average' | 'Mode' | 'Median' | 'Distinct' | 'Max' | 'Min' | 'Count' | 'Only' = SelectedCellOperation.Sum;



