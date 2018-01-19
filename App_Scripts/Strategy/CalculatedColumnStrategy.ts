import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyConstants from '../Core/StrategyConstants'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import { ICalculatedColumn } from "../Core/Interface/ICalculatedColumnStrategy";

export class CalculatedColumnStrategy extends AdaptableStrategyBase {
    private CalculatedColumns: ICalculatedColumn[]
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.CalculatedColumnStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Calculated Column", 'CalculatedColumnConfig', "th-list");
    }

    protected InitState() {
        if (this.CalculatedColumns != this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn.CalculatedColumns) {
            //All the logic is managed in the redux store middleware
            this.CalculatedColumns = this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn.CalculatedColumns;
        }
    }

    protected addColumnMenuItems(columnId: string): void {
        let column = this.CalculatedColumns.find(c => c.ColumnId == columnId);
        if (column) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                MenuRedux.AddItemColumnContextMenu(this.createMenuItemShowPopup(
                    "Edit Calculated Column",
                    'CalculatedColumnConfig',
                    "th-list",
                    "Edit|" + columnId)))
        }
    }
}