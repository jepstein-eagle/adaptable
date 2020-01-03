import * as SmartEditRedux from '../../Redux/ActionsReducers/SmartEditRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { ApiBase } from './ApiBase';
import { MathOperation } from '../../PredefinedConfig/Common/Enums';
import { SmartEditApi } from '../SmartEditApi';
import { SmartEditState } from '../../PredefinedConfig/SmartEditState';

export class SmartEditApiImpl extends ApiBase implements SmartEditApi {
  public getSmartEditState(): SmartEditState {
    return this.getAdaptableState().SmartEdit;
  }

  public setSmartEditMathOperation(
    mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'
  ): void {
    this.dispatchAction(SmartEditRedux.SmartEditChangeOperation(mathOperation as MathOperation));
  }

  public getSmartEditMathOperation(): string {
    return this.getAdaptableState().SmartEdit.MathOperation;
  }

  public setSmartEditValue(smartEditValue: number): void {
    this.dispatchAction(SmartEditRedux.SmartEditChangeValue(smartEditValue));
  }

  public getSmartEditValue(): number {
    return this.getAdaptableState().SmartEdit.SmartEditValue;
  }

  public showSmartEditPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.SmartEditStrategyId,
      ScreenPopups.SmartEditPopup
    );
  }
}
