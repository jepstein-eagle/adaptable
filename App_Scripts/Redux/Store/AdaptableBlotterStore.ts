import { ExportDestination } from '../../Core/Enums';
import * as Redux from "redux";
import * as ReduxStorage from 'redux-storage'
import migrate from 'redux-storage-decorator-migrate'
import * as DeepDiff from 'deep-diff'
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEngine as createEngineRemote } from './AdaptableBlotterReduxStorageClientEngine';
import { createEngine as createEngineLocal } from './AdaptableBlotterReduxLocalStorageEngine';
import { MergeState } from './AdaptableBlotterReduxMerger';
import filter from 'redux-storage-decorator-filter'

import * as MenuRedux from '../ActionsReducers/MenuRedux'
import * as PopupRedux from '../ActionsReducers/PopupRedux'
import * as SmartEditRedux from '../ActionsReducers/SmartEditRedux'
import * as BulkUpdateRedux from '../ActionsReducers/BulkUpdateRedux'
import * as CustomSortRedux from '../ActionsReducers/CustomSortRedux'
import * as CalculatedColumnRedux from '../ActionsReducers/CalculatedColumnRedux'
import * as ShortcutRedux from '../ActionsReducers/ShortcutRedux'
import * as GridRedux from '../ActionsReducers/GridRedux'
import * as PlusMinusRedux from '../ActionsReducers/PlusMinusRedux'
import * as ColumnChooserRedux from '../ActionsReducers/ColumnChooserRedux'
import * as ExportRedux from '../ActionsReducers/ExportRedux'
import * as FlashingCellsRedux from '../ActionsReducers/FlashingCellsRedux'
import * as CalendarRedux from '../ActionsReducers/CalendarRedux'
import * as ConditionalStyleRedux from '../ActionsReducers/ConditionalStyleRedux'
import * as QuickSearchRedux from '../ActionsReducers/QuickSearchRedux'
import * as AdvancedSearchRedux from '../ActionsReducers/AdvancedSearchRedux'
import * as FilterRedux from '../ActionsReducers/FilterRedux'
import * as ThemeRedux from '../ActionsReducers/ThemeRedux'
import * as FormatColumnRedux from '../ActionsReducers/FormatColumnRedux'
import * as LayoutRedux from '../ActionsReducers/LayoutRedux'
import * as DashboardRedux from '../ActionsReducers/DashboardRedux'
import * as CellValidationRedux from '../ActionsReducers/CellValidationRedux'
import * as EntitlementsRedux from '../ActionsReducers/EntitlementsRedux'
import * as TeamSharingRedux from '../ActionsReducers/TeamSharingRedux'
import * as UserInterfaceRedux from '../ActionsReducers/UserInterfaceRedux'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter'
import { ISmartEditStrategy } from '../../Strategy/Interface/ISmartEditStrategy'
import { IBulkUpdateStrategy } from '../../Strategy/Interface/IBulkUpdateStrategy'
import { IShortcutStrategy } from '../../Strategy/Interface/IShortcutStrategy'
import { IExportStrategy, IPPDomain } from '../../Strategy/Interface/IExportStrategy'
import { IPlusMinusStrategy } from '../../Strategy/Interface/IPlusMinusStrategy'
import { ISharedEntity } from '../../Strategy/Interface/ITeamSharingStrategy'
import { AdaptableBlotterState, IAdaptableBlotterStore } from './Interface/IAdaptableStore'
import { IUIConfirmation, InputAction } from '../../Core/Interface/IMessage';
import { AdaptableDashboardViewFactory } from '../../View/AdaptableViewFactory';
import { iPushPullHelper } from "../../Core/Helpers/iPushPullHelper";
import { format } from 'util';
import { GridState, AdvancedSearchState } from '../ActionsReducers/Interface/IState';
import { DEFAULT_LAYOUT } from "../../Core/Constants/GeneralConstants";
import { ObjectFactory } from '../../Core/ObjectFactory';
import { PreviewHelper } from '../../Core/Helpers/PreviewHelper';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { IAdvancedSearch, ICalculatedColumn, IShortcut, IPlusMinusRule, IUserFilter, ILayout, IReport, IConditionalStyle, ICustomSort, IFormatColumn, ICellValidationRule } from '../../Core/Api/Interface/AdaptableBlotterObjects';
import { IAdaptableBlotterOptions } from '../../Core/Api/Interface/IAdaptableBlotterOptions';

const rootReducer: Redux.Reducer<AdaptableBlotterState> = Redux.combineReducers<AdaptableBlotterState>({
    Popup: PopupRedux.ShowPopupReducer,
    Menu: MenuRedux.MenuReducer,
    SmartEdit: SmartEditRedux.SmartEditReducer,
    BulkUpdate: BulkUpdateRedux.BulkUpdateReducer,
    CustomSort: CustomSortRedux.CustomSortReducer,
    Shortcut: ShortcutRedux.ShortcutReducer,
    Grid: GridRedux.GridReducer,
    PlusMinus: PlusMinusRedux.PlusMinusReducer,
    Export: ExportRedux.ExportReducer,
    FlashingCell: FlashingCellsRedux.FlashingCellReducer,
    Calendar: CalendarRedux.CalendarReducer,
    ConditionalStyle: ConditionalStyleRedux.ConditionalStyleReducer,
    QuickSearch: QuickSearchRedux.QuickSearchReducer,
    AdvancedSearch: AdvancedSearchRedux.AdvancedSearchReducer,
    Filter: FilterRedux.FilterReducer,
    Theme: ThemeRedux.ThemeReducer,
    CellValidation: CellValidationRedux.CellValidationReducer,
    Layout: LayoutRedux.LayoutReducer,
    Dashboard: DashboardRedux.DashboardReducer,
    Entitlements: EntitlementsRedux.EntitlementsReducer,
    CalculatedColumn: CalculatedColumnRedux.CalculatedColumnReducer,
    UserInterface: UserInterfaceRedux.UserInterfaceStateReducer,
    TeamSharing: TeamSharingRedux.TeamSharingReducer,
    FormatColumn: FormatColumnRedux.FormatColumnReducer
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
        //This trigger the persist of the state with nothing
        state = undefined
    }

    return rootReducer(state, action)
}

