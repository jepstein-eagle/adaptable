import * as LayoutRedux from '../Redux/ActionsReducers/LayoutRedux'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import { ILayout, IGridSort } from "./Interface/IAdaptableBlotterObjects";
import { ApiBase } from "./ApiBase";
import { DEFAULT_LAYOUT } from "../Utilities/Constants/GeneralConstants";
import { IColumn } from "./Interface/IColumn";
import { ObjectFactory } from "../Utilities/ObjectFactory";

export interface ILayoutApi {


    /**
     * Selects the layout
     * @param layoutName has to be an existing layout
     */
    layoutSet(layoutName: string): void

    /**
       * Clears the currently selected layout
       */
    layoutClear(): void

    /**
     * Retrieves current Layout
     */
    layoutGetCurrent(): ILayout

    /**
     * Retrieves all Layouts in State
     */
    layoutgetAll(): ILayout[]

    /**
     * Saves the current layout - using the column order and grid sort info currently in the grid
     */
    layoutSave(): void


}



export class LayoutApi extends ApiBase implements ILayoutApi {
    // Layout api methods
    public layoutSet(layoutName: string): void {
        let layout: ILayout = this.getState().Layout.Layouts.find(l => l.Name == layoutName);
        if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyName)) {
            this.dispatchAction(LayoutRedux.LayoutSelect(layoutName))
        }
    }

    public layoutClear(): void {
        this.dispatchAction(LayoutRedux.LayoutSelect(DEFAULT_LAYOUT))
    }

    public layoutGetCurrent(): ILayout {
        let layoutName = this.getState().Layout.CurrentLayout;
        return this.getState().Layout.Layouts.find(l => l.Name == layoutName);
    }

    public layoutgetAll(): ILayout[] {
        return this.getState().Layout.Layouts;
    }

    public layoutSave(): void {
        let currentLayoutName: string = this.getState().Layout.CurrentLayout
        if (currentLayoutName != DEFAULT_LAYOUT) {
            let currentLayoutObject: ILayout = this.getState().Layout.Layouts.find(l => l.Name == currentLayoutName)
            let currentLayoutIndex: number = this.getState().Layout.Layouts.findIndex(l => l.Name == currentLayoutName)
            if (currentLayoutIndex != -1) {
                let gridState: any = (currentLayoutObject) ? currentLayoutObject.VendorGridInfo : null
                let visibleColumns: IColumn[] = this.getState().Grid.Columns.filter(c => c.Visible);
                let gridSorts: IGridSort[] = this.getState().Grid.GridSorts;
                let layoutToSave = ObjectFactory.CreateLayout(visibleColumns, gridSorts, gridState, currentLayoutName)
                this.dispatchAction(LayoutRedux.LayoutPreSave(currentLayoutIndex, layoutToSave))
            }
        }
    }

}