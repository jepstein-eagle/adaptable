import { ApiBase } from './ApiBase';
import { ConditionalStyleApi } from '../ConditionalStyleApi';
import {
  ConditionalStyleState,
  ConditionalStyle,
} from '../../PredefinedConfig/ConditionalStyleState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class ConditionalStyleApiImpl extends ApiBase implements ConditionalStyleApi {
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
