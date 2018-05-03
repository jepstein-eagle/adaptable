import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IDashboardStrategy } from '../Strategy/Interface/IDashboardStrategy'
import { GridState } from '../Redux/ActionsReducers/Interface/IState';
import { Helper } from '../Core/Helpers/Helper';
import { IGridSort } from '../Core/Api/Interface/AdaptableBlotterObjects';
import * as _ from 'lodash'
import { ArrayExtensions } from '../Core/Extensions/ArrayExtensions';



export class DashboardStrategy extends AdaptableStrategyBase implements IDashboardStrategy {
    private GridSorts: IGridSort[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.DashboardStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.DashboardStrategyName, ScreenPopups.DashboardPopup, StrategyGlyphs.DashboardGlyph);
    }


    protected InitState() {
        if (!ArrayExtensions.areArraysEqualWithOrderandProperties(this.GridSorts, this.GetGridState().GridSorts)) {
            this.GridSorts = this.GetGridState().GridSorts

            if (this.GetGridState().BlotterOptions.serverSearchOption == "AllSearchandSort") {
                this.publishServerSearch("Sort")
            }
            
            
            var users = [
                { 'user': 'fred',   'age': 53 },
                { 'user': 'barney', 'age': 48 },
                { 'user': 'fred',   'age': 100 },
                { 'user': 'barney', 'age': 36 }
              ];
              
              var funcResult = _.orderBy(users, [(user) => 'age', (user) => user.user], ["asc", "desc"]);

              let x: any = funcResult;

        }
    }

    private GetGridState(): GridState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Grid;
    }

}