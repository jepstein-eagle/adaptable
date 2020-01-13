import { AdaptableStrategyBase } from '@adaptabletools/adaptable/src/Strategy/AdaptableStrategyBase';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups';
import { IAdaptable } from '@adaptabletools/adaptable/src/AdaptableInterfaces/IAdaptable';
import { ISparklineStrategy } from './ISparklineStrategy';

import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';
import { MenuItemShowPopup } from '@adaptabletools/adaptable/src/Utilities/MenuItem';
import {
  AdaptableMenuItem,
  MenuInfo,
} from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Menu';
import { StrategyParams } from '@adaptabletools/adaptable/src/View/Components/SharedProps/StrategyViewPopupProps';
import { DataType } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums';

export class SparklineStrategy extends AdaptableStrategyBase implements ISparklineStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.SparklineStrategyId, adaptable);
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.adaptable, 'numeric')) {
      let popUpParams: StrategyParams = {
        columnId: column.ColumnId,
        source: 'ColumnMenu',
      };
      return this.createColumnMenuItemShowPopup(
        'View as Sparkline',
        ScreenPopups.ViewAsSparklinesPopup,
        StrategyConstants.SparklinesGlyph,
        popUpParams
      );
    }
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup | undefined = undefined;
    if (
      menuInfo.Column &&
      menuInfo.IsSelectedCell &&
      menuInfo.Column.DataType == DataType.Number &&
      menuInfo.IsSingleSelectedColumn
    ) {
      let pkValues: any[] = this.adaptable.api.gridApi.getSelectedCellInfo().GridCells.map(gc => {
        return gc.primaryKeyValue;
      });
      let popUpParams: StrategyParams = {
        columnId: menuInfo.Column.ColumnId,
        primaryKeyValues: pkValues,
        source: 'ContextMenu',
      };

      menuItemShowPopup = this.createMainMenuItemShowPopup({
        Label: 'View as Sparkline',
        ComponentName: ScreenPopups.ViewAsSparklinesPopup,
        Icon: StrategyConstants.SparklinesGlyph,
        PopupParams: popUpParams,
      });
    }
    return menuItemShowPopup;
  }
}
