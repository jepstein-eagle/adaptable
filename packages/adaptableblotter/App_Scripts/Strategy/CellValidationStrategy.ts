import { ICellValidationStrategy } from './Interface/ICellValidationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableBlotterColumn } from '../Utilities/Interface/AdaptableBlotterColumn';
import { AdaptableBlotterMenuItem } from '../PredefinedConfig/Common/AdaptableBlotterMenuItem';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class CellValidationStrategy extends AdaptableStrategyBase
  implements ICellValidationStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.CellValidationStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.CellValidationStrategyName,
      ComponentName: ScreenPopups.CellValidationPopup,
      Icon: StrategyConstants.CellValidationGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableBlotterColumn): AdaptableBlotterMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter, 'editable')) {
      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
        action: 'New',
        source: 'ColumnMenu',
      };
      return this.createColumnMenuItemShowPopup(
        'Create Cell Validation Rule',
        ScreenPopups.CellValidationPopup,
        StrategyConstants.CellValidationGlyph,
        popupParam
      );
    }
  }
}
