import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IColumnInfoStrategy } from './Interface/IColumnInfoStrategy';
import { IColumn } from '../Utilities/Interface/IColumn';
import { AdaptableBlotterMenuItem } from '../Utilities/Interface/AdaptableBlotterMenu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

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

  public addColumnMenuItem(column: IColumn): AdaptableBlotterMenuItem | undefined {
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
}
