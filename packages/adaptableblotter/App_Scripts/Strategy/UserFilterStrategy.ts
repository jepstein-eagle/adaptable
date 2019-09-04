import { IUserFilterStrategy } from './Interface/IUserFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IColumn } from '../Utilities/Interface/IColumn';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class UserFilterStrategy extends AdaptableStrategyBase implements IUserFilterStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.UserFilterStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.UserFilterStrategyName,
      ComponentName: ScreenPopups.UserFilterPopup,
      GlyphIcon: StrategyConstants.UserFilterGlyph,
    });
  }

  public addColumnMenuItem(column: IColumn): AdaptableBlotterMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter, 'columnfilter')) {
      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
        action: 'New',
      };

      return this.createColumnMenuItemShowPopup(
        'Create User Filter',
        ScreenPopups.UserFilterPopup,
        StrategyConstants.UserFilterGlyph,
        popupParam
      );
    }
  }
}
