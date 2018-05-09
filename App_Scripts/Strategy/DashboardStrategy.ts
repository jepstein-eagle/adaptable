import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IDashboardStrategy } from '../Strategy/Interface/IDashboardStrategy'
import { GridState, DashboardState } from '../Redux/ActionsReducers/Interface/IState';
import { Helper } from '../Core/Helpers/Helper';
import { IGridSort } from '../Core/Api/Interface/AdaptableBlotterObjects';
import * as _ from 'lodash'
import { ArrayExtensions } from '../Core/Extensions/ArrayExtensions';
import { SearchChangedTrigger, Visibility } from '../Core/Enums';
import * as DashboardRedux from '../Redux/ActionsReducers/DashboardRedux'



export class DashboardStrategy extends AdaptableStrategyBase implements IDashboardStrategy {
    private GridSorts: IGridSort[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.DashboardStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.DashboardStrategyName, ScreenPopups.DashboardPopup, StrategyGlyphs.DashboardGlyph);

        this.blotter.LoggingService.LogError("This is an error")
        this.blotter.LoggingService.LogMessage("my message")
        this.blotter.LoggingService.LogWarning("be careful")
    }

    protected addColumnMenuItem(columnId: string): void {
        // for now just show / hide = lets worry about minimise later..
        if (this.GetDashboardState().DashboardVisibility == Visibility.Hidden) {
            this.createMenuItemReduxAction(
                "Show Dashboard",
                StrategyGlyphs.DashboardGlyph,
                DashboardRedux.DashboardSetVisibility(Visibility.Visible))
        } else {
            this.createMenuItemReduxAction(
                "Hide Dashboard",
                StrategyGlyphs.DashboardGlyph,
                DashboardRedux.DashboardSetVisibility(Visibility.Hidden))
        }
    }


    protected InitState() {
        if (!ArrayExtensions.areArraysEqualWithOrderandProperties(this.GridSorts, this.GetGridState().GridSorts)) {
            this.GridSorts = this.GetGridState().GridSorts

            if (this.GetGridState().BlotterOptions.serverSearchOption == "AllSearchandSort") {
                this.publishServerSearch(SearchChangedTrigger.Sort)
            }
        }
    }

    private GetGridState(): GridState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Grid;
    }

    private GetDashboardState(): DashboardState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Dashboard;
    }

}