import { IColumnFilterStrategy } from './Interface/IColumnFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import * as ColumnFilterRedux from '../Redux/ActionsReducers/ColumnFilterRedux'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IColumnFilter } from '../Core/Api/Interface/IAdaptableBlotterObjects';
import { SearchChangedTrigger, StateChangedTrigger } from '../Core/Enums';
import { IColumn } from '../Core/Interface/IColumn';
import { ColumnHelper } from '../Core/Helpers/ColumnHelper';

export class ColumnFilterStrategy extends AdaptableStrategyBase implements IColumnFilterStrategy {
    private columnFilterState: IColumnFilter[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ColumnFilterStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.ColumnFilterStrategyName, ScreenPopups.ColumnFilterPopup, StrategyIds.ColumnFilterGlyph);
    }

    public addContextMenuItem(columnId: string): void {
        if (this.canCreateContextMenuItem(columnId, this.blotter, "filter")) {

            let column: IColumn = ColumnHelper.getColumnFromId(columnId, this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns);
            if (column) {
                let existingColumnFilter = this.columnFilterState.find(x => x.ColumnId == columnId);
                if (existingColumnFilter) {
                    this.createContextMenuItemReduxAction(
                        "Clear Column Filter",
                        StrategyIds.ColumnFilterGlyph,
                        ColumnFilterRedux.ColumnFilterClear(columnId))
                }
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