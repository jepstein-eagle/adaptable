import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IColumnInfoStrategy } from './Interface/IColumnInfoStrategy';
import { IColumn } from '../Utilities/Interface/IColumn';

export class ColumnInfoStrategy extends AdaptableStrategyBase implements IColumnInfoStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ColumnInfoStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.ColumnInfoStrategyName,
      ScreenPopups.ColumnInfoPopup,
      StrategyConstants.ColumnInfoGlyph
    );
  }

  public addColumnMenuItem(column: IColumn): void {
    if (this.canCreateColumnMenuItem(column, this.blotter)) {
      this.createColumnMenuItemShowPopup(
        StrategyConstants.ColumnInfoStrategyName,
        ScreenPopups.ColumnInfoPopup,
        StrategyConstants.ColumnInfoGlyph,
        column.ColumnId
      );
    }
  }
}
