import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../api/Interface/IAdaptableBlotter'
import { IDashboardStrategy } from './Interface/IDashboardStrategy'
import { DashboardState } from '../Redux/ActionsReducers/Interface/IState';
import { Visibility, StateChangedTrigger } from '../Utilities/Enums';
import * as DashboardRedux from '../Redux/ActionsReducers/DashboardRedux'

export class DashboardStrategy extends AdaptableStrategyBase implements IDashboardStrategy {
     private DashboardState: DashboardState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.DashboardStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.DashboardStrategyName, ScreenPopups.DashboardPopup, StrategyConstants.DashboardGlyph);
    }

    public addContextMenuItem(): void {
        // for now just show / hide = lets worry about minimise later..
        if (this.GetDashboardState().DashboardVisibility == Visibility.Hidden) {
            this.createContextMenuItemReduxAction(
                "Show Dashboard",
                StrategyConstants.DashboardGlyph,
                DashboardRedux.DashboardSetVisibility(Visibility.Visible))
        } else {
            this.createContextMenuItemReduxAction(
                "Hide Dashboard",
                StrategyConstants.DashboardGlyph,
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
    }


    private GetDashboardState(): DashboardState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Dashboard;
    }

}