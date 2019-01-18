import { ApiBase } from "./ApiBase";
import { ISmartEditApi } from './Interface/ISmartEditApi';
export declare class SmartEditApi extends ApiBase implements ISmartEditApi {
    SetMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void;
    GetMathOperation(): string;
    SetValue(smartEditValue: number): void;
    GetValue(): number;
}
