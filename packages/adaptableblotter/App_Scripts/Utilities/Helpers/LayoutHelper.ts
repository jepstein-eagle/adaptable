import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { IGridSort } from '../Interface/IGridSort';
import { ILayout } from '../Interface/BlotterObjects/ILayout';
import { IColumn } from '../Interface/IColumn';
import { ColumnHelper } from './ColumnHelper';
import { SortOrder } from '../Enums';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { LayoutState, GridState } from '../../Redux/ActionsReducers/Interface/IState';
import { ObjectFactory } from '../ObjectFactory';
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux';

export function getLayoutDescription(layout: ILayout, columns: IColumn[]): string {
  let returnString: string = '';
  returnString += layout.Columns.length + ' Columns; ';
  returnString += '\n';
  returnString += ' Sort: ' + getGridSort(layout.GridSorts, columns);
  return returnString;
}

export function getGridSort(gridSorts: IGridSort[], columns: IColumn[]): string {
  if (gridSorts.length == 0) {
    return 'None';
  }

  let returnString: string = '';
  gridSorts.forEach((gs: IGridSort) => {
    returnString +=
      ColumnHelper.getFriendlyNameFromColumnId(gs.Column, columns) + getSortOrder(gs.SortOrder);
  });
  return returnString;
}

export function getSortOrder(sortOrder: 'Unknown' | 'Ascending' | 'Descending'): string {
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
        let visibleColumns: IColumn[] = gridState.Columns.filter(c => c.Visible);
        let gridVendorState: any = blotter.getVendorGridState(
          visibleColumns.map(vc => vc.ColumnId),
          false
        );
        let layoutToSave: ILayout = {
          Uuid: layout.Uuid,
          Name: layoutState.CurrentLayout,
          Columns: visibleColumns ? visibleColumns.map(x => x.ColumnId) : [],
          GridSorts: gridState.GridSorts,
          VendorGridInfo: gridVendorState,
        };
        blotter.adaptableBlotterStore.TheStore.dispatch(LayoutRedux.LayoutSave(layoutToSave));
      }
    }
    blotter.api.eventApi._onColumnStateChanged.Dispatch(blotter, {
      currentLayout: layoutState.CurrentLayout,
    });
  }
}

export const LayoutHelper = {
  getLayoutDescription,
  getGridSort,
  getSortOrder,
  autoSaveLayout,
};
export default LayoutHelper;
