import { IGridInfoStrategy } from './Interface/IGridInfoStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class GridInfoStrategy extends AdaptableStrategyBase implements IGridInfoStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.GridInfoStrategyId,
      StrategyConstants.GridInfoStrategyFriendlyName,
      StrategyConstants.GridInfoGlyph,
      ScreenPopups.GridInfoPopup,
      adaptable
    );
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('Full')) {
      return [
        this.createColumnMenuItemShowPopup(
          'Show ' + StrategyConstants.GridInfoStrategyFriendlyName,
          ScreenPopups.GridInfoPopup,
          StrategyConstants.GridInfoGlyph
        ),
      ];
    }
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let popUpParams: StrategyParams = {
      source: 'ContextMenu',
    };
    return this.createMainMenuItemShowPopup({
      Label: 'Show ' + StrategyConstants.GridInfoStrategyFriendlyName,
      ComponentName: ScreenPopups.GridInfoPopup,
      Icon: StrategyConstants.GridInfoGlyph,
      PopupParams: popUpParams,
    });
  }
}
