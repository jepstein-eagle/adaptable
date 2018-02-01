import { IQuickSearchStrategy } from '../Strategy/Interface/IQuickSearchStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IMenuItem } from '../Strategy/Interface/IStrategy';
import { AdaptableBlotter } from '../Vendors/agGrid/AdaptableBlotter';
import {  LeafExpressionOperator, QuickSearchDisplayType, SortOrder } from '../Core/Enums';
import { StringExtensions } from '../Core/Extensions'
import { QuickSearchState, GridState } from '../Redux/ActionsReducers/Interface/IState'
import { Helper } from '../Core/Helpers/Helper'
import { QuickSearchStrategy } from './QuickSearchStrategy';


export class QuickSearchStrategyagGrid extends QuickSearchStrategy implements IQuickSearchStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
    }

   

    protected  postSearch(){
        let theBlotter = this.blotter as AdaptableBlotter
        //TODO : This is probably temporary and is used to reevaluate the quicksearch CellClassRules
        theBlotter.redrawRows()
    }
}