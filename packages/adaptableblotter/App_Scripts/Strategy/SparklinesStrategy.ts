import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ISparklinesStrategy } from './Interface/ISparklinesStrategy';

import { IColumn } from '../Utilities/Interface/IColumn';
import {
  AdaptableBlotterMenuItem,
  ContextMenuInfo,
  MenuItemShowPopup,
} from '../Utilities/MenuItem';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { DataType } from '../PredefinedConfig/Common/Enums';

export class SparklinesStrategy extends AdaptableStrategyBase implements ISparklinesStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.SparklinesStrategyId, blotter);
  }

  public addColumnMenuItem(column: IColumn): AdaptableBlotterMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter, 'numeric')) {
      let popUpParams: StrategyParams = {
        columnId: column.ColumnId,
      };
      return this.createColumnMenuItemShowPopup(
        'See as Sparkline',
        ScreenPopups.ViewAsSparklinesPopup,
        StrategyConstants.SparklinesGlyph,
        popUpParams
      );
    }
  }

  public addContextMenuItem(
    contextMenuInfo: ContextMenuInfo
  ): AdaptableBlotterMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup | undefined = undefined;
    if (
      contextMenuInfo.column &&
      contextMenuInfo.isSelectedCell &&
      contextMenuInfo.column.DataType == DataType.Number &&
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
        Label: 'See as Sparkline',
        ComponentName: ScreenPopups.ViewAsSparklinesPopup,
        GlyphIcon: StrategyConstants.SparklinesGlyph,
        PopupParams: popUpParams,
      });
    }
    return menuItemShowPopup;
  }
}
