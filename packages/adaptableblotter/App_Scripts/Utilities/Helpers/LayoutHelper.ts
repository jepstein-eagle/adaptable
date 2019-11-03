import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { AdaptableBlotterColumn } from '../Interface/AdaptableBlotterColumn';
import { ColumnHelper } from './ColumnHelper';
import { SortOrder } from '../../PredefinedConfig/Common/Enums';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import { LayoutState, Layout, ColumnSort } from '../../PredefinedConfig/RunTimeState/LayoutState';
import { GridState } from '../../PredefinedConfig/InternalState/GridState';
import { COLUMN_STATE_CHANGED_EVENT } from '../../Utilities/Constants/GeneralConstants';
import { ColumnStateChangedEventArgs } from '../../Api/Events/BlotterEvents';

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
  if (columnSorts.length == 0) {
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
        let gridVendorState: any = blotter.getVendorGridInfo(
          visibleColumns.map(vc => vc.ColumnId),
          false
        );

        let layoutToSave: Layout = {
          Uuid: layout.Uuid,
          Name: layoutState.CurrentLayout,
          Columns: visibleColumns ? visibleColumns.map(x => x.ColumnId) : [],
          ColumnSorts: gridState.ColumnSorts,
          VendorGridInfo: gridVendorState,
        };
        blotter.api.layoutApi.saveLayout(layoutToSave);
      }
    }

    let columnStateChangedEventArgs: ColumnStateChangedEventArgs = {
      currentLayout: layoutState.CurrentLayout,
    };
    // now depprecated and shortly to be removed...
    blotter.api.eventApi._onColumnStateChanged.Dispatch(blotter, columnStateChangedEventArgs);
    // new way (and soon only way)
    blotter.api.eventApi.emit(COLUMN_STATE_CHANGED_EVENT, columnStateChangedEventArgs);
  }
}

export const LayoutHelper = {
  getLayoutDescription,
  getColumnSort,
  getSortOrder,
  autoSaveLayout,
};
export default LayoutHelper;
