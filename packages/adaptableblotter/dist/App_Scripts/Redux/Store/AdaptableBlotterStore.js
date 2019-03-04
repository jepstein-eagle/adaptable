"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../../Utilities/Enums");
const Redux = require("redux");
const ReduxStorage = require("redux-storage");
const redux_storage_decorator_migrate_1 = require("redux-storage-decorator-migrate");
const DeepDiff = require("deep-diff");
const redux_devtools_extension_1 = require("redux-devtools-extension");
const AdaptableBlotterReduxStorageClientEngine_1 = require("./AdaptableBlotterReduxStorageClientEngine");
const AdaptableBlotterReduxLocalStorageEngine_1 = require("./AdaptableBlotterReduxLocalStorageEngine");
const AdaptableBlotterReduxMerger_1 = require("./AdaptableBlotterReduxMerger");
const redux_storage_decorator_filter_1 = require("redux-storage-decorator-filter");
const MenuRedux = require("../ActionsReducers/MenuRedux");
const PopupRedux = require("../ActionsReducers/PopupRedux");
const ChartRedux = require("../ActionsReducers/ChartRedux");
const AlertRedux = require("../ActionsReducers/AlertRedux");
const SmartEditRedux = require("../ActionsReducers/SmartEditRedux");
const BulkUpdateRedux = require("../ActionsReducers/BulkUpdateRedux");
const CustomSortRedux = require("../ActionsReducers/CustomSortRedux");
const CalculatedColumnRedux = require("../ActionsReducers/CalculatedColumnRedux");
const ShortcutRedux = require("../ActionsReducers/ShortcutRedux");
const GridRedux = require("../ActionsReducers/GridRedux");
const SystemRedux = require("../ActionsReducers/SystemRedux");
const HomeRedux = require("../ActionsReducers/HomeRedux");
const PlusMinusRedux = require("../ActionsReducers/PlusMinusRedux");
const ColumnChooserRedux = require("../ActionsReducers/ColumnChooserRedux");
const ExportRedux = require("../ActionsReducers/ExportRedux");
const FlashingCellsRedux = require("../ActionsReducers/FlashingCellsRedux");
const CalendarRedux = require("../ActionsReducers/CalendarRedux");
const ConditionalStyleRedux = require("../ActionsReducers/ConditionalStyleRedux");
const QuickSearchRedux = require("../ActionsReducers/QuickSearchRedux");
const AdvancedSearchRedux = require("../ActionsReducers/AdvancedSearchRedux");
const DataSourceRedux = require("../ActionsReducers/DataSourceRedux");
const ColumnFilterRedux = require("../ActionsReducers/ColumnFilterRedux");
const UserFilterRedux = require("../ActionsReducers/UserFilterRedux");
const SystemFilterRedux = require("../ActionsReducers/SystemFilterRedux");
const ThemeRedux = require("../ActionsReducers/ThemeRedux");
const FormatColumnRedux = require("../ActionsReducers/FormatColumnRedux");
const FreeTextColumnRedux = require("../ActionsReducers/FreeTextColumnRedux");
const LayoutRedux = require("../ActionsReducers/LayoutRedux");
const ColumnCategoryRedux = require("../ActionsReducers/ColumnCategoryRedux");
const DashboardRedux = require("../ActionsReducers/DashboardRedux");
const CellValidationRedux = require("../ActionsReducers/CellValidationRedux");
const PercentBarRedux = require("../ActionsReducers/PercentBarRedux");
const EntitlementsRedux = require("../ActionsReducers/EntitlementsRedux");
const CellSummaryRedux = require("../ActionsReducers/CellSummaryRedux");
const TeamSharingRedux = require("../ActionsReducers/TeamSharingRedux");
const UserInterfaceRedux = require("../ActionsReducers/UserInterfaceRedux");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
const ConfigConstants = require("../../Utilities/Constants/ConfigConstants");
const LoggingHelper_1 = require("../../Utilities/Helpers/LoggingHelper");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const PreviewHelper_1 = require("../../Utilities/Helpers/PreviewHelper");
const iPushPullHelper_1 = require("../../Utilities/Helpers/iPushPullHelper");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
const BlotterHelper_1 = require("../../Utilities/Helpers/BlotterHelper");
const ChartEnums_1 = require("../../Utilities/ChartEnums");
const rootReducer = Redux.combineReducers({
    // System
    Popup: PopupRedux.ShowPopupReducer,
    Menu: MenuRedux.MenuReducer,
    System: SystemRedux.SystemReducer,
    Grid: GridRedux.GridReducer,
    // User
    AdvancedSearch: AdvancedSearchRedux.AdvancedSearchReducer,
    Alert: AlertRedux.AlertReducer,
    BulkUpdate: BulkUpdateRedux.BulkUpdateReducer,
    CalculatedColumn: CalculatedColumnRedux.CalculatedColumnReducer,
    Calendar: CalendarRedux.CalendarReducer,
    CellValidation: CellValidationRedux.CellValidationReducer,
    Chart: ChartRedux.ChartReducer,
    ColumnCategory: ColumnCategoryRedux.ColumnCategoryReducer,
    ColumnFilter: ColumnFilterRedux.ColumnFilterReducer,
    ConditionalStyle: ConditionalStyleRedux.ConditionalStyleReducer,
    CustomSort: CustomSortRedux.CustomSortReducer,
    Dashboard: DashboardRedux.DashboardReducer,
    DataSource: DataSourceRedux.DataSourceReducer,
    Entitlements: EntitlementsRedux.EntitlementsReducer,
    Export: ExportRedux.ExportReducer,
    FlashingCell: FlashingCellsRedux.FlashingCellReducer,
    FormatColumn: FormatColumnRedux.FormatColumnReducer,
    FreeTextColumn: FreeTextColumnRedux.FreeTextColumnReducer,
    Layout: LayoutRedux.LayoutReducer,
    PercentBar: PercentBarRedux.PercentBarReducer,
    PlusMinus: PlusMinusRedux.PlusMinusReducer,
    QuickSearch: QuickSearchRedux.QuickSearchReducer,
    CellSummary: CellSummaryRedux.CellSummaryReducer,
    Shortcut: ShortcutRedux.ShortcutReducer,
    SmartEdit: SmartEditRedux.SmartEditReducer,
    SystemFilter: SystemFilterRedux.SystemFilterReducer,
    TeamSharing: TeamSharingRedux.TeamSharingReducer,
    Theme: ThemeRedux.ThemeReducer,
    UserFilter: UserFilterRedux.UserFilterReducer,
    UserInterface: UserInterfaceRedux.UserInterfaceStateReducer,
});
const RESET_STATE = 'RESET_STATE';
const INIT_STATE = 'INIT_STATE';
const LOAD_STATE = 'LOAD_STATE';
exports.ResetUserData = () => ({
    type: RESET_STATE
});
exports.InitState = () => ({
    type: INIT_STATE
});
exports.LoadState = (State) => ({
    type: LOAD_STATE,
    State,
});
const rootReducerWithResetManagement = (state, action) => {
    switch (action.type) {
        case RESET_STATE:
            //This trigger the persist of the state with nothing
            state.AdvancedSearch = undefined;
            state.Alert = undefined;
            state.BulkUpdate = undefined;
            state.CalculatedColumn = undefined;
            state.Calendar = undefined;
            state.CellValidation = undefined;
            state.ConditionalStyle = undefined;
            state.Chart = undefined;
            state.CustomSort = undefined;
            state.Dashboard.AvailableToolbars = [];
            state.Dashboard.VisibleButtons = [];
            state.Dashboard.VisibleToolbars = [];
            state.Dashboard = undefined;
            state.DataSource = undefined;
            state.Entitlements = undefined;
            state.Export = undefined;
            state.FlashingCell = undefined;
            state.FormatColumn = undefined;
            state.ColumnFilter.ColumnFilters = [];
            state.UserFilter.UserFilters = [];
            state.SystemFilter.SystemFilters = [];
            state.Grid = undefined;
            //     state.System = undefined
            state.Layout = undefined;
            //      state.Menu.ContextMenu = undefined
            //      state.Menu.MenuItems = []
            //      state.Menu = undefined
            state.PlusMinus = undefined;
            state.QuickSearch = undefined;
            state.Shortcut = undefined;
            state.SmartEdit = undefined;
            state.SelectedCells = undefined;
            //   state.TeamSharing = undefined
            state.Theme = undefined;
            //   state.UserInterface = undefined
            //  state = undefined
            break;
        case LOAD_STATE:
            const { State } = action;
            Object.keys(State).forEach(key => {
                state[key] = State[key];
            });
            break;
    }
    return rootReducer(state, action);
};
// const configServerUrl = "/adaptableblotter-config"
const configServerTeamSharingUrl = "/adaptableblotter-teamsharing";
class AdaptableBlotterStore {
    constructor(blotter) {
        let middlewareReduxStorage;
        let reducerWithStorage;
        let loadStorage;
        let engineWithFilter;
        let engineWithMigrate;
        let engineReduxStorage;
        if (BlotterHelper_1.BlotterHelper.IsConfigServerEnabled(blotter.BlotterOptions) && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(blotter.BlotterOptions.configServerOptions.configServerUrl)) {
            engineReduxStorage = AdaptableBlotterReduxStorageClientEngine_1.createEngine(blotter.BlotterOptions.configServerOptions.configServerUrl, blotter.BlotterOptions.userName, blotter.BlotterOptions.blotterId, blotter);
        }
        else {
            engineReduxStorage = AdaptableBlotterReduxLocalStorageEngine_1.createEngine(blotter.BlotterOptions.blotterId, blotter.BlotterOptions.predefinedConfig, blotter.LicenceService.LicenceType);
        }
        // engine with migrate is where we manage the bits that we dont want to persist, but need to keep in the store
        // perhaps would be better to have 2 stores - persistence store and in-memory store
        engineWithMigrate = redux_storage_decorator_migrate_1.default(engineReduxStorage, 0, "AdaptableStoreVersion", [] /*[someExampleMigration]*/);
        engineWithFilter = redux_storage_decorator_filter_1.default(engineWithMigrate, [], [
            // System State - Used ONLY Internally so no need to save
            ConfigConstants.SYSTEM,
            ConfigConstants.GRID,
            ConfigConstants.MENU,
            ConfigConstants.POPUP,
            ConfigConstants.TEAM_SHARING,
            ConfigConstants.CHART_INTERNAL,
            // Config State - set ONLY in PredefinedConfig and never changed at runtime
            ConfigConstants.USER_INTERFACE,
            ConfigConstants.ENTITLEMENTS,
            ConfigConstants.APPLICATION,
        ]);
        //we prevent the save to happen on few actions since they do not change the part of the state that is persisted.
        //I think that is a part where we push a bit redux and should have two distinct stores....
        middlewareReduxStorage = ReduxStorage.createMiddleware(engineWithFilter, [MenuRedux.SET_MENUITEMS, GridRedux.GRID_SET_COLUMNS, ColumnChooserRedux.SET_NEW_COLUMN_LIST_ORDER,
            PopupRedux.POPUP_CLEAR_PARAM, PopupRedux.POPUP_CONFIRM_PROMPT,
            PopupRedux.POPUP_CANCEL_CONFIRMATION, PopupRedux.POPUP_CONFIRM_CONFIRMATION, PopupRedux.POPUP_SHOW_CONFIRMATION,
            PopupRedux.POPUP_SHOW_SCREEN, PopupRedux.POPUP_HIDE_SCREEN,
            PopupRedux.POPUP_SHOW_PROMPT, PopupRedux.POPUP_HIDE_PROMPT,
            PopupRedux.POPUP_SHOW_ALERT, PopupRedux.POPUP_HIDE_ALERT,
            PopupRedux.POPUP_SHOW_LOADING, PopupRedux.POPUP_HIDE_LOADING
        ]);
        //here we use our own merger function which is derived from redux simple merger
        // we now use a different Merge function based on the licence type to ensure that state is only loaded if user has access
        switch (blotter.LicenceService.LicenceType) {
            case Enums_1.LicenceType.Community:
                reducerWithStorage = ReduxStorage.reducer(rootReducerWithResetManagement, AdaptableBlotterReduxMerger_1.MergeStateCommunityLicence);
                break;
            case Enums_1.LicenceType.Standard:
                reducerWithStorage = ReduxStorage.reducer(rootReducerWithResetManagement, AdaptableBlotterReduxMerger_1.MergeStateStandardLicence);
                break;
            case Enums_1.LicenceType.Enterprise:
                reducerWithStorage = ReduxStorage.reducer(rootReducerWithResetManagement, AdaptableBlotterReduxMerger_1.MergeStateEnterpriseLicence);
                break;
        }
        loadStorage = ReduxStorage.createLoader(engineWithFilter);
        let composeEnhancers;
        if ("production" != process.env.NODE_ENV) {
            composeEnhancers = redux_devtools_extension_1.composeWithDevTools({
            // Specify here name, actionsBlacklist, actionsCreators and other options if needed
            });
        }
        else {
            composeEnhancers = (x) => x;
        }
        //TODO: need to check if we want the storage to be done before or after
        //we enrich the state with the AB middleware
        this.TheStore = Redux.createStore(reducerWithStorage, composeEnhancers(Redux.applyMiddleware(diffStateAuditMiddleware(blotter), adaptableBlotterMiddleware(blotter), middlewareReduxStorage, functionLogMiddleware(blotter))));
        //We start to build the state once everything is instantiated... I dont like that. Need to change
        this.Load =
            //We load the previous saved session. Redux is pretty awesome in its simplicity!
            loadStorage(this.TheStore)
                .then(() => this.TheStore.dispatch(exports.InitState()), (e) => {
                LoggingHelper_1.LoggingHelper.LogAdaptableBlotterError('Failed to load previous adaptable blotter state : ', e);
                //for now i'm still initializing the AB even if loading state has failed....
                //we may revisit that later
                this.TheStore.dispatch(exports.InitState());
                this.TheStore.dispatch(PopupRedux.PopupShowAlert({ Header: "Configuration", Msg: "Error loading your configuration:" + e, MessageType: Enums_1.MessageType.Error }));
            });
    }
}
exports.AdaptableBlotterStore = AdaptableBlotterStore;
// this function checks for any differences in the state and sends it to audit logger
// we now allow users to differentiate between user and internal state so we check for both
var diffStateAuditMiddleware = (adaptableBlotter) => function (middlewareAPI) {
    return function (next) {
        return function (action) {
            // if audit state is turned off, then get out asap
            if (!adaptableBlotter.AuditLogService.IsAuditStateChangesEnabled) {
                return next(action);
            }
            // we have audit so look at the action to decide what to do
            switch (action.type) {
                // for some octions we never audit even if its turned on
                case ReduxStorage.SAVE:
                case RESET_STATE:
                case INIT_STATE: {
                    return next(action);
                }
                // for system, grid, menu and popup state functions
                // we audit state changes only if audit is set to log internal state
                case SystemRedux.SYSTEM_SET_HEALTH_STATUS:
                case SystemRedux.SYSTEM_CLEAR_HEALTH_STATUS:
                case SystemRedux.SYSTEM_ALERT_ADD:
                case SystemRedux.SYSTEM_ALERT_DELETE:
                case SystemRedux.SYSTEM_ALERT_DELETE_ALL:
                case SystemRedux.REPORT_START_LIVE:
                case SystemRedux.REPORT_STOP_LIVE:
                case SystemRedux.SET_IPP_DOMAIN_PAGES:
                case SystemRedux.REPORT_SET_ERROR_MESSAGE:
                case SystemRedux.SMARTEDIT_CHECK_CELL_SELECTION:
                case SystemRedux.SMARTEDIT_FETCH_PREVIEW:
                case SystemRedux.SMARTEDIT_SET_VALID_SELECTION:
                case SystemRedux.SMARTEDIT_SET_PREVIEW:
                case SystemRedux.BULK_UPDATE_CHECK_CELL_SELECTION:
                case SystemRedux.BULK_UPDATE_SET_VALID_SELECTION:
                case SystemRedux.BULK_UPDATE_SET_PREVIEW:
                case GridRedux.GRID_SET_COLUMNS:
                case GridRedux.GRID_ADD_COLUMN:
                case GridRedux.GRID_HIDE_COLUMN:
                case GridRedux.GRID_SET_VALUE_LIKE_EDIT:
                case GridRedux.GRID_SELECT_COLUMN:
                case GridRedux.GRID_SET_SORT:
                case GridRedux.GRID_SET_SELECTED_CELLS:
                case GridRedux.GRID_CREATE_CELLS_SUMMARY:
                case GridRedux.GRID_SET_CELLS_SUMMARY:
                case MenuRedux.SET_MENUITEMS:
                case MenuRedux.BUILD_COLUMN_CONTEXT_MENU:
                case MenuRedux.ADD_ITEM_COLUMN_CONTEXT_MENU:
                case MenuRedux.CLEAR_COLUMN_CONTEXT_MENU:
                case PopupRedux.POPUP_SHOW_SCREEN:
                case PopupRedux.POPUP_HIDE_SCREEN:
                case PopupRedux.POPUP_SHOW_LOADING:
                case PopupRedux.POPUP_HIDE_LOADING:
                case PopupRedux.POPUP_SHOW_ABOUT:
                case PopupRedux.POPUP_HIDE_ABOUT:
                case PopupRedux.POPUP_SHOW_ALERT:
                case PopupRedux.POPUP_HIDE_ALERT:
                case PopupRedux.POPUP_SHOW_PROMPT:
                case PopupRedux.POPUP_HIDE_PROMPT:
                case PopupRedux.POPUP_CONFIRM_PROMPT:
                case PopupRedux.POPUP_SHOW_CONFIRMATION:
                case PopupRedux.POPUP_CONFIRM_CONFIRMATION:
                case PopupRedux.POPUP_CANCEL_CONFIRMATION:
                case PopupRedux.POPUP_CLEAR_PARAM:
                // do team sharing actions??
                case SystemRedux.CHART_SET_CHART_DATA:
                case SystemRedux.CHART_SET_CHART_VISIBILITY:
                    if (adaptableBlotter.AuditLogService.IsAuditInternalStateChangesEnabled) {
                        let oldState = middlewareAPI.getState();
                        let ret = next(action);
                        let newState = middlewareAPI.getState();
                        let diff = DeepDiff.diff(oldState, newState);
                        adaptableBlotter.AuditLogService.AddStateChangeAuditLog(diff, action.type);
                        return ret;
                    }
                    else {
                        return next(action);
                    }
                // for all other functions we audit state changes if audit is set to log user state
                default: {
                    if (adaptableBlotter.AuditLogService.IsAuditUserStateChangesEnabled) {
                        let oldState = middlewareAPI.getState();
                        let ret = next(action);
                        let newState = middlewareAPI.getState();
                        let diff = DeepDiff.diff(oldState, newState);
                        adaptableBlotter.AuditLogService.AddStateChangeAuditLog(diff, action.type);
                        return ret;
                    }
                    else {
                        return next(action);
                    }
                }
            }
        };
    };
};
// this function is responsible for sending any changes through functions to the audit - previously done in the strategies but better done here I think....
// ideally it should only audit grid actions that are effected by our function.  general state changes are picked up in the audit diff
// e.g. this should say when the current Advanced search has changed, or if a custom sort is being applied (it doesnt yet), but not when sorts have been added generally or seraches changed
var functionLogMiddleware = (adaptableBlotter) => function (middlewareAPI) {
    return function (next) {
        return function (action) {
            if (!adaptableBlotter.AuditLogService.IsAuditFunctionEventsEnabled) {
                // not logging functions so leave...
                return next(action);
            }
            let state = middlewareAPI.getState();
            // Note: not done custom sort, and many others
            // also not done bulk update, smart edit as each has different issues...
            // need to add lots more here as its very patchy at the moment...
            switch (action.type) {
                case AdvancedSearchRedux.ADVANCED_SEARCH_SELECT: {
                    let actionTyped = action;
                    let advancedSearch = state.AdvancedSearch.AdvancedSearches.find(as => as.Name == actionTyped.selectedSearchName);
                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.AdvancedSearchStrategyId, action.type, StringExtensions_1.StringExtensions.IsNullOrEmpty(actionTyped.selectedSearchName) ? "[No Advanced Search selected]" : actionTyped.selectedSearchName, advancedSearch);
                    return next(action);
                }
                case AdvancedSearchRedux.ADVANCED_SEARCH_ADD_UPDATE: {
                    let actionTyped = action;
                    let currentAdvancedSearch = state.AdvancedSearch.CurrentAdvancedSearch; // problem here if they have changed the name potentially...
                    if (actionTyped.advancedSearch.Name == currentAdvancedSearch) {
                        adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.AdvancedSearchStrategyId, action.type, actionTyped.advancedSearch.Name, actionTyped.advancedSearch);
                    }
                    return next(action);
                }
                case QuickSearchRedux.QUICK_SEARCH_APPLY: {
                    let actionTyped = action;
                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.QuickSearchStrategyId, action.type, StringExtensions_1.StringExtensions.IsNullOrEmpty(actionTyped.quickSearchText) ? "[No Quick Search]" : actionTyped.quickSearchText, actionTyped.quickSearchText);
                    return next(action);
                }
                case PlusMinusRedux.PLUSMINUS_APPLY: {
                    let actionTyped = action;
                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.PlusMinusStrategyId, action.type, "KeyPressed:" + actionTyped.KeyEventString, actionTyped.CellInfos);
                    return next(action);
                }
                case ShortcutRedux.SHORTCUT_APPLY: {
                    let actionTyped = action;
                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.ShortcutStrategyId, action.type, "KeyPressed:" + actionTyped.KeyEventString, { Shortcut: actionTyped.Shortcut, PrimaryKey: actionTyped.CellInfo.Id, ColumnId: actionTyped.CellInfo.ColumnId });
                    return next(action);
                }
                case ColumnFilterRedux.COLUMN_FILTER_ADD_UPDATE: {
                    let actionTyped = action;
                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.ColumnFilterStrategyId, action.type, "Column Filter Applied", { Column: actionTyped.columnFilter.ColumnId, ColumnFilter: ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(actionTyped.columnFilter.Filter, middlewareAPI.getState().Grid.Columns) });
                    return next(action);
                }
                case ColumnFilterRedux.COLUMN_FILTER_CLEAR: {
                    let actionTyped = action;
                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.ColumnFilterStrategyId, action.type, "Column Filter Cleared", { Column: actionTyped.columnId });
                    return next(action);
                }
                case UserFilterRedux.USER_FILTER_ADD_UPDATE: {
                    let actionTyped = action;
                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.UserFilterStrategyId, action.type, "filters applied", state.UserFilter.UserFilters);
                    return next(action);
                }
                default: { // not one of the functions we log so nothing to do
                    return next(action);
                }
            }
        };
    };
};
// this is the main function for dealing with events that we CANNOT deal with in strategies
// only use this function where it makes sense to  - try to use the strategy to deal with appropriate state where possible
// please document each use case where we have to use the Store
var adaptableBlotterMiddleware = (blotter) => function (middlewareAPI) {
    return function (next) {
        return function (action) {
            switch (action.type) {
                /*******************
                * CALCULATED COLUMN ACTIONS
                *******************/
                /**
                 * Use Case: User is creating a calculated column and want to check if its valid
                 * Action: If it is valid, then clear any error; otherwise set one
                 */
                case CalculatedColumnRedux.CALCULATEDCOLUMN_IS_EXPRESSION_VALID: {
                    let returnObj = blotter.CalculatedColumnExpressionService.IsExpressionValid(action.expression);
                    if (!returnObj.IsValid) {
                        middlewareAPI.dispatch(SystemRedux.CalculatedColumnSetErrorMessage(returnObj.ErrorMsg));
                    }
                    else {
                        middlewareAPI.dispatch(SystemRedux.CalculatedColumnSetErrorMessage(null));
                    }
                    return next(action);
                }
                /**
                * Use Case: User has created a calculated column
                * Action:  Tell the blotter so it can do what it needs
                */
                case CalculatedColumnRedux.CALCULATEDCOLUMN_ADD: {
                    let returnAction = next(action);
                    let calculatedColumn = action.calculatedColumn;
                    blotter.addCalculatedColumnToGrid(calculatedColumn);
                    return returnAction;
                }
                /**
                 * Use Case: User has deleted a calculated column
                 * Action (1):  Tell the blotter so it can do what it needs
                 * Action (2):  Set a new column list order so we can remove it
                 * N.B. This will NOT update any layouts that reference the column
                 */
                case CalculatedColumnRedux.CALCULATEDCOLUMN_DELETE: {
                    let calculatedColumnState = middlewareAPI.getState().CalculatedColumn;
                    let actionTyped = action;
                    let columnsLocalLayout = middlewareAPI.getState().Grid.Columns;
                    let deletedCalculatedColumnIndex = middlewareAPI.getState().Grid.Columns.findIndex(x => x.ColumnId == calculatedColumnState.CalculatedColumns[actionTyped.index].ColumnId);
                    blotter.removeCalculatedColumnFromGrid(calculatedColumnState.CalculatedColumns[actionTyped.index].ColumnId);
                    if (deletedCalculatedColumnIndex > -1) {
                        columnsLocalLayout.splice(deletedCalculatedColumnIndex, 1);
                    }
                    middlewareAPI.dispatch(ColumnChooserRedux.SetNewColumnListOrder(columnsLocalLayout));
                    let returnAction = next(action);
                    return returnAction;
                }
                /**
                 * Use Case: User has edited an existing calculated column
                 * If the name has changed in the Calculated Column (rare but possible):
                 * Action (1):  Tell the blotter to delete the calculated column
                 * Action (2):  Tell the blotter to add a new calculated column
                 * Action (3):  Set a new column list order so it appears as a new column
                 * If the name has not changed:
                 * Action:  Tell the blotter so it can do what it needs
                 */
                case CalculatedColumnRedux.CALCULATEDCOLUMN_EDIT: {
                    let calculatedColumnState = middlewareAPI.getState().CalculatedColumn;
                    let actionTyped = action;
                    let columnsLocalLayout = middlewareAPI.getState().Grid.Columns;
                    let index = actionTyped.index;
                    let isNameChanged = columnsLocalLayout.find(c => c.ColumnId == actionTyped.calculatedColumn.ColumnId) == null;
                    if (isNameChanged) { // name has changed so we are going to delete and then add to ensure all col names are correct
                        blotter.removeCalculatedColumnFromGrid(calculatedColumnState.CalculatedColumns[index].ColumnId);
                        blotter.addCalculatedColumnToGrid(actionTyped.calculatedColumn);
                        blotter.setColumnIntoStore();
                        columnsLocalLayout = middlewareAPI.getState().Grid.Columns; // need to get again
                    }
                    else { // it exists so just edit
                        blotter.editCalculatedColumnInGrid(actionTyped.calculatedColumn);
                    }
                    middlewareAPI.dispatch(ColumnChooserRedux.SetNewColumnListOrder(columnsLocalLayout));
                    let returnAction = next(action);
                    return returnAction;
                }
                /*******************
                * FREE TEXT COLUMN ACTIONS
                *******************/
                case FreeTextColumnRedux.FREE_TEXT_COLUMN_ADD: {
                    let returnAction = next(action);
                    let freeTextColumn = action.FreeTextColumn;
                    blotter.addFreeTextColumnToGrid(freeTextColumn);
                    return returnAction;
                }
                case FreeTextColumnRedux.FREE_TEXT_COLUMN_EDIT: {
                    // not too sure what I need to do - perhaps just refresh everything?
                    let returnAction = next(action);
                    return returnAction;
                }
                // TODO:  Need to do Delete for free text column? 
                /*******************
                * COLUMN CATEGORY ACTIONS
                *******************/
                /**
                 * Use Case: User deletes a Column Category (and there might be conditional styles that reference it)
                 * Action (1):  Get all condiitonal styles from state
                 * Action (2):  Delete any (without currently showing a warning) that reference this Column Category
                 */
                case ColumnCategoryRedux.COLUMN_CATEGORY_DELETE: {
                    let returnAction = next(action);
                    let actionTyped = action;
                    let conditionalStyleState = middlewareAPI.getState().ConditionalStyle;
                    conditionalStyleState.ConditionalStyles.forEach((cs, index) => {
                        if (cs.ColumnCategoryId == actionTyped.ColumnCategory.ColumnCategoryId) {
                            // some warning?
                            middlewareAPI.dispatch(ConditionalStyleRedux.ConditionalStyleDelete(index, cs));
                        }
                    });
                    return returnAction;
                }
                /*******************
                * CHART ACTIONS
                *******************/
                /**
                * Use Case: User deletes a chart (which might be currently showing)
                * Action:  Set ALL chart visibility to hidden (even if its not current chart)?
                * Note:  No need to worry about using a popup as cannot delete a chart while in popup (other than through api)
                */
                case ChartRedux.CHART_DEFINITION_DELETE: {
                    let returnAction = next(action);
                    middlewareAPI.dispatch(SystemRedux.ChartSetChartVisibility(ChartEnums_1.ChartVisibility.Hidden));
                    return returnAction;
                }
                /**
                * Use Case: User clears the currrent chart
                * Action:  Set chart visibility to hidden
                */
                case ChartRedux.CHART_DEFINITION_SELECT: {
                    let actionTyped = action;
                    if (StringExtensions_1.StringExtensions.IsNullOrEmpty(actionTyped.CurrentChartName)) {
                        middlewareAPI.dispatch(SystemRedux.ChartSetChartVisibility(ChartEnums_1.ChartVisibility.Hidden));
                    }
                    let returnAction = next(action);
                    return returnAction;
                }
                /*******************
                * LAYOUT ACTIONS
                *******************/
                case LayoutRedux.LAYOUT_SELECT: {
                    let returnAction = next(action);
                    let layoutState = middlewareAPI.getState().Layout;
                    let currentLayout = layoutState.Layouts.find(l => l.Name == layoutState.CurrentLayout);
                    if (currentLayout) {
                        let gridState = middlewareAPI.getState().Grid;
                        // set columns
                        let blotterColumns = [];
                        currentLayout.Columns.forEach(c => {
                            let column = ColumnHelper_1.ColumnHelper.getColumnFromId(c, gridState.Columns);
                            if (column) {
                                blotterColumns.push(column);
                            }
                            else {
                                LoggingHelper_1.LoggingHelper.LogAdaptableBlotterWarning("Column '" + c + "' not found while selecting layout: " + currentLayout);
                            }
                        });
                        middlewareAPI.dispatch(ColumnChooserRedux.SetNewColumnListOrder(blotterColumns));
                        // set sort
                        middlewareAPI.dispatch(GridRedux.GridSetSort(currentLayout.GridSorts));
                        blotter.setGridSort(currentLayout.GridSorts);
                        // set vendor specific info
                        blotter.setVendorGridState(currentLayout.VendorGridInfo);
                    }
                    return returnAction;
                }
                case LayoutRedux.LAYOUT_DELETE: {
                    let returnAction = next(action);
                    let layoutState = middlewareAPI.getState().Layout;
                    let currentLayout = layoutState.Layouts.find(l => l.Name == layoutState.CurrentLayout);
                    if (!currentLayout) { // we have deleted the current layout (allowed) so lets make the layout default
                        middlewareAPI.dispatch(LayoutRedux.LayoutSelect(GeneralConstants_1.DEFAULT_LAYOUT));
                    }
                    return returnAction;
                }
                case LayoutRedux.LAYOUT_PRESAVE: {
                    let returnAction = next(action);
                    let actionTyped = action;
                    let layout = Helper_1.Helper.cloneObject(actionTyped.Layout);
                    let forceFetch = layout.Name == GeneralConstants_1.DEFAULT_LAYOUT;
                    layout.VendorGridInfo = blotter.getVendorGridState(layout.Columns, forceFetch);
                    middlewareAPI.dispatch(LayoutRedux.LayoutAddUpdate(actionTyped.Index, layout));
                    return returnAction;
                }
                /*******************
                 * SMART EDIT ACTIONS
                 *******************/
                /**
                 * Use Case: User wants to perform Smart Edit and we need to check if the cell selection is valid
                 * Action (1):  Get the result from the SmartEdit strategy
                 * If the return is an Alert:
                 * Action (2): If there is a popup open, close it and show the Alert; otherwise just set false valid selection
                 * If the return is valid:
                 * Action (2): Set the valid selection to true
                 * Action (3): Build the Preview Values (via Smart Edit strategy)
                 * Action (4): Set the Preview Values (this will populate the preview screen)
                 */
                case SystemRedux.SMARTEDIT_CHECK_CELL_SELECTION: {
                    let SmartEditStrategy = (blotter.Strategies.get(StrategyConstants.SmartEditStrategyId));
                    let state = middlewareAPI.getState();
                    let returnAction = next(action);
                    let apiReturn = SmartEditStrategy.CheckCorrectCellSelection();
                    if (apiReturn.Alert) {
                        // check if Smart Edit is showing as popup and then close and show error (dont want to do that if from toolbar)
                        let popup = state.Popup.ScreenPopup;
                        if (popup.ComponentName == ScreenPopups.SmartEditPopup) {
                            // We are in SmartEditPopup so let's close it
                            middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                            // and now show the alert Popup
                            middlewareAPI.dispatch(PopupRedux.PopupShowAlert(apiReturn.Alert));
                        }
                        middlewareAPI.dispatch(SystemRedux.SmartEditSetValidSelection(false));
                    }
                    else {
                        middlewareAPI.dispatch(SystemRedux.SmartEditSetValidSelection(true));
                        let apiPreviewReturn = SmartEditStrategy.BuildPreviewValues(state.SmartEdit.SmartEditValue, state.SmartEdit.MathOperation);
                        middlewareAPI.dispatch(SystemRedux.SmartEditSetPreview(apiPreviewReturn));
                    }
                    return returnAction;
                }
                /**
                 * Use Case: User has changed a Smmart Edit property or requested a preview
                 * Action (1):  Get the new preview set from the Smart Edit Strategy
                 * Action (2):  Set the Preview Values (this will populate the preview screen)
                 */
                case SmartEditRedux.SMARTEDIT_CHANGE_OPERATION:
                case SmartEditRedux.SMARTEDIT_CHANGE_VALUE:
                case SystemRedux.SMARTEDIT_FETCH_PREVIEW: {
                    //all our logic needs to be executed AFTER the main reducers
                    //so our state is up to date which allow us not to care about the data within each different action
                    let returnAction = next(action);
                    let SmartEditStrategy = (blotter.Strategies.get(StrategyConstants.SmartEditStrategyId));
                    let state = middlewareAPI.getState();
                    let apiReturn = SmartEditStrategy.BuildPreviewValues(state.SmartEdit.SmartEditValue, state.SmartEdit.MathOperation);
                    middlewareAPI.dispatch(SystemRedux.SmartEditSetPreview(apiReturn));
                    return returnAction;
                }
                /**
                * Use Case: User has clicked 'Apply' in Smart Edit popup or toolbar
                * Action (1):  Gets the values that need to be applied from the Preview Info and passes to Preview Helper (incl. whether to bypass validation)
                * Action (2):  Sends these new values to the Smart Edit Strategy (which will, in turn, apply them to the Blotter)
                */
                case SmartEditRedux.SMARTEDIT_APPLY: {
                    let SmartEditStrategy = (blotter.Strategies.get(StrategyConstants.SmartEditStrategyId));
                    let actionTyped = action;
                    let thePreview = middlewareAPI.getState().System.SmartEditPreviewInfo;
                    let newValues = PreviewHelper_1.PreviewHelper.GetCellInfosFromPreview(thePreview, actionTyped.bypassCellValidationWarnings);
                    SmartEditStrategy.ApplySmartEdit(newValues);
                    middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                    return next(action);
                }
                /*******************
                * BULK UPDATE ACTIONS
                *******************/
                case SystemRedux.BULK_UPDATE_CHECK_CELL_SELECTION: {
                    let BulkUpdateStrategy = (blotter.Strategies.get(StrategyConstants.BulkUpdateStrategyId));
                    let state = middlewareAPI.getState();
                    let returnAction = next(action);
                    let apiReturn = BulkUpdateStrategy.CheckCorrectCellSelection();
                    if (apiReturn.Alert) {
                        // check if BulkUpdate is showing as popup
                        let popup = state.Popup.ScreenPopup;
                        if (popup.ComponentName == ScreenPopups.BulkUpdatePopup) {
                            //We close the BulkUpdatePopup
                            middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                            //We show the Error Popup -- assume that will alwasy be an Error
                            middlewareAPI.dispatch(PopupRedux.PopupShowAlert(apiReturn.Alert));
                        }
                        middlewareAPI.dispatch(SystemRedux.BulkUpdateSetValidSelection(false));
                    }
                    else {
                        middlewareAPI.dispatch(SystemRedux.BulkUpdateSetValidSelection(true));
                        let apiPreviewReturn = BulkUpdateStrategy.BuildPreviewValues(state.BulkUpdate.BulkUpdateValue);
                        middlewareAPI.dispatch(SystemRedux.BulkUpdateSetPreview(apiPreviewReturn));
                    }
                    return returnAction;
                }
                // Here we have all actions that triggers a refresh of the BulkUpdatePreview
                case BulkUpdateRedux.BULK_UPDATE_CHANGE_VALUE: {
                    //all our logic needs to be executed AFTER the main reducers
                    //so our state is up to date which allow us not to care about the data within each different action
                    let returnAction = next(action);
                    let BulkUpdateStrategy = (blotter.Strategies.get(StrategyConstants.BulkUpdateStrategyId));
                    let state = middlewareAPI.getState();
                    let apiReturn = BulkUpdateStrategy.BuildPreviewValues(state.BulkUpdate.BulkUpdateValue);
                    middlewareAPI.dispatch(SystemRedux.BulkUpdateSetPreview(apiReturn));
                    return returnAction;
                }
                case BulkUpdateRedux.BULK_UPDATE_APPLY: {
                    let BulkUpdateStrategy = (blotter.Strategies.get(StrategyConstants.BulkUpdateStrategyId));
                    let actionTyped = action;
                    let thePreview = middlewareAPI.getState().System.BulkUpdatePreviewInfo;
                    let newValues = PreviewHelper_1.PreviewHelper.GetCellInfosFromPreview(thePreview, actionTyped.bypassCellValidationWarnings);
                    BulkUpdateStrategy.ApplyBulkUpdate(newValues);
                    middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                    return next(action);
                }
                /*******************
               * PLUS MINUS ACTIONS
               *******************/
                case PlusMinusRedux.PLUSMINUS_APPLY: {
                    let plusMinusStrategy = (blotter.Strategies.get(StrategyConstants.PlusMinusStrategyId));
                    let actionTyped = action;
                    plusMinusStrategy.ApplyPlusMinus(actionTyped.KeyEventString, actionTyped.CellInfos);
                    middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                    return next(action);
                }
                /*******************
                * SHORTCUT ACTIONS
                *******************/
                /**
                 * Use Case: User applies a shortcut via the keyboard
                 * Action: Tell the Shortcut Strategy to apply the shortcut
                 */
                case ShortcutRedux.SHORTCUT_APPLY: {
                    let shortcutStrategy = (blotter.Strategies.get(StrategyConstants.ShortcutStrategyId));
                    let actionTyped = action;
                    shortcutStrategy.ApplyShortcut(actionTyped.CellInfo, actionTyped.NewValue);
                    return next(action);
                }
                /*******************
                * EXPORT ACTIONS
                *******************/
                case ExportRedux.EXPORT_APPLY: {
                    let exportStrategy = (blotter.Strategies.get(StrategyConstants.ExportStrategyId));
                    let actionTyped = action;
                    if (actionTyped.ExportDestination == Enums_1.ExportDestination.iPushPull && iPushPullHelper_1.iPushPullHelper.IPPStatus != iPushPullHelper_1.iPushPullHelper.ServiceStatus.Connected) {
                        middlewareAPI.dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, "IPushPullLogin", actionTyped.Report));
                    }
                    else if (actionTyped.ExportDestination == Enums_1.ExportDestination.iPushPull && !actionTyped.Folder) {
                        iPushPullHelper_1.iPushPullHelper.GetDomainPages(blotter.BlotterOptions.iPushPullConfig.api_key).then((domainpages) => {
                            middlewareAPI.dispatch(SystemRedux.SetIPPDomainPages(domainpages));
                            middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(""));
                        }).catch((err) => {
                            middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(err));
                        });
                        middlewareAPI.dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, "IPushPullDomainPageSelector", actionTyped.Report));
                    }
                    else if (actionTyped.ExportDestination == Enums_1.ExportDestination.iPushPull) {
                        exportStrategy.Export(actionTyped.Report, actionTyped.ExportDestination, actionTyped.Folder, actionTyped.Page);
                        middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                    }
                    else {
                        exportStrategy.Export(actionTyped.Report, actionTyped.ExportDestination);
                        middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                    }
                    return next(action);
                }
                case ExportRedux.IPP_LOGIN: {
                    let actionTyped = action;
                    iPushPullHelper_1.iPushPullHelper.Login(actionTyped.Login, actionTyped.Password).then(() => {
                        let report = middlewareAPI.getState().Popup.ScreenPopup.Params;
                        middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                        middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(""));
                        iPushPullHelper_1.iPushPullHelper.GetDomainPages(blotter.BlotterOptions.iPushPullConfig.api_key).then((domainpages) => {
                            middlewareAPI.dispatch(SystemRedux.SetIPPDomainPages(domainpages));
                            middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(""));
                        }).catch((error) => {
                            middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(error));
                        });
                        middlewareAPI.dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, "IPushPullDomainPageSelector", report));
                    }).catch((error) => {
                        LoggingHelper_1.LoggingHelper.LogAdaptableBlotterError("Login failed", error);
                        middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(error));
                    });
                    return next(action);
                }
                case SystemRedux.REPORT_STOP_LIVE: {
                    let actionTyped = action;
                    if (actionTyped.ExportDestination == Enums_1.ExportDestination.iPushPull) {
                        let currentLiveReports = middlewareAPI.getState().System.CurrentLiveReports;
                        let lre = currentLiveReports.find(x => x.Report == actionTyped.Report && x.ExportDestination == actionTyped.ExportDestination);
                        iPushPullHelper_1.iPushPullHelper.UnloadPage(lre.WorkbookName);
                    }
                    return next(action);
                }
                /*******************
                 * USER FILTER ACTIONS
                 *******************/
                case UserFilterRedux.USER_FILTER_CREATE_FROM_COLUMN_FILTER: {
                    let actionTyped = action;
                    // first create a new user filter based on the column filter and input name
                    let userFilter = ObjectFactory_1.ObjectFactory.CreateUserFilterFromColumnFilter(actionTyped.ColumnFilter, actionTyped.InputText);
                    middlewareAPI.dispatch(UserFilterRedux.UserFilterAddUpdate(-1, userFilter));
                    // then create a new column filter from the user filter - so that it will display the user filter name
                    let newColumnFilter = ObjectFactory_1.ObjectFactory.CreateColumnFilterFromUserFilter(userFilter);
                    middlewareAPI.dispatch(ColumnFilterRedux.ColumnFilterAddUpdate(newColumnFilter));
                    return next(action);
                }
                /*******************
                * COLUMN CHOOSER ACTIONS
                *******************/
                case ColumnChooserRedux.SET_NEW_COLUMN_LIST_ORDER:
                    let actionTyped = action;
                    blotter.setNewColumnListOrder(actionTyped.VisibleColumnList);
                    return next(action);
                /*******************
                 * TEAM SHARING ACTIONS
                 *******************/
                // Use case - an item needs to be shared between teams
                case TeamSharingRedux.TEAMSHARING_SHARE: {
                    let actionTyped = action;
                    let returnAction = next(action);
                    let xhr = new XMLHttpRequest();
                    xhr.onerror = (ev) => LoggingHelper_1.LoggingHelper.LogAdaptableBlotterError("TeamSharing share error :" + ev.message, actionTyped.Entity);
                    xhr.ontimeout = () => LoggingHelper_1.LoggingHelper.LogAdaptableBlotterWarning("TeamSharing share timeout", actionTyped.Entity);
                    xhr.onload = () => {
                        if (xhr.readyState == 4) {
                            if (xhr.status != 200) {
                                LoggingHelper_1.LoggingHelper.LogAdaptableBlotterError("TeamSharing share error : " + xhr.statusText, actionTyped.Entity);
                                middlewareAPI.dispatch(PopupRedux.PopupShowAlert({ Header: "Team Sharing Error", Msg: "Couldn't share item: " + xhr.statusText, MessageType: Enums_1.MessageType.Error }));
                            }
                            else {
                                middlewareAPI.dispatch(PopupRedux.PopupShowAlert({ Header: "Team Sharing", Msg: "Item Shared Successfully", MessageType: Enums_1.MessageType.Info }));
                            }
                        }
                    };
                    //we make the request async
                    xhr.open("POST", configServerTeamSharingUrl, true);
                    xhr.setRequestHeader("Content-type", "application/json");
                    let obj = {
                        entity: actionTyped.Entity,
                        user: blotter.BlotterOptions.userName,
                        blotter_id: blotter.BlotterOptions.blotterId,
                        strategy: actionTyped.Strategy,
                        timestamp: new Date()
                    };
                    xhr.send(JSON.stringify(obj));
                    return returnAction;
                }
                case TeamSharingRedux.TEAMSHARING_GET: {
                    let returnAction = next(action);
                    let xhr = new XMLHttpRequest();
                    xhr.onerror = (ev) => LoggingHelper_1.LoggingHelper.LogAdaptableBlotterError("TeamSharing get error :" + ev.message);
                    xhr.ontimeout = () => LoggingHelper_1.LoggingHelper.LogAdaptableBlotterWarning("TeamSharing get timeout");
                    xhr.onload = () => {
                        if (xhr.readyState == 4) {
                            if (xhr.status != 200) {
                                LoggingHelper_1.LoggingHelper.LogAdaptableBlotterError("TeamSharing get error : " + xhr.statusText);
                            }
                            else {
                                middlewareAPI.dispatch(TeamSharingRedux.TeamSharingSet(JSON.parse(xhr.responseText, (key, value) => {
                                    if (key == "timestamp") {
                                        return new Date(value);
                                    }
                                    return value;
                                })));
                            }
                        }
                    };
                    //we make the request async
                    xhr.open("GET", configServerTeamSharingUrl, true);
                    xhr.setRequestHeader("Content-type", "application/json");
                    xhr.send();
                    return returnAction;
                }
                case TeamSharingRedux.TEAMSHARING_IMPORT_ITEM: {
                    let returnAction = next(action);
                    let actionTyped = action;
                    let importAction;
                    let overwriteConfirmation = false;
                    switch (actionTyped.Strategy) {
                        case StrategyConstants.CellValidationStrategyId:
                            importAction = CellValidationRedux.CellValidationAddUpdate(-1, actionTyped.Entity);
                            break;
                        case StrategyConstants.CalculatedColumnStrategyId: {
                            let calcCol = actionTyped.Entity;
                            let idx = middlewareAPI.getState().CalculatedColumn.CalculatedColumns.findIndex(x => x.ColumnId == calcCol.ColumnId);
                            if (idx > -1) {
                                overwriteConfirmation = true;
                                importAction = CalculatedColumnRedux.CalculatedColumnEdit(idx, calcCol);
                            }
                            else {
                                importAction = CalculatedColumnRedux.CalculatedColumnAdd(calcCol);
                            }
                            break;
                        }
                        case StrategyConstants.ConditionalStyleStrategyId:
                            importAction = ConditionalStyleRedux.ConditionalStyleAddUpdate(-1, actionTyped.Entity);
                            break;
                        case StrategyConstants.CustomSortStrategyId: {
                            let customSort = actionTyped.Entity;
                            if (middlewareAPI.getState().CustomSort.CustomSorts.find(x => x.ColumnId == customSort.ColumnId)) {
                                overwriteConfirmation = true;
                                importAction = CustomSortRedux.CustomSortEdit(customSort);
                            }
                            else {
                                importAction = CustomSortRedux.CustomSortAdd(customSort);
                            }
                            break;
                        }
                        case StrategyConstants.FormatColumnStrategyId: {
                            let formatColumn = actionTyped.Entity;
                            if (middlewareAPI.getState().FormatColumn.FormatColumns.find(x => x.ColumnId == formatColumn.ColumnId)) {
                                overwriteConfirmation = true;
                                importAction = FormatColumnRedux.FormatColumnEdit(formatColumn);
                            }
                            else {
                                importAction = FormatColumnRedux.FormatColumnAdd(formatColumn);
                            }
                            break;
                        }
                        case StrategyConstants.PlusMinusStrategyId: {
                            let plusMinus = actionTyped.Entity;
                            importAction = PlusMinusRedux.PlusMinusAddUpdateCondition(-1, plusMinus);
                            break;
                        }
                        case StrategyConstants.ShortcutStrategyId: {
                            let shortcut = actionTyped.Entity;
                            let shortcuts;
                            shortcuts = middlewareAPI.getState().Shortcut.Shortcuts;
                            if (shortcuts) {
                                if (shortcuts.find(x => x.ShortcutKey == shortcut.ShortcutKey)) {
                                    middlewareAPI.dispatch(ShortcutRedux.ShortcutDelete(shortcut));
                                }
                                importAction = ShortcutRedux.ShortcutAdd(shortcut);
                            }
                            break;
                        }
                        case StrategyConstants.UserFilterStrategyId: {
                            let filter = actionTyped.Entity;
                            //For now not too worry about that but I think we'll need to check ofr filter that have same name
                            //currently the reducer checks for UID
                            if (middlewareAPI.getState().UserFilter.UserFilters.find(x => x.Name == filter.Name)) {
                                overwriteConfirmation = true;
                            }
                            importAction = UserFilterRedux.UserFilterAddUpdate(1, filter);
                            // }
                            break;
                        }
                        case StrategyConstants.AdvancedSearchStrategyId: {
                            let search = actionTyped.Entity;
                            if (middlewareAPI.getState().AdvancedSearch.AdvancedSearches.find(x => x.Name == search.Name)) {
                                overwriteConfirmation = true;
                            }
                            importAction = AdvancedSearchRedux.AdvancedSearchAddUpdate(-1, search);
                            break;
                        }
                        case StrategyConstants.LayoutStrategyId: {
                            let layout = actionTyped.Entity;
                            let layoutIndex = middlewareAPI.getState().Layout.Layouts.findIndex(x => x.Name == layout.Name);
                            if (layoutIndex != -1) {
                                overwriteConfirmation = true;
                            }
                            importAction = LayoutRedux.LayoutPreSave(layoutIndex, layout);
                            break;
                        }
                        case StrategyConstants.ExportStrategyId: {
                            let report = actionTyped.Entity;
                            let idx = middlewareAPI.getState().Export.Reports.findIndex(x => x.Name == report.Name);
                            if (idx > -1) {
                                overwriteConfirmation = true;
                            }
                            importAction = ExportRedux.ReportAddUpdate(idx, report);
                            break;
                        }
                    }
                    if (overwriteConfirmation) {
                        let confirmation = {
                            CancelButtonText: "Cancel Import",
                            Header: "Overwrite Config",
                            Msg: "This item will overwrite one of your config. Do you want to continue?",
                            ConfirmButtonText: "Import",
                            CancelAction: null,
                            ConfirmAction: importAction,
                            ShowInputBox: false,
                            MessageType: Enums_1.MessageType.Warning
                        };
                        middlewareAPI.dispatch(PopupRedux.PopupShowConfirmation(confirmation));
                    }
                    else if (importAction) {
                        middlewareAPI.dispatch(importAction);
                        middlewareAPI.dispatch(PopupRedux.PopupShowAlert({ Header: "Team Sharing", Msg: "Item Successfully Imported", MessageType: Enums_1.MessageType.Info }));
                    }
                    else {
                        LoggingHelper_1.LoggingHelper.LogAdaptableBlotterError("Unknown item type", actionTyped.Entity);
                        middlewareAPI.dispatch(PopupRedux.PopupShowAlert({ Header: "Team Sharing Error:", Msg: "Item not recognized. Cannot import", MessageType: Enums_1.MessageType.Error }));
                    }
                    return returnAction;
                }
                /*******************
                * GRID (INTERNAL) ACTIONS
                *******************/
                case GridRedux.GRID_SET_VALUE_LIKE_EDIT: {
                    let actionTyped = action;
                    blotter.setValue(actionTyped.CellInfo);
                    return next(action);
                }
                case GridRedux.GRID_HIDE_COLUMN: {
                    let actionTyped = action;
                    let columnList = [].concat(middlewareAPI.getState().Grid.Columns.filter(c => c.Visible));
                    let columnIndex = columnList.findIndex(x => x.ColumnId == actionTyped.ColumnId);
                    columnList.splice(columnIndex, 1);
                    blotter.setNewColumnListOrder(columnList);
                    return next(action);
                }
                case GridRedux.GRID_SELECT_COLUMN: {
                    let actionTyped = action;
                    blotter.selectColumn(actionTyped.ColumnId);
                    return next(action);
                }
                case GridRedux.GRID_CREATE_CELLS_SUMMARY: {
                    let SelectedCellsStrategy = (blotter.Strategies.get(StrategyConstants.CellSummaryStrategyId));
                    let returnAction = next(action);
                    let selectedCellInfo = middlewareAPI.getState().Grid.SelectedCellInfo;
                    let apiSummaryReturn = SelectedCellsStrategy.CreateCellSummary(selectedCellInfo);
                    middlewareAPI.dispatch(GridRedux.GridSetCellSummary(apiSummaryReturn));
                    return returnAction;
                }
                /*******************
                * POPUP (INTERNAL) ACTIONS
                *******************/
                case PopupRedux.POPUP_CONFIRM_PROMPT: {
                    let promptConfirmationAction = middlewareAPI.getState().Popup.PromptPopup.ConfirmAction;
                    if (promptConfirmationAction) {
                        let inputText = action.InputText;
                        promptConfirmationAction.InputText = inputText;
                        middlewareAPI.dispatch(promptConfirmationAction);
                    }
                    return next(action);
                }
                case PopupRedux.POPUP_CONFIRM_CONFIRMATION: {
                    let confirmationAction = middlewareAPI.getState().Popup.ConfirmationPopup.ConfirmAction;
                    if (confirmationAction) {
                        middlewareAPI.dispatch(confirmationAction);
                    }
                    return next(action);
                }
                case PopupRedux.POPUP_CANCEL_CONFIRMATION: {
                    let cancelAction = middlewareAPI.getState().Popup.ConfirmationPopup.CancelAction;
                    if (cancelAction) {
                        middlewareAPI.dispatch(cancelAction);
                    }
                    return next(action);
                }
                /*******************
                * HOME (INTERNAL) ACTIONS (Filter Bar)
                *******************/
                case GridRedux.GRID_FLOATING_FILTER_BAR_SHOW: {
                    blotter.showFloatingFilter();
                    return next(action);
                }
                case GridRedux.GRID_FLOATING_FILTER_BAR_HIDE: {
                    blotter.hideFloatingFilter();
                    return next(action);
                }
                case HomeRedux.FILTER_FORM_HIDE: {
                    blotter.hideFilterForm();
                    return next(action);
                }
                /*******************
                * MANAGING STATE ACTIONS
                *******************/
                //We rebuild the menu from scratch
                //the difference between the two is that RESET_STATE is handled before and set the state to undefined
                case INIT_STATE:
                case RESET_STATE: {
                    let returnAction = next(action);
                    //we set the column list from the datasource
                    blotter.setColumnIntoStore();
                    let gridState = middlewareAPI.getState().Grid;
                    let layoutState = middlewareAPI.getState().Layout;
                    let visibleColumnNames = gridState.Columns.filter(c => c.Visible).map(c => c.ColumnId);
                    //create the default layout (if not there) so we can revert to it if needed
                    let currentLayout = GeneralConstants_1.DEFAULT_LAYOUT;
                    let defaultLayoutIndex = layoutState.Layouts.findIndex(l => l.Name == GeneralConstants_1.DEFAULT_LAYOUT);
                    let defaultLayout = ObjectFactory_1.ObjectFactory.CreateLayout(gridState.Columns, [], blotter.getVendorGridState(visibleColumnNames, true), GeneralConstants_1.DEFAULT_LAYOUT);
                    middlewareAPI.dispatch(LayoutRedux.LayoutPreSave(defaultLayoutIndex, defaultLayout));
                    if (layoutState.Layouts.length > 0) {
                        currentLayout = layoutState.CurrentLayout;
                    }
                    //Create all calculated columns before we load the layout
                    middlewareAPI.getState().CalculatedColumn.CalculatedColumns.forEach(cc => {
                        blotter.addCalculatedColumnToGrid(cc);
                    });
                    //Create all free text columns before we load the layout
                    middlewareAPI.getState().FreeTextColumn.FreeTextColumns.forEach(ftc => {
                        blotter.addFreeTextColumnToGrid(ftc);
                    });
                    //load the default layout if its current
                    if (currentLayout == GeneralConstants_1.DEFAULT_LAYOUT) {
                        middlewareAPI.dispatch(LayoutRedux.LayoutSelect(currentLayout));
                    }
                    // create the menu
                    blotter.createMenu();
                    return returnAction;
                }
                default:
                    return next(action);
            }
        };
    };
};
