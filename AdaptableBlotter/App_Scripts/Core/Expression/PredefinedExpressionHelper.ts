import { Expression } from './Expression'
import { IRangeExpression, INamedExpression } from '../Interface/IExpression';
import { CellStyle, LeafExpressionOperator } from '../Enums';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';

/*  
 Not sure about this still but I THINK its a good idea.
 Basically we want to make it easy for uses to create common conditions; they can still edit them later if we want.
 It could be that the whole thing adds a layer of complexity that is not justified, because we need to create the condition on the fly... who knows?
*/


export interface IPredefinedExpressionInfo {
    ColumnValues: Array<any>,
    NamedExpression: INamedExpression,
    ExpressionRange: IRangeExpression,
}

export interface IPredefinedExpressionStyle {
    Id: string
    PredefinedExpressionInfo: IPredefinedExpressionInfo
    CellStyle: CellStyle
    FriendlyName: string

}

export module PredefinedExpressionHelper {


    export function CreatePredefinedExpression(columnName: string, predefinedExpression: IPredefinedExpressionInfo, blotter: IAdaptableBlotter): Expression {
        let columnValuesExpression = CreateColumnValuesExpression(columnName, predefinedExpression);
        let namedExpression = CreateNamedExpression(columnName, predefinedExpression, blotter);
        let rangeExpression = CreateRangeExpression(columnName, predefinedExpression);
        return new Expression(columnValuesExpression, namedExpression, rangeExpression);
    }

    export function CreateNamedExpression(columnName: string, predefinedExpression: IPredefinedExpressionInfo, blotter: IAdaptableBlotter): Array<{ ColumnName: string, Named: Array<INamedExpression> }> {
        let namedExpression: Array<{ ColumnName: string, Named: Array<INamedExpression> }> = [];
        if (predefinedExpression.NamedExpression != null) {
            let named = blotter.ExpressionService.GetNamedExpressions().find(f => f.Id == predefinedExpression.NamedExpression.Id);
            let namedExpressions: Array<INamedExpression> = [];
            namedExpressions.push(named);
            let singleNamedExpression: { ColumnName: string, Named: Array<INamedExpression> } = { ColumnName: columnName, Named: namedExpressions }
            namedExpression.push(singleNamedExpression);
        }
        return namedExpression;
    }

    export function CreateColumnValuesExpression(columnName: string, predefinedExpression: IPredefinedExpressionInfo): Array<{ ColumnName: string, ColumnValues: Array<any> }> {

        // Populate Column Values
        let columnValuesExpression: Array<{ ColumnName: string, ColumnValues: Array<any> }> = [];
        if (predefinedExpression.ColumnValues != null) {
            let singleRangeExpression: { ColumnName: string, ColumnValues: Array<any> } = { ColumnName: columnName, ColumnValues: predefinedExpression.ColumnValues }
            columnValuesExpression.push(singleRangeExpression);
        }

        // return created expression
        return columnValuesExpression;
    }

    export function CreateRangeExpression(columnName: string, predefinedExpression: IPredefinedExpressionInfo): Array<{ ColumnName: string, Ranges: Array<IRangeExpression> }> {

        // Populate Ranges
        let rangeExpression: Array<{ ColumnName: string, Ranges: Array<IRangeExpression> }> = [];
        if (predefinedExpression.ExpressionRange != null) {
            let expressionRange: IRangeExpression = { Operand1: predefinedExpression.ExpressionRange.Operand1, Operator: predefinedExpression.ExpressionRange.Operator, Operand2: predefinedExpression.ExpressionRange.Operand2 };
            let expressionRanges: Array<IRangeExpression> = [];
            expressionRanges.push(expressionRange);
            let singleRangeExpression: { ColumnName: string, Ranges: Array<IRangeExpression> } = { ColumnName: columnName, Ranges: expressionRanges }
            rangeExpression.push(singleRangeExpression);
        }

        // return created expression
        return rangeExpression;
    }
}

