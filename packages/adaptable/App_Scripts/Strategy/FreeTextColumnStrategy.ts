import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IFreeTextColumnStrategy } from './Interface/IFreeTextColumnStrategy';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class FreeTextColumnStrategy extends AdaptableStrategyBase
  implements IFreeTextColumnStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.FreeTextColumnStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.FreeTextColumnStrategyFriendlyName,
      ComponentName: ScreenPopups.FreeTextColumnPopup,
      Icon: StrategyConstants.FreeTextColumnGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.adaptable)) {
      if (
        this.adaptable.api.freeTextColumnApi
          .getAllFreeTextColumn()
          .find(ftc => ftc.ColumnId == column.ColumnId)
      ) {
        let popupParam: StrategyParams = {
          columnId: column.ColumnId,
          action: 'Edit',
          source: 'ColumnMenu',
        };
        return this.createColumnMenuItemShowPopup(
          'Edit ' + StrategyConstants.FreeTextColumnStrategyFriendlyName,
          ScreenPopups.FreeTextColumnPopup,
          StrategyConstants.FreeTextColumnGlyph,
          popupParam
        );
      }
    }
  }
}
