import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as GlyphConstants from '../Utilities/Constants/GlyphConstants';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IHomeStrategy } from './Interface/IHomeStrategy';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

// This is a special strategy that the user can never remove but which is useful to us
// We use it to manage internal state changes and menu items that are not directly strategy related
// But dont really like it and think we can do this better...
export class HomeStrategy extends AdaptableStrategyBase implements IHomeStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.HomeStrategyId, adaptable);
    // useful for when grid reloads (e.g. at midnight);
    this.adaptable._on('GridReloaded', () => {
      this.adaptable.applyGridFiltering();
    });
  }

  public setStrategyEntitlement(): void {
    this.isReadOnly = false;
    this.isFull = true;
  }

  public addBaseColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] {
    let baseMenuItems: AdaptableMenuItem[] = [];

    if (this.canCreateColumnMenuItem(column, this.adaptable, 'quickfilter')) {
      const isFilterActive: boolean = this.adaptable.api.gridApi.getGridState().IsQuickFilterActive;
      baseMenuItems.push(
        this.createColumnMenuItemReduxAction(
          isFilterActive ? 'Hide Quick Filter Bar' : 'Show Quick Filter Bar',
          isFilterActive ? GlyphConstants.OK_GLYPH : GlyphConstants.REMOVE_GLYPH,
          isFilterActive ? GridRedux.QuickFilterBarHide() : GridRedux.QuickFilterBarShow()
        )
      );
    }
    if (this.adaptable.isSelectable()) {
      if (this.canCreateColumnMenuItem(column, this.adaptable)) {
        baseMenuItems.push(
          this.createColumnMenuItemReduxAction(
            'Select Column',
            'tab-unselected',
            GridRedux.GridSelectColumn(column.ColumnId)
          )
        );
      }
    }
    if (this.canCreateColumnMenuItem(column, this.adaptable)) {
      baseMenuItems.push(
        this.createColumnMenuItemReduxAction(
          'Hide Column',
          StrategyConstants.ColumnChooserGlyph,
          GridRedux.GridHideColumn(column.ColumnId)
        )
      );
    }

    return baseMenuItems;
  }
}