const configServerUrl = "/adaptableblotter-config"
const configServerTeamSharingUrl = "/adaptableblotter-teamsharing"

export class AdaptableBlotterStore implements IAdaptableBlotterStore {
    public TheStore: Redux.Store<AdaptableBlotterState>
    public Load: PromiseLike<any>
    constructor(private blotter: IAdaptableBlotter, blotterOptions: IAdaptableBlotterOptions) {
        let middlewareReduxStorage: Redux.Middleware
        let reducerWithStorage: Redux.Reducer<AdaptableBlotterState>
        let loadStorage: ReduxStorage.Loader<AdaptableBlotterState>
        let engineWithFilter: ReduxStorage.StorageEngine
        let engineWithMigrate: ReduxStorage.StorageEngine
        let engineReduxStorage: ReduxStorage.StorageEngine

        if (blotterOptions.enableRemoteConfigServer) {
            engineReduxStorage = createEngineRemote(configServerUrl, blotterOptions.userName, blotterOptions.blotterId, blotter);
        }
        else {
            engineReduxStorage = createEngineLocal(blotterOptions.blotterId, blotterOptions.predefinedConfig);
        }
        // const someExampleMigration = {
        //     version: 1,
        //     migration: (state: AdaptableBlotterState) => {
        //         state.SmartEdit.SmartEditValue = "2"; return { ...state }
        //     }
        // }
        engineWithMigrate = migrate(engineReduxStorage, 0, "AdaptableStoreVersion", []/*[someExampleMigration]*/)
        engineWithFilter = filter(engineWithMigrate, [], ["TeamSharing", "UserInterface", "Popup", "Entitlements", "Menu", "Grid", "Blotter", "BulkUpdate", "SystemFilter", ["Calendar", "AvailableCalendars"], ["Theme", "AvailableThemes"], ["Export", "CurrentLiveReports"], ["SmartEdit", "PreviewInfo"]]);

        //we prevent the save to happen on few actions since they do not change the part of the state that is persisted.
        //I think that is a part where we push a bit redux and should have two distinct stores....
        middlewareReduxStorage = ReduxStorage.createMiddleware(engineWithFilter,
            [MenuRedux.SET_MENUITEMS, GridRedux.GRID_SET_COLUMNS, ColumnChooserRedux.SET_NEW_COLUMN_LIST_ORDER,
            PopupRedux.POPUP_CANCEL_CONFIRMATION, PopupRedux.POPUP_CLEAR_PARAM, PopupRedux.POPUP_CONFIRM_CONFIRMATION, PopupRedux.POPUP_CONFIRM_PROMPT, PopupRedux.POPUP_CONFIRMATION, PopupRedux.POPUP_HIDE, PopupRedux.POPUP_HIDE_ERROR, PopupRedux.POPUP_HIDE_PROMPT, PopupRedux.POPUP_HIDE_WARNING, PopupRedux.POPUP_SHOW, PopupRedux.POPUP_SHOW_ERROR, PopupRedux.POPUP_SHOW_PROMPT, PopupRedux.POPUP_SHOW_WARNING]);
        //here we use our own merger function which is derived from redux simple merger
        reducerWithStorage = ReduxStorage.reducer<AdaptableBlotterState>(rootReducerWithResetManagement, MergeState);
        loadStorage = ReduxStorage.createLoader(engineWithFilter);
        let composeEnhancers
        if ("production" != process.env.NODE_ENV) {
            composeEnhancers = composeWithDevTools({
                // Specify here name, actionsBlacklist, actionsCreators and other options if needed
            });
        }
        else {
            composeEnhancers = (x: any) => x
        }

        //TODO: need to check if we want the storage to be done before or after 
        //we enrich the state with the AB middleware
        this.TheStore = Redux.createStore<AdaptableBlotterState>(
            reducerWithStorage,
            composeEnhancers(Redux.applyMiddleware(
                diffStateAuditMiddleware(blotter),
                adaptableBlotterMiddleware(blotter, blotterOptions),
                middlewareReduxStorage,
                functionLogMiddleware(blotter),

            ))
        );
        //We start to build the state once everything is instantiated... I dont like that. Need to change
        this.Load =
            //We load the previous saved session. Redux is pretty awesome in its simplicity!
            loadStorage(this.TheStore)
                .then(
                    () => this.TheStore.dispatch(InitState()),
                    (e) => {
                        console.error('Failed to load previous adaptable blotter state : ', e);
                        //for now i'm still initializing the AB even if loading state has failed.... 
                        //we may revisit that later
                        this.TheStore.dispatch(InitState())
                        this.TheStore.dispatch(PopupRedux.PopupShowError({ ErrorMsg: "Error loading your configuration:" + e }))
                    })
    }
}

