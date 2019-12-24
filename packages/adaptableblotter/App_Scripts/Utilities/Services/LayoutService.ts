import * as GeneralConstants from '../Constants/GeneralConstants';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { ColumnHelper } from '../Helpers/ColumnHelper';
import { SortOrder } from '../../PredefinedConfig/Common/Enums';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import {
  Layout,
  ColumnSort,
  PivotDetails,
  VendorGridInfo,
} from '../../PredefinedConfig/LayoutState';
import AdaptableHelper from '../Helpers/AdaptableHelper';
import ArrayExtensions from '../Extensions/ArrayExtensions';

import { ILayoutService } from './Interface/ILayoutService';
import {
  ColumnStateChangedEventArgs,
  ColumnStateChangedInfo,
} from '../../Api/Events/ColumnStateChanged';

export class LayoutService implements ILayoutService {
  constructor(private blotter: IAdaptableBlotter) {
    this.blotter = blotter;
  }

  public getLayoutDescription(layout: Layout, columns: AdaptableColumn[]): string {
    let returnString: string = '';
    returnString += layout.Columns.length + ' Columns; ';
    returnString += '\n';
    returnString += ' Sort: ' + this.getColumnSort(layout.ColumnSorts, columns);
    return returnString;
  }

  public getColumnSort(columnSorts: ColumnSort[], columns: AdaptableColumn[]): string {
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
    let currentLayoutName: string = this.blotter.api.layoutApi.getCurrentLayoutName();
    if (this.blotter.isInitialised && currentLayoutName != GeneralConstants.DEFAULT_LAYOUT) {
      if (
        this.blotter.blotterOptions.layoutOptions != null &&
        this.blotter.blotterOptions.layoutOptions.autoSaveLayouts != null &&
        this.blotter.blotterOptions.layoutOptions.autoSaveLayouts
      ) {
        let layout = this.blotter.api.layoutApi.getCurrentLayout();
        if (layout != null) {
          let visibleColumns: AdaptableColumn[] = this.blotter.api.gridApi.getVisibleColumns();

          let currentGridVendorInfo: VendorGridInfo = this.blotter.getVendorGridLayoutInfo(
            visibleColumns.map(vc => vc.ColumnId)
          );

          let layoutToSave: Layout = {
            Uuid: layout.Uuid,
            Name: currentLayoutName,
            Columns: layout.Columns,
            ColumnSorts: layout.ColumnSorts,
            GroupedColumns: layout.GroupedColumns,
            PivotDetails: layout.PivotDetails,
            VendorGridInfo: currentGridVendorInfo,
            BlotterGridInfo: {
              CurrentColumns: visibleColumns ? visibleColumns.map(x => x.ColumnId) : [],
              CurrentColumnSorts: this.blotter.api.gridApi.getColumnSorts(),
            },
          };
          this.blotter.api.layoutApi.saveLayout(layoutToSave);
        }
      }

      let columnStateChangedInfo: ColumnStateChangedInfo = {
        currentLayout: currentLayoutName,
      };
      const columnStateChangedEventArgs: ColumnStateChangedEventArgs = AdaptableHelper.createFDC3Message(
        'Column State Changed Args',
        columnStateChangedInfo
      );

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
