import { ApiBase } from "./ApiBase";
import { ISmartEditApi } from './Interface/ISmartEditApi';
import { SmartEditState } from '../Redux/ActionsReducers/Interface/IState';
export declare class SmartEditApi extends ApiBase implements ISmartEditApi {
    getSmartEditState(): SmartEditState;
    setSmartEditMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void;
    getSmartEditMathOperation(): string;
    setSmartEditValue(smartEditValue: number): void;
    getSmartEditValue(): number;
}
