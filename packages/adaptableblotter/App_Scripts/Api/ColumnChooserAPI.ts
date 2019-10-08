import { ApiBase } from './ApiBase';
import { IColumnChooserAPI } from './Interface/IColumnChooserAPI';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';

export class ColumnChooserAPI extends ApiBase implements IColumnChooserAPI {
  public showColumnChooserPopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.ColumnChooserStrategyId,
      ScreenPopups.ColumnChooserPopup,
      null
    );
  }
}
