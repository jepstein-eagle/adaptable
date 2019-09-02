import { IColumnFilterStrategy } from './Interface/IColumnFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import * as ColumnFilterRedux from '../Redux/ActionsReducers/ColumnFilterRedux';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IColumn } from '../Utilities/Interface/IColumn';
import { AdaptableBlotterMenuItem } from '../Utilities/Interface/AdaptableBlotterMenu';

export class ColumnFilterStrategy extends AdaptableStrategyBase implements IColumnFilterStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ColumnFilterStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ColumnFilterStrategyName,
      ComponentName: ScreenPopups.ColumnFilterPopup,
      GlyphIcon: StrategyConstants.ColumnFilterGlyph,
    });
  }

  public addColumnMenuItem(column: IColumn): AdaptableBlotterMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter, 'columnfilter')) {
      let existingColumnFilter = this.blotter.api.columnFilterApi
        .getAllColumnFilter()
        .find(x => x.ColumnId == column.ColumnId);
      if (existingColumnFilter) {
        return this.createColumnMenuItemReduxAction(
          'Clear Column Filter',
          StrategyConstants.ColumnFilterGlyph,
          ColumnFilterRedux.ColumnFilterClear(existingColumnFilter)
        );
      }
    }
  }
}
