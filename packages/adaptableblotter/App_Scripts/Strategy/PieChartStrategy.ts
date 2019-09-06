import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IPieChartStrategy } from './Interface/IPieChartStrategy';
import {
  MenuItemShowPopup,
  AdaptableBlotterMenuItem,
  ContextMenuInfo,
} from '../Utilities/MenuItem';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { IColumn } from '../Utilities/Interface/IColumn';

export class PieChartStrategy extends AdaptableStrategyBase implements IPieChartStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.PieChartStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.PieChartStrategyName,
      ComponentName: ScreenPopups.PieChartPopup,
      GlyphIcon: StrategyConstants.PieChartGlyph,
    });
  }

  public addColumnMenuItem(column: IColumn): AdaptableBlotterMenuItem | undefined {
    if (
      this.canCreateColumnMenuItem(column, this.blotter) &&
      column.DataType !== DataType.NumberArray
    ) {
      let popUpParams: StrategyParams = {
        columnId: column.ColumnId,
      };

      return this.createColumnMenuItemShowPopup(
        'See as Pie Chart',
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
    let menuItemShowPopup: MenuItemShowPopup = undefined;
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
      };
      menuItemShowPopup = this.createMainMenuItemShowPopup({
        Label: StrategyConstants.PieChartStrategyName,
        ComponentName: ScreenPopups.PieChartPopup,
        GlyphIcon: StrategyConstants.PieChartGlyph,
        PopupParams: popUpParams,
      });
    }
    return menuItemShowPopup;
  }
}
