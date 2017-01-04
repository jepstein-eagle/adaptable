import { Expression } from './Expression'
import { IRangeExpression, INamedExpression } from '../Interface/IExpression';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { FilterState } from '../../Redux/ActionsReducers/Interface/IState';


export interface IPredefinedExpressionInfo {
    ColumnValues: Array<any>,
    NamedExpression: INamedExpression,
    ExpressionRange: IRangeExpression,
}

export module PredefinedExpressionHelper {

    export function CreatePredefinedExpression(columnName: string, predefinedExpression: IPredefinedExpressionInfo, blotter: IAdaptableBlotter): Expression {
        let columnValuesExpression = CreateColumnValuesExpression(columnName, predefinedExpression);
        let namedExpression = CreateNamedExpression(columnName, predefinedExpression, blotter);
        let rangeExpression = CreateRangeExpression(columnName, predefinedExpression);
        return new Expression(columnValuesExpression, namedExpression, rangeExpression);
    }

    function CreateColumnValuesExpression(columnName: string, predefinedExpression: IPredefinedExpressionInfo): Array<{ ColumnName: string, ColumnValues: Array<any> }> {
        let columnValuesExpression: Array<{ ColumnName: string, ColumnValues: Array<any> }> = [];
        if (predefinedExpression.ColumnValues != null) {
            let singleRangeExpression: { ColumnName: string, ColumnValues: Array<any> } = { ColumnName: columnName, ColumnValues: predefinedExpression.ColumnValues }
            columnValuesExpression.push(singleRangeExpression);
        }
        return columnValuesExpression;
    }

    function CreateNamedExpression(columnName: string, predefinedExpression: IPredefinedExpressionInfo, blotter: IAdaptableBlotter): Array<{ ColumnName: string, Named: Array<string> }> {
        let namedExpression: Array<{ ColumnName: string, Named: Array<string> }> = [];
        if (predefinedExpression.NamedExpression != null) {
            let namedExpressions: Array<string> = [];
            namedExpressions.push(predefinedExpression.NamedExpression.Uid);
            let singleNamedExpression: { ColumnName: string, Named: Array<string> } = { ColumnName: columnName, Named: namedExpressions }
            namedExpression.push(singleNamedExpression);
        }
        return namedExpression;
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

