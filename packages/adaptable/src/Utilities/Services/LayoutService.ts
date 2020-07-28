import * as GeneralConstants from '../Constants/GeneralConstants';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { SortOrder } from '../../PredefinedConfig/Common/Enums';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import {
  Layout,
  PivotDetails,
  VendorGridInfo,
  LayoutState,
} from '../../PredefinedConfig/LayoutState';
import AdaptableHelper from '../Helpers/AdaptableHelper';
import ArrayExtensions from '../Extensions/ArrayExtensions';

import { ILayoutService } from './Interface/ILayoutService';
import {
  ColumnStateChangedEventArgs,
  ColumnStateChangedInfo,
} from '../../Api/Events/ColumnStateChanged';
import { ColumnSort } from '../../PredefinedConfig/Common/ColumnSort';
import { AG_GRID_GROUPED_COLUMN } from '../Constants/GeneralConstants';
import { GridState } from '../../PredefinedConfig/GridState';
import { isEqual } from 'lodash';

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
      ColumnFlexMap: {},
      ColumnWidthMap: {},
      GroupedColumns: [],
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

    let defaultLayoutName = 'Default Layout';
    let defaultLayoutColumns = gridState.Columns;

    const columnsMap = gridState.Columns.reduce((acc, col) => {
      acc[col.ColumnId] = col;
      return acc;
    }, {} as { [key: string]: AdaptableColumn });

    let shouldCreateDefaultLayout = layoutState.CreateDefaultLayout;

    if (!layoutState.Layouts || !layoutState.Layouts.length) {
      shouldCreateDefaultLayout = true;
    }

    if (shouldCreateDefaultLayout) {
      if (typeof layoutState.CreateDefaultLayout === 'object') {
        defaultLayoutName = layoutState.CreateDefaultLayout.Name || defaultLayoutName;
        if (Array.isArray(layoutState.CreateDefaultLayout.Columns)) {
          defaultLayoutColumns = layoutState.CreateDefaultLayout.Columns.map(colId => {
            return columnsMap[colId];
          });
        }
      }

      if (!layoutState.Layouts || !isLayoutDefined(defaultLayoutName)) {
        let defaultLayout: Layout = ObjectFactory.CreateEmptyLayout({
          ...(typeof layoutState.CreateDefaultLayout === 'object'
            ? layoutState.CreateDefaultLayout
            : null),
          Name: defaultLayoutName,
          Columns: defaultLayoutColumns.map(c => c.ColumnId),
        });
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

  public getSortsForLayout(layout: Layout): ColumnSort[] {
    return layout.ColumnSorts;
  }

  public getColumnSort(columnSorts: ColumnSort[], columns: AdaptableColumn[]): string {
    if (ArrayExtensions.IsNullOrEmpty(columnSorts)) {
      return 'None';
    }

    let returnString: string = '';
    columnSorts.forEach((gs: ColumnSort) => {
      returnString +=
        this.adaptable.api.gridApi.getFriendlyNameFromColumnId(gs.Column) +
        this.getSortOrder(gs.SortOrder);
    });
    return returnString;
  }

  public getSortOrder(sortOrder: 'Ascending' | 'Descending'): string {
    return sortOrder == SortOrder.Ascending ? ' [asc] ' : ' [desc] ';
  }

  public isPivotedLayout(pivotDetails: PivotDetails): boolean {
    return (
      pivotDetails != null &&
      (ArrayExtensions.IsNotNullOrEmpty(pivotDetails.PivotColumns) ||
        ArrayExtensions.IsNotNullOrEmpty(pivotDetails.AggregationColumns))
    );
  }
}
