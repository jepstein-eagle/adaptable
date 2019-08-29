import { ICellValidationStrategy } from './Interface/ICellValidationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IColumn } from '../Utilities/Interface/IColumn';
import { AdaptableBlotterMenuItem } from '../Utilities/Interface/AdaptableBlotterMenu';
import { MenuItemShowPopup } from '../Utilities/MenuItem';
import { ContextMenuInfo } from '../agGrid/agGridHelper';

export class CellValidationStrategy extends AdaptableStrategyBase
  implements ICellValidationStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.CellValidationStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.CellValidationStrategyName,
      ScreenPopups.CellValidationPopup,
      StrategyConstants.CellValidationGlyph
    );
  }

  public addColumnMenuItem(column: IColumn): void {
    if (this.canCreateColumnMenuItem(column, this.blotter)) {
      this.createColumnMenuItemShowPopup(
        'Create Cell Validation Rule',
        ScreenPopups.CellValidationPopup,
        StrategyConstants.CellValidationGlyph,
        'New|' + column.ColumnId
      );
    }
  }

  public addContextMenuItem(
    column: IColumn,
    contextMenuInfo: ContextMenuInfo
  ): AdaptableBlotterMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup = new MenuItemShowPopup(
      'Cell Validaton stuff',
      this.Id,
      ScreenPopups.CellValidationPopup,
      StrategyConstants.CellValidationGlyph,
      this.isVisibleStrategy(),
      null
    );
    return menuItemShowPopup;
  }
}
