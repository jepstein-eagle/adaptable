import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { IPieChartStrategy } from './Interface/IPieChartStrategy';
import { MenuItemShowPopup } from '../Utilities/MenuItem';
import { AdaptableBlotterMenuItem, ContextMenuInfo } from '../PredefinedConfig/Common/Menu';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableBlotterColumn } from '../PredefinedConfig/Common/AdaptableBlotterColumn';

export class PieChartStrategy extends AdaptableStrategyBase implements IPieChartStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.PieChartStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.PieChartStrategyName,
      ComponentName: ScreenPopups.PieChartPopup,
      Icon: StrategyConstants.PieChartGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableBlotterColumn): AdaptableBlotterMenuItem | undefined {
    if (
      this.canCreateColumnMenuItem(column, this.blotter) &&
      column.DataType !== DataType.NumberArray
    ) {
      let popUpParams: StrategyParams = {
        columnId: column.ColumnId,
        source: 'ColumnMenu',
      };

      return this.createColumnMenuItemShowPopup(
        'View as Pie Chart',
        ScreenPopups.PieChartPopup,
        StrategyConstants.PieChartGlyph,
        popUpParams
      );
    }
  }

  // Add a context menu item - ONLY if the cell clicked one which is part of the current cell selection
  // and if the cell selection is a single column
  // not that we pass the primary kev values in the Strategy params
  public addContextMenuItem(
    contextMenuInfo: ContextMenuInfo
  ): AdaptableBlotterMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup | undefined = undefined;
    if (
      contextMenuInfo.column &&
      contextMenuInfo.isSelectedCell &&
      contextMenuInfo.isSingleSelectedColumn
    ) {
      let pkValues: any[] = this.blotter.api.gridApi.getSelectedCellInfo().GridCells.map(gc => {
        return gc.primaryKeyValue;
      });
      let popUpParams: StrategyParams = {
        columnId: contextMenuInfo.column.ColumnId,
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
