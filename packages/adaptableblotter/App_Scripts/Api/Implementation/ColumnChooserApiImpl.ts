import { ApiBase } from './ApiBase';
import { ColumnChooserAPI } from '../ColumnChooserAPI';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class ColumnChooserApiImpl extends ApiBase implements ColumnChooserAPI {
  public showColumnChooserPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.ColumnChooserStrategyId,
      ScreenPopups.ColumnChooserPopup
    );
  }
}
