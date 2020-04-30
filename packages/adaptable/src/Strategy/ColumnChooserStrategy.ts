import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IColumnChooserStrategy } from './Interface/IColumnChooserStrategy';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';

export class ColumnChooserStrategy extends AdaptableStrategyBase implements IColumnChooserStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.ColumnChooserStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('Full')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.ColumnChooserStrategyFriendlyName,
        ComponentName: ScreenPopups.ColumnChooserPopup,
        Icon: StrategyConstants.ColumnChooserGlyph,
      });
    }
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('Full')) {
      return [
        this.createColumnMenuItemShowPopup(
          'Show ' + StrategyConstants.ColumnChooserStrategyFriendlyName,
          ScreenPopups.ColumnChooserPopup,
          StrategyConstants.ColumnChooserGlyph
        ),
      ];
    }
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let popUpParams: StrategyParams = {
      source: 'ContextMenu',
    };
    if (this.canCreateMenuItem('Full')) {
      return this.createMainMenuItemShowPopup({
        Label: 'Show ' + StrategyConstants.ColumnChooserStrategyFriendlyName,
        ComponentName: ScreenPopups.ColumnChooserPopup,
        Icon: StrategyConstants.ColumnChooserGlyph,
        PopupParams: popUpParams,
      });
    }
  }
}
