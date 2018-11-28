import { ICalculatedColumnExpressionService } from "./Interface/ICalculatedColumnExpressionService";
import { IAdaptableBlotter } from "../../Core/Interface/IAdaptableBlotter";
export declare class CalculatedColumnExpressionService implements ICalculatedColumnExpressionService {
    private blotter;
    private colFunctionValue;
    constructor(blotter: IAdaptableBlotter, colFunctionValue: (columnId: string, record: any) => any);
    IsExpressionValid(expression: string): {
        IsValid: Boolean;
        ErrorMsg?: string;
    };
    ComputeExpressionValue(expression: string, record: any): any;
    getColumnListFromExpression(expression: string): string[];
    Test(expression: string, record: any): any;
}
