import { SmartEditState } from "../../Redux/ActionsReducers/Interface/IState";
export interface ISmartEditApi {
    getSmartEditState(): SmartEditState;
    setSmartEditMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void;
    getSmartEditMathOperation(): string;
    setSmartEditValue(smartEditValue: number): void;
    getSmartEditValue(): number;
}
