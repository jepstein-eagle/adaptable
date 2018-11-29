"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../../Utilities/Enums");
const Helper_1 = require("./Helper");
var FilterHelper;
(function (FilterHelper) {
    // String, Numeric and Date
    FilterHelper.BLANKS_SYSTEM_FILTER = 'Blanks';
    FilterHelper.NON_BLANKS_SYSTEM_FILTER = 'Non Blanks';
    // Date
    FilterHelper.TODAY_SYSTEM_FILTER = 'Today';
    FilterHelper.IN_PAST_SYSTEM_FILTER = 'In Past';
    FilterHelper.IN_FUTURE_SYSTEM_FILTER = 'In Future';
    FilterHelper.YESTERDAY_SYSTEM_FILTER = 'Yesterday';
    FilterHelper.TOMORROW_SYSTEM_FILTER = 'Tomorrow';
    FilterHelper.NEXT_WORKING_DAY_SYSTEM_FILTER = 'Next Working Day';
    FilterHelper.PREVIOUS_WORKING_DAY_SYSTEM_FILTER = 'Previous Working Day';
    FilterHelper.THIS_YEAR_SYSTEM_FILTER = 'This Year';
    // Numeric
    FilterHelper.POSITIVE_SYSTEM_FILTER = 'Positive';
    FilterHelper.NEGATIVE_SYSTEM_FILTER = 'Negative';
    FilterHelper.ZERO_SYSTEM_FILTER = 'Zero';
    // Boolean
    FilterHelper.TRUE_SYSTEM_FILTER = 'True';
    FilterHelper.FALSE_SYSTEM_FILTER = 'False';
    function GetAllSystemFilters() {
        return [
            FilterHelper.BLANKS_SYSTEM_FILTER,
            FilterHelper.NON_BLANKS_SYSTEM_FILTER,
            FilterHelper.TODAY_SYSTEM_FILTER,
            FilterHelper.IN_PAST_SYSTEM_FILTER,
            FilterHelper.IN_FUTURE_SYSTEM_FILTER,
            FilterHelper.YESTERDAY_SYSTEM_FILTER,
            FilterHelper.TOMORROW_SYSTEM_FILTER,
            FilterHelper.NEXT_WORKING_DAY_SYSTEM_FILTER,
            FilterHelper.PREVIOUS_WORKING_DAY_SYSTEM_FILTER,
            FilterHelper.THIS_YEAR_SYSTEM_FILTER,
            FilterHelper.POSITIVE_SYSTEM_FILTER,
            FilterHelper.NEGATIVE_SYSTEM_FILTER,
            FilterHelper.ZERO_SYSTEM_FILTER,
            FilterHelper.TRUE_SYSTEM_FILTER,
            FilterHelper.FALSE_SYSTEM_FILTER
        ];
    }
    FilterHelper.GetAllSystemFilters = GetAllSystemFilters;
    function GetUserFilters(userFilters, userFilterNames) {
        return userFilters.filter(f => userFilterNames.find(u => u == f.Name) != null);
    }
    FilterHelper.GetUserFilters = GetUserFilters;
    function GetSystemFiltersForColumn(column, systemFilters) {
        let appropriateSystemFilters = [];
        if (column != null) {
            systemFilters.forEach((systemFilter) => {
                let dataType = GetDatatypeForSystemFilter(systemFilter);
                if ((dataType == Enums_1.DataType.All && column.DataType != Enums_1.DataType.Boolean) || dataType == column.DataType) {
                    appropriateSystemFilters.push(systemFilter);
                }
            });
        }
        return appropriateSystemFilters;
    }
    FilterHelper.GetSystemFiltersForColumn = GetSystemFiltersForColumn;
    function GetUserFiltersForColumn(column, userFilters) {
        let appropriateUserFilters = [];
        if (column != null) {
            userFilters.forEach((userFilter) => {
                if (userFilter.ColumnId == column.ColumnId) {
                    appropriateUserFilters.push(userFilter);
                }
            });
        }
        return appropriateUserFilters;
    }
    FilterHelper.GetUserFiltersForColumn = GetUserFiltersForColumn;
    function ShowUserFilterForColumn(UserFilters, name, column) {
        let userFilter = UserFilters.find(f => f.Name == name);
        return userFilter.ColumnId == column.ColumnId;
    }
    FilterHelper.ShowUserFilterForColumn = ShowUserFilterForColumn;
    function GetColumnIdForUserFilter(userFilter) {
        // see if there are any columnvalues and then get the first only
        if (userFilter.Expression.ColumnValueExpressions != null && userFilter.Expression.ColumnValueExpressions.length > 0) {
            return userFilter.Expression.ColumnValueExpressions[0].ColumnId;
        }
        // see if there are any user filter expressionss and then get the first only
        if (userFilter.Expression.FilterExpressions != null && userFilter.Expression.FilterExpressions.length > 0) {
            return userFilter.Expression.FilterExpressions[0].ColumnId;
        }
        // see if there are any ranges and then get the first only
        if (userFilter.Expression.RangeExpressions != null && userFilter.Expression.RangeExpressions.length > 0) {
            return userFilter.Expression.RangeExpressions[0].ColumnId;
        }
    }
    FilterHelper.GetColumnIdForUserFilter = GetColumnIdForUserFilter;
    function GetFunctionForSystemFilter(systemFilterName) {
        switch (systemFilterName) {
            case FilterHelper.BLANKS_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (itemToCheck) => {
                        return Helper_1.Helper.IsInputNullOrEmpty(itemToCheck);
                    },
                };
            }
            case FilterHelper.NON_BLANKS_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (itemToCheck) => {
                        return Helper_1.Helper.IsInputNotNullOrEmpty(itemToCheck);
                    },
                };
            }
            case FilterHelper.TODAY_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (dateToCheck) => {
                        let today = ((d) => new Date(d.setDate(d.getDate())))(new Date);
                        return (today.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0));
                    },
                };
            }
            case FilterHelper.IN_PAST_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (dateToCheck) => {
                        return +dateToCheck < Date.now();
                    },
                };
            }
            case FilterHelper.IN_FUTURE_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (dateToCheck) => {
                        return +dateToCheck > Date.now();
                    },
                };
            }
            case FilterHelper.YESTERDAY_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (dateToCheck) => {
                        let yesterday = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date);
                        return (yesterday.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0));
                    },
                };
            }
            case FilterHelper.TOMORROW_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (dateToCheck) => {
                        let tomorrow = ((d) => new Date(d.setDate(d.getDate() + 1)))(new Date);
                        return (tomorrow.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0));
                    },
                };
            }
            case FilterHelper.NEXT_WORKING_DAY_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (dateToCheck, blotter) => {
                        return blotter.CalendarService.GetNextWorkingDay().setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0);
                    },
                };
            }
            case FilterHelper.PREVIOUS_WORKING_DAY_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (dateToCheck, blotter) => {
                        return blotter.CalendarService.GetPreviousWorkingDay().setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0);
                    },
                };
            }
            case FilterHelper.THIS_YEAR_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (dateToCheck) => {
                        let today = ((d) => new Date(d.setDate(d.getDate())))(new Date);
                        let todayyear = today.getFullYear();
                        let datetocheckyear = dateToCheck.getFullYear();
                        return (todayyear == datetocheckyear);
                    },
                };
            }
            case FilterHelper.POSITIVE_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (numberToCheck) => {
                        return (numberToCheck > 0);
                    },
                };
            }
            case FilterHelper.NEGATIVE_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (numberToCheck) => {
                        return (numberToCheck < 0);
                    },
                };
            }
            case FilterHelper.ZERO_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (numberToCheck) => {
                        return (numberToCheck == 0);
                    },
                };
            }
            case FilterHelper.TRUE_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (boolToCheck) => {
                        return (boolToCheck);
                    },
                };
            }
            case FilterHelper.FALSE_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (boolToCheck) => {
                        return (!boolToCheck);
                    },
                };
            }
        }
    }
    FilterHelper.GetFunctionForSystemFilter = GetFunctionForSystemFilter;
    function GetDatatypeForSystemFilter(systemFilterName) {
        switch (systemFilterName) {
            case FilterHelper.BLANKS_SYSTEM_FILTER:
            case FilterHelper.NON_BLANKS_SYSTEM_FILTER: {
                return Enums_1.DataType.All;
            }
            case FilterHelper.TODAY_SYSTEM_FILTER:
            case FilterHelper.IN_PAST_SYSTEM_FILTER:
            case FilterHelper.IN_FUTURE_SYSTEM_FILTER:
            case FilterHelper.YESTERDAY_SYSTEM_FILTER:
            case FilterHelper.TOMORROW_SYSTEM_FILTER:
            case FilterHelper.NEXT_WORKING_DAY_SYSTEM_FILTER:
            case FilterHelper.PREVIOUS_WORKING_DAY_SYSTEM_FILTER:
            case FilterHelper.THIS_YEAR_SYSTEM_FILTER: {
                return Enums_1.DataType.Date;
            }
            case FilterHelper.POSITIVE_SYSTEM_FILTER:
            case FilterHelper.NEGATIVE_SYSTEM_FILTER:
            case FilterHelper.ZERO_SYSTEM_FILTER: {
                return Enums_1.DataType.Number;
            }
            case FilterHelper.TRUE_SYSTEM_FILTER:
            case FilterHelper.FALSE_SYSTEM_FILTER: {
                return Enums_1.DataType.Boolean;
            }
        }
    }
    FilterHelper.GetDatatypeForSystemFilter = GetDatatypeForSystemFilter;
})(FilterHelper = exports.FilterHelper || (exports.FilterHelper = {}));
