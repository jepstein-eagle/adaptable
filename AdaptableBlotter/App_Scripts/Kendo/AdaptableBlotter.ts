/// <reference path="../../typings/index.d.ts" />
/// <reference path="../Core/Interface/IStrategy.d.ts" />


import * as React from "react";
import * as ReactDOM from "react-dom";
import {AdaptableBlotterApp} from '../View/AdaptableBlotterView';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import {IAdaptableBlotterStore,AdaptableBlotterStore} from '../Redux/Store/AdaptableBlotterStore'
import {CustomSortStrategy} from './Strategy/CustomSortStrategy'
import {SmartEditStrategy} from './Strategy/SmartEditStrategy'

export interface IAdaptableBlotter{
    AdaptableBlotterStore: IAdaptableBlotterStore;
    ClickedMenu(menuItem: IMenuItem) : void;
}

export class AdaptableBlotter implements IAdaptableBlotter{
    private strategies: IStragegy[]
    public AdaptableBlotterStore : IAdaptableBlotterStore
    constructor(private grid: kendo.ui.Grid, private container: HTMLElement) {
        this.AdaptableBlotterStore = new AdaptableBlotterStore();
        //we build the list of strategies
        this.strategies = [new CustomSortStrategy(),new SmartEditStrategy()]
        //we build the menus from all strategies and update redux store
        this.CreateMenu();
        ReactDOM.render(AdaptableBlotterApp(this), this.container);
    }

    private CreateMenu() {
        let menuItems = [].concat(this.strategies.map(strat => strat.getMenuItems()[0]));
        this.AdaptableBlotterStore.TheStore.dispatch<MenuRedux.SetMenuItemsAction>(MenuRedux.SetMenuItems(menuItems));
    }

    public ClickedMenu(menuItem: IMenuItem)
    {
        //this.strategies.find( x => x.Id == menuItem.StrategyId).
    }

    destroy() {
        ReactDOM.unmountComponentAtNode(this.container);
    }
}