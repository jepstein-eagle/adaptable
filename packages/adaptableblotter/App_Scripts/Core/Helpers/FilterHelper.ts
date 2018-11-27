import { DataType } from '../Enums'
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { Helper } from './Helper';
import { IColumn } from '../Interface/IColumn';
import { IUserFilter } from '../Api/Interface/IAdaptableBlotterObjects';


export module FilterHelper {

    // String, Numeric and Date
    export const BLANKS_SYSTEM_FILTER = 'Blanks'
    export const NON_BLANKS_SYSTEM_FILTER = 'Non Blanks'

    // Date
    export const TODAY_SYSTEM_FILTER = 'Today'
    export const IN_PAST_SYSTEM_FILTER = 'In Past'
    export const IN_FUTURE_SYSTEM_FILTER = 'In Future'
    export const YESTERDAY_SYSTEM_FILTER = 'Yesterday'
    export const TOMORROW_SYSTEM_FILTER = 'Tomorrow'
    export const NEXT_WORKING_DAY_SYSTEM_FILTER = 'Next Working Day'
    export const PREVIOUS_WORKING_DAY_SYSTEM_FILTER = 'Previous Working Day'
    export const THIS_YEAR_SYSTEM_FILTER = 'This Year'
    // Numeric
    export const POSITIVE_SYSTEM_FILTER = 'Positive'
    export const NEGATIVE_SYSTEM_FILTER = 'Negative'
    export const ZERO_SYSTEM_FILTER = 'Zero'

    // Boolean
    export const TRUE_SYSTEM_FILTER = 'True'
    export const FALSE_SYSTEM_FILTER = 'False'

    export function GetAllSystemFilters(): string[] {
        return [
            BLANKS_SYSTEM_FILTER,
            NON_BLANKS_SYSTEM_FILTER,
            TODAY_SYSTEM_FILTER,
            IN_PAST_SYSTEM_FILTER,
            IN_FUTURE_SYSTEM_FILTER,
            YESTERDAY_SYSTEM_FILTER,
            TOMORROW_SYSTEM_FILTER,
            NEXT_WORKING_DAY_SYSTEM_FILTER,
            PREVIOUS_WORKING_DAY_SYSTEM_FILTER,
            THIS_YEAR_SYSTEM_FILTER,
            POSITIVE_SYSTEM_FILTER,
            NEGATIVE_SYSTEM_FILTER,
            ZERO_SYSTEM_FILTER,
            TRUE_SYSTEM_FILTER,
            FALSE_SYSTEM_FILTER
        ]
    }


    export function GetUserFilters(userFilters: IUserFilter[], userFilterNames: string[]): IUserFilter[] {
        return userFilters.filter(f => userFilterNames.find(u => u == f.Name) != null)
    }


    export function GetSystemFiltersForColumn(column: IColumn, systemFilters: string[]): string[] {
        let appropriateSystemFilters: string[] = []
        if (column != null) {
            systemFilters.forEach((systemFilter: string) => {
                let dataType: DataType = GetDatatypeForSystemFilter(systemFilter);
                if ((dataType == DataType.All && column.DataType != DataType.Boolean) || dataType == column.DataType) {
                    appropriateSystemFilters.push(systemFilter)
                }
            })
        }
        return appropriateSystemFilters;
    }

    export function GetUserFiltersForColumn(column: IColumn, userFilters: IUserFilter[]): IUserFilter[] {
        let appropriateUserFilters: IUserFilter[] = []
        if (column != null) {
            userFilters.forEach((userFilter: IUserFilter) => {
                if (userFilter.ColumnId == column.ColumnId) {
                    appropriateUserFilters.push(userFilter)
                }
            })
        }
        return appropriateUserFilters;
    }

    export function ShowUserFilterForColumn(UserFilters: IUserFilter[], name: string, column: IColumn): boolean {
        let userFilter: IUserFilter = UserFilters.find(f => f.Name == name);
        return userFilter.ColumnId == column.ColumnId;
    }

