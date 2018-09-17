import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import {  ICalculatedColumnStrategy } from "./Interface/ICalculatedColumnStrategy";
import { ICalculatedColumn } from '../Core/Api/Interface/AdaptableBlotterObjects';

export class CalculatedColumnStrategy extends AdaptableStrategyBase implements ICalculatedColumnStrategy{
    private CalculatedColumns: ICalculatedColumn[]
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CalculatedColumnStrategyId, blotter)
    }

    protected InitState() {
        if (this.CalculatedColumns != this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn.CalculatedColumns) {
            //All the logic is managed in the redux store middleware
            this.CalculatedColumns = this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn.CalculatedColumns;
        }
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.CalculatedColumnStrategyName, ScreenPopups.CalculatedColumnPopup, StrategyIds.CalculatedColumnGlyph);
    }

    public addContextMenuItem(columnId: string): void {
        if (this.canCreateContextMenuItem(columnId, this.blotter)) {
            this.createContextMenuItemShowPopup(
                "Edit " + StrategyIds.CalculatedColumnStrategyName,
                ScreenPopups.CalculatedColumnPopup,
                StrategyIds.CalculatedColumnGlyph,
                "Edit|" + columnId)
        }
    }
}