import { IColumnCategoryStrategy } from './Interface/IColumnCategoryStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ColumnCategoryState } from '../Redux/ActionsReducers/Interface/IState';
import { StateChangedTrigger } from '../Utilities/Enums';

export class ColumnCategoryStrategy extends AdaptableStrategyBase
  implements IColumnCategoryStrategy {
  public CurrentColumnCategory: string;
  protected ColumnCategoryState: ColumnCategoryState;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ColumnCategoryStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.ColumnCategoryStrategyName,
      ScreenPopups.ColumnCategoryPopup,
      StrategyConstants.ColumnCategoryGlyph
    );
  }

  protected InitState() {
    if (this.ColumnCategoryState != this.blotter.api.columnCategoryApi.getColumnCategoryState()) {
      this.ColumnCategoryState = this.blotter.api.columnCategoryApi.getColumnCategoryState();

      if (this.blotter.isInitialised) {
        this.publishStateChanged(StateChangedTrigger.ColumnCategory, this.ColumnCategoryState);
      }
    }
  }
}
