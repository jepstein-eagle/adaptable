import { IColumnFilterStrategy, IColumnFilter } from '../Core/Interface/IColumnFilterStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { ColumnFilterState } from '../Redux/ActionsReducers/Interface/IState';


export class ColumnFilterStrategy extends AdaptableStrategyBase implements IColumnFilterStrategy {
    private ColumnFilters: IColumnFilter[]


    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ColumnFilterStrategyId, blotter)
        this.InitState()
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }


    InitState() {
        if (this.ColumnFilters != this.GetColumnFilterState().ColumnFilters) {
            setTimeout(() => this.blotter.applyColumnFilters(), 5);
            this.ColumnFilters = this.GetColumnFilterState().ColumnFilters;
        }
    }

    getMenuItems(): IMenuItem[] {
        return [];
    }


    private GetColumnFilterState(): ColumnFilterState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter;
    }
}


