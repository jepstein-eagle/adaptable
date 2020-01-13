import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { ICalculatedColumnStrategy } from './Interface/ICalculatedColumnStrategy';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class CalculatedColumnStrategy extends AdaptableStrategyBase
  implements ICalculatedColumnStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.CalculatedColumnStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.CalculatedColumnStrategyFriendlyName,
      ComponentName: ScreenPopups.CalculatedColumnPopup,
      Icon: StrategyConstants.CalculatedColumnGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.adaptable)) {
      if (
        this.adaptable.api.calculatedColumnApi
          .getAllCalculatedColumn()
          .find(cc => cc.ColumnId == column.ColumnId)
      ) {
        let popupParam: StrategyParams = {
          columnId: column.ColumnId,
          action: 'Edit',
          source: 'ColumnMenu',
        };

        return this.createColumnMenuItemShowPopup(
          'Edit ' + StrategyConstants.CalculatedColumnStrategyFriendlyName,
          ScreenPopups.CalculatedColumnPopup,
          StrategyConstants.CalculatedColumnGlyph,
          popupParam
        );
      }
    }
  }
}
