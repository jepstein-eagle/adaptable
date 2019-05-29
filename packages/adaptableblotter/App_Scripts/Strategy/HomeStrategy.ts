import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as GlyphConstants from '../Utilities/Constants/GlyphConstants';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IHomeStrategy } from './Interface/IHomeStrategy';
import { IColumn } from '../Utilities/Interface/IColumn';

// This is a special strategy that the user can never remove but which is useful to us
// We use it to manage internal state changes and menu items that are not directly strategy related
export class HomeStrategy extends AdaptableStrategyBase implements IHomeStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.HomeStrategyId, blotter);
    this.blotter.onGridReloaded().Subscribe(() => this.handleGridReloaded());
  }

  public addContextMenuItem(column: IColumn): void {
    if (this.canCreateContextMenuItem(column, this.blotter)) {
      this.createContextMenuItemReduxAction(
        'Hide Column',
        StrategyConstants.ColumnChooserGlyph,
        GridRedux.GridHideColumn(column.ColumnId)
      );
    }

    if (this.canCreateContextMenuItem(column, this.blotter, 'floatingfilter')) {
      let isFilterActive: boolean = this.blotter.api.gridApi.getGridState().IsFloatingFilterActive;
      this.createContextMenuItemReduxAction(
        isFilterActive ? 'Hide Floating Filter Bar' : 'Show Floating Filter Bar',
        isFilterActive ? GlyphConstants.OK_GLYPH : GlyphConstants.REMOVE_GLYPH,
        isFilterActive ? GridRedux.FloatingFilterBarHide() : GridRedux.FloatingilterBarShow()
      );
    }

    if (this.blotter.isSelectable()) {
      if (this.canCreateContextMenuItem(column, this.blotter)) {
        this.createContextMenuItemReduxAction(
          'Select Column',
          'compressed',
          GridRedux.GridSelectColumn(column.ColumnId)
        );
      }
    }
  }

  // useful for when grid reloads (e.g. at midnight);
  private handleGridReloaded(): void {
    this.blotter.applyGridFiltering();
  }
}
