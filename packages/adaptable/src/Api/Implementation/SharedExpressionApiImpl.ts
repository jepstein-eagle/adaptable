import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { SharedExpressionApi } from '../SharedExpressionApi';
import {
  SharedExpressionState,
  SharedExpression,
} from '../../PredefinedConfig/SharedExpressionState';
import { ApiBase } from './ApiBase';

export class SharedExpressionApiImpl extends ApiBase implements SharedExpressionApi {
  public getSharedExpressionState(): SharedExpressionState {
    return this.getAdaptableState().SharedExpression;
  }

  public getAllSharedExpression(): SharedExpression[] {
    return this.getSharedExpressionState().SharedExpressions;
  }

  public showSharedExpressionPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.SharedExpressionStrategyId,
      ScreenPopups.SharedExpressionPopup
    );
  }
}
