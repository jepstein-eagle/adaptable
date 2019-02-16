import { IColumn } from "../../Interface/IColumn";

export interface ICalculatedColumnExpressionService {
    IsExpressionValid(expression: string, columns: IColumn[]): { IsValid: Boolean, ErrorMsg?: string }
    ComputeExpressionValue(expression: string, record: any): any
    GetColumnListFromExpression(expression: string) : string[]
    CleanExpressionColumnNames(expression: string, columns: IColumn[]) : string
}