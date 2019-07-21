import { IUserFilterStrategy } from './Interface/IUserFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IColumn } from '../Utilities/Interface/IColumn';

export class UserFilterStrategy extends AdaptableStrategyBase implements IUserFilterStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.UserFilterStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.UserFilterStrategyName,
      ScreenPopups.UserFilterPopup,
      StrategyConstants.UserFilterGlyph
    );
  }

  public addColumnMenuItem(column: IColumn): void {
    if (this.canCreateColumnMenuItem(column, this.blotter, 'columnfilter')) {
      this.createColumnMenuItemShowPopup(
        'Create User Filter',
        ScreenPopups.UserFilterPopup,
        StrategyConstants.UserFilterGlyph,
        'New|' + column.ColumnId
      );
    }
  }
}
