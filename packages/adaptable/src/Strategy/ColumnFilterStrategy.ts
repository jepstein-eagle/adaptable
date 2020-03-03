import { IColumnFilterStrategy } from './Interface/IColumnFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import * as GlyphConstants from '../Utilities/Constants/GlyphConstants';
import * as ColumnFilterRedux from '../Redux/ActionsReducers/ColumnFilterRedux';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { MenuItemDoClickFunction } from '../Utilities/MenuItem';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';

export class ColumnFilterStrategy extends AdaptableStrategyBase implements IColumnFilterStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.ColumnFilterStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.ColumnFilterStrategyFriendlyName,
        ComponentName: ScreenPopups.ColumnFilterPopup,
        Icon: StrategyConstants.ColumnFilterGlyph,
      });
    }
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let menuItemClickFunction: MenuItemDoClickFunction | undefined = undefined;
    if (this.canCreateMenuItem('ReadOnly')) {
      if (menuInfo.Column && menuInfo.GridCell != null) {
        let isMultiple: boolean = menuInfo.IsSelectedCell && menuInfo.IsSingleSelectedColumn;

        let pkValues: any[] = isMultiple
          ? this.adaptable.api.gridApi.getSelectedCellInfo().GridCells.map(gc => {
              return gc.primaryKeyValue;
            })
          : [menuInfo.GridCell.primaryKeyValue];
        let clickFunction = () => {
          this.adaptable.api.columnFilterApi.createColumnFilterForCell(
            menuInfo.Column.ColumnId,
            pkValues
          );
        };
        menuItemClickFunction = this.createColumnMenuItemClickFunction(
          isMultiple ? 'Filter on Cell Values' : 'Filter on Cell Value',
          StrategyConstants.ColumnFilterGlyph,
          clickFunction
        );
      }
    }
    return menuItemClickFunction;
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    let baseMenuItems: AdaptableMenuItem[] = [];
    if (this.canCreateColumnMenuItem(column, this.adaptable, 'ReadOnly', 'quickfilter')) {
      const isFilterActive: boolean = this.adaptable.api.gridApi.getGridState().IsQuickFilterActive;
      baseMenuItems.push(
        this.createColumnMenuItemReduxAction(
          isFilterActive ? 'Hide Quick Filter Bar' : 'Show Quick Filter Bar',
          isFilterActive ? GlyphConstants.OK_GLYPH : GlyphConstants.REMOVE_GLYPH,
          isFilterActive ? GridRedux.QuickFilterBarHide() : GridRedux.QuickFilterBarShow()
        )
      );
    }

    if (this.canCreateColumnMenuItem(column, this.adaptable, 'ReadOnly', 'columnfilter')) {
      let existingColumnFilter = this.adaptable.api.columnFilterApi
        .getAllColumnFilter()
        .find(x => x.ColumnId == column.ColumnId);
      if (existingColumnFilter) {
        baseMenuItems.push(
          this.createColumnMenuItemReduxAction(
            'Clear Column Filter',
            StrategyConstants.ColumnFilterGlyph,
            ColumnFilterRedux.ColumnFilterClear(existingColumnFilter)
          )
        );
      }
    }
    if (ArrayExtensions.IsNotNullOrEmpty(baseMenuItems)) {
      return baseMenuItems;
    }
  }
}
