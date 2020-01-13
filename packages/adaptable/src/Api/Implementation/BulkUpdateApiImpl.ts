import { ApiBase } from './ApiBase';
import { BulkUpdateState } from '../../PredefinedConfig/BulkUpdateState';
import { BulkUpdateApi } from '../BulkUpdateApi';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class BulkUpdateApiImpl extends ApiBase implements BulkUpdateApi {
  public getBulkUpdateState(): BulkUpdateState {
    return this.getAdaptableState().BulkUpdate;
  }

  public getBulkUpdateValue(): string {
    return this.getBulkUpdateState().BulkUpdateValue;
  }

  public showBulkUpdatePopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.BulkUpdateStrategyId,
      ScreenPopups.BulkUpdatePopup
    );
  }
}
