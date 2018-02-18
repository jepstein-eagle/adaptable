import { ExpressionHelper } from '../Helpers/ExpressionHelper'
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy'
import { DataType } from '../Enums'
import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { StringExtensions } from '../Extensions/StringExtensions'
import { Helper } from './Helper';


export module UserFilterHelper {

    // String, Numeric and Date
    export const BLANKS_USER_FILTER = 'Blanks'
    export const NON_BLANKS_USER_FILTER = 'Non Blanks'

    // Date
    export const TODAY_USER_FILTER = 'Today'
    export const IN_PAST_USER_FILTER = 'In Past'
    export const IN_FUTURE_USER_FILTER = 'In Future'
    export const YESTERDAY_USER_FILTER = 'Yesterday'
    export const TOMORROW_USER_FILTER = 'Tomorrow'
    export const NEXT_WORKING_DAY_USER_FILTER = 'Next Working Day'
    export const PREVIOUS_WORKING_DAY_USER_FILTER = 'Previous Working Day'
    export const THIS_YEAR_USER_FILTER = 'This Year'
    // Numeric
    export const POSITIVE_USER_FILTER = 'Positive'
    export const NEGATIVE_USER_FILTER = 'Negative'
    export const ZERO_USER_FILTER = 'Zero'


    //  export const STRING_BLANKS_USER_FILTER = 'StringBlanks'
    //  export const STRING_NON_BLANKS_USER_FILTER = 'StringNonBlanks'
    // Boolean
    export const TRUE_USER_FILTER = 'True'
    export const FALSE_USER_FILTER = 'False'

    export function IsSystemUserFilter(filter: IUserFilter): boolean {
        if (filter.IsExpressionSatisfied) {
            return true
        }
        return false
    }

    export function GetUserFilters(UserFilters: IUserFilter[], userFilters: string[]): IUserFilter[] {
        return UserFilters.filter(f => userFilters.find(u => u == f.Name) != null)
    }

    export function ShowUserFilterForColumn(UserFilters: IUserFilter[], expressionUid: string, column: IColumn): boolean {
        let userFilter: IUserFilter = UserFilters.find(f => f.Name == expressionUid);

        // predefined expressions return if its right column type
        if (userFilter.IsPredefined) {
            return ((userFilter.DataType == DataType.All) || (userFilter.DataType == column.DataType));
        }

        // see if there are any columnvalues and then get the first only
        if (userFilter.Expression.ColumnDisplayValuesExpressions != null && userFilter.Expression.ColumnDisplayValuesExpressions.length > 0) {
            return userFilter.Expression.ColumnDisplayValuesExpressions[0].ColumnName == column.ColumnId;
        }

        // see if there are any user filter expressions and then get the first only
        if (userFilter.Expression.UserFilterExpressions != null && userFilter.Expression.UserFilterExpressions.length > 0) {
            return userFilter.Expression.UserFilterExpressions[0].ColumnName == column.ColumnId;
        }

        // see if there are any ranges and then get the first only
        if (userFilter.Expression.RangeExpressions != null && userFilter.Expression.RangeExpressions.length > 0) {
            return userFilter.Expression.RangeExpressions[0].ColumnName == column.ColumnId;
        }

        return false;
    }

    export function GetDataTypeForUserFilter(userFilter: IUserFilter, Columns: Array<IColumn>): DataType {

        // predefined expressions return if its right column type
        if (userFilter.IsPredefined) {
            return userFilter.DataType;
        }

        // see if there are any columnvalues and then get the first only
        if (userFilter.Expression.ColumnDisplayValuesExpressions != null && userFilter.Expression.ColumnDisplayValuesExpressions.length > 0) {
            let columnID: string = userFilter.Expression.ColumnDisplayValuesExpressions[0].ColumnName;
            return Columns.find(c => c.ColumnId == columnID).DataType;
        }

        // see if there are any ranges and then get the first only
        if (userFilter.Expression.RangeExpressions != null && userFilter.Expression.RangeExpressions.length > 0) {
            let columnID: string = userFilter.Expression.RangeExpressions[0].ColumnName;
            return Columns.find(c => c.ColumnId == columnID).DataType;
        }
    }

    export function GetColumnIdForUserFilter(userFilter: IUserFilter): string {

        // see if there are any columnvalues and then get the first only
        if (userFilter.Expression.ColumnDisplayValuesExpressions != null && userFilter.Expression.ColumnDisplayValuesExpressions.length > 0) {
            return userFilter.Expression.ColumnDisplayValuesExpressions[0].ColumnName;
        }

        // see if there are any user filter expressionss and then get the first only
        if (userFilter.Expression.UserFilterExpressions != null && userFilter.Expression.UserFilterExpressions.length > 0) {
            return userFilter.Expression.UserFilterExpressions[0].ColumnName;
        }

        // see if there are any ranges and then get the first only
        if (userFilter.Expression.RangeExpressions != null && userFilter.Expression.RangeExpressions.length > 0) {
            return userFilter.Expression.RangeExpressions[0].ColumnName;
        }
    }


