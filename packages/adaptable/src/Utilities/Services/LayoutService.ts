import * as GeneralConstants from '../Constants/GeneralConstants';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { SortOrder } from '../../PredefinedConfig/Common/Enums';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { Layout, LayoutState } from '../../PredefinedConfig/LayoutState';
import ArrayExtensions from '../Extensions/ArrayExtensions';
import { ILayoutService } from './Interface/ILayoutService';
import { ColumnSort } from '../../PredefinedConfig/Common/ColumnSort';
import { GridState } from '../../PredefinedConfig/GridState';
import { isEqual } from 'lodash';

export class LayoutService implements ILayoutService {
  constructor(private adaptable: IAdaptable) {
    this.adaptable = adaptable;
  }

  public createDefaultLayoutIfNeeded(): Layout | null {
    let gridState: GridState = this.adaptable.api.gridApi.getGridState();
    let layoutState: LayoutState = this.adaptable.api.layoutApi.getLayoutState();

    const isLayoutDefined = (layoutName: string) =>
      !!layoutState.Layouts.filter(layout => layout.Name === layoutName)[0];

    let defaultLayoutName = 'Default Layout';
    let defaultLayoutColumns = gridState.Columns.filter(column => column.Visible);

    const columnsMap = gridState.Columns.reduce((acc, col) => {
      acc[col.ColumnId] = col;
      return acc;
    }, {} as { [key: string]: AdaptableColumn });

    let shouldCreateDefaultLayout = layoutState.CreateDefaultLayout;

    if (!layoutState.Layouts || !layoutState.Layouts.length) {
      shouldCreateDefaultLayout = true;
    }

    if (shouldCreateDefaultLayout) {
      if (!layoutState.Layouts || !isLayoutDefined(defaultLayoutName)) {
        let defaultLayout: Layout = ObjectFactory.CreateEmptyLayout(
          {
            Name: defaultLayoutName,
            Columns: defaultLayoutColumns.map(c => c.ColumnId),
          },
          gridState.Columns
        );
        this.adaptable.api.layoutApi.saveLayout(defaultLayout);

        return defaultLayout;
      }
    }
  }

  public getLayoutDescription(layout: Layout, columns: AdaptableColumn[]): string {
    let returnString: string = '';
    returnString += layout.Columns.length + ' Columns; ';
    returnString += '\n';
    returnString += ' Sort: ' + this.getColumnSort(layout.ColumnSorts, columns);
    return returnString;
  }

  private getColumnSort(columnSorts: ColumnSort[], columns: AdaptableColumn[]): string {
    if (ArrayExtensions.IsNullOrEmpty(columnSorts)) {
      return 'None';
    }

    let returnString: string = '';
    columnSorts.forEach((gs: ColumnSort) => {
      returnString +=
        this.adaptable.api.columnApi.getFriendlyNameFromColumnId(gs.Column) + SortOrder.Asc
          ? ' [asc] '
          : ' [desc] ';
    });
    return returnString;
  }
}
