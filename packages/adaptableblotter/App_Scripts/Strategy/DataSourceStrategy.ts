import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { IDataSourceStrategy } from './Interface/IDataSourceStrategy';
import { AdaptableBlotterMenuItem } from '../PredefinedConfig/Common/Menu';

export class DataSourceStrategy extends AdaptableStrategyBase implements IDataSourceStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.DataSourceStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.DataSourceStrategyName,
      ComponentName: ScreenPopups.DataSourcePopup,
      Icon: StrategyConstants.DataSourceGlyph,
    });
  }
}