    export function CreateSystemUserFilters(): Array<IUserFilter> {

        let _systemExpressions: IUserFilter[] = [];

        // for all columns
        _systemExpressions.push({
            Name: BLANKS_USER_FILTER,
            Description: "Is Cell Empty",
            DataType: DataType.All,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (itemToCheck: any, blotter: IAdaptableBlotter): boolean => {
                return Helper.IsInputNullOrEmpty(itemToCheck);
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: NON_BLANKS_USER_FILTER,
            Description: "Is Cell Populated",
            DataType: DataType.All,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (itemToCheck: any, blotter: IAdaptableBlotter): boolean => {
                return Helper.IsInputNotNullOrEmpty(itemToCheck);
            },
            IsPredefined: true
        });

        // Date Predefined user filter Expressions
        _systemExpressions.push({
            Name: TODAY_USER_FILTER,
           Description: "Is Date Today",
            DataType: DataType.Date,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (dateToCheck: Date, blotter: IAdaptableBlotter): boolean => {
                let today = ((d: Date) => new Date(d.setDate(d.getDate())))(new Date);
                return (today.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: IN_PAST_USER_FILTER,
            Description: "Is Date In Past",
            DataType: DataType.Date,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (dateToCheck: Date, blotter: IAdaptableBlotter): boolean => {
                return +dateToCheck < Date.now();
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: IN_FUTURE_USER_FILTER,
            //   FriendlyName: "In Future",
            Description: "Is Date In Future",
            DataType: DataType.Date,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (dateToCheck: Date, blotter: IAdaptableBlotter): boolean => {
                return +dateToCheck > Date.now();
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: YESTERDAY_USER_FILTER,
            Description: "Is Date Yesterday",
            DataType: DataType.Date,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (dateToCheck: Date, blotter: IAdaptableBlotter): boolean => {
                let yesterday = ((d: Date) => new Date(d.setDate(d.getDate() - 1)))(new Date);
                return (yesterday.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: TOMORROW_USER_FILTER,
            Description: "Is Date Tomorrow",
            DataType: DataType.Date,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (dateToCheck: Date, blotter: IAdaptableBlotter): boolean => {
                let tomorrow = ((d: Date) => new Date(d.setDate(d.getDate() + 1)))(new Date);
                return (tomorrow.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: NEXT_WORKING_DAY_USER_FILTER,
             Description: "Is Next Working Day",
            DataType: DataType.Date,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (dateToCheck: Date, blotter: IAdaptableBlotter): boolean => {
                return blotter.CalendarService.GetNextWorkingDay().setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0);
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: PREVIOUS_WORKING_DAY_USER_FILTER,
            Description: "Is Previous Working Day",
            DataType: DataType.Date,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (dateToCheck: Date, blotter: IAdaptableBlotter): boolean => {
                return blotter.CalendarService.GetPreviousWorkingDay().setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0);
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: THIS_YEAR_USER_FILTER,
            Description: "In This Year",
            DataType: DataType.Date,
            Expression: ExpressionHelper.CreateEmptyExpression(),
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
            Name: POSITIVE_USER_FILTER,
            Description: "Is Number Positive",
            DataType: DataType.Number,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (numberToCheck: number, blotter: IAdaptableBlotter): boolean => {
                return (numberToCheck > 0);
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: NEGATIVE_USER_FILTER,
            Description: "Is Number Negative",
            DataType: DataType.Number,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (numberToCheck: number, blotter: IAdaptableBlotter): boolean => {
                return (numberToCheck < 0);
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: ZERO_USER_FILTER,
            Description: "Is Number Zero",
            DataType: DataType.Number,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (numberToCheck: number, blotter: IAdaptableBlotter): boolean => {
                return (numberToCheck == 0);
            },
            IsPredefined: true
        });

        // Boolean Predefined user filter Expressions
        _systemExpressions.push({
            Name: TRUE_USER_FILTER,
            //     FriendlyName: "True",
            Description: "Is Value True",
            DataType: DataType.Boolean,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (boolToCheck: boolean, blotter: IAdaptableBlotter): boolean => {
                return (boolToCheck);
            },
            IsPredefined: true
        });

        _systemExpressions.push({
            Name: FALSE_USER_FILTER,
            //    FriendlyName: "False",
            Description: "Is Value False",
            DataType: DataType.Boolean,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (boolToCheck: boolean, blotter: IAdaptableBlotter): boolean => {
                return (!boolToCheck);
            },
            IsPredefined: true
        });

        return _systemExpressions;

    }

}

