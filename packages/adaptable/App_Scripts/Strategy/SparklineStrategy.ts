import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { ISparklineStrategy } from './Interface/ISparklineStrategy';

import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { MenuItemShowPopup } from '../Utilities/MenuItem';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { DataType } from '../PredefinedConfig/Common/Enums';

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
      menuInfo.column &&
      menuInfo.isSelectedCell &&
      menuInfo.column.DataType == DataType.Number &&
      menuInfo.isSingleSelectedColumn
    ) {
      let pkValues: any[] = this.adaptable.api.gridApi.getSelectedCellInfo().GridCells.map(gc => {
        return gc.primaryKeyValue;
      });
      let popUpParams: StrategyParams = {
        columnId: menuInfo.column.ColumnId,
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
