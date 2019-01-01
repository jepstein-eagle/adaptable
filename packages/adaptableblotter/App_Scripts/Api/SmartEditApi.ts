import * as SmartEditRedux from '../Redux/ActionsReducers/SmartEditRedux'
import { ApiBase } from "./ApiBase";
import { Visibility, MathOperation } from '../Utilities/Enums';

export interface ISmartEditApi {
    

  // SmartEdit api methods
  smartEditSetMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void
  smartEditGetMathOperation(): string
  smartEditSetValue(smartEditValue: number): void
  smartEditGetValue(): number

}



export class SmartEditApi extends ApiBase implements ISmartEditApi {

    // SmartEdit api methods
    public smartEditSetMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void {
      this.dispatchAction(SmartEditRedux.SmartEditChangeOperation(mathOperation as MathOperation))
    }
  
    public smartEditGetMathOperation(): string {
      return this.getState().SmartEdit.MathOperation;
    }
  
    public smartEditSetValue(smartEditValue: number): void {
      this.dispatchAction(SmartEditRedux.SmartEditChangeValue(smartEditValue))
    }
  
    public smartEditGetValue(): number {
      return this.getState().SmartEdit.SmartEditValue;
    }

}