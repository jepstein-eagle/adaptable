import { IGridInfoStrategy } from './Interface/IGridInfoStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class GridInfoStrategy extends AdaptableStrategyBase implements IGridInfoStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.GridInfoStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.GridInfoStrategyFriendlyName,
        ComponentName: ScreenPopups.GridInfoPopup,
        Icon: StrategyConstants.GridInfoGlyph,
      });
    }
  }
}
