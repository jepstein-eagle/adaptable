import { ICellValidationStrategy } from './Interface/ICellValidationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IColumn } from '../Utilities/Interface/IColumn';

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

  public addContextMenuItem(column: IColumn): void {
    if (this.canCreateContextMenuItem(column, this.blotter)) {
      this.createContextMenuItemShowPopup(
        'Create Cell Validation Rule',
        ScreenPopups.CellValidationPopup,
        StrategyConstants.CellValidationGlyph,
        'New|' + column.ColumnId
      );
    }
  }
}
