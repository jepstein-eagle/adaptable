import { IKeyValuePair } from "../Interface/IKeyValuePair";
import { LeafExpressionOperator } from '../Enums';
import { IRange } from "../Interface/Expression/IRange";
import { IColumn } from '../Interface/IColumn';
export declare module RangeHelper {
    function CreateValueRange(operator: LeafExpressionOperator, operand1: any, operand2: any): IRange;
    function GetNumberOperatorPairs(): IKeyValuePair[];
    function GetStringOperatorPairs(): IKeyValuePair[];
    function GetDateOperatorPairs(): IKeyValuePair[];
    function CreateValueRangeFromOperand(rangeText: string): IRange;
    function IsColumnAppropriateForRange(operator: LeafExpressionOperator, column: IColumn): boolean;
}
