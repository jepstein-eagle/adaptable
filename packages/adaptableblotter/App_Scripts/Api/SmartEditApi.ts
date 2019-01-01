import * as SmartEditRedux from '../Redux/ActionsReducers/SmartEditRedux'
import { ApiBase } from "./ApiBase";
import { MathOperation } from '../Utilities/Enums';

export interface ISmartEditApi {


  EditMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void
  GetMathOperation(): string
  EditValue(smartEditValue: number): void
  GetValue(): number
}


export class SmartEditApi extends ApiBase implements ISmartEditApi {

  // SmartEdit api methods
  public EditMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void {
    this.dispatchAction(SmartEditRedux.SmartEditChangeOperation(mathOperation as MathOperation))
  }

  public GetMathOperation(): string {
    return this.getState().SmartEdit.MathOperation;
  }

  public EditValue(smartEditValue: number): void {
    this.dispatchAction(SmartEditRedux.SmartEditChangeValue(smartEditValue))
  }

  public GetValue(): number {
    return this.getState().SmartEdit.SmartEditValue;
  }

}