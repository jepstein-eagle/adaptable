import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { ICalculatedColumnStrategy } from './Interface/ICalculatedColumnStrategy';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class CalculatedColumnStrategy extends AdaptableStrategyBase
  implements ICalculatedColumnStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.CalculatedColumnStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.CalculatedColumnStrategyName,
      ComponentName: ScreenPopups.CalculatedColumnPopup,
      Icon: StrategyConstants.CalculatedColumnGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter)) {
      if (
        this.blotter.api.calculatedColumnApi
          .getAllCalculatedColumn()
          .find(cc => cc.ColumnId == column.ColumnId)
      ) {
        let popupParam: StrategyParams = {
          columnId: column.ColumnId,
          action: 'Edit',
          source: 'ColumnMenu',
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
