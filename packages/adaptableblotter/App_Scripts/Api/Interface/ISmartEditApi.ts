import { SmartEditState } from "../../Redux/ActionsReducers/Interface/IState";

export interface ISmartEditApi {
  GetState(): SmartEditState;
   SetMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void;
  GetMathOperation(): string;
  SetValue(smartEditValue: number): void;
  GetValue(): number;
}
