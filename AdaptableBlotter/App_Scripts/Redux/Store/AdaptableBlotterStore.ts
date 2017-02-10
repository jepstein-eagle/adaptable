/// <reference path="../../../typings/index.d.ts" />

import * as Redux from "redux";
import * as ReduxStorage from 'redux-storage'
import * as DeepDiff from 'deep-diff'

import * as MenuRedux from '../ActionsReducers/MenuRedux'
import * as PopupRedux from '../ActionsReducers/PopupRedux'
import * as SmartEditRedux from '../ActionsReducers/SmartEditRedux'
import * as CustomSortRedux from '../ActionsReducers/CustomSortRedux'
import * as ShortcutRedux from '../ActionsReducers/ShortcutRedux'
import * as GridRedux from '../ActionsReducers/GridRedux'
import * as PlusMinusRedux from '../ActionsReducers/PlusMinusRedux'
import * as ColumnChooserRedux from '../ActionsReducers/ColumnChooserRedux'
import * as ExportRedux from '../ActionsReducers/ExportRedux'
import * as PrintPreviewRedux from '../ActionsReducers/PrintPreviewRedux'
import * as FlashingCellsRedux from '../ActionsReducers/FlashingCellsRedux'
import * as CalendarRedux from '../ActionsReducers/CalendarRedux'
import * as ConditionalStyleRedux from '../ActionsReducers/ConditionalStyleRedux'
import * as QuickSearchRedux from '../ActionsReducers/QuickSearchRedux'
import * as AdvancedSearchRedux from '../ActionsReducers/AdvancedSearchRedux'
import * as UserFilterRedux from '../ActionsReducers/UserFilterRedux'
import * as ColumnFilterRedux from '../ActionsReducers/ColumnFilterRedux'
import * as ThemeRedux from '../ActionsReducers/ThemeRedux'
import * as CellValidationRedux from '../ActionsReducers/CellValidationRedux'
import createEngine from 'redux-storage-engine-localstorage';
import * as StrategyIds from '../../Core/StrategyIds'
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter'
import { ISmartEditStrategy, ISmartEditPreviewReturn } from '../../Core/Interface/ISmartEditStrategy'
import { IShortcutStrategy } from '../../Core/Interface/IShortcutStrategy'
import { IExportStrategy } from '../../Core/Interface/IExportStrategy'
import { IPrintPreviewStrategy } from '../../Core/Interface/IPrintPreviewStrategy'
import { IPlusMinusStrategy } from '../../Core/Interface/IPlusMinusStrategy'
import { IColumnChooserStrategy } from '../../Core/Interface/IColumnChooserStrategy'
import { AdaptableBlotterState, IAdaptableBlotterStore } from './Interface/IAdaptableStore'
import { IUIError, ICellInfo } from '../../Core/interface/IStrategy'

