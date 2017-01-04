import { IFilterStrategy, IColumnFilter, IFilterContext } from '../Core/Interface/IFilterStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType, ColumnType } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { Helper } from '../Core/Helper';
import { FilterState } from '../Redux/ActionsReducers/Interface/IState';


export class FilterStrategy extends AdaptableStrategyBase implements IFilterStrategy {
    private ColumnFilters: IColumnFilter[]


    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.FilterStrategyId, blotter)
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }


    InitState() {
        if (this.ColumnFilters != this.GetFilterState().ColumnFilters) {

            this.blotter.applyColumnFilters();
            this.ColumnFilters = this.GetFilterState().ColumnFilters;
        }
    }

    getMenuItems(): IMenuItem[] {
        return [];
    }


    private GetFilterState(): FilterState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Filter;
    }
}


