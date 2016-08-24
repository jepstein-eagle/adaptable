/// <reference path="../../../typings/index.d.ts" />

import * as Redux from "redux";

import * as MenuRedux from '../ActionsReducers/MenuRedux'
import * as PopupRedux from '../ActionsReducers/PopupRedux'
import * as SmartEditRedux from '../ActionsReducers/SmartEditRedux'

//TODO : need to move the interface
import {IAdaptableBlotter} from '../../Kendo/AdaptableBlotter'
import * as StrategyIds from '../../Core/StrategyIds'
//TODO : need to move the interface
import {ISmartEditStrategy} from '../../Kendo/Strategy/SmartEditStrategy'

export interface AdaptableBlotterState {
    Popup: PopupRedux.PopupState;
    Menu: MenuRedux.MenuState;
    SmartEdit: SmartEditRedux.SmartEditState;
}

export interface IAdaptableBlotterStore {
    TheStore: Redux.Store<AdaptableBlotterState>
}

const rootReducer: Redux.Reducer<AdaptableBlotterState> = Redux.combineReducers<AdaptableBlotterState>({
    Popup: PopupRedux.ShowPopupReducer,
    Menu: MenuRedux.MenuReducer,
    SmartEdit: SmartEditRedux.SmartEditReducer
});

//export const Store: Redux.Store<AdaptableBlotterState> = Redux.createStore<AdaptableBlotterState>(rootReducer);

export class AdaptableBlotterStore implements IAdaptableBlotterStore {
    public TheStore: Redux.Store<AdaptableBlotterState>
    constructor(private blotter: IAdaptableBlotter) {
        this.TheStore = Redux.createStore<AdaptableBlotterState>(rootReducer, Redux.applyMiddleware(snooper, adaptableBlotterMiddleware(blotter)));
    }
}

//TODO : this is just used for debugging for now until we/I setup proper build with dev http server
var snooper: Redux.Middleware = function (middlewareAPI: Redux.MiddlewareAPI<AdaptableBlotterState>) {
    return function (next: Redux.Dispatch<AdaptableBlotterState>) {
        return function (action: Redux.Action) {
            console.log("snooping at `action`: " + action.type);
            let ret = next(action);
            console.log(middlewareAPI.getState())
            return ret;
        }
    }
}

var adaptableBlotterMiddleware = (adaptableBlotter: IAdaptableBlotter): Redux.Middleware => function (middlewareAPI: Redux.MiddlewareAPI<AdaptableBlotterState>) {
    return function (next: Redux.Dispatch<AdaptableBlotterState>) {
        return function (action: Redux.Action) {
            switch (action.type) {
                //TODO : Need to refactor this :)
                case SmartEditRedux.SMARTEDIT_SETOPERATION: {
                    let SmartEditStrategy = <ISmartEditStrategy>(adaptableBlotter.Strategies.get(StrategyIds.SmartEditStrategyId));
                    let apiReturn = SmartEditStrategy.BuildPreviewValues(middlewareAPI.getState().SmartEdit.SmartEditValue, (<SmartEditRedux.SmartEditSetOperationAction>action).SmartEditOperation);
                    if (apiReturn.Error) {
                        middlewareAPI.dispatch(PopupRedux.ErrorPopup(apiReturn.Error));
                    }
                    else {
                        middlewareAPI.dispatch(SmartEditRedux.SmartEditSetPreview(apiReturn.ActionReturn));
                    }
                    return next(action);
                }
                case SmartEditRedux.SMARTEDIT_SETVALUE: {
                    let SmartEditStrategy = <ISmartEditStrategy>(adaptableBlotter.Strategies.get(StrategyIds.SmartEditStrategyId));
                    let apiReturn = SmartEditStrategy.BuildPreviewValues((<SmartEditRedux.SmartEditSetValueAction>action).value, middlewareAPI.getState().SmartEdit.SmartEditOperation);
                    if (apiReturn.Error) {
                        middlewareAPI.dispatch(PopupRedux.ErrorPopup(apiReturn.Error));
                    }
                    else {
                        middlewareAPI.dispatch(SmartEditRedux.SmartEditSetPreview(apiReturn.ActionReturn));
                    }
                    return next(action);
                }
                case SmartEditRedux.SMARTEDIT_FETCHPREVIEW: {
                    let SmartEditStrategy = <ISmartEditStrategy>(adaptableBlotter.Strategies.get(StrategyIds.SmartEditStrategyId));
                    let apiReturn = SmartEditStrategy.BuildPreviewValues(middlewareAPI.getState().SmartEdit.SmartEditValue, middlewareAPI.getState().SmartEdit.SmartEditOperation);
                    if (apiReturn.Error) {
                        middlewareAPI.dispatch(PopupRedux.ErrorPopup(apiReturn.Error));
                    }
                    else {
                        middlewareAPI.dispatch(SmartEditRedux.SmartEditSetPreview(apiReturn.ActionReturn));
                    }
                    return next(action);
                }
                case SmartEditRedux.SMARTEDIT_APPLY: {
                    let SmartEditStrategy = <ISmartEditStrategy>(adaptableBlotter.Strategies.get(StrategyIds.SmartEditStrategyId));
                    SmartEditStrategy.ApplySmartEdit(middlewareAPI.getState().SmartEdit.SmartEditValue, middlewareAPI.getState().SmartEdit.SmartEditOperation);
                    middlewareAPI.dispatch(PopupRedux.HidePopup());
                    return next(action);
                }
                default:
                    return next(action);
            }
        }
    }
}