export interface ICalculatedColumnExpressionService {
    IsExpressionValid(expression: string): {
        IsValid: Boolean;
        ErrorMsg?: string;
    };
    ComputeExpressionValue(expression: string, record: any): any;
}
