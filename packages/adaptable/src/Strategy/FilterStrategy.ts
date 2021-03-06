import { IFilterStrategy } from './Interface/IFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { MenuItemDoClickFunction } from '../Utilities/MenuItem';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import * as FilterRedux from '../Redux/ActionsReducers/FilterRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { ColumnFilter } from '../PredefinedConfig/FilterState';

export class FilterStrategy extends AdaptableStrategyBase implements IFilterStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.FilterStrategyId,
      StrategyConstants.FilterStrategyFriendlyName,
      StrategyConstants.FilterGlyph,
      ScreenPopups.FilterPopup,
      adaptable
    );
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
          this.adaptable.api.filterApi.createColumnFilterForCell(
            menuInfo.Column.ColumnId,
            pkValues
          );
        };
        menuItemClickFunction = this.createColumnMenuItemClickFunction(
          isMultiple ? 'Filter on Cell Values' : 'Filter on Cell Value',
          StrategyConstants.FilterGlyph,
          clickFunction
        );
      }
    }
    return menuItemClickFunction;
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    let baseMenuItems: AdaptableMenuItem[] = [];

    if (this.adaptable.isQuickFilterActive()) {
      const isFilterVisible: boolean = this.adaptable.api.gridApi.getGridState()
        .IsQuickFilterVisible;
      if (
        this.canCreateMenuItem('Full') &&
        this.adaptable.adaptableOptions.filterOptions.useAdaptableQuickFilter
      ) {
        baseMenuItems.push(
          this.createColumnMenuItemReduxAction(
            isFilterVisible ? 'Hide Quick Filter Bar' : 'Show Quick Filter Bar',
            isFilterVisible ? 'unchecked' : 'check',
            isFilterVisible ? GridRedux.QuickFilterBarHide() : GridRedux.QuickFilterBarShow()
          )
        );
      }
    }
    if (this.canCreateColumnMenuItem(column, this.adaptable, 'ReadOnly', 'filter')) {
      let existingColumnFilter = this.adaptable.api.filterApi
        .getAllColumnFilter()
        .find(x => x.ColumnId == column.ColumnId);
      if (existingColumnFilter) {
        baseMenuItems.push(
          this.createColumnMenuItemReduxAction(
            'Clear Filter',
            StrategyConstants.FilterGlyph,
            FilterRedux.ColumnFilterClear(existingColumnFilter)
          )
        );
      }
    }
    if (ArrayExtensions.IsNotNullOrEmpty(baseMenuItems)) {
      return baseMenuItems;
    }
  }

  public getTeamSharingAction(): TeamSharingImportInfo<ColumnFilter> {
    return {
      FunctionEntities: this.adaptable.api.filterApi.getAllColumnFilter(),
      AddAction: FilterRedux.ColumnFilterAdd,
      EditAction: FilterRedux.ColumnFilterEdit,
    };
  }
}
