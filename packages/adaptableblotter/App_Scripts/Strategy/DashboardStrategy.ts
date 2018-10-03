import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IDashboardStrategy } from './Interface/IDashboardStrategy'
import { GridState, DashboardState } from '../Redux/ActionsReducers/Interface/IState';
import { IGridSort } from '../Core/Api/Interface/AdaptableBlotterObjects';
import { ArrayExtensions } from '../Core/Extensions/ArrayExtensions';
import { SearchChangedTrigger, Visibility, StateChangedTrigger } from '../Core/Enums';
import * as DashboardRedux from '../Redux/ActionsReducers/DashboardRedux'
import { LayoutHelper } from '../Core/Helpers/LayoutHelper';

export class DashboardStrategy extends AdaptableStrategyBase implements IDashboardStrategy {
    private GridSorts: IGridSort[]
    private GridState: GridState
    private DashboardState: DashboardState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.DashboardStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.DashboardStrategyName, ScreenPopups.DashboardPopup, StrategyIds.DashboardGlyph);
    }

    public addContextMenuItem(): void {
        // for now just show / hide = lets worry about minimise later..
        if (this.GetDashboardState().DashboardVisibility == Visibility.Hidden) {
            this.createContextMenuItemReduxAction(
                "Show Dashboard",
                StrategyIds.DashboardGlyph,
                DashboardRedux.DashboardSetVisibility(Visibility.Visible))
        } else {
            this.createContextMenuItemReduxAction(
                "Hide Dashboard",
                StrategyIds.DashboardGlyph,
                DashboardRedux.DashboardSetVisibility(Visibility.Hidden))
        }
    }


    protected InitState() {
        if (this.DashboardState != this.blotter.AdaptableBlotterStore.TheStore.getState().Dashboard) {
             this.DashboardState = this.blotter.AdaptableBlotterStore.TheStore.getState().Dashboard;
           
            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.Dashboard, this.DashboardState)
            }
        }
       
       
        // none of this should be here - should be in a GridStrategy that cannot be hidden
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


    private GetDashboardState(): DashboardState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Dashboard;
    }

}