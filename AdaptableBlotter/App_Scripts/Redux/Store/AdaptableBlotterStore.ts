/// <reference path="../../../typings/index.d.ts" />

import * as Redux from "redux";

import * as MenuRedux from '../ActionsReducers/MenuRedux'
import * as PopupRedux from '../ActionsReducers/PopupRedux'

export interface AdaptableBlotterState {
    Popup: PopupRedux.PopupState;
    Menu: MenuRedux.MenuState;
}

export interface IAdaptableBlotterStore{
    TheStore : Redux.Store<AdaptableBlotterState>
}

const rootReducer: Redux.Reducer<AdaptableBlotterState> = Redux.combineReducers<AdaptableBlotterState>({
    Popup: PopupRedux.ShowPopupReducer, Menu: MenuRedux.MenuReducer
});


//export const Store: Redux.Store<AdaptableBlotterState> = Redux.createStore<AdaptableBlotterState>(rootReducer);

export class AdaptableBlotterStore implements IAdaptableBlotterStore{
    public TheStore : Redux.Store<AdaptableBlotterState>
    constructor(){
        Redux.applyMiddleware
        this.TheStore = Redux.createStore<AdaptableBlotterState>(rootReducer, Redux.applyMiddleware(snooper));
    }
}

var snooper = function(middlewareAPI:any){
    return function(next:any){
        return function(action:any){
            console.log("snooping at `next`: "+action.type);
            return next(action);
        }
    }
}