const rootReducer: Redux.Reducer<AdaptableBlotterState> = Redux.combineReducers<AdaptableBlotterState>({
    Popup: PopupRedux.ShowPopupReducer,
    Menu: MenuRedux.MenuReducer,
    SmartEdit: SmartEditRedux.SmartEditReducer,
    CustomSort: CustomSortRedux.CustomSortReducer,
    Shortcut: ShortcutRedux.ShortcutReducer,
    Grid: GridRedux.GridReducer,
    PlusMinus: PlusMinusRedux.PlusMinusReducer,
    Export: ExportRedux.ExportReducer,
    FlashingCell: FlashingCellsRedux.FlashingCellReducer,
    Calendars: CalendarRedux.CalendarReducer,
    ConditionalStyle: ConditionalStyleRedux.ConditionalStyleReducer,
    PrintPreview: PrintPreviewRedux.PrintPreviewReducer,
    QuickSearch: QuickSearchRedux.QuickSearchReducer,
    AdvancedSearch: AdvancedSearchRedux.AdvancedSearchReducer,
    UserFilter: UserFilterRedux.UserFilterReducer,
    ColumnFilter: ColumnFilterRedux.ColumnFilterReducer,
    Theme: ThemeRedux.ThemeReducer,
    CellValidation: CellValidationRedux.CellValidationReducer
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
            Redux.applyMiddleware(/*snooper,*/ diffStateAuditMiddleware(blotter), adaptableBlotterMiddleware(blotter), middlewareReduxStorage),
            (<any>window).devToolsExtension ? (<any>window).devToolsExtension() : f => f
        )(Redux.createStore);

        //TODO: need to check if we want the storage to be done before or after 
        //we enrich the state with the AB middleware
        this.TheStore = <Redux.Store<AdaptableBlotterState>>(finalCreateStore(reducerWithStorage));

        //We load the previous saved session. Redux is pretty awesome in its simplicity!
        loadStorage(this.TheStore)
            .then(() => this.TheStore.dispatch(InitState()))
            .catch((e) => {
                console.log('Failed to load previous adaptable blotter state : ' + e);
                //for now i'm still initializing the AB even if loading state has failed.... 
                //we may revisit that later
                this.TheStore.dispatch(InitState())
            });
    }
}

//not needed anymore since Redux DevToolsExtension is working
// var snooper: Redux.Middleware = function (middlewareAPI: Redux.MiddlewareAPI<AdaptableBlotterState>) {
//     return function (next: Redux.Dispatch<AdaptableBlotterState>) {
//         return function (action: Redux.Action) {
//             console.log("snooping at `action`: " + action.type);
//             let ret = next(action);
//             console.log(middlewareAPI.getState())
//             return ret;
//         }
//     }
// }

var diffStateAuditMiddleware = (adaptableBlotter: IAdaptableBlotter): Redux.Middleware => function (middlewareAPI: Redux.MiddlewareAPI<AdaptableBlotterState>) {
    return function (next: Redux.Dispatch<AdaptableBlotterState>) {
        return function (action: Redux.Action) {
            let oldState = middlewareAPI.getState()

            let ret = next(action);
            if (action.type != ReduxStorage.SAVE) {
                let newState = middlewareAPI.getState()
                let diff = DeepDiff.diff(oldState, newState)
                adaptableBlotter.AuditLogService.AddStateChangeAuditLog(diff, action.type)
            }

            return ret;
        }
    }
}

