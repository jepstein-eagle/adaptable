import { IColumnFilterStrategy } from './Interface/IColumnFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import * as ColumnFilterRedux from '../Redux/ActionsReducers/ColumnFilterRedux';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { MenuItemDoClickFunction } from '../Utilities/MenuItem';

export class ColumnFilterStrategy extends AdaptableStrategyBase implements IColumnFilterStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.ColumnFilterStrategyId, adaptable);
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
    return menuItemClickFunction;
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.adaptable, 'columnfilter')) {
      let existingColumnFilter = this.adaptable.api.columnFilterApi
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
