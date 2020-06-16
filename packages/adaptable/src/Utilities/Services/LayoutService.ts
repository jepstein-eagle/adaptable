import * as GeneralConstants from '../Constants/GeneralConstants';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { SortOrder } from '../../PredefinedConfig/Common/Enums';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { Layout, PivotDetails, VendorGridInfo } from '../../PredefinedConfig/LayoutState';
import AdaptableHelper from '../Helpers/AdaptableHelper';
import ArrayExtensions from '../Extensions/ArrayExtensions';

import { ILayoutService } from './Interface/ILayoutService';
import {
  ColumnStateChangedEventArgs,
  ColumnStateChangedInfo,
} from '../../Api/Events/ColumnStateChanged';
import { ColumnSort } from '../../PredefinedConfig/Common/ColumnSort';
import { AG_GRID_GROUPED_COLUMN } from '../Constants/GeneralConstants';

export class LayoutService implements ILayoutService {
  constructor(private adaptable: IAdaptable) {
    this.adaptable = adaptable;
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

  public autoSaveLayout(): void {
    let currentLayoutName: string = this.adaptable.api.layoutApi.getCurrentLayoutName();
    if (this.adaptable.isInitialised && currentLayoutName != GeneralConstants.DEFAULT_LAYOUT) {
      if (
        this.adaptable.adaptableOptions.layoutOptions != null &&
        this.adaptable.adaptableOptions.layoutOptions.autoSaveLayouts != null &&
        this.adaptable.adaptableOptions.layoutOptions.autoSaveLayouts
      ) {
        let layout = this.adaptable.api.layoutApi.getCurrentLayout();
        if (layout != null) {
          let visibleColumns: AdaptableColumn[] = this.adaptable.api.gridApi.getVisibleColumns();

          let currentGridVendorInfo: VendorGridInfo = this.adaptable.getVendorGridLayoutInfo(
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
            AdaptableGridInfo: {
              CurrentColumns: visibleColumns ? visibleColumns.map(x => x.ColumnId) : [],
              CurrentColumnSorts: this.adaptable.api.gridApi.getColumnSorts(),
              ExpandedRowGroupKeys:
                layout.AdaptableGridInfo == null || this.adaptable.getRowCount() > 0
                  ? this.adaptable.api.gridApi.getExpandRowGroupsKeys()
                  : layout.AdaptableGridInfo!.ExpandedRowGroupKeys,
            },
          };
          this.adaptable.api.layoutApi.saveLayout(layoutToSave);
        }
      }

      let columnStateChangedInfo: ColumnStateChangedInfo = {
        currentLayout: currentLayoutName,
        adaptableApi: this.adaptable.api,
      };
      const columnStateChangedEventArgs: ColumnStateChangedEventArgs = AdaptableHelper.createFDC3Message(
        'Column State Changed Args',
        columnStateChangedInfo
      );

      this.adaptable.api.eventApi.emit('ColumnStateChanged', columnStateChangedEventArgs);
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

      if (layoutEntity.AdaptableGridInfo) {
        if (
          ArrayExtensions.IsNotNull(layoutEntity.Columns) &&
          ArrayExtensions.IsNotNull(layoutEntity.AdaptableGridInfo.CurrentColumns) &&
          !ArrayExtensions.areArraysEqualWithOrder(
            layoutEntity.Columns,
            layoutEntity.AdaptableGridInfo.CurrentColumns
          )
        ) {
          return true;
        }

        if (
          ArrayExtensions.IsNotNull(layoutEntity.ColumnSorts) &&
          ArrayExtensions.IsNotNull(layoutEntity.AdaptableGridInfo.CurrentColumnSorts) &&
          !ArrayExtensions.areArraysEqualWithOrderandProperties(
            layoutEntity.ColumnSorts,
            layoutEntity.AdaptableGridInfo.CurrentColumnSorts
          )
        ) {
          return true;
        }

        // do ExpandedRowGroupKeys?
      }
    }
    return true;
  }
}
