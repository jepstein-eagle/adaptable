"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Enums");
const ChartEnums_1 = require("../ChartEnums");
exports.MISSING_COLUMN = " [MISSING]";
exports.DEFAULT_LAYOUT = "Ab_Default_Layout";
exports.LIGHT_THEME = "Light Theme";
exports.DARK_THEME = "Dark Theme";
exports.USER_NAME = "anonymous";
exports.BLOTTER_ID = "adaptable_blotter_id";
exports.MENU_PREFIX = "ab_";
exports.READ_ONLY_STYLE = "ab_readonly";
exports.ALL_COLUMN_VALUES = 'ALL_COLUMN_VALUES';
exports.FILTER_ALWAYS = 'Always';
exports.FILTER_NEVER = 'Never';
exports.EMPTY_STRING = '';
exports.EMPTY_ARRAY = [];
exports.HALF_SECOND = 500;
exports.DEFAULT_DARK_GREEN_COLOR = '#008000';
exports.DEFAULT_DARK_RED_COLOR = '#FF0000';
exports.YEAR_ADD = 1985;
exports.MONTH_ADD = 47;
/*
Redux / State Defaults
Try to put all our Redux / State defaults here and ONLY reference from here - avoid magic numbers / strings.
Please!!!
*/
// Alert
exports.ALERT_DEFAULT_MAX_ALERTS_IN_STORE = 5;
// Calendar
exports.CALENDAR_DEFAULT_CURRENT_CALENDER = "United States";
// Charts
exports.CHART_DEFAULT_REFRESH_RATE = 3; // refresh the chart every 3 seconds if stuff chnanges
// Quick Search
exports.QUICK_SEARCH_DEFAULT_DISPLAY_ACTION = Enums_1.DisplayAction.HighlightCell;
exports.QUICK_SEARCH_DEFAULT_BACK_COLOR = '#FFFFCC';
exports.QUICK_SEARCH_DEFAULT_FORE_COLOR = '#000000';
// Flashing Cells
exports.FLASHING_CELLS_DEFAULT_DURATION = 500;
// Selected Cells
exports.SMART_EDIT_DEFAULT_VALUE = 1;
exports.SMART_EDIT_DEFAULT_OPERATION = Enums_1.MathOperation.Multiply;
// Cells Summary
exports.CELL_SUMMARY_DEFAULT_OPERATION = Enums_1.CellSummaryOperation.Sum;
// system
exports.SYSTEM_DEFAULT_CHART_VISIBILITY = ChartEnums_1.ChartVisibility.Hidden;
exports.SYSTEM_DEFAULT_SYSTEM_STATUS_COLOUR = Enums_1.StatusColour.Green;
// theme
exports.THEME_DEFAULT_CURRENT_THEME = exports.LIGHT_THEME;
/**
 * Object Factory
 */
exports.CHART_DEFAULT_YAXIS_TOTAL = ChartEnums_1.AxisTotal.Sum;
exports.PLUS_MINUS_DEFAULT_NUDGE_VALUE = 1;
exports.ALERT_DEFAULT_OPERATOR = Enums_1.LeafExpressionOperator.None;
exports.ALERT_DEFAULT_RANGE_OPERAND_TYPE = 'Column';
exports.ALERT_DEFAULT_MESSAGE_TYPE = 'Error';
exports.ALERT_DEFAULT_SHOW_AS_POPUP = true;
