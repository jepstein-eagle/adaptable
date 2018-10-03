import { IUserFilterStrategy } from './Interface/IUserFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { StringExtensions } from '../Core/Extensions/StringExtensions';
import { IUserFilter } from '../Core/Api/Interface/AdaptableBlotterObjects';
import { SearchChangedTrigger, StateChangedTrigger } from '../Core/Enums';

export class UserFilterStrategy extends AdaptableStrategyBase implements IUserFilterStrategy {
    private userFilters: IUserFilter[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.UserFilterStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.UserFilterStrategyName, ScreenPopups.UserFilterPopupPopup, StrategyIds.UserFilterGlyph);
    }

    public addContextMenuItem(columnId: string): void {
        if (this.canCreateContextMenuItem(columnId, this.blotter, "filter")) {
            this.createContextMenuItemShowPopup(
                "Create User Filter",
                ScreenPopups.UserFilterPopupPopup,
                StrategyIds.UserFilterGlyph,
            )
        }
    }

    protected InitState() {
        if (this.userFilters != this.GetUserFilterState()) {
            this.userFilters = this.GetUserFilterState();

            setTimeout(() => this.blotter.applyGridFiltering(), 5);
            if (this.blotter.BlotterOptions.serverSearchOption != 'None') {
                // we cannot stop all extraneous publishing (e.g. we publish if the changed user filter is NOT being used)
                // but we can at least ensure that we only publish IF there are live searches or column filters
                if (StringExtensions.IsNotNullOrEmpty(this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearch)
                    || this.blotter.AdaptableBlotterStore.TheStore.getState().Filter.ColumnFilters.length > 0) {
                    this.publishSearchChanged(SearchChangedTrigger.UserFilter)
                }
            }

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.UserFilter, this.userFilters)
            }
        }
    }

    private GetUserFilterState(): IUserFilter[] {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Filter.UserFilters;
    }
}


