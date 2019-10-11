import { ApiBase } from './ApiBase';
import { IConditionalStyleApi } from './Interface/IConditionalStyleApi';
import {
  ConditionalStyleState,
  ConditionalStyle,
} from '../PredefinedConfig/RunTimeState/ConditionalStyleState';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';

export class ConditionalStyleApi extends ApiBase implements IConditionalStyleApi {
  public getConditionalStyleState(): ConditionalStyleState {
    return this.getBlotterState().ConditionalStyle;
  }

  public getAllConditionalStyle(): ConditionalStyle[] {
    return this.getConditionalStyleState().ConditionalStyles;
  }

  public showConditionalStylePopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.ConditionalStyleStrategyId,
      ScreenPopups.ConditionalStylePopup
    );
  }
}
