import * as SmartEditRedux from '../Redux/ActionsReducers/SmartEditRedux';
import { ApiBase } from './ApiBase';
import { MathOperation } from '../PredefinedConfig/Common Objects/Enums';
import { ISmartEditApi } from './Interface/ISmartEditApi';
import { SmartEditState } from '../PredefinedConfig/IUserState Interfaces/SmartEditState';

export class SmartEditApi extends ApiBase implements ISmartEditApi {
  public getSmartEditState(): SmartEditState {
    return this.getBlotterState().SmartEdit;
  }

  public setSmartEditMathOperation(
    mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'
  ): void {
    this.dispatchAction(SmartEditRedux.SmartEditChangeOperation(mathOperation as MathOperation));
  }

  public getSmartEditMathOperation(): string {
    return this.getBlotterState().SmartEdit.MathOperation;
  }

  public setSmartEditValue(smartEditValue: number): void {
    this.dispatchAction(SmartEditRedux.SmartEditChangeValue(smartEditValue));
  }

  public getSmartEditValue(): number {
    return this.getBlotterState().SmartEdit.SmartEditValue;
  }
}
