import { IColumnFilterStrategy } from './Interface/IColumnFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import * as ColumnFilterRedux from '../Redux/ActionsReducers/ColumnFilterRedux';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { MenuItemDoClickFunction } from '../Utilities/MenuItem';

export class ColumnFilterStrategy extends AdaptableStrategyBase implements IColumnFilterStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ColumnFilterStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ColumnFilterStrategyFriendlyName,
      ComponentName: ScreenPopups.ColumnFilterPopup,
      Icon: StrategyConstants.ColumnFilterGlyph,
    });
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let menuItemClickFunction: MenuItemDoClickFunction | undefined = undefined;

    if (menuInfo.column && menuInfo.gridCell != null) {
      let isMultiple: boolean = menuInfo.isSelectedCell && menuInfo.isSingleSelectedColumn;

      let pkValues: any[] = isMultiple
        ? this.blotter.api.gridApi.getSelectedCellInfo().GridCells.map(gc => {
            return gc.primaryKeyValue;
          })
        : [menuInfo.gridCell.primaryKeyValue];
      let clickFunction = () => {
        this.blotter.api.columnFilterApi.createColumnFilterForCell(
          menuInfo.column.ColumnId,
          pkValues
        );
      };
      menuItemClickFunction = this.createColumnMenuItemClickFunction(
        isMultiple ? 'Filter on Cell Values' : 'Filter on Cell Value',
        StrategyConstants.ColumnFilterGlyph,
        clickFunction
      );
    }
    return menuItemClickFunction;
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
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
