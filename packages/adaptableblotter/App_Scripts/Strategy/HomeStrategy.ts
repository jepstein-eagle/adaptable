import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Core/Constants/StrategyConstants'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IHomeStrategy } from './Interface/IHomeStrategy'
import { GridState } from '../Redux/ActionsReducers/Interface/IState';
import { IGridSort } from '../Core/Api/Interface/IAdaptableBlotterObjects';
import { ArrayExtensions } from '../Core/Extensions/ArrayExtensions';
import { SearchChangedTrigger } from '../Core/Enums';
import { LayoutHelper } from '../Core/Helpers/LayoutHelper';

// This is a special strategy that the user can never remove but which is useful to us 
export class HomeStrategy extends AdaptableStrategyBase implements IHomeStrategy {
    private GridSorts: IGridSort[]
    private GridState: GridState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.HomeStrategyId, blotter)
    }


    protected InitState() {
        if (!ArrayExtensions.areArraysEqualWithOrderandProperties(this.GridSorts, this.GetGridState().GridSorts)) {
            this.GridSorts = this.GetGridState().GridSorts

            if (this.blotter.BlotterOptions.serverSearchOption == "AllSearchandSort") {
                this.publishSearchChanged(SearchChangedTrigger.Sort)
            }
        }

        if (this.GridState != this.GetGridState()) {
            if (this.GridState != null && this.GridState.Columns != null && this.GridState.GridSorts != null) {

                if (this.GridState.Columns != this.GetGridState().Columns || this.GridState.GridSorts != this.GetGridState().GridSorts) {
                    this.GridState = this.GetGridState();
                    LayoutHelper.autoSaveLayout(this.blotter);
                }
            }
            this.GridState = this.GetGridState();
        }
    }


    private GetGridState(): GridState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Grid;
    }


}