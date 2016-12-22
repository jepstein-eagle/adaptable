import { Expression } from './Expression'
import { IExpressionRange, IExpressionFilter } from '../Interface/IExpression';
import { CellStyle, LeafExpressionOperator } from '../Enums';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';

/*  
 Not sure about this still but I THINK its a good idea.
 Basically we want to make it easy for uses to create common conditions; they can still edit them later if we want.
 Once we have Filters working we should add "future" and "past" conditions to work on date columns where < or > "Today"
It could be that the whole thing adds a layer of complexity that is not justified, because we need to create the condition on the fly... who knows?
*/

export interface IPredefinedExpressionInfo {
    Id: string
    FriendlyName: string
    CellStyle: CellStyle
    ExpressionFilter: IExpressionFilter,
    ExpressionRange: IExpressionRange,
}

export module PredefinedExpressionHelper {


    export function CreatePredefinedExpression(columnName: string, predefinedExpression: IPredefinedExpressionInfo, blotter: IAdaptableBlotter): Expression {

        // Empty Column Values
        let columnValuesExpression: Array<{ ColumnName: string, Values: Array<any> }> = [];

        // Empty Filters
        let filtersExpression: Array<{ ColumnName: string, Filters: Array<IExpressionFilter> }> = [];
        if (predefinedExpression.ExpressionFilter != null) {

            let filter = blotter.ExpressionService.GetFilterExpressions().find(f => f.ExpressionName == predefinedExpression.ExpressionFilter.ExpressionName);
            let filters: Array<IExpressionFilter> = [];
            filters.push(filter);
            let singleFilterExpression: { ColumnName: string, Filters: Array<IExpressionFilter> } = { ColumnName: columnName, Filters: filters }
            filtersExpression.push(singleFilterExpression);
        }

        // Populate Ranges
        let rangeExpression: Array<{ ColumnName: string, Ranges: Array<IExpressionRange> }> = [];
        if (predefinedExpression.ExpressionRange != null) {
            let expressionRange: IExpressionRange = { Operand1: predefinedExpression.ExpressionRange.Operand1, Operator: predefinedExpression.ExpressionRange.Operator, Operand2: predefinedExpression.ExpressionRange.Operand2 };
            let expressionRanges: Array<IExpressionRange> = [];
            expressionRanges.push(expressionRange);
            let singleRangeExpression: { ColumnName: string, Ranges: Array<IExpressionRange> } = { ColumnName: columnName, Ranges: expressionRanges }
            rangeExpression.push(singleRangeExpression);
        }

        // return created expression
        return new Expression(columnValuesExpression, filtersExpression, rangeExpression);
    }
}

