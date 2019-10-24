import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { BlotterHelper } from '../Utilities/Helpers/BlotterHelper';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';
import { IStateManagementStrategy } from './Interface/IStateManagementStrategy';

export class StateManagementStrategy extends AdaptableStrategyBase
  implements IStateManagementStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.StateManagementStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.StateManagementStrategyName,
      ComponentName: ScreenPopups.StateManagementPopup,
      GlyphIcon: StrategyConstants.StateManagementGlyph,
    });
  }
}
