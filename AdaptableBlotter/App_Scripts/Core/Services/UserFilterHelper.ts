import { Expression } from '../Expression/Expression'
import { ExpressionHelper } from '../Expression/ExpressionHelper'
import { IRangeExpression, IUserFilter } from '../Interface/IExpression';
import { LeafExpressionOperator } from '../Enums'
import { ColumnType } from '../Enums'
import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { StringExtensions } from '../Extensions'


export module UserFilterHelper {

    export function GetUserFilters(userFilterUids: string[], blotter: IAdaptableBlotter): IUserFilter[] {
        return blotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters.filter(f => userFilterUids.find(uid => uid == f.Uid) != null)
    }

    export function ShowUserFilterForColumn(expressionUid: string, column: IColumn, blotter: IAdaptableBlotter): boolean {
        let userFilter: IUserFilter = blotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters.find(f => f.Uid == expressionUid);

        // predefined expressions return if its right column type
        if (userFilter.IsPredefined) {
            return userFilter.ColumnType == column.ColumnType;
        }

        // see if there are any columnvalues and then get the first only
        if (userFilter.Expression.ColumnValuesExpressions != null && userFilter.Expression.ColumnValuesExpressions.length > 0) {
            return userFilter.Expression.ColumnValuesExpressions[0].ColumnName == column.ColumnId;
        }

        // see if there are any user filter expressions and then get the first only
        if (userFilter.Expression.UserFilters != null && userFilter.Expression.UserFilters.length > 0) {
            return userFilter.Expression.UserFilters[0].ColumnName == column.ColumnId;
        }

        // see if there are any ranges and then get the first only
        if (userFilter.Expression.RangeExpressions != null && userFilter.Expression.RangeExpressions.length > 0) {
            return userFilter.Expression.RangeExpressions[0].ColumnName == column.ColumnId;
        }

        return false;
    }

    export function GetColumnTypeForUserFilter(userFilter: IUserFilter, Columns: Array<IColumn>): ColumnType {

        // predefined expressions return if its right column type
        if (userFilter.IsPredefined) {
            return userFilter.ColumnType;
        }

        // see if there are any columnvalues and then get the first only
        if (userFilter.Expression.ColumnValuesExpressions != null && userFilter.Expression.ColumnValuesExpressions.length > 0) {
            let columnID: string = userFilter.Expression.ColumnValuesExpressions[0].ColumnName;
            return Columns.find(c => c.ColumnId == columnID).ColumnType;
        }

        // see if there are any ranges and then get the first only
        if (userFilter.Expression.RangeExpressions != null && userFilter.Expression.RangeExpressions.length > 0) {
            let columnID: string = userFilter.Expression.RangeExpressions[0].ColumnName;
            return Columns.find(c => c.ColumnId == columnID).ColumnType;
        }
    }

    export function GetColumnIdForUserFilter(userFilter: IUserFilter): string {

        // see if there are any columnvalues and then get the first only
        if (userFilter.Expression.ColumnValuesExpressions != null && userFilter.Expression.ColumnValuesExpressions.length > 0) {
            return userFilter.Expression.ColumnValuesExpressions[0].ColumnName;
        }

        // see if there are any user filter expressionss and then get the first only
        if (userFilter.Expression.UserFilters != null && userFilter.Expression.UserFilters.length > 0) {
            return userFilter.Expression.UserFilters[0].ColumnName;
        }

        // see if there are any ranges and then get the first only
        if (userFilter.Expression.RangeExpressions != null && userFilter.Expression.RangeExpressions.length > 0) {
            return userFilter.Expression.RangeExpressions[0].ColumnName;
        }
    }

    // Date
    export const TODAY_USER_FILTER = 'Today'
    export const IN_PAST_USER_FILTER = 'InPast'
    export const IN_FUTURE_USER_FILTER = 'InFuture'
    export const YESTERDAY_USER_FILTER = 'Yesterday'
    export const TOMORROW_USER_FILTER = 'Tomorrow'
    // Numeric
    export const POSITIVE_USER_FILTER = 'Positive'
    export const NEGATIVE_USER_FILTER = 'Negative'
    export const ZERO_USER_FILTER = 'Zero'
    export const NUMERIC_BLANKS_USER_FILTER = 'NumericBlanks'
    export const NUMERIC_NON_BLANKS_USER_FILTER = 'NumericNonBlanks'
    // String
    export const STRING_BLANKS_USER_FILTER = 'StringBlanks'
    export const STRING_NON_BLANKS_USER_FILTER = 'StringNonBlanks'
    // Boolean
    export const TRUE_USER_FILTER = 'True'
    export const FALSE_USER_FILTER = 'False'

