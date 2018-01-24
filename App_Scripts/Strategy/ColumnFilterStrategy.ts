import { IColumnFilterStrategy, IColumnFilter } from '../Core/Interface/IColumnFilterStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import * as StrategyNames from '../Core/StrategyNames'
import * as StrategyGlyphs from '../Core/StrategyGlyphs'
import * as ScreenPopups from '../Core/ScreenPopups'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IUserFilter } from '../Core/Interface/IExpression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { Helper } from '../Core/Helper';
import { ColumnFilterState } from '../Redux/ActionsReducers/Interface/IState';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'

export class ColumnFilterStrategy extends AdaptableStrategyBase implements IColumnFilterStrategy {
    private filters: ColumnFilterState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ColumnFilterStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.ColumnFilterStrategyName, ScreenPopups.ColumnFilterConfig, StrategyGlyphs.ColumnFilterGlyph);
    }

    protected InitState() {
        if (this.filters != this.GetFilterState()) {
            setTimeout(() => this.blotter.applyColumnFilters(), 5);
            this.filters = this.GetFilterState();
            this.AuditFunctionAction("Apply Column Filters",
                "Refresh Column Filters",
                null)
        }
    }

    private GetFilterState(): ColumnFilterState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter;
    }
}