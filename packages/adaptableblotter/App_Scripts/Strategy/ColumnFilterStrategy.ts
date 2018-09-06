import { IColumnFilterStrategy } from './Interface/IColumnFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
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
        this.createMenuItemShowPopup(StrategyIds.ColumnFilterStrategyName, ScreenPopups.ColumnFilterPopup, StrategyIds.ColumnFilterGlyph);
    }

    protected InitState() {
        if (this.filterState != this.GetColumnFilterState()) {
            this.filterState = this.GetColumnFilterState();

            setTimeout(() => this.blotter.applyGridFiltering(), 5);
            if (this.blotter.BlotterOptions.serverSearchOption == 'AllSearch' || 'AllSearchandSort') {
                this.publishServerSearch(SearchChangedTrigger.ColumnFilter)
            }
        }

    }

    private GetColumnFilterState(): IColumnFilter[] {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Filter.ColumnFilters;
    }
}