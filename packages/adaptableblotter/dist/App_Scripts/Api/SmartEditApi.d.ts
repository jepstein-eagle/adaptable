import { ApiBase } from "./ApiBase";
import { ISmartEditApi } from './Interface/ISmartEditApi';
import { SmartEditState } from '../Redux/ActionsReducers/Interface/IState';
export declare class SmartEditApi extends ApiBase implements ISmartEditApi {
    GetState(): SmartEditState;
    SetMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void;
    GetMathOperation(): string;
    SetValue(smartEditValue: number): void;
    GetValue(): number;
}
