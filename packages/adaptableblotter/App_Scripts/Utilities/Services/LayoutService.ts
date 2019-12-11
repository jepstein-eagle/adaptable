import * as GeneralConstants from '../Constants/GeneralConstants';
import { AdaptableBlotterColumn } from '../Interface/AdaptableBlotterColumn';
import { ColumnHelper } from '../Helpers/ColumnHelper';
import { SortOrder } from '../../PredefinedConfig/Common/Enums';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import {
  LayoutState,
  Layout,
  ColumnSort,
  PivotDetails,
  VendorGridInfo,
} from '../../PredefinedConfig/LayoutState';
import { GridState } from '../../PredefinedConfig/GridState';
import {
  ColumnStateChangedEventArgs,
  ColumnStateChangedInfo,
} from '../../Api/Events/BlotterEvents';
import BlotterHelper from '../Helpers/BlotterHelper';
import ArrayExtensions from '../Extensions/ArrayExtensions';

import { ILayoutService } from './Interface/ILayoutService';

export class LayoutService implements ILayoutService {
  constructor(private blotter: IAdaptableBlotter) {
    this.blotter = blotter;
  }

  public getLayoutDescription(layout: Layout, columns: AdaptableBlotterColumn[]): string {
    let returnString: string = '';
    returnString += layout.Columns.length + ' Columns; ';
    returnString += '\n';
    returnString += ' Sort: ' + this.getColumnSort(layout.ColumnSorts, columns);
    return returnString;
  }

  public getColumnSort(columnSorts: ColumnSort[], columns: AdaptableBlotterColumn[]): string {
    if (ArrayExtensions.IsNullOrEmpty(columnSorts)) {
      return 'None';
    }

    let returnString: string = '';
    columnSorts.forEach((gs: ColumnSort) => {
      returnString +=
        ColumnHelper.getFriendlyNameFromColumnId(gs.Column, columns) +
        this.getSortOrder(gs.SortOrder);
    });
    return returnString;
  }

  public getSortOrder(sortOrder: 'Ascending' | 'Descending'): string {
    return sortOrder == SortOrder.Ascending ? ' [asc] ' : ' [desc] ';
  }

  public autoSaveLayout(): void {
    let layoutState: LayoutState = this.blotter.api.layoutApi.getLayoutState();
    if (
      this.blotter.isInitialised &&
      layoutState.CurrentLayout != GeneralConstants.DEFAULT_LAYOUT
    ) {
      if (
        this.blotter.blotterOptions.layoutOptions != null &&
        this.blotter.blotterOptions.layoutOptions.autoSaveLayouts != null &&
        this.blotter.blotterOptions.layoutOptions.autoSaveLayouts
      ) {
        let layout = this.blotter.api.layoutApi.getCurrentLayout();
        if (layout != null) {
          let gridState: GridState = this.blotter.api.gridApi.getGridState();
          let visibleColumns: AdaptableBlotterColumn[] = gridState.Columns.filter(c => c.Visible);

          let currentGridVendorInfo: VendorGridInfo = this.blotter.getVendorGridLayoutInfo(
            visibleColumns.map(vc => vc.ColumnId)
          );

          let layoutToSave: Layout = {
            Uuid: layout.Uuid,
            Name: layoutState.CurrentLayout,
            Columns: layout.Columns,
            ColumnSorts: layout.ColumnSorts,
            GroupedColumns: layout.GroupedColumns,
            PivotDetails: layout.PivotDetails,
            VendorGridInfo: currentGridVendorInfo,
            BlotterGridInfo: {
              CurrentColumns: visibleColumns ? visibleColumns.map(x => x.ColumnId) : [],
              CurrentColumnSorts: gridState.ColumnSorts,
            },
          };
          this.blotter.api.layoutApi.saveLayout(layoutToSave);
        }
      }

      let columnStateChangedInfo: ColumnStateChangedInfo = {
        currentLayout: layoutState.CurrentLayout,
      };
      const columnStateChangedEventArgs: ColumnStateChangedEventArgs = BlotterHelper.createFDC3Message(
        'Column State Changed Args',
        columnStateChangedInfo
      );

      // now depprecated and shortly to be removed...
      this.blotter.api.eventApi._onColumnStateChanged.Dispatch(
        this.blotter,
        columnStateChangedEventArgs
      );
      // new way (and soon only way)
      this.blotter.api.eventApi.emit('ColumnStateChanged', columnStateChangedEventArgs);
    }
  }

  public isPivotedLayout(pivotDetails: PivotDetails): boolean {
    return (
      pivotDetails != null &&
      (ArrayExtensions.IsNotNullOrEmpty(pivotDetails.PivotColumns) ||
        ArrayExtensions.IsNotNullOrEmpty(pivotDetails.AggregationColumns))
    );
  }

  public isLayoutModified(layoutEntity: Layout): boolean {
    if (layoutEntity) {
      if (!layoutEntity.VendorGridInfo) {
        return true;
      }

      if (
        !ArrayExtensions.areArraysEqualWithOrder(
          layoutEntity.Columns,
          layoutEntity.BlotterGridInfo.CurrentColumns
        )
      ) {
        return true;
      }
      if (
        !ArrayExtensions.areArraysEqualWithOrderandProperties(
          layoutEntity.ColumnSorts,
          layoutEntity.BlotterGridInfo.CurrentColumnSorts
        )
      ) {
        return true;
      }
    }
    return true;
  }
}
