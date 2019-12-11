import { IColumnCategoryStrategy } from './Interface/IColumnCategoryStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableBlotterMenuItem } from '../PredefinedConfig/Common/menu';

export class ColumnCategoryStrategy extends AdaptableStrategyBase
  implements IColumnCategoryStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ColumnCategoryStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ColumnCategoryStrategyName,
      ComponentName: ScreenPopups.ColumnCategoryPopup,
      Icon: StrategyConstants.ColumnCategoryGlyph,
    });
  }
}
