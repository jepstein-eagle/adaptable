import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { IColumnInfoStrategy } from './Interface/IColumnInfoStrategy';
import { AdaptableBlotterColumn } from '../Utilities/Interface/AdaptableBlotterColumn';
import {
  AdaptableBlotterMenuItem,
  ContextMenuInfo,
  MenuItemShowPopup,
} from '../Utilities/MenuItem';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { DataType } from '../PredefinedConfig/Common/Enums';

export class ColumnInfoStrategy extends AdaptableStrategyBase implements IColumnInfoStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ColumnInfoStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ColumnInfoStrategyName,
      ComponentName: ScreenPopups.ColumnInfoPopup,
      GlyphIcon: StrategyConstants.ColumnInfoGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableBlotterColumn): AdaptableBlotterMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter)) {
      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
      };
      return this.createColumnMenuItemShowPopup(
        StrategyConstants.ColumnInfoStrategyName,
        ScreenPopups.ColumnInfoPopup,
        StrategyConstants.ColumnInfoGlyph,
        popupParam
      );
    }
  }

  public addContextMenuItem(
    contextMenuInfo: ContextMenuInfo
  ): AdaptableBlotterMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup = undefined;
    if (this.canCreateColumnMenuItem(contextMenuInfo.column, this.blotter)) {
      let popupParam: StrategyParams = {
        columnId: contextMenuInfo.column.ColumnId,
      };
      if (contextMenuInfo.column) {
        menuItemShowPopup = this.createMainMenuItemShowPopup({
          Label: StrategyConstants.ColumnInfoStrategyName,
          ComponentName: ScreenPopups.ColumnInfoPopup,
          GlyphIcon: StrategyConstants.ColumnInfoGlyph,
          PopupParams: popupParam,
        });
      }
    }
    return menuItemShowPopup;
  }
}
