import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { AdaptableBlotterColumn } from '../Interface/AdaptableBlotterColumn';
import { ColumnHelper } from './ColumnHelper';
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
import { COLUMN_STATE_CHANGED_EVENT } from '../../Utilities/Constants/GeneralConstants';
import {
  ColumnStateChangedEventArgs,
  ColumnStateChangedInfo,
} from '../../Api/Events/BlotterEvents';
import BlotterHelper from './BlotterHelper';
import ArrayExtensions from '../Extensions/ArrayExtensions';
import * as DeepDiff from 'deep-diff';

export function getLayoutDescription(layout: Layout, columns: AdaptableBlotterColumn[]): string {
  let returnString: string = '';
  returnString += layout.Columns.length + ' Columns; ';
  returnString += '\n';
  returnString += ' Sort: ' + getColumnSort(layout.ColumnSorts, columns);
  return returnString;
}

export function getColumnSort(
  columnSorts: ColumnSort[],
  columns: AdaptableBlotterColumn[]
): string {
  if (ArrayExtensions.IsNullOrEmpty(columnSorts)) {
    return 'None';
  }

  let returnString: string = '';
  columnSorts.forEach((gs: ColumnSort) => {
    returnString +=
      ColumnHelper.getFriendlyNameFromColumnId(gs.Column, columns) + getSortOrder(gs.SortOrder);
  });
  return returnString;
}

export function getSortOrder(sortOrder: 'Ascending' | 'Descending'): string {
  return sortOrder == SortOrder.Ascending ? ' [asc] ' : ' [desc] ';
}

export function autoSaveLayout(blotter: IAdaptableBlotter): void {
  let layoutState: LayoutState = blotter.api.layoutApi.getLayoutState();
  if (blotter.isInitialised && layoutState.CurrentLayout != GeneralConstants.DEFAULT_LAYOUT) {
    if (
      blotter.blotterOptions.layoutOptions != null &&
      blotter.blotterOptions.layoutOptions.autoSaveLayouts != null &&
      blotter.blotterOptions.layoutOptions.autoSaveLayouts
    ) {
      let layout = blotter.api.layoutApi.getCurrentLayout();
      if (layout != null) {
        let gridState: GridState = blotter.api.gridApi.getGridState();
        let visibleColumns: AdaptableBlotterColumn[] = gridState.Columns.filter(c => c.Visible);

        let currentGridVendorInfo: VendorGridInfo = blotter.getVendorGridLayoutInfo(
          visibleColumns.map(vc => vc.ColumnId),
          false
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
        blotter.api.layoutApi.saveLayout(layoutToSave);
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
    blotter.api.eventApi._onColumnStateChanged.Dispatch(blotter, columnStateChangedEventArgs);
    // new way (and soon only way)
    blotter.api.eventApi.emit('ColumnStateChanged', columnStateChangedEventArgs);
  }
}

export function isPivotedLayout(pivotDetails: PivotDetails): boolean {
  return (
    pivotDetails != null &&
    (ArrayExtensions.IsNotNullOrEmpty(pivotDetails.PivotColumns) ||
      ArrayExtensions.IsNotNullOrEmpty(pivotDetails.AggregationColumns))
  );
}

export const LayoutHelper = {
  getLayoutDescription,
  getColumnSort,
  getSortOrder,
  autoSaveLayout,
  isPivotedLayout,
};
export default LayoutHelper;
