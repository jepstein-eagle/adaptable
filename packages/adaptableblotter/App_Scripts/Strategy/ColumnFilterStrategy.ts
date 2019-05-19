import { IColumnFilterStrategy } from './Interface/IColumnFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import * as ColumnFilterRedux from '../Redux/ActionsReducers/ColumnFilterRedux';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IColumnFilter } from '../Utilities/Interface/BlotterObjects/IColumnFilter';
import { SearchChangedTrigger } from '../Utilities/Enums';
import { IColumn } from '../Utilities/Interface/IColumn';

export class ColumnFilterStrategy extends AdaptableStrategyBase implements IColumnFilterStrategy {
  private columnFilterState: IColumnFilter[];

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

  public addContextMenuItem(column: IColumn): void {
    if (this.canCreateContextMenuItem(column, this.blotter, 'columnfilter')) {
      let existingColumnFilter = this.columnFilterState.find(x => x.ColumnId == column.ColumnId);
      if (existingColumnFilter) {
        this.createContextMenuItemReduxAction(
          'Clear Column Filter',
          StrategyConstants.ColumnFilterGlyph,
          ColumnFilterRedux.ColumnFilterClear(column.ColumnId)
        );
      }
    }
  }

  protected InitState() {
    if (this.columnFilterState != this.GetColumnFilterState()) {
      this.columnFilterState = this.GetColumnFilterState();

      setTimeout(() => this.blotter.applyGridFiltering(), 5);
      if (
        this.blotter.blotterOptions.generalOptions!.serverSearchOption == 'AllSearch' ||
        'AllSearchandSort'
      ) {
        this.publishSearchChanged(SearchChangedTrigger.ColumnFilter);
      }
    }
  }

  private GetColumnFilterState(): IColumnFilter[] {
    return this.blotter.api.columnFilterApi.getAllColumnFilter();
  }
}
