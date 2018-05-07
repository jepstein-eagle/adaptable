import { IColumnFilterStrategy } from '../Strategy/Interface/IColumnFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { FilterState } from '../Redux/ActionsReducers/Interface/IState';
import { IColumnFilter } from '../Core/Api/Interface/AdaptableBlotterObjects';
import { SearchChangedTrigger } from '../Core/Enums';

export class ColumnFilterStrategy extends AdaptableStrategyBase implements IColumnFilterStrategy {
    private filterState: IColumnFilter[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ColumnFilterStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.ColumnFilterStrategyName, ScreenPopups.ColumnFilterPopup, StrategyGlyphs.ColumnFilterGlyph);
    }

    protected InitState() {
        if (this.filterState != this.GetColumnFilterState()) {
            this.filterState = this.GetColumnFilterState();

            setTimeout(() => this.blotter.applyGridFiltering(), 5);
            if (this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.BlotterOptions.serverSearchOption == 'AllSearch' || 'AllSearchandSort') {
                this.publishServerSearch(SearchChangedTrigger.ColumnFilter)
            }
        }

    }

    private GetColumnFilterState(): IColumnFilter[] {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Filter.ColumnFilters;
    }
}