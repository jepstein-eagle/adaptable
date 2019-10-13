import { IDataManagementStrategy } from './Interface/IDataManagementStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { BlotterHelper } from '../Utilities/Helpers/BlotterHelper';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';

export class DataManagementStrategy extends AdaptableStrategyBase
  implements IDataManagementStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.DataManagementStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    if ('production' == process.env.NODE_ENV && !BlotterHelper.isDemoSite()) {
      return undefined;
    }
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.DataManagementStrategyName,
      ComponentName: ScreenPopups.DataManagementPopup,
      GlyphIcon: StrategyConstants.DataManagementGlyph,
    });
  }
}
