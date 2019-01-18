export interface ICalculatedColumnExpressionService {
    IsExpressionValid(expression: string): {
        IsValid: Boolean;
        ErrorMsg?: string;
    };
    ComputeExpressionValue(expression: string, record: any): any;
    getColumnListFromExpression(expression: string): string[];
    Test(expression: string, record: any): any;
}
