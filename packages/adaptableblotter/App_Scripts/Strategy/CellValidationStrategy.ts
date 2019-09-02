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

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup(
      StrategyConstants.CellValidationStrategyName,
      ScreenPopups.CellValidationPopup,
      StrategyConstants.CellValidationGlyph
    );
  }

  public addColumnMenuItem(column: IColumn): AdaptableBlotterMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter)) {
      return this.createColumnMenuItemShowPopup(
        'Create Cell Validation Rule',
        ScreenPopups.CellValidationPopup,
        StrategyConstants.CellValidationGlyph,
        'New|' + column.ColumnId
      );
    }
  }
}
