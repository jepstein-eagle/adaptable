/// <reference path="../../../typings/index.d.ts" />

import * as Redux from "redux";
import * as ReduxStorage from 'redux-storage'

import * as MenuRedux from '../ActionsReducers/MenuRedux'
import * as PopupRedux from '../ActionsReducers/PopupRedux'
import * as SmartEditRedux from '../ActionsReducers/SmartEditRedux'
import * as CustomSortRedux from '../ActionsReducers/CustomSortRedux'
import * as ShortcutRedux from '../ActionsReducers/ShortcutRedux'
import * as GridRedux from '../ActionsReducers/GridRedux'
import * as PlusMinusRedux from '../ActionsReducers/PlusMinusRedux'
import createEngine from 'redux-storage-engine-localstorage';

import * as StrategyIds from '../../Core/StrategyIds'
import {IAdaptableBlotter} from '../../Core/Interface/IAdaptableBlotter'
import {ISmartEditStrategy, ISmartEditPreviewReturn} from '../../Core/Interface/ISmartEditStrategy'
import {AdaptableBlotterState, IAdaptableBlotterStore} from './Interface/IAdaptableStore'
import {IUIError} from '../../Core/interface/IStrategy'

const rootReducer: Redux.Reducer<AdaptableBlotterState> = Redux.combineReducers<AdaptableBlotterState>({
    Popup: PopupRedux.ShowPopupReducer,
    Menu: MenuRedux.MenuReducer,
    SmartEdit: SmartEditRedux.SmartEditReducer,
    CustomSort: CustomSortRedux.CustomSortReducer,
    Shortcut: ShortcutRedux.ShortcutReducer,
    Grid: GridRedux.GridReducer,
    PlusMinus: PlusMinusRedux.PlusMinusReducer
});

const RESET_STATE = 'RESET_STATE';
const INIT_STATE = 'INIT_STATE';
export interface ResetUserDataAction extends Redux.Action {
}
export interface InitStateAction extends Redux.Action {
}
export const ResetUserData = (): ResetUserDataAction => ({
    type: RESET_STATE
})
export const InitState = (): ResetUserDataAction => ({
    type: INIT_STATE
})
const rootReducerWithResetManagement = (state: AdaptableBlotterState, action: Redux.Action) => {
    if (action.type === RESET_STATE) {
        //This trigger the persist of the state with fuck all as well
        state = undefined
    }

    return rootReducer(state, action)
}



//TODO: need to make this members of AdaptableBlotterStore so we can have mutiple instances
const engineReduxStorage = createEngine('my-adaptable-blotter-key');
//TODO: currently we persits the state after EVERY actions. Need to see what we decide for that
const middlewareReduxStorage = ReduxStorage.createMiddleware(engineReduxStorage);
const reducerWithStorage = ReduxStorage.reducer<AdaptableBlotterState>(rootReducerWithResetManagement);
const loadStorage = ReduxStorage.createLoader(engineReduxStorage);



export class AdaptableBlotterStore implements IAdaptableBlotterStore {
    public TheStore: Redux.Store<AdaptableBlotterState>
    constructor(private blotter: IAdaptableBlotter) {
        //been looking to do that for a couple of hours and I have no idea how I came up with that syntax but it fucking works!
        let finalCreateStore = Redux.compose(
            Redux.applyMiddleware(snooper, adaptableBlotterMiddleware(blotter), middlewareReduxStorage),
            (<any>window).devToolsExtension ? (<any>window).devToolsExtension() : f => f
        )(Redux.createStore);
        
        //TODO: need to check if we want the storage to be done before or after 
        //we enrich the state with the AB middleware
        this.TheStore = <Redux.Store<AdaptableBlotterState>>(finalCreateStore(reducerWithStorage));

        //We load the previous saved session. Redux is pretty awesome in its simplicity!
        loadStorage(this.TheStore)
            .then(() => this.TheStore.dispatch(InitState()))
            .catch(() => console.log('Failed to load previous adaptable blotter state'));
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
                //here we have all actions that triggers a refresh of the SmartEditPreview
                case SmartEditRedux.SMARTEDIT_SETOPERATION:
                case SmartEditRedux.SMARTEDIT_SETVALUE:
                case SmartEditRedux.SMARTEDIT_FETCHPREVIEW: {
                    //all our logic needs to be executed AFTER the main reducers 
                    //so our state is up to date which allow us not to care about the data within each different action
                    let returnAction = next(action);

                    let SmartEditStrategy = <ISmartEditStrategy>(adaptableBlotter.Strategies.get(StrategyIds.SmartEditStrategyId));
                    let state = middlewareAPI.getState();

                    let apiReturn = SmartEditStrategy.BuildPreviewValues(state.SmartEdit.SmartEditValue,
                        state.SmartEdit.SmartEditOperation);

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
                //We rebuild the menu from scratch
                //the difference between the two is that RESET_STATE is handled before and set the state to undefined
                case INIT_STATE:
                case RESET_STATE: {
                    let returnAction = next(action);
                    adaptableBlotter.CreateMenu();
                    adaptableBlotter.SetColumnIntoStore();
                    return returnAction;
                }
                default:
                    return next(action);
            }
        }
    }
}