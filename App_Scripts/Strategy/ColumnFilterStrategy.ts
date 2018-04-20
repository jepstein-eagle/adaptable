import { IColumnFilterStrategy } from '../Strategy/Interface/IColumnFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { ColumnFilterState } from '../Redux/ActionsReducers/Interface/IState';
import { SearchChangedTrigger } from '../Core/Enums';

export class ColumnFilterStrategy extends AdaptableStrategyBase implements IColumnFilterStrategy {
    private columnFilterState: ColumnFilterState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ColumnFilterStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.ColumnFilterStrategyName, ScreenPopups.ColumnFilterPopup, StrategyGlyphs.ColumnFilterGlyph);
    }

    protected InitState() {
        if (this.columnFilterState != this.GetColumnFilterState()) {
            this.columnFilterState = this.GetColumnFilterState();

            setTimeout(() => this.blotter.applyGridFiltering(), 5);
            if (this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.BlotterOptions.serverSearch == "AllSearch") {
                this.publishServerSearch(SearchChangedTrigger.ColumnFilter)
            }
        }

    }

    private GetColumnFilterState(): ColumnFilterState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter;
    }
}