var adaptableBlotterMiddleware = (adaptableBlotter: IAdaptableBlotter): Redux.Middleware => function (middlewareAPI: Redux.MiddlewareAPI<AdaptableBlotterState>) {
    return function (next: Redux.Dispatch<AdaptableBlotterState>) {
        return function (action: Redux.Action) {
            switch (action.type) {
                case GridRedux.SET_GRIDVALUE_LIKE_EDIT: {
                    let actionTyped = <GridRedux.SetValueAction>action
                    //We set the value in the grid
                    adaptableBlotter.setValue(actionTyped.CellInfo)
                    //We AuditLog the Edit
                    adaptableBlotter.AuditLogService.AddEditCellAuditLog(actionTyped.CellInfo.Id, actionTyped.CellInfo.ColumnId, actionTyped.OldValue, actionTyped.CellInfo.Value)
                    return next(action);
                }
                case PopupRedux.CONFIRM_CONFIRMATIONPOPUP: {
                    let confirmationAction = middlewareAPI.getState().Popup.ConfirmationPopup.ConfirmAction
                    if (confirmationAction) {
                        middlewareAPI.dispatch(confirmationAction);
                    }
                    return next(action);
                }
                case PopupRedux.CANCEL_CONFIRMATIONPOPUP: {
                    let cancelAction = middlewareAPI.getState().Popup.ConfirmationPopup.CancelAction
                    if (cancelAction) {
                        middlewareAPI.dispatch(cancelAction);
                    }
                    return next(action);
                }
                //here we have all actions that triggers a refresh of the SmartEditPreview
                case SmartEditRedux.SMARTEDIT_SETOPERATION:
                case SmartEditRedux.SMARTEDIT_SETVALUE:
                case SmartEditRedux.SMARTEDIT_FETCHPREVIEW: {
                    //all our logic needs to be executed AFTER the main reducers 
                    //so our state is up to date which allow us not to care about the data within each different action
                    let returnAction = next(action);

                    let SmartEditStrategy = <ISmartEditStrategy>(adaptableBlotter.Strategies.get(StrategyIds.SmartEditStrategyId));
                    let state = middlewareAPI.getState();

                    let apiReturn = SmartEditStrategy.BuildPreviewValues(parseFloat(state.SmartEdit.SmartEditValue),
                        state.SmartEdit.SmartEditOperation);

                    if (apiReturn.Error) {
                        //We close the SmartEditPopup
                        middlewareAPI.dispatch(PopupRedux.HidePopup());
                        //We show the Error Popup
                        middlewareAPI.dispatch(PopupRedux.ErrorPopup(apiReturn.Error));
                    }
                    else {
                        middlewareAPI.dispatch(SmartEditRedux.SmartEditSetPreview(apiReturn.ActionReturn));
                    }
                    return returnAction;
                }

                case SmartEditRedux.SMARTEDIT_APPLY: {
                    let SmartEditStrategy = <ISmartEditStrategy>(adaptableBlotter.Strategies.get(StrategyIds.SmartEditStrategyId));
                    SmartEditStrategy.ApplySmartEdit((<SmartEditRedux.ApplySmarteditAction>action).bypassCellValidationWarnings);
                    middlewareAPI.dispatch(PopupRedux.HidePopup());
                    return next(action);
                }
                case PlusMinusRedux.PLUSMINUS_APPLY: {
                    let plusMinusStrategy = <IPlusMinusStrategy>(adaptableBlotter.Strategies.get(StrategyIds.PlusMinusStrategyId));
                    let actionTyped = <PlusMinusRedux.PlusMinusApplyAction>action
                    plusMinusStrategy.ApplyPlusMinus(actionTyped.KeyEventString, actionTyped.CellInfos);
                    middlewareAPI.dispatch(PopupRedux.HidePopup());
                    return next(action);
                }
                 case ShortcutRedux.SHORTCUT_APPLY: {
                    let shortcutStrategy = <IShortcutStrategy>(adaptableBlotter.Strategies.get(StrategyIds.ShortcutStrategyId));
                    let actionTyped = <ShortcutRedux.ShortcutApplyAction>action
                    shortcutStrategy.ApplyShortcut(actionTyped.Shortcut, actionTyped.CellInfo, actionTyped.KeyEventString, actionTyped.NewValue);
                    return next(action);
                }
                case ExportRedux.EXPORT_APPLY: {
                    let ExportStrategy = <IExportStrategy>(adaptableBlotter.Strategies.get(StrategyIds.ExportStrategyId));
                    ExportStrategy.ExportBlotter();
                    middlewareAPI.dispatch(PopupRedux.HidePopup());
                    return next(action);
                }
                case PrintPreviewRedux.PRINT_PREVIEW_APPLY: {
                    let PrintPreviewStrategy = <IPrintPreviewStrategy>(adaptableBlotter.Strategies.get(StrategyIds.PrintPreviewStrategyId));
                    PrintPreviewStrategy.ApplyPrintPreview();
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
                case ColumnChooserRedux.SET_NEW_COLUMN_LIST_ORDER:
                    let actionTyped = <ColumnChooserRedux.SetNewColumnListOrderAction>action
                    //not sure what is best still..... make the strategy generic enough so they work for all combos and put some of the logic in the AB class or do the opposite....
                    //Time will tell I guess
                    adaptableBlotter.SetNewColumnListOrder(actionTyped.VisibleColumnList)
                    return next(action);
                default:
                    return next(action);
            }
        }
    }
}