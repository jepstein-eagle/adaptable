import { IColumn } from "../Interface/IColumn";
export declare module CalculatedColumnHelper {
    function getColumnListFromExpression(expression: string): string[];
    function cleanExpressionColumnNames(expression: string, columns: IColumn[]): string;
    function getExpressionString(expression: string, columns: IColumn[]): string;
}