var diffStateAuditMiddleware = (adaptableBlotter: IAdaptableBlotter): any => function (middlewareAPI: Redux.MiddlewareAPI<AdaptableBlotterState>) {
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



// this function is responsible for sending any changes through functions to the audit - previously done in the strategies but better done here I think....
// ideally it should only audit grid actions that are effected by our function.  general state changes are picked up in the audit diff
// e.g. this should say when the current Advanced search has changed, or if a custom sort is being applied (it doesnt yet), but not when sorts have been added generally or seraches changed
var functionLogMiddleware = (adaptableBlotter: IAdaptableBlotter): any => function (middlewareAPI: Redux.MiddlewareAPI<AdaptableBlotterState>) {
    return function (next: Redux.Dispatch<AdaptableBlotterState>) {
        return function (action: Redux.Action) {
            let state = middlewareAPI.getState()

            // Note: not done custom sort, and many others
            // also not done bulk update, smart edit as each has different issues...
            switch (action.type) {

                case AdvancedSearchRedux.ADVANCED_SEARCH_SELECT: {
                    let actionTyped = <AdvancedSearchRedux.AdvancedSearchSelectAction>action
                    let advancedSearch = state.AdvancedSearch.AdvancedSearches.find(as => as.Name == actionTyped.SelectedSearchName);

                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.AdvancedSearchStrategyId,
                        "apply advanced search",
                        actionTyped.SelectedSearchName,
                        advancedSearch)


                    return next(action);
                }
                case AdvancedSearchRedux.ADVANCED_SEARCH_ADD_UPDATE: {
                    let actionTyped = <AdvancedSearchRedux.AdvancedSearchAddUpdateAction>action
                    let currentAdvancedSearch = state.AdvancedSearch.CurrentAdvancedSearch; // problem here if they have changed the name potentially...
                    if (actionTyped.AdvancedSearch.Name == currentAdvancedSearch) {

                        adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.AdvancedSearchStrategyId,
                            "apply advanced search",
                            actionTyped.AdvancedSearch.Name,
                            actionTyped.AdvancedSearch)

                    }
                    return next(action);
                }
                case QuickSearchRedux.QUICK_SEARCH_APPLY: {
                    let actionTyped = <QuickSearchRedux.QuickSearchApplyAction>action

                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.QuickSearchStrategyId,
                        "apply quick search",
                        actionTyped.quickSearchText,
                        actionTyped.quickSearchText)

                    return next(action);
                }
                case PlusMinusRedux.PLUSMINUS_APPLY: {
                    let actionTyped = <PlusMinusRedux.PlusMinusApplyAction>action

                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.PlusMinusStrategyId,
                        "apply plus minus",
                        "KeyPressed:" + actionTyped.KeyEventString,
                        actionTyped.CellInfos)
                    return next(action);
                }
                case ShortcutRedux.SHORTCUT_APPLY: {
                    let actionTyped = <ShortcutRedux.ShortcutApplyAction>action

                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.ShortcutStrategyId,
                        "apply shortcut",
                        "KeyPressed:" + actionTyped.KeyEventString,
                        { Shortcut: actionTyped.Shortcut, PrimaryKey: actionTyped.CellInfo.Id, ColumnId: actionTyped.CellInfo.ColumnId })
                    return next(action);
                }
                case FilterRedux.COLUMN_FILTER_ADD_UPDATE: {
                    // this is basically select as we immediately set filters and just audit them all for now
                    let actionTyped = <FilterRedux.ColumnFilterAddUpdateAction>action

                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.ColumnFilterStrategyId,
                        "apply column filters",
                        "filters applied",
                        state.Filter.ColumnFilters)

                    return next(action);
                }
                case FilterRedux.USER_FILTER_ADD_UPDATE: {
                    let actionTyped = <FilterRedux.UserFilterAddUpdateAction>action
                    let userFilter = actionTyped.UserFilter;

                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.UserFilterStrategyId,
                        "user filters changed",
                        "filters applied",
                        state.Filter.UserFilters)

                    return next(action);
                }

                default:
                    return next(action);
            }
        }
    }
}



