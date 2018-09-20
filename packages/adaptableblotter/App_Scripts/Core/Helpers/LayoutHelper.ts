import { IStrategyActionReturn } from '../../Strategy/Interface/IStrategyActionReturn';
import * as GeneralConstants from '../Constants/GeneralConstants'
import { IGridSort, ILayout } from '../Api/Interface/AdaptableBlotterObjects';
import { SortOrder } from '../Enums';
import { IColumn } from '../Interface/IColumn';
import { ColumnHelper } from './ColumnHelper';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { LayoutState, GridState } from '../../Redux/ActionsReducers/Interface/IState';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux'
import { ObjectFactory } from '../ObjectFactory';



export module LayoutHelper {

    export function getLayoutDescription(layout: ILayout, columns: IColumn[]): string {
        let returnString: string = "";
        let gridSorts: IGridSort[] = layout.GridSorts;
        returnString += layout.Columns.length + " Columns; ";
        returnString += "\n"
        returnString += " Sort: " + getGridSort(layout.GridSorts, columns);
        return returnString;
    }

    export function getGridSort(gridSorts: IGridSort[], columns: IColumn[]): string {
        if (gridSorts.length == 0) {
            return "None";
        }

        let returnString: string = ""
        gridSorts.forEach((gs: IGridSort) => {
            returnString += ColumnHelper.getFriendlyNameFromColumnId(gs.Column, columns) + getSortOrder(gs.SortOrder)
        })
        return returnString;
    }

    export function getSortOrder(sortOrder: 'Unknown' | 'Ascending' | 'Descending'): string {
        return (sortOrder == SortOrder.Ascending) ? " [asc] " : " [desc] "
    }

    export function autoSaveLayout(blotter: IAdaptableBlotter): void {
        let layoutState: LayoutState = blotter.AdaptableBlotterStore.TheStore.getState().Layout;
        if (blotter.isInitialised && layoutState.CurrentLayout != GeneralConstants.DEFAULT_LAYOUT) {
            if (blotter.BlotterOptions.autoSaveLayouts) {
                let layout = layoutState.Layouts.find(l => l.Name == layoutState.CurrentLayout)
                if (layout != null) {
                    let gridState: GridState = blotter.AdaptableBlotterStore.TheStore.getState().Grid
                    let visibleColumns: IColumn[] = gridState.Columns.filter(c => c.Visible);
                    let gridVendorState: any = blotter.getVendorGridState(visibleColumns.map(vc=>vc.ColumnId), false)
                    let layoutIndex = layoutState.Layouts.findIndex(l => l.Name == layoutState.CurrentLayout)
                    let layoutToSave = ObjectFactory.CreateLayout(visibleColumns, gridState.GridSorts, gridVendorState, layoutState.CurrentLayout)
                    blotter.AdaptableBlotterStore.TheStore.dispatch(LayoutRedux.LayoutPreSave(layoutIndex, layoutToSave))
                }
            }
            blotter.ColumnStateChanged.Dispatch(blotter, { currentLayout: layoutState.CurrentLayout });
        }
    }



}