import { ApiBase } from './ApiBase';
import { BulkUpdateState } from '../../PredefinedConfig/RunTimeState/BulkUpdateState';
import { BulkUpdateApi } from '../BulkUpdateApi';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class BulkUpdateApiImpl extends ApiBase implements BulkUpdateApi {
  public getBulkUpdateState(): BulkUpdateState {
    return this.getBlotterState().BulkUpdate;
  }

  public getBulkUpdateValue(): string {
    return this.getBulkUpdateState().BulkUpdateValue;
  }

  public showBulkUpdatePopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.BulkUpdateStrategyId,
      ScreenPopups.BulkUpdatePopup
    );
  }
}