var adaptableBlotterMiddleware = (blotter: IAdaptableBlotter, blotterOptions: IAdaptableBlotterOptions): any => function (middlewareAPI: Redux.MiddlewareAPI<AdaptableBlotterState>) {
    return function (next: Redux.Dispatch<AdaptableBlotterState>) {
        return function (action: Redux.Action) {
            switch (action.type) {
                case TeamSharingRedux.TEAMSHARING_SHARE: {
                    let actionTyped = <TeamSharingRedux.TeamSharingShareAction>action
                    let returnAction = next(action);
                    let xhr = new XMLHttpRequest();
                    xhr.onerror = (ev: ErrorEvent) => console.log("TeamSharing share error :" + ev.message, actionTyped.Entity)
                    xhr.ontimeout = (ev: ProgressEvent) => console.log("TeamSharing share timeout", actionTyped.Entity)
                    xhr.onload = (ev: ProgressEvent) => {
                        if (xhr.readyState == 4) {
                            if (xhr.status != 200) {
                                console.error("TeamSharing share error : " + xhr.statusText, actionTyped.Entity);
                                middlewareAPI.dispatch(PopupRedux.PopupShowError({ ErrorMsg: "Error Sharing item: " + xhr.statusText }))
                            }
                            else {
                                middlewareAPI.dispatch(PopupRedux.PopupShowInfo({ InfoMsg: "Item Shared Successfully" }))
                            }
                        }
                    }
                    //we make the request async
                    xhr.open("POST", configServerTeamSharingUrl, true);
                    xhr.setRequestHeader("Content-type", "application/json");
                    let obj: ISharedEntity = {
                        entity: actionTyped.Entity,
                        user: blotterOptions.userName,
                        blotter_id: blotterOptions.blotterId,
                        strategy: actionTyped.Strategy,
                        timestamp: new Date()
                    }
                    xhr.send(JSON.stringify(obj));
                    return returnAction;
                }
                case TeamSharingRedux.TEAMSHARING_GET: {
                    let returnAction = next(action);
                    let xhr = new XMLHttpRequest();
                    xhr.onerror = (ev: ErrorEvent) => console.log("TeamSharing get error :" + ev.message)
                    xhr.ontimeout = (ev: ProgressEvent) => console.log("TeamSharing get timeout")
                    xhr.onload = (ev: ProgressEvent) => {
                        if (xhr.readyState == 4) {
                            if (xhr.status != 200) {
                                console.error("TeamSharing get error : " + xhr.statusText);
                            }
                            else {
                                middlewareAPI.dispatch(TeamSharingRedux.TeamSharingSet(JSON.parse(xhr.responseText, (key, value) => {
                                    if (key == "timestamp") {
                                        return new Date(value);
                                    }
                                    return value
                                })))
                            }
                        }
                    }
                    //we make the request async
                    xhr.open("GET", configServerTeamSharingUrl, true);
                    xhr.setRequestHeader("Content-type", "application/json");
                    xhr.send();
                    return returnAction;
                }
                case TeamSharingRedux.TEAMSHARING_IMPORT_ITEM: {
                    let returnAction = next(action);
                    let actionTyped = <TeamSharingRedux.TeamSharingImportItemAction>action
                    let importAction: Redux.Action
                    let overwriteConfirmation = false
                    switch (actionTyped.Strategy) {
                        case StrategyIds.CellValidationStrategyId:
                            importAction = CellValidationRedux.CellValidationAddUpdate(-1, actionTyped.Entity as ICellValidationRule)
                            break;
                        case StrategyIds.CalculatedColumnStrategyId: {
                            let calcCol = actionTyped.Entity as ICalculatedColumn
                            let idx = middlewareAPI.getState().CalculatedColumn.CalculatedColumns.findIndex(x => x.ColumnId == calcCol.ColumnId)
                            if (idx > -1) {
                                overwriteConfirmation = true
                                importAction = CalculatedColumnRedux.CalculatedColumnEdit(idx, calcCol)
                            }
                            else {
                                importAction = CalculatedColumnRedux.CalculatedColumnAdd(calcCol)
                            }
                            break;
                        }
                        case StrategyIds.ConditionalStyleStrategyId:
                            importAction = ConditionalStyleRedux.ConditionalStyleAddUpdate(-1, actionTyped.Entity as IConditionalStyle)
                            break;
                        case StrategyIds.CustomSortStrategyId: {
                            let customSort = actionTyped.Entity as ICustomSort
                            if (middlewareAPI.getState().CustomSort.CustomSorts.find(x => x.ColumnId == customSort.ColumnId)) {
                                overwriteConfirmation = true
                                importAction = CustomSortRedux.CustomSortEdit(customSort)
                            } else {
                                importAction = CustomSortRedux.CustomSortAdd(customSort)
                            }
                            break;
                        }
                        case StrategyIds.FormatColumnStrategyId: {
                            let formatColumn = actionTyped.Entity as IFormatColumn
                            if (middlewareAPI.getState().FormatColumn.FormatColumns.find(x => x.ColumnId == formatColumn.ColumnId)) {
                                overwriteConfirmation = true
                                importAction = FormatColumnRedux.FormatColumnEdit(formatColumn)
                            } else {
                                importAction = FormatColumnRedux.FormatColumnAdd(formatColumn)
                            }
                            break;
                        }
                        case StrategyIds.PlusMinusStrategyId: {
                            let plusMinus = actionTyped.Entity as IPlusMinusRule
                            importAction = PlusMinusRedux.PlusMinusAddUpdateCondition(-1, plusMinus)
                            break;
                        }
                        case StrategyIds.ShortcutStrategyId: {
                            let shortcut = actionTyped.Entity as IShortcut
                            let shortcuts: IShortcut[]
                            shortcuts = middlewareAPI.getState().Shortcut.Shortcuts
                            if (shortcuts) {
                                if (shortcuts.find(x => x.ShortcutKey == shortcut.ShortcutKey)) {
                                    middlewareAPI.dispatch(ShortcutRedux.ShortcutDelete(shortcut))
                                }
                                importAction = ShortcutRedux.ShortcutAdd(shortcut)
                            }
                            break;
                        }
                        case StrategyIds.UserFilterStrategyId: {
                            let filter = actionTyped.Entity as IUserFilter
                            //For now not too worry about that but I think we'll need to check ofr filter that have same name
                            //currently the reducer checks for UID
                            if (middlewareAPI.getState().Filter.UserFilters.find(x => x.Name == filter.Name)) {
                                overwriteConfirmation = true
                            }
                            importAction = FilterRedux.UserFilterAddUpdate(1, filter)
                            // } 
                            break;
                        }
                        case StrategyIds.AdvancedSearchStrategyId: {
                            let search = actionTyped.Entity as IAdvancedSearch
                            if (middlewareAPI.getState().AdvancedSearch.AdvancedSearches.find(x => x.Name == search.Name)) {
                                overwriteConfirmation = true
                            }
                            importAction = AdvancedSearchRedux.AdvancedSearchAddUpdate(-1, search)
                            break;
                        }
                        case StrategyIds.LayoutStrategyId: {
                            let layout = actionTyped.Entity as ILayout
                            if (middlewareAPI.getState().Layout.Layouts.find(x => x.Name == layout.Name)) {
                                overwriteConfirmation = true
                                importAction = LayoutRedux.LayoutSave(layout)
                            } else {
                                importAction = LayoutRedux.LayoutAddUpdate(-1, layout)
                            }
                            break;
                        }
                        case StrategyIds.ExportStrategyId: {
                            let report = actionTyped.Entity as IReport
                            let idx = middlewareAPI.getState().Export.Reports.findIndex(x => x.Name == report.Name)
                            if (idx > -1) {
                                overwriteConfirmation = true
                            }
                            importAction = ExportRedux.ReportAddUpdate(idx, report)
                            break;
                        }
                    }
                    if (overwriteConfirmation) {
                        let confirmation: IUIConfirmation = {
                            CancelText: "Cancel Import",
                            ConfirmationTitle: "Overwrite Config",
                            ConfirmationMsg: "This item will overwrite one of your config. Do you want to continue?",
                            ConfirmationText: "Import",
                            CancelAction: null,
                            ConfirmAction: importAction,
                            ShowCommentBox: false
                        }
                        middlewareAPI.dispatch(PopupRedux.PopupShowConfirmation(confirmation))
                    }
                    else if (importAction) {
                        middlewareAPI.dispatch(importAction)
                        middlewareAPI.dispatch(PopupRedux.PopupShowInfo({ InfoMsg: "Item Successfully Imported" }))
                    }
                    else {
                        console.error("Unknown item type", actionTyped.Entity)
                        middlewareAPI.dispatch(PopupRedux.PopupShowError({ ErrorMsg: "Item not recognized. Cannot import" }))
                    }
                    return returnAction;
                }
                case MenuRedux.BUILD_COLUMN_CONTEXT_MENU: {
                    let returnAction = next(action);
                    middlewareAPI.dispatch(MenuRedux.ShowColumnContextMenu())
                    return returnAction;
                }
                case CalculatedColumnRedux.CALCULATEDCOLUMN_IS_EXPRESSION_VALID: {
                    let returnObj = blotter.CalculatedColumnExpressionService.IsExpressionValid((<CalculatedColumnRedux.CalculatedColumnIsExpressionValidAction>action).Expression)
                    if (!returnObj.IsValid) {
                        middlewareAPI.dispatch(CalculatedColumnRedux.CalculatedColumnSetErrorMessage(returnObj.ErrorMsg))
                    }
                    else {
                        middlewareAPI.dispatch(CalculatedColumnRedux.CalculatedColumnSetErrorMessage(null))
                    }
                    return next(action);
                }
                case CalculatedColumnRedux.CALCULATEDCOLUMN_ADD: {
                    let returnAction = next(action);
                    let columnsLocalLayout = middlewareAPI.getState().Grid.Columns
                    blotter.addCalculatedColumnToGrid((<CalculatedColumnRedux.CalculatedColumnAddAction>action).CalculatedColumn)
                    let newCalculatedColumn = middlewareAPI.getState().Grid.Columns.find(x => x.ColumnId == (<CalculatedColumnRedux.CalculatedColumnAddAction>action).CalculatedColumn.ColumnId)
                    if (newCalculatedColumn) {
                        columnsLocalLayout.push(newCalculatedColumn)
                    }
                    //otherwise it will show hidden columns in AgGrid as we are recreating the column collection
                    middlewareAPI.dispatch(ColumnChooserRedux.SetNewColumnListOrder(columnsLocalLayout))
                    return returnAction;
                }
                case CalculatedColumnRedux.CALCULATEDCOLUMN_DELETE: {
                    let calculatedColumnState = middlewareAPI.getState().CalculatedColumn;
                    let actionTyped = <CalculatedColumnRedux.CalculatedColumnDeleteAction>action
                    let columnsLocalLayout = middlewareAPI.getState().Grid.Columns
                    let deletedCalculatedColumnIndex = middlewareAPI.getState().Grid.Columns.findIndex(x => x.ColumnId == calculatedColumnState.CalculatedColumns[actionTyped.Index].ColumnId)
                    blotter.removeCalculatedColumnFromGrid(calculatedColumnState.CalculatedColumns[actionTyped.Index].ColumnId)
                    if (deletedCalculatedColumnIndex > -1) {
                        columnsLocalLayout.splice(deletedCalculatedColumnIndex, 1)
                    }
                    middlewareAPI.dispatch(ColumnChooserRedux.SetNewColumnListOrder(columnsLocalLayout))
                    let returnAction = next(action);
                    return returnAction;
                }
                case CalculatedColumnRedux.CALCULATEDCOLUMN_EDIT: {
                    let calculatedColumnState = middlewareAPI.getState().CalculatedColumn;
                    let actionTyped = <CalculatedColumnRedux.CalculatedColumnEditAction>action
                    let columnsLocalLayout = middlewareAPI.getState().Grid.Columns
                    let index = calculatedColumnState.CalculatedColumns.findIndex(x => x.ColumnId == actionTyped.CalculatedColumn.ColumnId)
                    blotter.removeCalculatedColumnFromGrid(calculatedColumnState.CalculatedColumns[index].ColumnId)
                    let returnAction = next(action);
                    blotter.addCalculatedColumnToGrid(actionTyped.CalculatedColumn)
                    middlewareAPI.dispatch(ColumnChooserRedux.SetNewColumnListOrder(columnsLocalLayout))
                    return returnAction;
                }
                case FilterRedux.HIDE_FILTER_FORM: {
                    blotter.hideFilterForm()
                    return next(action);
                }
                case LayoutRedux.LAYOUT_SELECT: {
                    let returnAction = next(action);

                    let layoutState = middlewareAPI.getState().Layout;
                    let currentLayout = layoutState.Layouts.find(l => l.Name == layoutState.CurrentLayout);
                    if (currentLayout) {
                        let gridState: GridState = middlewareAPI.getState().Grid;
                        // set columns
                        let columns = currentLayout.Columns.map(columnId => gridState.Columns.find(x => x.ColumnId == columnId));
                        middlewareAPI.dispatch(ColumnChooserRedux.SetNewColumnListOrder(columns))
                        // set sort 
                        middlewareAPI.dispatch(GridRedux.GridSetSort(currentLayout.GridSorts))
                        blotter.setGridSort(currentLayout.GridSorts);
                    }
                    return returnAction;
                }
                case LayoutRedux.LAYOUT_DELETE: {
                    let returnAction = next(action);
                    let layoutState = middlewareAPI.getState().Layout;
                    let currentLayout = layoutState.Layouts.find(l => l.Name == layoutState.CurrentLayout);
                    if (!currentLayout) { // we have deleted the current layout (allowed) so lets make the layout default
                        middlewareAPI.dispatch(LayoutRedux.LayoutSelect(DEFAULT_LAYOUT))
                    }
                    return returnAction;
                }
                case GridRedux.GRID_SET_VALUE_LIKE_EDIT: {
                    let actionTyped = <GridRedux.GridSetValueLikeEditAction>action
                    //We set the value in the grid
                    blotter.setValue(actionTyped.CellInfo)
                    //We AuditLog the Edit
                    //13/02: we now do the AuditLog in the SeValue function
                    // adaptableBlotter.AuditLogService.AddEditCellAuditLog(actionTyped.CellInfo.Id, actionTyped.CellInfo.ColumnId, actionTyped.OldValue, actionTyped.CellInfo.Value)
                    return next(action);
                }
                case GridRedux.GRID_HIDE_COLUMN: {
                    let actionTyped = <GridRedux.GridHideColumnAction>action
                    let columnList = [].concat(middlewareAPI.getState().Grid.Columns)
                    let columnIndex = columnList.findIndex(x => x.ColumnId == actionTyped.ColumnId)
                    columnList.splice(columnIndex, 1)
                    blotter.setNewColumnListOrder(columnList)
                    return next(action);
                }
                case GridRedux.GRID_SELECT_COLUMN: {
                    let actionTyped = <GridRedux.GridSelectColumnAction>action
                    blotter.selectColumn(actionTyped.ColumnId)
                    return next(action);
                }
                case PopupRedux.POPUP_CONFIRM_PROMPT: {
                    let promptConfirmationAction = middlewareAPI.getState().Popup.PromptPopup.ConfirmAction;
                    if (promptConfirmationAction) {
                        let inputText: string = (<InputAction>action).InputText;
                        promptConfirmationAction.InputText = inputText;
                        middlewareAPI.dispatch(promptConfirmationAction);
                    }
                    return next(action);
                }
                case PopupRedux.POPUP_CONFIRM_CONFIRMATION: {
                    let confirmationAction = middlewareAPI.getState().Popup.ConfirmationPopup.ConfirmAction
                    if (confirmationAction) {
                        middlewareAPI.dispatch(confirmationAction);
                    }
                    return next(action);
                }
                case PopupRedux.POPUP_CANCEL_CONFIRMATION: {
                    let cancelAction = middlewareAPI.getState().Popup.ConfirmationPopup.CancelAction
                    if (cancelAction) {
                        middlewareAPI.dispatch(cancelAction);
                    }
                    return next(action);
                }

                /*  *********
                SMART EDIT ACTIONS
                ************ */
                case SmartEditRedux.SMARTEDIT_CHECK_CELL_SELECTION: {
                    let SmartEditStrategy = <ISmartEditStrategy>(blotter.Strategies.get(StrategyIds.SmartEditStrategyId));
                    let state = middlewareAPI.getState();
                    let returnAction = next(action);
                    let apiReturn = SmartEditStrategy.CheckCorrectCellSelection();

                    if (apiReturn.Error) {
                        //We close the SmartEditPopup
                        middlewareAPI.dispatch(PopupRedux.PopupHide());
                        //We show the Error Popup
                        middlewareAPI.dispatch(PopupRedux.PopupShowError(apiReturn.Error));
                    } else {
                        let apiPreviewReturn = SmartEditStrategy.BuildPreviewValues(parseFloat(state.SmartEdit.SmartEditValue), state.SmartEdit.SmartEditOperation);
                        middlewareAPI.dispatch(SmartEditRedux.SmartEditSetPreview(apiPreviewReturn));
                    }
                    return returnAction;
                }

                // Here we have all actions that triggers a refresh of the SmartEditPreview
                case SmartEditRedux.SMARTEDIT_CHANGE_OPERATION:
                case SmartEditRedux.SMARTEDIT_CHANGE_VALUE:
                case SmartEditRedux.SMARTEDIT_FETCH_PREVIEW: {
                    //all our logic needs to be executed AFTER the main reducers 
                    //so our state is up to date which allow us not to care about the data within each different action
                    let returnAction = next(action);

                    let SmartEditStrategy = <ISmartEditStrategy>(blotter.Strategies.get(StrategyIds.SmartEditStrategyId));
                    let state = middlewareAPI.getState();

                    let apiReturn = SmartEditStrategy.BuildPreviewValues(parseFloat(state.SmartEdit.SmartEditValue), state.SmartEdit.SmartEditOperation);
                    middlewareAPI.dispatch(SmartEditRedux.SmartEditSetPreview(apiReturn));
                    return returnAction;
                }

                case SmartEditRedux.SMARTEDIT_APPLY: {
                    let SmartEditStrategy = <ISmartEditStrategy>(blotter.Strategies.get(StrategyIds.SmartEditStrategyId));
                    let actionTyped = <SmartEditRedux.SmartEditApplyAction>action;
                    let thePreview = middlewareAPI.getState().SmartEdit.PreviewInfo
                    let newValues = PreviewHelper.GetCellInfosFromPreview(thePreview, actionTyped.bypassCellValidationWarnings)
                    SmartEditStrategy.ApplySmartEdit(newValues);
                    middlewareAPI.dispatch(PopupRedux.PopupHide());
                    return next(action);
                }


                /*  *********
                BULK UPDATE ACTIONS
                ************ */
                case BulkUpdateRedux.BulkUpdate_CHECK_CELL_SELECTION: {
                    let BulkUpdateStrategy = <IBulkUpdateStrategy>(blotter.Strategies.get(StrategyIds.BulkUpdateStrategyId));
                    let state = middlewareAPI.getState();
                    let returnAction = next(action);
                    let apiReturn = BulkUpdateStrategy.CheckCorrectCellSelection();

                    if (apiReturn.Error) {
                        //We close the BulkUpdatePopup
                        middlewareAPI.dispatch(PopupRedux.PopupHide());
                        //We show the Error Popup
                        middlewareAPI.dispatch(PopupRedux.PopupShowError(apiReturn.Error));
                    } else {
                        let apiPreviewReturn = BulkUpdateStrategy.BuildPreviewValues(state.BulkUpdate.BulkUpdateValue);
                        middlewareAPI.dispatch(BulkUpdateRedux.BulkUpdateSetPreview(apiPreviewReturn));
                    }
                    return returnAction;
                }

                // Here we have all actions that triggers a refresh of the BulkUpdatePreview
                case BulkUpdateRedux.BulkUpdate_CHANGE_VALUE:
                case BulkUpdateRedux.BulkUpdate_FETCH_PREVIEW: {
                    //all our logic needs to be executed AFTER the main reducers 
                    //so our state is up to date which allow us not to care about the data within each different action
                    let returnAction = next(action);

                    let BulkUpdateStrategy = <IBulkUpdateStrategy>(blotter.Strategies.get(StrategyIds.BulkUpdateStrategyId));
                    let state = middlewareAPI.getState();

                    let apiReturn = BulkUpdateStrategy.BuildPreviewValues(state.BulkUpdate.BulkUpdateValue);
                    middlewareAPI.dispatch(BulkUpdateRedux.BulkUpdateSetPreview(apiReturn));
                    return returnAction;
                }

                case BulkUpdateRedux.BulkUpdate_APPLY: {
                    let BulkUpdateStrategy = <IBulkUpdateStrategy>(blotter.Strategies.get(StrategyIds.BulkUpdateStrategyId));
                    let actionTyped = <BulkUpdateRedux.BulkUpdateApplyAction>action;
                    let thePreview = middlewareAPI.getState().BulkUpdate.PreviewInfo
                    let newValues = PreviewHelper.GetCellInfosFromPreview(thePreview, actionTyped.bypassCellValidationWarnings)
                    BulkUpdateStrategy.ApplyBulkUpdate(newValues);
                    middlewareAPI.dispatch(PopupRedux.PopupHide());
                    return next(action);
                }


                case PlusMinusRedux.PLUSMINUS_APPLY: {
                    let plusMinusStrategy = <IPlusMinusStrategy>(blotter.Strategies.get(StrategyIds.PlusMinusStrategyId));
                    let actionTyped = <PlusMinusRedux.PlusMinusApplyAction>action
                    plusMinusStrategy.ApplyPlusMinus(actionTyped.KeyEventString, actionTyped.CellInfos);
                    middlewareAPI.dispatch(PopupRedux.PopupHide());
                    return next(action);
                }
                case ShortcutRedux.SHORTCUT_APPLY: {
                    let shortcutStrategy = <IShortcutStrategy>(blotter.Strategies.get(StrategyIds.ShortcutStrategyId));
                    let actionTyped = <ShortcutRedux.ShortcutApplyAction>action
                    shortcutStrategy.ApplyShortcut(actionTyped.CellInfo, actionTyped.NewValue);
                    return next(action);
                }

                case ExportRedux.EXPORT_APPLY: {
                    let exportStrategy = <IExportStrategy>(blotter.Strategies.get(StrategyIds.ExportStrategyId));
                    let actionTyped = <ExportRedux.ExportApplyAction>action;
                    if (actionTyped.ExportDestination == ExportDestination.iPushPull && iPushPullHelper.IPPStatus != iPushPullHelper.ServiceStatus.Connected) {
                        middlewareAPI.dispatch(PopupRedux.PopupShow("IPushPullLogin", false, actionTyped.Report))
                    }
                    else if (actionTyped.ExportDestination == ExportDestination.iPushPull && !actionTyped.Folder) {
                        iPushPullHelper.GetDomainPages(blotterOptions.iPushPullConfig.api_key).then((domainpages: IPPDomain[]) => {
                            middlewareAPI.dispatch(ExportRedux.SetDomainPages(domainpages))
                            middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(""))
                        }).catch((err: any) => {
                            middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(err))
                        })
                        middlewareAPI.dispatch(PopupRedux.PopupShow("IPushPullDomainPageSelector", false, actionTyped.Report))
                    }
                    else if (actionTyped.ExportDestination == ExportDestination.iPushPull) {
                        exportStrategy.Export(actionTyped.Report, actionTyped.ExportDestination, actionTyped.Folder, actionTyped.Page);
                        middlewareAPI.dispatch(PopupRedux.PopupHide());
                    }
                    else {
                        exportStrategy.Export(actionTyped.Report, actionTyped.ExportDestination);
                        middlewareAPI.dispatch(PopupRedux.PopupHide());
                    }
                    return next(action);
                }

                case ExportRedux.IPP_LOGIN: {
                    let actionTyped = <ExportRedux.IPPLoginAction>action;
                    iPushPullHelper.Login(actionTyped.Login, actionTyped.Password).then(() => {
                        let report = middlewareAPI.getState().Popup.ScreenPopup.Params
                        middlewareAPI.dispatch(PopupRedux.PopupHide())
                        middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(""))
                        iPushPullHelper.GetDomainPages(blotterOptions.iPushPullConfig.api_key).then((domainpages: IPPDomain[]) => {
                            middlewareAPI.dispatch(ExportRedux.SetDomainPages(domainpages))
                            middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(""))
                        }).catch((error: any) => {
                            middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(error))
                        })
                        middlewareAPI.dispatch(PopupRedux.PopupShow("IPushPullDomainPageSelector", false, report))
                    }).catch((error: string) => {
                        console.error("Login failed", error);
                        middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(error))
                    })
                    return next(action);
                }
                case ExportRedux.REPORT_STOP_LIVE: {
                    let actionTyped = (<ExportRedux.ReportStopLiveAction>action)
                    if (actionTyped.ExportDestination == ExportDestination.iPushPull) {
                        let currentLiveReports = middlewareAPI.getState().Export.CurrentLiveReports
                        let lre = currentLiveReports.find(x => x.Report == actionTyped.Report && x.ExportDestination == actionTyped.ExportDestination)
                        iPushPullHelper.UnloadPage(lre.WorkbookName)
                    }
                    return next(action);
                }

                //We rebuild the menu from scratch
                //the difference between the two is that RESET_STATE is handled before and set the state to undefined
                case INIT_STATE:
                case RESET_STATE: {
                    let returnAction = next(action);
                    //we set the column list from the datasource
                    blotter.setColumnIntoStore();
                    //create the default layout so we can revert to it if needed
                    let currentLayout = DEFAULT_LAYOUT
                    let gridState: GridState = middlewareAPI.getState().Grid
                    if (middlewareAPI.getState().Layout.Layouts.length == 0) {
                        let layout: ILayout = ObjectFactory.CreateLayout(gridState.Columns, [], DEFAULT_LAYOUT)
                        middlewareAPI.dispatch(LayoutRedux.LayoutAddUpdate(-1, layout));
                    }
                    else {
                        //update default layout with latest columns and sort
                        let layout: ILayout = ObjectFactory.CreateLayout(gridState.Columns, gridState.GridSorts, DEFAULT_LAYOUT)
                        middlewareAPI.dispatch(LayoutRedux.LayoutSave(layout))
                        currentLayout = middlewareAPI.getState().Layout.CurrentLayout
                    }
                    //Create all calculated columns before we load the layout
                    middlewareAPI.getState().CalculatedColumn.CalculatedColumns.forEach(x => {
                        blotter.addCalculatedColumnToGrid(x)
                    })
                    if (middlewareAPI.getState().CalculatedColumn.CalculatedColumns.length > 0) {
                        blotter.setColumnIntoStore();
                        //12/09/17 : fortunately it's not needed anymore as I changed the init process... That was dirty
                        // //We force clone of the state so strategies get reinitialized with the new column.
                        // //it's not ideal and will probably need optimization
                        // middlewareAPI.dispatch(CloneState())
                    }
                    //load either saved layout or default one
                    middlewareAPI.dispatch(LayoutRedux.LayoutSelect(currentLayout));

                    blotter.createMenu();

                    //we create default configuration for new Dashboard Items that are
                    //not existing in the user config
                    //    AdaptableDashboardViewFactory.forEach((control, strategyId) => {
                    //        if (!middlewareAPI.getState().Dashboard.DashboardFunctionToolbars.find(x => x == strategyId)) {
                    //      middlewareAPI.dispatch(DashboardRedux.DashboardCreateDefaultConfigurationItem(strategyId));
                    //        }
                    //    })

                    blotter.InitAuditService()
                    return returnAction;
                }
                case FilterRedux.COLUMN_FILTER_ADD_UPDATE: {
                    let returnAction = next(action);
                    let s: string = "first";
                    return returnAction;
                }
                case ColumnChooserRedux.SET_NEW_COLUMN_LIST_ORDER:
                    let actionTyped = <ColumnChooserRedux.SetNewColumnListOrderAction>action
                    //not sure what is best still..... make the strategy generic enough so they work for all combos and put some of the logic in the AB class or do the opposite....
                    //Time will tell I guess
                    blotter.setNewColumnListOrder(actionTyped.VisibleColumnList)
                    return next(action);
                default:
                    return next(action);
            }
        }
    }
}


