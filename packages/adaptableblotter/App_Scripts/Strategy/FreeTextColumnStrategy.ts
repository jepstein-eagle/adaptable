import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IFreeTextColumnStrategy } from './Interface/IFreeTextColumnStrategy';
import { IColumn } from '../Utilities/Interface/IColumn';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class FreeTextColumnStrategy extends AdaptableStrategyBase
  implements IFreeTextColumnStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.FreeTextColumnStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.FreeTextColumnStrategyName,
      ComponentName: ScreenPopups.FreeTextColumnPopup,
      GlyphIcon: StrategyConstants.FreeTextColumnGlyph,
    });
  }

  public addColumnMenuItem(column: IColumn): AdaptableBlotterMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter)) {
      if (
        this.blotter.api.freeTextColumnApi
          .getAllFreeTextColumn()
          .find(ftc => ftc.ColumnId == column.ColumnId)
      ) {
        let popupParam: StrategyParams = {
          columnId: column.ColumnId,
          action: 'Edit',
        };
        return this.createColumnMenuItemShowPopup(
          'Edit ' + StrategyConstants.FreeTextColumnStrategyName,
          ScreenPopups.FreeTextColumnPopup,
          StrategyConstants.FreeTextColumnGlyph,
          popupParam
        );
      }
    }
  }
}
