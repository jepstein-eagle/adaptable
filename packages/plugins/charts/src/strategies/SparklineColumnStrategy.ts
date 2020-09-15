import { AdaptableStrategyBase } from '@adaptabletools/adaptable/src/Strategy/AdaptableStrategyBase';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups';
import { IAdaptable } from '@adaptabletools/adaptable/src/AdaptableInterfaces/IAdaptable';
import { ISparklineColumnStrategy } from './ISparklineColumnStrategy';

import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';
import { SparklineColumnState } from '@adaptabletools/adaptable/src/PredefinedConfig/SparklineColumnState';
import { MenuItemShowPopup } from '@adaptabletools/adaptable/src/Utilities/MenuItem';
import {
  AdaptableMenuItem,
  MenuInfo,
} from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Menu';
import { StrategyParams } from '@adaptabletools/adaptable/src/View/Components/SharedProps/StrategyViewPopupProps';

export class SparklineColumnStrategy extends AdaptableStrategyBase
  implements ISparklineColumnStrategy {
  protected SparklinesState: SparklineColumnState;

  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.SparklineColumnStrategyId,
      StrategyConstants.SparklineColumnStrategyFriendlyName,
      StrategyConstants.SparklineColumnGlyph,
      ScreenPopups.SparklineColumnPopup,
      adaptable
    );
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('Full') && column.IsSparkline) {
      let popUpParams: StrategyParams = {
        column: column,
        source: 'ColumnMenu',
      };
      return [
        this.createColumnMenuItemShowPopup(
          'Edit Sparkline Column',
          ScreenPopups.SparklineColumnPopup,
          StrategyConstants.SparklineColumnGlyph,
          popUpParams
        ),
      ];
    }
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup | undefined = undefined;
    if (menuInfo.Column && menuInfo.Column.IsSparkline && this.canCreateMenuItem('Full')) {
      let popUpParams: StrategyParams = {
        source: 'ContextMenu',
      };
      menuItemShowPopup = this.createMainMenuItemShowPopup({
        Label: 'Edit Sparkline Column',
        ComponentName: ScreenPopups.SparklineColumnPopup,
        Icon: StrategyConstants.SparklineColumnGlyph,
        PopupParams: popUpParams,
      });
    }
    return menuItemShowPopup;
  }
}
