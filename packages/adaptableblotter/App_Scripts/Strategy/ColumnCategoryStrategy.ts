import { IColumnCategoryStrategy } from './Interface/IColumnCategoryStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class ColumnCategoryStrategy extends AdaptableStrategyBase
  implements IColumnCategoryStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ColumnCategoryStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ColumnCategoryStrategyName,
      ComponentName: ScreenPopups.ColumnCategoryPopup,
      Icon: StrategyConstants.ColumnCategoryGlyph,
    });
  }
}
