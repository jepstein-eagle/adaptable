import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../BlotterInterfaces/IAdaptable';
import { IDataSourceStrategy } from './Interface/IDataSourceStrategy';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class DataSourceStrategy extends AdaptableStrategyBase implements IDataSourceStrategy {
  constructor(blotter: IAdaptable) {
    super(StrategyConstants.DataSourceStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.DataSourceStrategyFriendlyName,
      ComponentName: ScreenPopups.DataSourcePopup,
      Icon: StrategyConstants.DataSourceGlyph,
    });
  }
}
