import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IDataSourceStrategy } from './Interface/IDataSourceStrategy';

export class DataSourceStrategy extends AdaptableStrategyBase implements IDataSourceStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.DataSourceStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.DataSourceStrategyName,
      ScreenPopups.DataSourcePopup,
      StrategyConstants.DataSourceGlyph
    );
  }
}
