import { Expression } from './Expression'
import { IRangeExpression, IUserFilter } from '../Interface/IExpression';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';


export interface IPredefinedExpressionInfo {
    ColumnValues: Array<any>,
    UserFilters: string[],
    ExpressionRange: IRangeExpression,
}

export module PredefinedExpressionHelper {

    export function CreatePredefinedExpression(columnName: string, predefinedExpression: IPredefinedExpressionInfo, blotter: IAdaptableBlotter): Expression {
        let columnValuesExpression = CreateColumnValuesExpression(columnName, predefinedExpression);
        let userFilter = CreateUserFilter(columnName, predefinedExpression, blotter);
        let rangeExpression = CreateRangeExpression(columnName, predefinedExpression);
        return new Expression(columnValuesExpression, userFilter, rangeExpression);
    }


//  UserFilters: [this.GetUserFilterState().UserFilters.find(f => f.Uid == "Positive")] ,

    function CreateColumnValuesExpression(columnName: string, predefinedExpression: IPredefinedExpressionInfo): Array<{ ColumnName: string, ColumnValues: Array<any> }> {
        let columnValuesExpression: Array<{ ColumnName: string, ColumnValues: Array<any> }> = [];
        if (predefinedExpression.ColumnValues != null) {
            let singleRangeExpression: { ColumnName: string, ColumnValues: Array<any> } = { ColumnName: columnName, ColumnValues: predefinedExpression.ColumnValues }
            columnValuesExpression.push(singleRangeExpression);
        }
        return columnValuesExpression;
    }

    function CreateUserFilter(columnName: string, predefinedExpression: IPredefinedExpressionInfo, blotter: IAdaptableBlotter): Array<{ ColumnName: string, UserFilterUids: Array<string> }> {
        let userFilter: Array<{ ColumnName: string, UserFilterUids: Array<string> }> = [];
        if (predefinedExpression.UserFilters != null) {
            let userFilters: { ColumnName: string, UserFilterUids: Array<string> } = { ColumnName: columnName, UserFilterUids: predefinedExpression.UserFilters }
            userFilter.push(userFilters);
        }
        return userFilter;
    }

    function CreateRangeExpression(columnName: string, predefinedExpression: IPredefinedExpressionInfo): Array<{ ColumnName: string, Ranges: Array<IRangeExpression> }> {
        let rangeExpression: Array<{ ColumnName: string, Ranges: Array<IRangeExpression> }> = [];
        if (predefinedExpression.ExpressionRange != null) {
            let expressionRange: IRangeExpression = { Operand1: predefinedExpression.ExpressionRange.Operand1, Operator: predefinedExpression.ExpressionRange.Operator, Operand2: predefinedExpression.ExpressionRange.Operand2 };
            let expressionRanges: Array<IRangeExpression> = [];
            expressionRanges.push(expressionRange);
            let singleRangeExpression: { ColumnName: string, Ranges: Array<IRangeExpression> } = { ColumnName: columnName, Ranges: expressionRanges }
            rangeExpression.push(singleRangeExpression);
        }
        return rangeExpression;
    }

}

