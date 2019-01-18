import { IUserFilterStrategy } from './Interface/IUserFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { IUserFilter } from '../Utilities/Interface/IAdaptableBlotterObjects';
import { SearchChangedTrigger, StateChangedTrigger } from '../Utilities/Enums';
import { IColumn } from '../Utilities/Interface/IColumn';

export class UserFilterStrategy extends AdaptableStrategyBase implements IUserFilterStrategy {
    private userFilters: IUserFilter[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.UserFilterStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.UserFilterStrategyName, ScreenPopups.UserFilterPopup, StrategyConstants.UserFilterGlyph);
    }

    public addContextMenuItem(column: IColumn): void {
        if (this.canCreateContextMenuItem(column, this.blotter, "columnfilter")) {
            this.createContextMenuItemShowPopup(
                "Create User Filter",
                ScreenPopups.UserFilterPopup,
                StrategyConstants.UserFilterGlyph,
                "New|" + column.ColumnId
            )
        }
    }

    protected InitState() {
        if (this.userFilters != this.GetUserFilterState()) {
            this.userFilters = this.GetUserFilterState();

            setTimeout(() => this.blotter.applyGridFiltering(), 5);
            if (this.blotter.BlotterOptions.generalOptions.serverSearchOption != 'None') {
                // we cannot stop all extraneous publishing (e.g. we publish if the changed user filter is NOT being used)
                // but we can at least ensure that we only publish IF there are live searches or column filters
                if (StringExtensions.IsNotNullOrEmpty(this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearch)
                    || this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters.length > 0) {
                    this.publishSearchChanged(SearchChangedTrigger.UserFilter)
                }
            }

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.UserFilter, this.userFilters)
            }
        }
    }

    private GetUserFilterState(): IUserFilter[] {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters;
    }
}


