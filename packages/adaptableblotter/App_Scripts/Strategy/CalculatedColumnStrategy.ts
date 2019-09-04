import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ICalculatedColumnStrategy } from './Interface/ICalculatedColumnStrategy';
import { IColumn } from '../Utilities/Interface/IColumn';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class CalculatedColumnStrategy extends AdaptableStrategyBase
  implements ICalculatedColumnStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.CalculatedColumnStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.CalculatedColumnStrategyName,
      ComponentName: ScreenPopups.CalculatedColumnPopup,
      GlyphIcon: StrategyConstants.CalculatedColumnGlyph,
    });
  }

  public addColumnMenuItem(column: IColumn): AdaptableBlotterMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter)) {
      if (
        this.blotter.api.calculatedColumnApi
          .getAllCalculatedColumn()
          .find(cc => cc.ColumnId == column.ColumnId)
      ) {
        let popupParam: StrategyParams = {
          columnId: column.ColumnId,
          action: 'Edit',
        };

        return this.createColumnMenuItemShowPopup(
          'Edit ' + StrategyConstants.CalculatedColumnStrategyName,
          ScreenPopups.CalculatedColumnPopup,
          StrategyConstants.CalculatedColumnGlyph,
          popupParam
        );
      }
    }
  }
}
