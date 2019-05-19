import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ICalculatedColumnStrategy } from './Interface/ICalculatedColumnStrategy';
import { IColumn } from '../Utilities/Interface/IColumn';

export class CalculatedColumnStrategy extends AdaptableStrategyBase
  implements ICalculatedColumnStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.CalculatedColumnStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.CalculatedColumnStrategyName,
      ScreenPopups.CalculatedColumnPopup,
      StrategyConstants.CalculatedColumnGlyph
    );
  }

  public addContextMenuItem(column: IColumn): void {
    if (this.canCreateContextMenuItem(column, this.blotter)) {
      if (
        this.blotter.api.calculatedColumnApi
          .getAllCalculatedColumn()
          .find(cc => cc.ColumnId == column.ColumnId)
      ) {
        this.createContextMenuItemShowPopup(
          'Edit ' + StrategyConstants.CalculatedColumnStrategyName,
          ScreenPopups.CalculatedColumnPopup,
          StrategyConstants.CalculatedColumnGlyph,
          'Edit|' + column.ColumnId
        );
      }
    }
  }
}
