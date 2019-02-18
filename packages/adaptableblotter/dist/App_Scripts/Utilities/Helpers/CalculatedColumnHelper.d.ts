import { IColumn } from "../Interface/IColumn";
export declare module CalculatedColumnHelper {
    function GetColumnListFromExpression(expression: string): string[];
    function CleanExpressionColumnNames(expression: string, columns: IColumn[]): string;
    function GetExpressionString(expression: string, columns: IColumn[]): string;
}
