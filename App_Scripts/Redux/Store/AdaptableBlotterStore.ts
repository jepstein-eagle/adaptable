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
import * as LayoutRedux from '../ActionsReducers/LayoutRedux'
import * as DashboardRedux from '../ActionsReducers/DashboardRedux'
import * as CellValidationRedux from '../ActionsReducers/CellValidationRedux'
import * as EntitlementsRedux from '../ActionsReducers/EntitlementsRedux'
import * as StrategyIds from '../../Core/StrategyIds'
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter'
import { ISmartEditStrategy } from '../../Core/Interface/ISmartEditStrategy'
import { IShortcutStrategy } from '../../Core/Interface/IShortcutStrategy'
import { IExportStrategy } from '../../Core/Interface/IExportStrategy'
import { IPrintPreviewStrategy } from '../../Core/Interface/IPrintPreviewStrategy'
import { IPlusMinusStrategy } from '../../Core/Interface/IPlusMinusStrategy'
import { IColumnChooserStrategy } from '../../Core/Interface/IColumnChooserStrategy'
import { AdaptableBlotterState, IAdaptableBlotterStore } from './Interface/IAdaptableStore'
import { IUIError, ICellInfo, InputAction } from '../../Core/Interface/IStrategy'
import { AdaptableDashboardViewFactory } from '../../View/AdaptableViewFactory';
import { Helper } from "../../Core/Helper";

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
    QuickSearch: QuickSearchRedux.QuickSearchReducer,
    AdvancedSearch: AdvancedSearchRedux.AdvancedSearchReducer,
    Filter: FilterRedux.FilterReducer,
    Theme: ThemeRedux.ThemeReducer,
    CellValidation: CellValidationRedux.CellValidationReducer,
    Layout: LayoutRedux.LayoutReducer,
    Dashboard: DashboardRedux.DashboardReducer,
    Entitlements: EntitlementsRedux.EntitlementsReducer,
    CalculatedColumn: CalculatedColumnRedux.CalculatedColumnReducer
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