    export function CreatePredefinedExpressions(): Array<IUserFilter> {

        let _predefinedExpressions: IUserFilter[] = [];

        // Date Predefined user filter Expressions
        _predefinedExpressions.push({
            Uid: TODAY_USER_FILTER,
            FriendlyName: "Today",
            Description: "Is Date Today",
            ColumnType: ColumnType.Date,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (dateToCheck: Date): boolean => {
                let today = ((d: Date) => new Date(d.setDate(d.getDate())))(new Date);
                return (today.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
            },
            IsPredefined: true
        });

        _predefinedExpressions.push({
            Uid: IN_PAST_USER_FILTER,
            FriendlyName: "In Past",
            Description: "Is Date In Past",
            ColumnType: ColumnType.Date,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (dateToCheck: Date): boolean => {
                return +dateToCheck < Date.now();
            },
            IsPredefined: true
        });

        _predefinedExpressions.push({
            Uid: IN_FUTURE_USER_FILTER,
            FriendlyName: "In Future",
            Description: "Is Date In Future",
            ColumnType: ColumnType.Date,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (dateToCheck: Date): boolean => {
                return +dateToCheck > Date.now();
            },
            IsPredefined: true
        });

        _predefinedExpressions.push({
            Uid: YESTERDAY_USER_FILTER,
            FriendlyName: "Yesterday",
            Description: "Is Date Yesterday",
            ColumnType: ColumnType.Date,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (dateToCheck: Date): boolean => {
                let yesterday = ((d: Date) => new Date(d.setDate(d.getDate() - 1)))(new Date);
                return (yesterday.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
            },
            IsPredefined: true
        });

        _predefinedExpressions.push({
            Uid: TOMORROW_USER_FILTER,
            FriendlyName: "Tomorrow",
            Description: "Is Date Tomorrow",
            ColumnType: ColumnType.Date,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (dateToCheck: Date): boolean => {
                let tomorrow = ((d: Date) => new Date(d.setDate(d.getDate() + 1)))(new Date);
                return (tomorrow.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
            },
            IsPredefined: true
        });

        // Numeric Predefined user filter Expressions
        _predefinedExpressions.push({
            Uid: POSITIVE_USER_FILTER,
            FriendlyName: "Positive",
            Description: "Is Number Positive",
            ColumnType: ColumnType.Number,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (numberToCheck: number): boolean => {
                return (numberToCheck > 0);
            },
            IsPredefined: true
        });

        _predefinedExpressions.push({
            Uid: NEGATIVE_USER_FILTER,
            FriendlyName: "Negative",
            Description: "Is Number Negative",
            ColumnType: ColumnType.Number,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (numberToCheck: number): boolean => {
                return (numberToCheck < 0);
            },
            IsPredefined: true
        });

        _predefinedExpressions.push({
            Uid: ZERO_USER_FILTER,
            FriendlyName: "Zero",
            Description: "Is Number Zero",
            ColumnType: ColumnType.Number,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (numberToCheck: number): boolean => {
                return (numberToCheck == 0);
            },
            IsPredefined: true
        });

        _predefinedExpressions.push({
            Uid: NUMERIC_BLANKS_USER_FILTER,
            FriendlyName: "Blanks",
            Description: "Is Cell Empty",
            ColumnType: ColumnType.Number,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (numberToCheck: number): boolean => {
                return (numberToCheck == null);
            },
            IsPredefined: true
        });

        _predefinedExpressions.push({
            Uid: NUMERIC_NON_BLANKS_USER_FILTER,
            FriendlyName: "Non Blanks",
            Description: "Is Cell Populated",
            ColumnType: ColumnType.Number,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (numberToCheck: number): boolean => {
                return (numberToCheck != null);
            },
            IsPredefined: true
        });

        // String Predefined user filter Expressions
        _predefinedExpressions.push({
            Uid: STRING_BLANKS_USER_FILTER,
            FriendlyName: "Blanks",
            Description: "Is Cell Empty",
            ColumnType: ColumnType.String,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (stringToCheck: string): boolean => {
                return (StringExtensions.IsNullOrEmpty(stringToCheck));
            },
            IsPredefined: true
        });

        _predefinedExpressions.push({
            Uid: STRING_NON_BLANKS_USER_FILTER,
            FriendlyName: "Non Blanks",
            Description: "Is Cell Populated",
            ColumnType: ColumnType.String,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (stringToCheck: string): boolean => {
                return (StringExtensions.IsNotNullOrEmpty(stringToCheck));
            },
            IsPredefined: true
        });

        // Boolean Predefined user filter Expressions
        _predefinedExpressions.push({
            Uid: TRUE_USER_FILTER,
            FriendlyName: "True",
            Description: "Is Value True",
            ColumnType: ColumnType.Boolean,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (boolToCheck: boolean): boolean => {
                return (boolToCheck);
            },
            IsPredefined: true
        });

        _predefinedExpressions.push({
            Uid: FALSE_USER_FILTER,
            FriendlyName: "False",
            Description: "Is Value False",
            ColumnType: ColumnType.Boolean,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (boolToCheck: boolean): boolean => {
                return (!boolToCheck);
            },
            IsPredefined: true
        });

        return _predefinedExpressions;

    }

}

