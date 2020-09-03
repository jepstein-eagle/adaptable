import { AdaptableStrategyBase } from '@adaptabletools/adaptable/src/Strategy/AdaptableStrategyBase';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups';
import { IAdaptable } from '@adaptabletools/adaptable/src/AdaptableInterfaces/IAdaptable';
import { IPieChartStrategy } from './IPieChartStrategy';
import { MenuItemShowPopup } from '@adaptabletools/adaptable/src/Utilities/MenuItem';
import {
  AdaptableMenuItem,
  MenuInfo,
} from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Menu';
import { DataType } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums';
import { StrategyParams } from '@adaptabletools/adaptable/src/View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';

export class PieChartStrategy extends AdaptableStrategyBase implements IPieChartStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.PieChartStrategyId,
      StrategyConstants.PieChartStrategyFriendlyName,
      StrategyConstants.PieChartGlyph,
      ScreenPopups.PieChartPopup,
      adaptable
    );
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('ReadOnly') && column.DataType !== DataType.NumberArray) {
      let popUpParams: StrategyParams = {
        column: column,
        source: 'ColumnMenu',
      };

      return [
        this.createColumnMenuItemShowPopup(
          'View as Pie Chart',
          ScreenPopups.PieChartPopup,
          StrategyConstants.PieChartGlyph,
          popUpParams
        ),
      ];
    }
  }

  // Add a context menu item - ONLY if the cell clicked one which is part of the current cell selection
  // and if the cell selection is a single column
  // not that we pass the primary kev values in the Strategy params
  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup | undefined = undefined;
    if (menuInfo.Column && menuInfo.IsSelectedCell && menuInfo.IsSingleSelectedColumn) {
      let pkValues: any[] = this.adaptable.api.gridApi.getSelectedCellInfo().GridCells.map(gc => {
        return gc.primaryKeyValue;
      });
      let popUpParams: StrategyParams = {
        column: menuInfo.Column,
        primaryKeyValues: pkValues,
        source: 'ContextMenu',
      };
      menuItemShowPopup = this.createMainMenuItemShowPopup({
        Label: 'View as Pie Chart',
        ComponentName: ScreenPopups.PieChartPopup,
        Icon: StrategyConstants.PieChartGlyph,
        PopupParams: popUpParams,
      });
    }
    return menuItemShowPopup;
  }
}
