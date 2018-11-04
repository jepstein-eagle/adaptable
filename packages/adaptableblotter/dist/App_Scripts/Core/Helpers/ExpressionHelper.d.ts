import { LeafExpressionOperator } from '../Enums';
import { DataType } from '../Enums';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { IColumn } from '../Interface/IColumn';
import { IRange, IUserFilter } from '../Api/Interface/IAdaptableBlotterObjects';
import { Expression } from '../Api/Expression';
export interface IRangeEvaluation {
    operand1: any;
    operand2: any;
    newValue: any;
    operator: LeafExpressionOperator;
    initialValue: any;
    columnId: string;
}
export declare module ExpressionHelper {
    function CreateSingleColumnExpression(columnId: string, columnDisplayValues: Array<string>, columnRawValues: Array<string>, userFilters: Array<string>, ranges: Array<IRange>): Expression;
    function ConvertExpressionToString(Expression: Expression, columns: Array<IColumn>, includeColumnName?: boolean): string;
    function ConvertRangeToString(range: IRange, columns: IColumn[]): string;
    function IsSatisfied(Expression: Expression, getColumnValue: (columnId: string) => any, getDisplayColumnValue: (columnId: string) => string, getOtherColumnValue: (columnId: string) => any, columnBlotterList: IColumn[], userFilters: IUserFilter[], systemFilters: string[], blotter: IAdaptableBlotter): boolean;
    function OperatorToOneCharacterString(operator: LeafExpressionOperator): string;
    function OperatorToShortFriendlyString(operator: LeafExpressionOperator): string;
    function OperatorToLongFriendlyString(leafExpressionOperator: LeafExpressionOperator, dataType: DataType): string;
    function GetOperatorsForDataType(dataType: DataType): LeafExpressionOperator[];
    function GetColumnListFromExpression(expression: Expression): Array<string>;
    function IsEmptyExpression(expression: Expression): boolean;
    function IsNotEmptyExpression(expression: Expression): boolean;
    function IsNotEmptyOrInvalidExpression(expression: Expression): boolean;
    function IsEmptyOrValidExpression(expression: Expression): boolean;
    function IsExpressionValid(expression: Expression): boolean;
    function IsEmptyRange(range: IRange): boolean;
    function checkForExpression(Expression: Expression, identifierValue: any, columns: IColumn[], blotter: IAdaptableBlotter): boolean;
    function checkForExpressionFromRecord(Expression: Expression, record: any, columns: IColumn[], blotter: IAdaptableBlotter): boolean;
    function CreateEmptyExpression(): Expression;
    function CreateEmptyRangeExpression(): IRange;
    function GetRangeEvaluation(rangeExpression: IRange, newValue: any, initialValue: any, column: IColumn, blotter: IAdaptableBlotter, getOtherColumnValue: (columnId: string) => any): IRangeEvaluation;
    function TestRangeEvaluation(rangeEvaluation: IRangeEvaluation, blotter: IAdaptableBlotter): boolean;
    function ExpressionContainsFilter(expression: Expression, filter: IUserFilter): boolean;
    function OperatorRequiresValue(operator: LeafExpressionOperator): boolean;
}
