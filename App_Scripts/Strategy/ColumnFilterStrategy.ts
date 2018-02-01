import { IColumnFilterStrategy, IColumnFilter } from '../Strategy/Interface/IColumnFilterStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import * as StrategyNames from '../Core/StrategyNames'
import * as StrategyGlyphs from '../Core/StrategyGlyphs'
import * as ScreenPopups from '../Core/ScreenPopups'
import { IMenuItem } from '../Strategy/Interface/IStrategy';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IUserFilter } from '../Core/Interface/IExpression';
import { ExpressionHelper } from '../Core/Helpers/ExpressionHelper';
import { Helper } from '../Core/Helpers/Helper';
import { ColumnFilterState } from '../Redux/ActionsReducers/Interface/IState';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'

export class ColumnFilterStrategy extends AdaptableStrategyBase implements IColumnFilterStrategy {
    private filters: ColumnFilterState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ColumnFilterStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.ColumnFilterStrategyName, ScreenPopups.ColumnFilterPopup, StrategyGlyphs.ColumnFilterGlyph);
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