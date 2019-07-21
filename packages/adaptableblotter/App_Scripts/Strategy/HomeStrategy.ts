import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as GlyphConstants from '../Utilities/Constants/GlyphConstants';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IHomeStrategy } from './Interface/IHomeStrategy';
import { IColumn } from '../Utilities/Interface/IColumn';
import { GRID_RELOADED_EVENT } from '../Utilities/Constants/GeneralConstants';

// This is a special strategy that the user can never remove but which is useful to us
// We use it to manage internal state changes and menu items that are not directly strategy related
export class HomeStrategy extends AdaptableStrategyBase implements IHomeStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.HomeStrategyId, blotter);
    //this.blotter.onGridReloaded().Subscribe(() => this.handleGridReloaded());

    // useful for when grid reloads (e.g. at midnight);
    this.blotter.on(GRID_RELOADED_EVENT, () => {
      this.blotter.applyGridFiltering();
    });
  }

  public addColumnMenuItem(column: IColumn): void {
    if (this.canCreateColumnMenuItem(column, this.blotter)) {
      this.createColumnMenuItemReduxAction(
        'Hide Column',
        StrategyConstants.ColumnChooserGlyph,
        GridRedux.GridHideColumn(column.ColumnId)
      );
    }

    if (this.canCreateColumnMenuItem(column, this.blotter, 'quickfilter')) {
      let isFilterActive: boolean = this.blotter.api.gridApi.getGridState().IsQuickFilterActive;
      this.createColumnMenuItemReduxAction(
        isFilterActive ? 'Hide Quick Filter Bar' : 'Show Quick Filter Bar',
        isFilterActive ? GlyphConstants.OK_GLYPH : GlyphConstants.REMOVE_GLYPH,
        isFilterActive ? GridRedux.QuickFilterBarHide() : GridRedux.QuickFilterBarShow()
      );
    }

    if (this.blotter.isSelectable()) {
      if (this.canCreateColumnMenuItem(column, this.blotter)) {
        this.createColumnMenuItemReduxAction(
          'Select Column',
          'compressed',
          GridRedux.GridSelectColumn(column.ColumnId)
        );
      }
    }
  }
}
