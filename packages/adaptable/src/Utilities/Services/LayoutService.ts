import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { SortOrder } from '../../PredefinedConfig/Common/Enums';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { Layout, LayoutState } from '../../PredefinedConfig/LayoutState';
import ArrayExtensions from '../Extensions/ArrayExtensions';
import { ILayoutService } from './Interface/ILayoutService';
import { ColumnSort } from '../../PredefinedConfig/Common/ColumnSort';
import { GridState } from '../../PredefinedConfig/GridState';
import isEqual from 'lodash-es/isEqual';
import { DEFAULT_LAYOUT } from '../Constants/GeneralConstants';

export class LayoutService implements ILayoutService {
  constructor(private adaptable: IAdaptable) {
    this.adaptable = adaptable;
  }

  public areEqual(layout1: Layout, layout2: Layout): boolean {
    // ColumnSorts: [],
    // ColumnFlexMap: {},
    // ColumnWidthMap: {},
    // GroupedColumns: [],
    if (!layout1 && !layout2) {
      return true;
    }
    if (!layout1 || !layout2) {
      return false;
    }

    const defaults: Partial<Layout> = {
      ColumnSorts: [],
      //   ColumnFlexMap: {},
      ColumnWidthMap: {},
      RowGroupedColumns: [],
    };
    layout1 = { ...defaults, ...layout1 };
    layout2 = { ...defaults, ...layout2 };

    return isEqual(layout1, layout2);
  }

  public createDefaultLayoutIfNeeded(): Layout | null {
    let gridState: GridState = this.adaptable.api.gridApi.getGridState();
    let layoutState: LayoutState = this.adaptable.api.layoutApi.getLayoutState();

    const isLayoutDefined = (layoutName: string) =>
      !!layoutState.Layouts.filter(layout => layout.Name === layoutName)[0];

    let defaultLayoutColumns = gridState.Columns.filter(column => column.Visible);

    const columnsMap = gridState.Columns.reduce((acc, col) => {
      acc[col.ColumnId] = col;
      return acc;
    }, {} as { [key: string]: AdaptableColumn });

    let shouldCreateDefaultLayout = this.adaptable.api.internalApi.getAdaptableOptions()
      .layoutOptions.createDefaultLayout;

    if (!layoutState.Layouts || !layoutState.Layouts.length) {
      shouldCreateDefaultLayout = true;
    }

    if (shouldCreateDefaultLayout) {
      if (!layoutState.Layouts || !isLayoutDefined(DEFAULT_LAYOUT)) {
        let defaultLayout: Layout = ObjectFactory.CreateEmptyLayout(
          {
            Name: DEFAULT_LAYOUT,
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
        this.adaptable.api.columnApi.getFriendlyNameFromColumnId(gs.ColumnId) + SortOrder.Asc
          ? ' [asc] '
          : ' [desc] ';
    });
    return returnString;
  }
}
