import * as SmartEditRedux from '../Redux/ActionsReducers/SmartEditRedux'
import { ApiBase } from "./ApiBase";
import { MathOperation } from '../Utilities/Enums';
import { ISmartEditApi } from './Interface/ISmartEditApi';
import { SmartEditState } from '../Redux/ActionsReducers/Interface/IState';

export class SmartEditApi extends ApiBase implements ISmartEditApi {


  public GetState(): SmartEditState {
    return this.getBlotterState().SmartEdit;
  }

  public SetMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void {
    this.dispatchAction(SmartEditRedux.SmartEditChangeOperation(mathOperation as MathOperation))
  }

  public GetMathOperation(): string {
    return this.getBlotterState().SmartEdit.MathOperation;
  }

  public SetValue(smartEditValue: number): void {
    this.dispatchAction(SmartEditRedux.SmartEditChangeValue(smartEditValue))
  }

  public GetValue(): number {
    return this.getBlotterState().SmartEdit.SmartEditValue;
  }

}