    export function GetColumnIdForUserFilter(userFilter: IUserFilter): string {

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


    export function GetFunctionForSystemFilter(systemFilterName: string): any {

        switch (systemFilterName) {

            case BLANKS_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (itemToCheck: any): boolean => {
                        return Helper.IsInputNullOrEmpty(itemToCheck);
                    },
                }
            }
            case NON_BLANKS_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (itemToCheck: any): boolean => {
                        return Helper.IsInputNotNullOrEmpty(itemToCheck);
                    },
                }
            }
            case TODAY_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (dateToCheck: Date): boolean => {
                        let today = ((d: Date) => new Date(d.setDate(d.getDate())))(new Date);
                        return (today.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
                    },
                }
            }
            case IN_PAST_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (dateToCheck: Date): boolean => {
                        return +dateToCheck < Date.now();
                    },
                }
            }
            case IN_FUTURE_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (dateToCheck: Date): boolean => {
                        return +dateToCheck > Date.now();
                    },
                }
            }
            case YESTERDAY_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (dateToCheck: Date): boolean => {
                        let yesterday = ((d: Date) => new Date(d.setDate(d.getDate() - 1)))(new Date);
                        return (yesterday.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
                    },
                }
            }
            case TOMORROW_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (dateToCheck: Date): boolean => {
                        let tomorrow = ((d: Date) => new Date(d.setDate(d.getDate() + 1)))(new Date);
                        return (tomorrow.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
                    },
                }
            }
            case NEXT_WORKING_DAY_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (dateToCheck: Date, blotter: IAdaptableBlotter): boolean => {
                        return blotter.CalendarService.GetNextWorkingDay().setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0);
                    },

                }
            }
            case PREVIOUS_WORKING_DAY_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (dateToCheck: Date, blotter: IAdaptableBlotter): boolean => {
                        return blotter.CalendarService.GetPreviousWorkingDay().setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0);
                    },

                }
            }
            case THIS_YEAR_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (dateToCheck: Date): boolean => {
                        let today = ((d: Date) => new Date(d.setDate(d.getDate())))(new Date);
                        let todayyear: number = today.getFullYear();
                        let datetocheckyear: number = dateToCheck.getFullYear();
                        return (todayyear == datetocheckyear)
                    },

                }
            }
            case POSITIVE_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (numberToCheck: number): boolean => {
                        return (numberToCheck > 0);
                    },

                }
            }
            case NEGATIVE_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (numberToCheck: number): boolean => {
                        return (numberToCheck < 0);
                    },
                }
            }
            case ZERO_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (numberToCheck: number): boolean => {
                        return (numberToCheck == 0);
                    },

                }
            }
            case TRUE_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (boolToCheck: boolean): boolean => {
                        return (boolToCheck);
                    },
                }
            }
            case FALSE_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: (boolToCheck: boolean): boolean => {
                        return (!boolToCheck);
                    },
                }
            }



        }
    }
    export function GetDatatypeForSystemFilter(systemFilterName: string): DataType {

        switch (systemFilterName) {

            case BLANKS_SYSTEM_FILTER:
            case NON_BLANKS_SYSTEM_FILTER: {
                return DataType.All
            }
            case TODAY_SYSTEM_FILTER:
            case IN_PAST_SYSTEM_FILTER:
            case IN_FUTURE_SYSTEM_FILTER:
            case YESTERDAY_SYSTEM_FILTER:
            case TOMORROW_SYSTEM_FILTER:
            case NEXT_WORKING_DAY_SYSTEM_FILTER:
            case PREVIOUS_WORKING_DAY_SYSTEM_FILTER:
            case THIS_YEAR_SYSTEM_FILTER: {
                return DataType.Date
            }
            case POSITIVE_SYSTEM_FILTER:
            case NEGATIVE_SYSTEM_FILTER:
            case ZERO_SYSTEM_FILTER: {
                return DataType.Number
            }
            case TRUE_SYSTEM_FILTER:
            case FALSE_SYSTEM_FILTER: {
                return DataType.Boolean
            }



        }

    }

}

