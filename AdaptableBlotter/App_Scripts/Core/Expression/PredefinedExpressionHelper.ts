import { Expression } from './Expression'
<<<<<<< HEAD
import { IRangeExpression, INamedExpression } from '../Interface/IExpression';
import { CellStyle, LeafExpressionOperator } from '../Enums';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { FilterState } from '../../Redux/ActionsReducers/Interface/IState';
=======
import { IExpressionRange } from '../Interface/IExpression';
import { LeafExpressionOperator } from '../Enums';
>>>>>>> 9e285dd679d810e10f33adebaa023a9d1e75de7c


export interface IPredefinedExpressionInfo {
<<<<<<< HEAD
    ColumnValues: Array<any>,
    NamedExpression: INamedExpression,
    ExpressionRange: IRangeExpression,
}

export module PredefinedExpressionHelper {
=======
    Id: string
    FriendlyName: string
    Operator: LeafExpressionOperator
    Operand1: string
    Operand2: string
    BackColor: string
    ForeColor: string
}

export module PredefinedExpressionHelper {
    export function CreatePredefinedExpression(columnName: string, predefinedExpression: IPredefinedExpressionInfo): Expression {
>>>>>>> 9e285dd679d810e10f33adebaa023a9d1e75de7c

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
         //   let named = GetFilterState().Filters.find(f => f.Uid == predefinedExpression.NamedExpression.Uid);
            let namedExpressions: Array<string> = [];
            namedExpressions.push(predefinedExpression.NamedExpression.Uid);
            let singleNamedExpression: { ColumnName: string, Named: Array<string> } = { ColumnName: columnName, Named: namedExpressions }
            namedExpression.push(singleNamedExpression);
        }
        return namedExpression;
    }

<<<<<<< HEAD
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
=======
    export function GetPredefinedExpressions(): IPredefinedExpressionInfo[] {
        //RGBA might not be 100% compatible with all browsesrs
        return [
            { Id: "PositiveGreen", FriendlyName: "Positive numbers in green font", BackColor: 'rgba(0, 0, 0, 0)', ForeColor: '#008000', Operator: LeafExpressionOperator.GreaterThanOrEqual, Operand1: "0", Operand2: "" },
             { Id: "NegativeRed", FriendlyName: "Negative numbers in red font", BackColor: 'rgba(0, 0, 0, 0)', ForeColor: '#FF0000', Operator: LeafExpressionOperator.LessThan, Operand1: "0", Operand2: "" },
        ]
>>>>>>> 9e285dd679d810e10f33adebaa023a9d1e75de7c
    }

      function GetFilterState(): FilterState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Filter;
    }
}

