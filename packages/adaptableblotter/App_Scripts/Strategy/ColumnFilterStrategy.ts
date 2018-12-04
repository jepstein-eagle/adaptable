import { IColumnFilterStrategy } from './Interface/IColumnFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import * as ColumnFilterRedux from '../Redux/ActionsReducers/ColumnFilterRedux'
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';
import { IColumnFilter } from '../Api/Interface/IAdaptableBlotterObjects';
import { SearchChangedTrigger, StateChangedTrigger } from '../Utilities/Enums';
import { IColumn } from '../Api/Interface/IColumn';
import { ColumnHelper } from '../Utilities/Helpers/ColumnHelper';

export class ColumnFilterStrategy extends AdaptableStrategyBase implements IColumnFilterStrategy {
    private columnFilterState: IColumnFilter[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.ColumnFilterStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ColumnFilterStrategyName, ScreenPopups.ColumnFilterPopup, StrategyConstants.ColumnFilterGlyph);
    }

    public addContextMenuItem(column: IColumn): void {
        if (this.canCreateContextMenuItem(column, this.blotter, "filter")) {
            let existingColumnFilter = this.columnFilterState.find(x => x.ColumnId == column.ColumnId);
            if (existingColumnFilter) {
                this.createContextMenuItemReduxAction(
                    "Clear Column Filter",
                    StrategyConstants.ColumnFilterGlyph,
                    ColumnFilterRedux.ColumnFilterClear(column.ColumnId))
            }
        }
    }

    protected InitState() {
        if (this.columnFilterState != this.GetColumnFilterState()) {
            this.columnFilterState = this.GetColumnFilterState();

            setTimeout(() => this.blotter.applyGridFiltering(), 5);
            if (this.blotter.BlotterOptions.serverSearchOption == 'AllSearch' || 'AllSearchandSort') {
                this.publishSearchChanged(SearchChangedTrigger.ColumnFilter)
            }

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.ColumnFilter, this.columnFilterState)
            }
        }

    }

    private GetColumnFilterState(): IColumnFilter[] {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters;
    }
}