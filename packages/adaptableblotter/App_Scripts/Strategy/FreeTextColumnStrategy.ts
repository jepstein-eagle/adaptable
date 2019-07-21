import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IFreeTextColumnStrategy } from './Interface/IFreeTextColumnStrategy';
import { IColumn } from '../Utilities/Interface/IColumn';

export class FreeTextColumnStrategy extends AdaptableStrategyBase
  implements IFreeTextColumnStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.FreeTextColumnStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.FreeTextColumnStrategyName,
      ScreenPopups.FreeTextColumnPopup,
      StrategyConstants.FreeTextColumnGlyph
    );
  }

  public addColumnMenuItem(column: IColumn): void {
    if (this.canCreateColumnMenuItem(column, this.blotter)) {
      if (
        this.blotter.api.freeTextColumnApi
          .getAllFreeTextColumn()
          .find(ftc => ftc.ColumnId == column.ColumnId)
      ) {
        this.createColumnMenuItemShowPopup(
          'Edit ' + StrategyConstants.FreeTextColumnStrategyName,
          ScreenPopups.FreeTextColumnPopup,
          StrategyConstants.FreeTextColumnGlyph,
          'Edit|' + column.ColumnId
        );
      }
    }
  }
}
