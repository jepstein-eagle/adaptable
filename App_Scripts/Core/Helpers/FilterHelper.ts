import { ExpressionHelper } from '../Helpers/ExpressionHelper'
import { IUserFilter, ISystemFilter } from '../../Strategy/Interface/IUserFilterStrategy'
import { DataType } from '../Enums'
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { StringExtensions } from '../Extensions/StringExtensions'
import { Helper } from './Helper';
import { IColumn } from '../Interface/IColumn';


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


    export function GetUserFilters(userFilters: IUserFilter[], userFilterNames: string[]): IUserFilter[] {
        return userFilters.filter(f => userFilterNames.find(u => u == f.Name) != null)
    }

    export function GetSystemFilters(systemFilters: ISystemFilter[], systemFilterNames: string[]): ISystemFilter[] {
        return systemFilters.filter(f => systemFilterNames.find(u => u == f.Name) != null)
    }


    export function GetSystemFiltersForColumn(column: IColumn, systemFilters: ISystemFilter[]): ISystemFilter[] {
        let appropriateSystemFilters: ISystemFilter[] = []
        if (column != null) {
            systemFilters.forEach((systemFilter: ISystemFilter) => {
                if (systemFilter.DataType == DataType.All || systemFilter.DataType == column.DataType) {
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
        if (userFilter.Expression.ColumnDisplayValuesExpressions != null && userFilter.Expression.ColumnDisplayValuesExpressions.length > 0) {
            return userFilter.Expression.ColumnDisplayValuesExpressions[0].ColumnName;
        }

        // see if there are any user filter expressionss and then get the first only
        if (userFilter.Expression.FilterExpressions != null && userFilter.Expression.FilterExpressions.length > 0) {
            return userFilter.Expression.FilterExpressions[0].ColumnName;
        }

        // see if there are any ranges and then get the first only
        if (userFilter.Expression.RangeExpressions != null && userFilter.Expression.RangeExpressions.length > 0) {
            return userFilter.Expression.RangeExpressions[0].ColumnName;
        }
    }


    export function CreateSystemFilters(): Array<ISystemFilter> {

        let _systemExpressions: ISystemFilter[] = [];

        // for all columns
        _systemExpressions.push({
            Name: BLANKS_SYSTEM_FILTER,
            DataType: DataType.All,
            IsExpressionSatisfied: (itemToCheck: any, blotter: IAdaptableBlotter): boolean => {
                return Helper.IsInputNullOrEmpty(itemToCheck);
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: NON_BLANKS_SYSTEM_FILTER,
            DataType: DataType.All,
            IsExpressionSatisfied: (itemToCheck: any, blotter: IAdaptableBlotter): boolean => {
                return Helper.IsInputNotNullOrEmpty(itemToCheck);
            },
            IsPredefined: true
        });

        // Date Predefined user filter Expressions
        _systemExpressions.push({
            Name: TODAY_SYSTEM_FILTER,
            DataType: DataType.Date,
            IsExpressionSatisfied: (dateToCheck: Date, blotter: IAdaptableBlotter): boolean => {
                let today = ((d: Date) => new Date(d.setDate(d.getDate())))(new Date);
                return (today.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: IN_PAST_SYSTEM_FILTER,
             DataType: DataType.Date,
            IsExpressionSatisfied: (dateToCheck: Date, blotter: IAdaptableBlotter): boolean => {
                return +dateToCheck < Date.now();
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: IN_FUTURE_SYSTEM_FILTER,
            DataType: DataType.Date,
            IsExpressionSatisfied: (dateToCheck: Date, blotter: IAdaptableBlotter): boolean => {
                return +dateToCheck > Date.now();
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: YESTERDAY_SYSTEM_FILTER,
            DataType: DataType.Date,
            IsExpressionSatisfied: (dateToCheck: Date, blotter: IAdaptableBlotter): boolean => {
                let yesterday = ((d: Date) => new Date(d.setDate(d.getDate() - 1)))(new Date);
                return (yesterday.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: TOMORROW_SYSTEM_FILTER,
            DataType: DataType.Date,
            IsExpressionSatisfied: (dateToCheck: Date, blotter: IAdaptableBlotter): boolean => {
                let tomorrow = ((d: Date) => new Date(d.setDate(d.getDate() + 1)))(new Date);
                return (tomorrow.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: NEXT_WORKING_DAY_SYSTEM_FILTER,
             DataType: DataType.Date,
            IsExpressionSatisfied: (dateToCheck: Date, blotter: IAdaptableBlotter): boolean => {
                return blotter.CalendarService.GetNextWorkingDay().setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0);
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: PREVIOUS_WORKING_DAY_SYSTEM_FILTER,
            DataType: DataType.Date,
            IsExpressionSatisfied: (dateToCheck: Date, blotter: IAdaptableBlotter): boolean => {
                return blotter.CalendarService.GetPreviousWorkingDay().setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0);
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: THIS_YEAR_SYSTEM_FILTER,
            DataType: DataType.Date,
            IsExpressionSatisfied: (dateToCheck: Date, blotter: IAdaptableBlotter): boolean => {
                let today = ((d: Date) => new Date(d.setDate(d.getDate())))(new Date);
                let todayyear: number = today.getFullYear();
                let datetocheckyear: number = dateToCheck.getFullYear();
                return (todayyear == datetocheckyear)
            },
            IsPredefined: true
        });

        // Numeric Predefined user filter Expressions
        _systemExpressions.push({
            Name: POSITIVE_SYSTEM_FILTER,
            DataType: DataType.Number,
            IsExpressionSatisfied: (numberToCheck: number, blotter: IAdaptableBlotter): boolean => {
                return (numberToCheck > 0);
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: NEGATIVE_SYSTEM_FILTER,
            DataType: DataType.Number,
            IsExpressionSatisfied: (numberToCheck: number, blotter: IAdaptableBlotter): boolean => {
                return (numberToCheck < 0);
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: ZERO_SYSTEM_FILTER,
            DataType: DataType.Number,
            IsExpressionSatisfied: (numberToCheck: number, blotter: IAdaptableBlotter): boolean => {
                return (numberToCheck == 0);
            },
            IsPredefined: true
        });

        // Boolean Predefined user filter Expressions
        _systemExpressions.push({
            Name: TRUE_SYSTEM_FILTER,
            DataType: DataType.Boolean,
            IsExpressionSatisfied: (boolToCheck: boolean, blotter: IAdaptableBlotter): boolean => {
                return (boolToCheck);
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: FALSE_SYSTEM_FILTER,
             DataType: DataType.Boolean,
            IsExpressionSatisfied: (boolToCheck: boolean, blotter: IAdaptableBlotter): boolean => {
                return (!boolToCheck);
            },
            IsPredefined: true
        });

        return _systemExpressions;

    }

}

