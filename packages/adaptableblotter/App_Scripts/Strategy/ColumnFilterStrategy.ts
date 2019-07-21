import { IColumnFilterStrategy } from './Interface/IColumnFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import * as ColumnFilterRedux from '../Redux/ActionsReducers/ColumnFilterRedux';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IColumn } from '../Utilities/Interface/IColumn';

export class ColumnFilterStrategy extends AdaptableStrategyBase implements IColumnFilterStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ColumnFilterStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.ColumnFilterStrategyName,
      ScreenPopups.ColumnFilterPopup,
      StrategyConstants.ColumnFilterGlyph
    );
  }

  public addColumnMenuItem(column: IColumn): void {
    if (this.canCreateColumnMenuItem(column, this.blotter, 'columnfilter')) {
      let existingColumnFilter = this.blotter.api.columnFilterApi
        .getAllColumnFilter()
        .find(x => x.ColumnId == column.ColumnId);
      if (existingColumnFilter) {
        this.createColumnMenuItemReduxAction(
          'Clear Column Filter',
          StrategyConstants.ColumnFilterGlyph,
          ColumnFilterRedux.ColumnFilterClear(existingColumnFilter)
        );
      }
    }
  }
}
