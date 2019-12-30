import { IColumnCategoryStrategy } from './Interface/IColumnCategoryStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../BlotterInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class ColumnCategoryStrategy extends AdaptableStrategyBase
  implements IColumnCategoryStrategy {
  constructor(blotter: IAdaptable) {
    super(StrategyConstants.ColumnCategoryStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ColumnCategoryStrategyFriendlyName,
      ComponentName: ScreenPopups.ColumnCategoryPopup,
      Icon: StrategyConstants.ColumnCategoryGlyph,
    });
  }
}