export class AdaptableBlotterStore implements IAdaptableBlotterStore {
    public TheStore: Redux.Store<AdaptableBlotterState>
    public Load: PromiseLike<any>
    constructor(private blotter: IAdaptableBlotter) {
        let middlewareReduxStorage: Redux.Middleware
        let reducerWithStorage: Redux.Reducer<AdaptableBlotterState>
        let loadStorage: ReduxStorage.Loader<AdaptableBlotterState>
        let engineWithFilter: ReduxStorage.StorageEngine
        let engineWithMigrate: ReduxStorage.StorageEngine
        let engineReduxStorage: ReduxStorage.StorageEngine

        if (blotter.BlotterOptions.enableRemoteConfigServer) {
            engineReduxStorage = createEngineRemote("/adaptableblotter-config", blotter.BlotterOptions.userName, blotter.BlotterOptions.blotterId);
        }
        else {
            engineReduxStorage = createEngineLocal(blotter.BlotterOptions.blotterId, blotter.BlotterOptions.predefinedConfigUrl);
        }
        // const someExampleMigration = {
        //     version: 1,
        //     migration: (state: AdaptableBlotterState) => {
        //         state.SmartEdit.SmartEditValue = "2"; return { ...state }
        //     }
        // }
        engineWithMigrate = migrate(engineReduxStorage, 0, "AdaptableStoreVersion", []/*[someExampleMigration]*/)
        engineWithFilter = filter(engineWithMigrate, [], ["Popup", "Entitlements", "Menu", "Grid", ["Calendars", "AvailableCalendars"], ["Theme", "AvailableThemes"]]);

        //we prevent the save to happen on few actions since they do not change the part of the state that is persisted.
        //I think that is a part where we push a bit redux and should have two distinct stores....
        middlewareReduxStorage = ReduxStorage.createMiddleware(engineWithFilter, [MenuRedux.SET_MENUITEMS, GridRedux.SET_GRIDCOLUMNS]);
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
                adaptableBlotterMiddleware(blotter),
                middlewareReduxStorage))
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
                case MenuRedux.BUILD_COLUMN_CONTEXT_MENU: {
                    let returnAction = next(action);
                    middlewareAPI.dispatch(MenuRedux.ShowColumnContextMenu())
                    return returnAction;
                }
                case CalculatedColumnRedux.CALCULATEDCOLUMN_IS_EXPRESSION_VALID: {
                    let returnObj = adaptableBlotter.CalculatedColumnExpressionService.IsExpressionValid((<CalculatedColumnRedux.CalculatedColumnIsExpressionValidAction>action).Expression)
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
                    adaptableBlotter.createCalculatedColumn((<CalculatedColumnRedux.CalculatedColumnAddAction>action).CalculatedColumn)
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
                    adaptableBlotter.deleteCalculatedColumn(calculatedColumnState.CalculatedColumns[actionTyped.Index].ColumnId)
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
                    adaptableBlotter.deleteCalculatedColumn(calculatedColumnState.CalculatedColumns[actionTyped.Index].ColumnId)
                    let returnAction = next(action);
                    adaptableBlotter.createCalculatedColumn(actionTyped.CalculatedColumn)
                    middlewareAPI.dispatch(ColumnChooserRedux.SetNewColumnListOrder(columnsLocalLayout))
                    return returnAction;
                }
                case FilterRedux.HIDE_FILTER_FORM: {
                    adaptableBlotter.hideFilterForm()
                    return next(action);
                }
                case LayoutRedux.LAYOUT_SELECT: {
                    let returnAction = next(action);

                    let layoutState = middlewareAPI.getState().Layout;
                    let currentLayout = layoutState.AvailableLayouts.find(l => l.Name == layoutState.CurrentLayout);
                    if (currentLayout) {
                        let columns = currentLayout.Columns.map(columnId => middlewareAPI.getState().Grid.Columns.find(x => x.ColumnId == columnId));
                        middlewareAPI.dispatch(ColumnChooserRedux.SetNewColumnListOrder(columns))

                        // and run search too - is this the responsibility of this strategy to do this? or for search to listen to layouts?
                        adaptableBlotter.SearchService.ApplySearchOnGrid();
                    }
                    return returnAction;
                }
                case LayoutRedux.LAYOUT_DELETE: {
                    let returnAction = next(action);
                    middlewareAPI.dispatch(LayoutRedux.LayoutSelect("Default"))
                    return returnAction;
                }
                case GridRedux.SET_GRIDVALUE_LIKE_EDIT: {
                    let actionTyped = <GridRedux.SetValueAction>action
                    //We set the value in the grid
                    adaptableBlotter.setValue(actionTyped.CellInfo)
                    //We AuditLog the Edit
                    //13/02: we now do the AuditLog in the SeValue function
                    // adaptableBlotter.AuditLogService.AddEditCellAuditLog(actionTyped.CellInfo.Id, actionTyped.CellInfo.ColumnId, actionTyped.OldValue, actionTyped.CellInfo.Value)
                    return next(action);
                }
                case GridRedux.HIDE_COLUMN: {
                    let actionTyped = <GridRedux.HideColumnAction>action
                    let columnList = [].concat(middlewareAPI.getState().Grid.Columns)
                    let columnIndex = columnList.findIndex(x => x.ColumnId == actionTyped.ColumnId)
                    columnList.splice(columnIndex, 1)
                    adaptableBlotter.setNewColumnListOrder(columnList)
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

                case SmartEditRedux.SMARTEDIT_CHECK_CELL_SELECTION: {
                    let SmartEditStrategy = <ISmartEditStrategy>(adaptableBlotter.Strategies.get(StrategyIds.SmartEditStrategyId));
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


                //here we have all actions that triggers a refresh of the SmartEditPreview
                case SmartEditRedux.SMARTEDIT_CHANGE_OPERATION:
                case SmartEditRedux.SMARTEDIT_CHANGE_VALUE:
                case SmartEditRedux.SMARTEDIT_FETCH_PREVIEW: {
                    //all our logic needs to be executed AFTER the main reducers 
                    //so our state is up to date which allow us not to care about the data within each different action
                    let returnAction = next(action);

                    let SmartEditStrategy = <ISmartEditStrategy>(adaptableBlotter.Strategies.get(StrategyIds.SmartEditStrategyId));
                    let state = middlewareAPI.getState();

                    let apiReturn = SmartEditStrategy.BuildPreviewValues(parseFloat(state.SmartEdit.SmartEditValue), state.SmartEdit.SmartEditOperation);
                    middlewareAPI.dispatch(SmartEditRedux.SmartEditSetPreview(apiReturn));
                    return returnAction;
                }

                case SmartEditRedux.SMARTEDIT_APPLY: {
                    let SmartEditStrategy = <ISmartEditStrategy>(adaptableBlotter.Strategies.get(StrategyIds.SmartEditStrategyId));
                    SmartEditStrategy.ApplySmartEdit((<SmartEditRedux.SmartEditApplyAction>action).bypassCellValidationWarnings);
                    middlewareAPI.dispatch(PopupRedux.PopupHide());
                    return next(action);
                }
                case PlusMinusRedux.PLUSMINUS_APPLY: {
                    let plusMinusStrategy = <IPlusMinusStrategy>(adaptableBlotter.Strategies.get(StrategyIds.PlusMinusStrategyId));
                    let actionTyped = <PlusMinusRedux.PlusMinusApplyAction>action
                    plusMinusStrategy.ApplyPlusMinus(actionTyped.KeyEventString, actionTyped.CellInfos);
                    middlewareAPI.dispatch(PopupRedux.PopupHide());
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
                    middlewareAPI.dispatch(PopupRedux.PopupHide());
                    return next(action);
                }
                //We rebuild the menu from scratch
                //the difference between the two is that RESET_STATE is handled before and set the state to undefined
                case INIT_STATE:
                case RESET_STATE: {
                    let returnAction = next(action);
                    //we create all the menus
                    adaptableBlotter.createMenu();
                    //we set the column list from the datasource
                    adaptableBlotter.setColumnIntoStore();
                    //create the default layout so we can revert to it if needed
                    let currentLayout = "Default"
                    if (middlewareAPI.getState().Layout.AvailableLayouts.length == 0) {
                        middlewareAPI.dispatch(LayoutRedux.LayoutAdd(middlewareAPI.getState().Grid.Columns.map(x => x.ColumnId), "Default"));
                    }
                    else {
                        //update default layout with latest columns
                        middlewareAPI.dispatch(LayoutRedux.SaveLayout(middlewareAPI.getState().Grid.Columns.map(x => x.ColumnId), "Default"));
                        currentLayout = middlewareAPI.getState().Layout.CurrentLayout
                    }
                    //Create all calculated columns before we load the layout
                    middlewareAPI.getState().CalculatedColumn.CalculatedColumns.forEach(x => {
                        adaptableBlotter.createCalculatedColumn(x)
                    })
                    if (middlewareAPI.getState().CalculatedColumn.CalculatedColumns.length > 0) {
                        adaptableBlotter.setColumnIntoStore();
                        //12/09/17 : thank fuck it's not needed anymore as I changed the init process... That was dirty
                        // //We force clone of the state so strategies get reinitialized with the new column.
                        // //it's not ideal and will probably need optimization
                        // middlewareAPI.dispatch(CloneState())
                    }
                    //load either saved layout or default one
                    middlewareAPI.dispatch(LayoutRedux.LayoutSelect(currentLayout));
                    //we create default configuration for new Dashboard Items that are
                    //not existing in the user config
                    AdaptableDashboardViewFactory.forEach((control, strategyId) => {
                        if (!middlewareAPI.getState().Dashboard.DashboardStrategyControls.find(x => x.Strategy == strategyId)) {
                            middlewareAPI.dispatch(DashboardRedux.DashboardCreateDefaultConfigurationItem(strategyId));
                        }
                    })
                    adaptableBlotter.InitAuditService()
                    return returnAction;
                }
                case ColumnChooserRedux.SET_NEW_COLUMN_LIST_ORDER:
                    let actionTyped = <ColumnChooserRedux.SetNewColumnListOrderAction>action
                    //not sure what is best still..... make the strategy generic enough so they work for all combos and put some of the logic in the AB class or do the opposite....
                    //Time will tell I guess
                    adaptableBlotter.setNewColumnListOrder(actionTyped.VisibleColumnList)
                    return next(action);
                default:
                    return next(action);
            }
        }
    }
}