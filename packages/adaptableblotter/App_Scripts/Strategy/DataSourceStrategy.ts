import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IDataSourceStrategy } from './Interface/IDataSourceStrategy';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';

export class DataSourceStrategy extends AdaptableStrategyBase implements IDataSourceStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.DataSourceStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.DataSourceStrategyName,
      ComponentName: ScreenPopups.DataSourcePopup,
      GlyphIcon: StrategyConstants.DataSourceGlyph,
    });
  }
}
