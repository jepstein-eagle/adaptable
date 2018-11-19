import { ExportDestination, MathOperation, MessageType } from '../../Core/Enums';
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
import * as ChartRedux from '../ActionsReducers/ChartRedux'
import * as AlertRedux from '../ActionsReducers/AlertRedux'
import * as SmartEditRedux from '../ActionsReducers/SmartEditRedux'
import * as BulkUpdateRedux from '../ActionsReducers/BulkUpdateRedux'
import * as CustomSortRedux from '../ActionsReducers/CustomSortRedux'
import * as CalculatedColumnRedux from '../ActionsReducers/CalculatedColumnRedux'
import * as ShortcutRedux from '../ActionsReducers/ShortcutRedux'
import * as GridRedux from '../ActionsReducers/GridRedux'
import * as SystemRedux from '../ActionsReducers/SystemRedux'
import * as HomeRedux from '../ActionsReducers/HomeRedux'
import * as PlusMinusRedux from '../ActionsReducers/PlusMinusRedux'
import * as ColumnChooserRedux from '../ActionsReducers/ColumnChooserRedux'
import * as ExportRedux from '../ActionsReducers/ExportRedux'
import * as FlashingCellsRedux from '../ActionsReducers/FlashingCellsRedux'
import * as CalendarRedux from '../ActionsReducers/CalendarRedux'
import * as ConditionalStyleRedux from '../ActionsReducers/ConditionalStyleRedux'
import * as QuickSearchRedux from '../ActionsReducers/QuickSearchRedux'
import * as AdvancedSearchRedux from '../ActionsReducers/AdvancedSearchRedux'
import * as DataSourceRedux from '../ActionsReducers/DataSourceRedux'
import * as ColumnFilterRedux from '../ActionsReducers/ColumnFilterRedux'
import * as UserFilterRedux from '../ActionsReducers/UserFilterRedux'
import * as SystemFilterRedux from '../ActionsReducers/SystemFilterRedux'
import * as ThemeRedux from '../ActionsReducers/ThemeRedux'
import * as FormatColumnRedux from '../ActionsReducers/FormatColumnRedux'
import * as FreeTextColumnRedux from '../ActionsReducers/FreeTextColumnRedux'
import * as LayoutRedux from '../ActionsReducers/LayoutRedux'
import * as DashboardRedux from '../ActionsReducers/DashboardRedux'
import * as CellValidationRedux from '../ActionsReducers/CellValidationRedux'
import * as CellRendererRedux from '../ActionsReducers/CellRendererRedux'
import * as EntitlementsRedux from '../ActionsReducers/EntitlementsRedux'
import * as TeamSharingRedux from '../ActionsReducers/TeamSharingRedux'
import * as UserInterfaceRedux from '../ActionsReducers/UserInterfaceRedux'
import * as SelectedCellsRedux from '../ActionsReducers/SelectedCellsRedux'
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter'
import { ISmartEditStrategy } from '../../Strategy/Interface/ISmartEditStrategy'
import { IBulkUpdateStrategy } from '../../Strategy/Interface/IBulkUpdateStrategy'
import { IShortcutStrategy } from '../../Strategy/Interface/IShortcutStrategy'
import { IExportStrategy, IPPDomain } from '../../Strategy/Interface/IExportStrategy'
import { IPlusMinusStrategy } from '../../Strategy/Interface/IPlusMinusStrategy'
import { ISharedEntity } from '../../Strategy/Interface/ITeamSharingStrategy'
import { AdaptableBlotterState, IAdaptableBlotterStore } from './Interface/IAdaptableStore'
import { IUIConfirmation, InputAction } from '../../Core/Interface/IMessage';
import { iPushPullHelper } from "../../Core/Helpers/iPushPullHelper";
import { GridState, LayoutState, IState } from '../ActionsReducers/Interface/IState';
import { DEFAULT_LAYOUT } from "../../Core/Constants/GeneralConstants";
import { ObjectFactory } from '../../Core/ObjectFactory';
import { PreviewHelper } from '../../Core/Helpers/PreviewHelper';
import { IAdvancedSearch, ICalculatedColumn, IShortcut, IPlusMinusRule, IUserFilter, ILayout, IReport, IConditionalStyle, ICustomSort, IFormatColumn, ICellValidationRule, IColumnFilter, IFreeTextColumn, IPercentCellRenderer } from '../../Core/Api/Interface/IAdaptableBlotterObjects';
import { Helper } from '../../Core/Helpers/Helper';
import { IColumn } from '../../Core/Interface/IColumn';
import { AdaptableBlotterLogger } from '../../Core/Helpers/AdaptableBlotterLogger';
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import * as ConfigConstants from '../../Core/Constants/ConfigConstants'
import { ISelectedCellsStrategy, ISelectedCellSummmary } from '../../Strategy/Interface/ISelectedCellsStrategy';
import { AlertToolbarControl } from '../../View/Alert/AlertToolbarControl';


const rootReducer: Redux.Reducer<AdaptableBlotterState> = Redux.combineReducers<AdaptableBlotterState>({
  Popup: PopupRedux.ShowPopupReducer,
  Menu: MenuRedux.MenuReducer,
  Alert: AlertRedux.AlertReducer,
  Chart: ChartRedux.ChartReducer,
  SmartEdit: SmartEditRedux.SmartEditReducer,
  BulkUpdate: BulkUpdateRedux.BulkUpdateReducer,
  CustomSort: CustomSortRedux.CustomSortReducer,
  Shortcut: ShortcutRedux.ShortcutReducer,
  Grid: GridRedux.GridReducer,
  System: SystemRedux.SystemReducer,
  PlusMinus: PlusMinusRedux.PlusMinusReducer,
  Export: ExportRedux.ExportReducer,
  FlashingCell: FlashingCellsRedux.FlashingCellReducer,
  Calendar: CalendarRedux.CalendarReducer,
  ConditionalStyle: ConditionalStyleRedux.ConditionalStyleReducer,
  QuickSearch: QuickSearchRedux.QuickSearchReducer,
  AdvancedSearch: AdvancedSearchRedux.AdvancedSearchReducer,
  DataSource: DataSourceRedux.DataSourceReducer,
  ColumnFilter: ColumnFilterRedux.ColumnFilterReducer,
  UserFilter: UserFilterRedux.UserFilterReducer,
  SystemFilter: SystemFilterRedux.SystemFilterReducer,
  Theme: ThemeRedux.ThemeReducer,
  CellRenderer: CellRendererRedux.CellRendererReducer,
  CellValidation: CellValidationRedux.CellValidationReducer,
  Layout: LayoutRedux.LayoutReducer,
  Dashboard: DashboardRedux.DashboardReducer,
  Entitlements: EntitlementsRedux.EntitlementsReducer,
  CalculatedColumn: CalculatedColumnRedux.CalculatedColumnReducer,
  UserInterface: UserInterfaceRedux.UserInterfaceStateReducer,
  SelectedCells: SelectedCellsRedux.SelectedCellsReducer,
  TeamSharing: TeamSharingRedux.TeamSharingReducer,
  FormatColumn: FormatColumnRedux.FormatColumnReducer,
  FreeTextColumn: FreeTextColumnRedux.FreeTextColumnReducer
});

const RESET_STATE = 'RESET_STATE';
const INIT_STATE = 'INIT_STATE';
const LOAD_STATE = 'LOAD_STATE';
export interface ResetUserDataAction extends Redux.Action { }
export interface InitStateAction extends Redux.Action { }
export interface LoadStateAction extends Redux.Action {
  State: { [s: string]: IState },
}

export const ResetUserData = (): ResetUserDataAction => ({
  type: RESET_STATE
})
export const InitState = (): ResetUserDataAction => ({
  type: INIT_STATE
})
export const LoadState = (State: { [s: string]: IState }): LoadStateAction => ({
  type: LOAD_STATE,
  State,
});


const rootReducerWithResetManagement = (state: AdaptableBlotterState, action: Redux.Action) => {
  switch (action.type) {
    case RESET_STATE:
      //   alert("in top")
      //This trigger the persist of the state with nothing
      state.AdvancedSearch = undefined
      state.Alert = undefined
      state.BulkUpdate = undefined
      state.CalculatedColumn = undefined
      state.Calendar = undefined
      state.CellValidation = undefined
      state.ConditionalStyle = undefined
      state.Chart = undefined
      state.CustomSort = undefined
      state.Dashboard.AvailableToolbars = []
      state.Dashboard.VisibleButtons = []
      state.Dashboard.VisibleToolbars = []
      state.Dashboard = undefined
      state.DataSource = undefined
      state.Entitlements = undefined
      state.Export = undefined
      state.FlashingCell = undefined
      state.FormatColumn = undefined
      state.ColumnFilter.ColumnFilters = []
      state.UserFilter.UserFilters = []
      state.SystemFilter.SystemFilters = []
      state.Grid = undefined
      //     state.System = undefined
      state.Layout = undefined
      //      state.Menu.ContextMenu = undefined
      //      state.Menu.MenuItems = []
      //      state.Menu = undefined
      state.PlusMinus = undefined
      state.QuickSearch = undefined
      state.Shortcut = undefined
      state.SmartEdit = undefined
      state.SelectedCells = undefined
      //   state.TeamSharing = undefined
      state.Theme = undefined
      //   state.UserInterface = undefined

      //  state = undefined
      break;
    case LOAD_STATE:
      const { State } = <LoadStateAction>action;
      Object.keys(State).forEach(key => {
        state[key] = State[key];
      });
      break;
  }

  return rootReducer(state, action)
}

// const configServerUrl = "/adaptableblotter-config"
const configServerTeamSharingUrl = "/adaptableblotter-teamsharing"

export class AdaptableBlotterStore implements IAdaptableBlotterStore {
  public TheStore: Redux.Store<AdaptableBlotterState>
  public Load: PromiseLike<any>
  constructor(blotter: IAdaptableBlotter) {
    let middlewareReduxStorage: Redux.Middleware
    let reducerWithStorage: Redux.Reducer<AdaptableBlotterState>
    let loadStorage: ReduxStorage.Loader<AdaptableBlotterState>
    let engineWithFilter: ReduxStorage.StorageEngine
    let engineWithMigrate: ReduxStorage.StorageEngine
    let engineReduxStorage: ReduxStorage.StorageEngine

    if (blotter.BlotterOptions.enableRemoteConfigServer) {
      engineReduxStorage = createEngineRemote(blotter.BlotterOptions.remoteConfigServerUrl, blotter.BlotterOptions.userName, blotter.BlotterOptions.blotterId, blotter);
    }
    else {
      engineReduxStorage = createEngineLocal(blotter.BlotterOptions.blotterId, blotter.BlotterOptions.predefinedConfig);
    }

    // engine with migrate is where we manage the bits that we dont want to persist, but need to keep in the store
    // perhaps would be better to have 2 stores - persistence store and in-memory store
    engineWithMigrate = migrate(engineReduxStorage, 0, "AdaptableStoreVersion", []/*[someExampleMigration]*/)
    engineWithFilter = filter(engineWithMigrate, [], [
      // System State - Used ONLY Internally so no need to save
      ConfigConstants.SYSTEM,
      ConfigConstants.GRID,
      ConfigConstants.MENU,
      ConfigConstants.POPUP,
      ConfigConstants.TEAMSHARING,
      // Config State - set ONLY in PredefinedConfig and never changed at runtime
      ConfigConstants.USER_INTERFACE,
      ConfigConstants.ENTITLEMENTS,
      ConfigConstants.APPLICATION,
    ]);

    //we prevent the save to happen on few actions since they do not change the part of the state that is persisted.
    //I think that is a part where we push a bit redux and should have two distinct stores....
    middlewareReduxStorage = ReduxStorage.createMiddleware(engineWithFilter,
      [MenuRedux.SET_MENUITEMS, GridRedux.GRID_SET_COLUMNS, ColumnChooserRedux.SET_NEW_COLUMN_LIST_ORDER,
      PopupRedux.POPUP_CLEAR_PARAM, PopupRedux.POPUP_CONFIRM_PROMPT,
      PopupRedux.POPUP_CANCEL_CONFIRMATION, PopupRedux.POPUP_CONFIRM_CONFIRMATION, PopupRedux.POPUP_SHOW_CONFIRMATION,
      PopupRedux.POPUP_SHOW_SCREEN, PopupRedux.POPUP_HIDE_SCREEN,
      PopupRedux.POPUP_SHOW_PROMPT, PopupRedux.POPUP_HIDE_PROMPT,
      PopupRedux.POPUP_SHOW_ALERT, PopupRedux.POPUP_HIDE_ALERT,
      PopupRedux.POPUP_SHOW_CHART, PopupRedux.POPUP_HIDE_CHART,
      PopupRedux.POPUP_SHOW_LOADING, PopupRedux.POPUP_HIDE_LOADING
      ]);

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
            AdaptableBlotterLogger.LogError('Failed to load previous adaptable blotter state : ', e);
            //for now i'm still initializing the AB even if loading state has failed....
            //we may revisit that later
            this.TheStore.dispatch(InitState())
            this.TheStore.dispatch(PopupRedux.PopupShowAlert({ Header: "Configurtion", Msg: "Error loading your configuration:" + e, MessageType: MessageType.Error }))
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

          adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.AdvancedSearchStrategyId,
            "apply advanced search",
            actionTyped.SelectedSearchName,
            advancedSearch)


          return next(action);
        }
        case AdvancedSearchRedux.ADVANCED_SEARCH_ADD_UPDATE: {
          let actionTyped = <AdvancedSearchRedux.AdvancedSearchAddUpdateAction>action
          let currentAdvancedSearch = state.AdvancedSearch.CurrentAdvancedSearch; // problem here if they have changed the name potentially...
          if (actionTyped.AdvancedSearch.Name == currentAdvancedSearch) {

            adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.AdvancedSearchStrategyId,
              "apply advanced search",
              actionTyped.AdvancedSearch.Name,
              actionTyped.AdvancedSearch)

          }
          return next(action);
        }
        case QuickSearchRedux.QUICK_SEARCH_APPLY: {
          let actionTyped = <QuickSearchRedux.QuickSearchApplyAction>action

          adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.QuickSearchStrategyId,
            "apply quick search",
            actionTyped.quickSearchText,
            actionTyped.quickSearchText)

          return next(action);
        }
        case PlusMinusRedux.PLUSMINUS_APPLY: {
          let actionTyped = <PlusMinusRedux.PlusMinusApplyAction>action

          adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.PlusMinusStrategyId,
            "apply plus minus",
            "KeyPressed:" + actionTyped.KeyEventString,
            actionTyped.CellInfos)
          return next(action);
        }
        case ShortcutRedux.SHORTCUT_APPLY: {
          let actionTyped = <ShortcutRedux.ShortcutApplyAction>action

          adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.ShortcutStrategyId,
            "apply shortcut",
            "KeyPressed:" + actionTyped.KeyEventString,
            { Shortcut: actionTyped.Shortcut, PrimaryKey: actionTyped.CellInfo.Id, ColumnId: actionTyped.CellInfo.ColumnId })
          return next(action);
        }
        case ColumnFilterRedux.COLUMN_FILTER_ADD_UPDATE: {

          adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.ColumnFilterStrategyId,
            "apply column filters",
            "filters applied",
            state.ColumnFilter.ColumnFilters)

          return next(action);
        }
        case UserFilterRedux.USER_FILTER_ADD_UPDATE: {
          let actionTyped = <UserFilterRedux.UserFilterAddUpdateAction>action

          adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.UserFilterStrategyId,
            "user filters changed",
            "filters applied",
            state.UserFilter.UserFilters)

          return next(action);
        }
        case UserFilterRedux.CREATE_USER_FILTER_FROM_COLUMN_FILTER: {
          let actionTyped = <UserFilterRedux.CreateUserFilterFromColumnFilterAction>action
          // first create a new user filter based on the column filter and input name
          let userFilter: IUserFilter = ObjectFactory.CreateUserFilterFromColumnFilter(actionTyped.ColumnFilter, actionTyped.InputText)
          middlewareAPI.dispatch(UserFilterRedux.UserFilterAddUpdate(-1, userFilter));

          // then create a new column filter from the user filter - so that it will display the user filter name
          let newColumnFilter: IColumnFilter = ObjectFactory.CreateColumnFilterFromUserFilter(userFilter);
          middlewareAPI.dispatch(ColumnFilterRedux.ColumnFilterAddUpdate(newColumnFilter));

          return next(action);
        }


        default:
          return next(action);
      }
    }
  }
}



var adaptableBlotterMiddleware = (blotter: IAdaptableBlotter): any => function (middlewareAPI: Redux.MiddlewareAPI<AdaptableBlotterState>) {
  return function (next: Redux.Dispatch<AdaptableBlotterState>) {
    return function (action: Redux.Action) {
      switch (action.type) {
        case TeamSharingRedux.TEAMSHARING_SHARE: {
          let actionTyped = <TeamSharingRedux.TeamSharingShareAction>action
          let returnAction = next(action);
          let xhr = new XMLHttpRequest();
          xhr.onerror = (ev: any) => AdaptableBlotterLogger.LogError("TeamSharing share error :" + ev.message, actionTyped.Entity)
          xhr.ontimeout = () => AdaptableBlotterLogger.LogWarning("TeamSharing share timeout", actionTyped.Entity)
          xhr.onload = () => {
            if (xhr.readyState == 4) {
              if (xhr.status != 200) {
                AdaptableBlotterLogger.LogError("TeamSharing share error : " + xhr.statusText, actionTyped.Entity);
                middlewareAPI.dispatch(PopupRedux.PopupShowAlert({ Header: "Team Sharing Error", Msg: "Couldn't share item: " + xhr.statusText, MessageType: MessageType.Error }));
              }
              else {
                middlewareAPI.dispatch(PopupRedux.PopupShowAlert({ Header: "Team Sharing", Msg: "Item Shared Successfully", MessageType: MessageType.Info }));
              }
            }
          }
          //we make the request async
          xhr.open("POST", configServerTeamSharingUrl, true);
          xhr.setRequestHeader("Content-type", "application/json");
          let obj: ISharedEntity = {
            entity: actionTyped.Entity,
            user: blotter.BlotterOptions.userName,
            blotter_id: blotter.BlotterOptions.blotterId,
            strategy: actionTyped.Strategy,
            timestamp: new Date()
          }
          xhr.send(JSON.stringify(obj));
          return returnAction;
        }
        case TeamSharingRedux.TEAMSHARING_GET: {
          let returnAction = next(action);
          let xhr = new XMLHttpRequest();
          xhr.onerror = (ev: any) => AdaptableBlotterLogger.LogError("TeamSharing get error :" + ev.message)
          xhr.ontimeout = () => AdaptableBlotterLogger.LogWarning("TeamSharing get timeout")
          xhr.onload = () => {
            if (xhr.readyState == 4) {
              if (xhr.status != 200) {
                AdaptableBlotterLogger.LogError("TeamSharing get error : " + xhr.statusText);
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
            case StrategyConstants.CellValidationStrategyId:
              importAction = CellValidationRedux.CellValidationAddUpdate(-1, actionTyped.Entity as ICellValidationRule)
              break;
            case StrategyConstants.CalculatedColumnStrategyId: {
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
            case StrategyConstants.ConditionalStyleStrategyId:
              importAction = ConditionalStyleRedux.ConditionalStyleAddUpdate(-1, actionTyped.Entity as IConditionalStyle)
              break;
            case StrategyConstants.CustomSortStrategyId: {
              let customSort = actionTyped.Entity as ICustomSort
              if (middlewareAPI.getState().CustomSort.CustomSorts.find(x => x.ColumnId == customSort.ColumnId)) {
                overwriteConfirmation = true
                importAction = CustomSortRedux.CustomSortEdit(customSort)
              } else {
                importAction = CustomSortRedux.CustomSortAdd(customSort)
              }
              break;
            }
            case StrategyConstants.FormatColumnStrategyId: {
              let formatColumn = actionTyped.Entity as IFormatColumn
              if (middlewareAPI.getState().FormatColumn.FormatColumns.find(x => x.ColumnId == formatColumn.ColumnId)) {
                overwriteConfirmation = true
                importAction = FormatColumnRedux.FormatColumnEdit(formatColumn)
              } else {
                importAction = FormatColumnRedux.FormatColumnAdd(formatColumn)
              }
              break;
            }
            case StrategyConstants.PlusMinusStrategyId: {
              let plusMinus = actionTyped.Entity as IPlusMinusRule
              importAction = PlusMinusRedux.PlusMinusAddUpdateCondition(-1, plusMinus)
              break;
            }
            case StrategyConstants.ShortcutStrategyId: {
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
            case StrategyConstants.UserFilterStrategyId: {
              let filter = actionTyped.Entity as IUserFilter
              //For now not too worry about that but I think we'll need to check ofr filter that have same name
              //currently the reducer checks for UID
              if (middlewareAPI.getState().UserFilter.UserFilters.find(x => x.Name == filter.Name)) {
                overwriteConfirmation = true
              }
              importAction = UserFilterRedux.UserFilterAddUpdate(1, filter)
              // }
              break;
            }
            case StrategyConstants.AdvancedSearchStrategyId: {
              let search = actionTyped.Entity as IAdvancedSearch
              if (middlewareAPI.getState().AdvancedSearch.AdvancedSearches.find(x => x.Name == search.Name)) {
                overwriteConfirmation = true
              }
              importAction = AdvancedSearchRedux.AdvancedSearchAddUpdate(-1, search)
              break;
            }
            case StrategyConstants.LayoutStrategyId: {
              let layout = actionTyped.Entity as ILayout
              let layoutIndex: number = middlewareAPI.getState().Layout.Layouts.findIndex(x => x.Name == layout.Name)
              if (layoutIndex != -1) {
                overwriteConfirmation = true
              }
              importAction = LayoutRedux.LayoutPreSave(layoutIndex, layout)
              break;
            }
            case StrategyConstants.ExportStrategyId: {
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
            middlewareAPI.dispatch(PopupRedux.PopupShowAlert({ Header: "Team Sharing", Msg: "Item Successfully Imported", MessageType: MessageType.Info }))
          }
          else {
            AdaptableBlotterLogger.LogError("Unknown item type", actionTyped.Entity)
            middlewareAPI.dispatch(PopupRedux.PopupShowAlert({ Header: "Team Sharing Error:", Msg: "Item not recognized. Cannot import", MessageType: MessageType.Error }))
          }
          return returnAction;
        }
        /*
     Calculated Columns
      */
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
          let calculatedColumn: ICalculatedColumn = (<CalculatedColumnRedux.CalculatedColumnAddAction>action).CalculatedColumn
          let columnsLocalLayout = middlewareAPI.getState().Grid.Columns.filter(c => c.Visible)

          blotter.addCalculatedColumnToGrid(calculatedColumn)
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
          let index = actionTyped.Index;
          let isNameChanged: boolean = columnsLocalLayout.find(c => c.ColumnId == actionTyped.CalculatedColumn.ColumnId) == null
          if (isNameChanged) { // name has changed so we are going to delete and then add to ensure all col names are correct
            blotter.removeCalculatedColumnFromGrid(calculatedColumnState.CalculatedColumns[index].ColumnId)
            blotter.addCalculatedColumnToGrid(actionTyped.CalculatedColumn)
            blotter.setColumnIntoStore();
            columnsLocalLayout = middlewareAPI.getState().Grid.Columns // need to get again
          } else {  // it exists so just edit
            blotter.editCalculatedColumnInGrid(actionTyped.CalculatedColumn)
          }
          middlewareAPI.dispatch(ColumnChooserRedux.SetNewColumnListOrder(columnsLocalLayout))
          let returnAction = next(action);
          return returnAction;
        }
        /*
        Free Text Columns
        */
        case FreeTextColumnRedux.FREE_TEXT_COLUMN_ADD: {
          let returnAction = next(action);
          let freeTextColumn: IFreeTextColumn = (<FreeTextColumnRedux.FreeTextColumnAddAction>action).FreeTextColumn
          let columnsLocalLayout = middlewareAPI.getState().Grid.Columns.filter(c => c.Visible)

          blotter.addFreeTextColumnToGrid(freeTextColumn)
          middlewareAPI.dispatch(ColumnChooserRedux.SetNewColumnListOrder(columnsLocalLayout))
          return returnAction;
        }

        case FreeTextColumnRedux.FREE_TEXT_COLUMN_EDIT: {
          // not too sure what I need to do - perhaps just refresh everything?

          let returnAction = next(action);
          return returnAction;
        }
        // TODO:  Need to do Delete? 

        /*
       Cell Renderer
       */
        case CellRendererRedux.CELL_RENDERER_ADD_UPDATE: {
          let returnAction = next(action);
          // need to see if its an add or an update but for now assume its an add...
          let percentCellRenderer: IPercentCellRenderer = (<CellRendererRedux.CellRendererAddUpdateAction>action).CellRenderer;
          blotter.addPercentCellRenderer(percentCellRenderer);
          blotter.redraw();
          return returnAction;
        }

        case CellRendererRedux.CELL_RENDERER_DELETE: {
          let cellRendererState = middlewareAPI.getState().CellRenderer;
          let actionTyped = <CellRendererRedux.CellRendererDeleteAction>action
          let percentCellRenderer: IPercentCellRenderer =cellRendererState.PercentCellRenderers[actionTyped.Index];
          blotter.removePercentCellRenderer(percentCellRenderer);
          blotter.redraw();
          let returnAction = next(action);
          return returnAction;
        }

       /*
       Layout
       */
        case LayoutRedux.LAYOUT_SELECT: {
          let returnAction = next(action);
          let layoutState = middlewareAPI.getState().Layout;
          let currentLayout = layoutState.Layouts.find(l => l.Name == layoutState.CurrentLayout);
          if (currentLayout) {
            let gridState: GridState = middlewareAPI.getState().Grid;
            // set columns
            let blotterColumns: IColumn[] = []
            currentLayout.Columns.forEach(c => {
              let column: IColumn = gridState.Columns.find(x => x.ColumnId == c)
              if (column) {
                blotterColumns.push(column);
              } else {
                AdaptableBlotterLogger.LogWarning("Column '" + c + "' not found")
              }
            })

            middlewareAPI.dispatch(ColumnChooserRedux.SetNewColumnListOrder(blotterColumns))
            // set sort
            middlewareAPI.dispatch(GridRedux.GridSetSort(currentLayout.GridSorts))
            blotter.setGridSort(currentLayout.GridSorts);
            // set vendor specific info
            blotter.setVendorGridState(currentLayout.VendorGridInfo)
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
        case LayoutRedux.LAYOUT_PRESAVE: {
          let returnAction = next(action);
          let actionTyped = <LayoutRedux.LayoutPreSaveAction>action
          let layout: ILayout = Helper.cloneObject(actionTyped.Layout);
          let forceFetch = layout.Name == DEFAULT_LAYOUT;
          layout.VendorGridInfo = blotter.getVendorGridState(layout.Columns, forceFetch);
          middlewareAPI.dispatch(LayoutRedux.LayoutAddUpdate(actionTyped.Index, layout))
          return returnAction;
        }
        case GridRedux.GRID_SET_VALUE_LIKE_EDIT: {
          let actionTyped = <GridRedux.GridSetValueLikeEditAction>action
          blotter.setValue(actionTyped.CellInfo)
          return next(action);
        }
        case GridRedux.GRID_HIDE_COLUMN: {
          let actionTyped = <GridRedux.GridHideColumnAction>action
          let columnList = [].concat(middlewareAPI.getState().Grid.Columns.filter(c => c.Visible))
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
        case GridRedux.GRID_CREATE_SELECTED_CELLS_SUMMARY: {
          let SelectedCellsStrategy = <ISelectedCellsStrategy>(blotter.Strategies.get(StrategyConstants.SelectedCellsStrategyId));
          let returnAction = next(action);
          let selectedCellInfo = middlewareAPI.getState().Grid.SelectedCellInfo
          let apiSummaryReturn: ISelectedCellSummmary = SelectedCellsStrategy.CreateSelectedCellSummary(selectedCellInfo);
          middlewareAPI.dispatch(GridRedux.GridSetSelectedCellSummary(apiSummaryReturn));
          return returnAction;
        }

        /*  *********
         HOME ACTIONS - Filter and quick Filter
         ************ */
        case HomeRedux.QUICK_FILTER_BAR_SHOW: {
          blotter.showQuickFilter();
          return next(action);
        }

        case HomeRedux.QUICK_FILTER_BAR_HIDE: {
          blotter.hideQuickFilter();
          return next(action);
        }

        case HomeRedux.FILTER_FORM_HIDE: {
          blotter.hideFilterForm()
          return next(action);
        }


        /*  *********
        SMART EDIT ACTIONS
        ************ */
        case SystemRedux.SMARTEDIT_CHECK_CELL_SELECTION: {
          let SmartEditStrategy = <ISmartEditStrategy>(blotter.Strategies.get(StrategyConstants.SmartEditStrategyId));
          let state = middlewareAPI.getState();
          let returnAction = next(action);
          let apiReturn = SmartEditStrategy.CheckCorrectCellSelection();

          if (apiReturn.Alert) {
            // check if Smart Edit is showing as popup and then close and show error (dont want to do that if from toolbar)
            let popup = state.Popup.ScreenPopup;
            if (popup.ComponentName == ScreenPopups.SmartEditPopup) {  //We close the SmartEditPopup
              middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
              //We show the alert Popup
              middlewareAPI.dispatch(PopupRedux.PopupShowAlert(apiReturn.Alert));
            }
            middlewareAPI.dispatch(SystemRedux.SmartEditSetValidSelection(false));
          } else {
            middlewareAPI.dispatch(SystemRedux.SmartEditSetValidSelection(true));
            let apiPreviewReturn = SmartEditStrategy.BuildPreviewValues(state.SmartEdit.SmartEditValue, state.SmartEdit.MathOperation as MathOperation);
            middlewareAPI.dispatch(SystemRedux.SmartEditSetPreview(apiPreviewReturn));
          }
          return returnAction;
        }

        // Here we have all actions that triggers a refresh of the SmartEditPreview
        case SmartEditRedux.SMARTEDIT_CHANGE_OPERATION:
        case SmartEditRedux.SMARTEDIT_CHANGE_VALUE:
        case SystemRedux.SMARTEDIT_FETCH_PREVIEW: {
          //all our logic needs to be executed AFTER the main reducers
          //so our state is up to date which allow us not to care about the data within each different action
          let returnAction = next(action);

          let SmartEditStrategy = <ISmartEditStrategy>(blotter.Strategies.get(StrategyConstants.SmartEditStrategyId));
          let state = middlewareAPI.getState();

          let apiReturn = SmartEditStrategy.BuildPreviewValues(state.SmartEdit.SmartEditValue, state.SmartEdit.MathOperation as MathOperation);
          middlewareAPI.dispatch(SystemRedux.SmartEditSetPreview(apiReturn));
          return returnAction;
        }

        case SmartEditRedux.SMARTEDIT_APPLY: {
          let SmartEditStrategy = <ISmartEditStrategy>(blotter.Strategies.get(StrategyConstants.SmartEditStrategyId));
          let actionTyped = <SmartEditRedux.SmartEditApplyAction>action;
          let thePreview = middlewareAPI.getState().System.SmartEditPreviewInfo
          let newValues = PreviewHelper.GetCellInfosFromPreview(thePreview, actionTyped.bypassCellValidationWarnings)
          SmartEditStrategy.ApplySmartEdit(newValues);
          middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
          return next(action);
        }


        /*  *********
        BULK UPDATE ACTIONS
        ************ */
        case SystemRedux.BULK_UPDATE_CHECK_CELL_SELECTION: {
          let BulkUpdateStrategy = <IBulkUpdateStrategy>(blotter.Strategies.get(StrategyConstants.BulkUpdateStrategyId));
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
          } else {
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

          let BulkUpdateStrategy = <IBulkUpdateStrategy>(blotter.Strategies.get(StrategyConstants.BulkUpdateStrategyId));
          let state = middlewareAPI.getState();

          let apiReturn = BulkUpdateStrategy.BuildPreviewValues(state.BulkUpdate.BulkUpdateValue);
          middlewareAPI.dispatch(SystemRedux.BulkUpdateSetPreview(apiReturn));
          return returnAction;
        }

        case BulkUpdateRedux.BULK_UPDATE_APPLY: {
          let BulkUpdateStrategy = <IBulkUpdateStrategy>(blotter.Strategies.get(StrategyConstants.BulkUpdateStrategyId));
          let actionTyped = <BulkUpdateRedux.BulkUpdateApplyAction>action;
          let thePreview = middlewareAPI.getState().System.BulkUpdatePreviewInfo
          let newValues = PreviewHelper.GetCellInfosFromPreview(thePreview, actionTyped.bypassCellValidationWarnings)
          BulkUpdateStrategy.ApplyBulkUpdate(newValues);
          middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
          return next(action);
        }

        case PlusMinusRedux.PLUSMINUS_APPLY: {
          let plusMinusStrategy = <IPlusMinusStrategy>(blotter.Strategies.get(StrategyConstants.PlusMinusStrategyId));
          let actionTyped = <PlusMinusRedux.PlusMinusApplyAction>action
          plusMinusStrategy.ApplyPlusMinus(actionTyped.KeyEventString, actionTyped.CellInfos);
          middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
          return next(action);
        }
        case ShortcutRedux.SHORTCUT_APPLY: {
          let shortcutStrategy = <IShortcutStrategy>(blotter.Strategies.get(StrategyConstants.ShortcutStrategyId));
          let actionTyped = <ShortcutRedux.ShortcutApplyAction>action
          shortcutStrategy.ApplyShortcut(actionTyped.CellInfo, actionTyped.NewValue);
          return next(action);
        }

        case ExportRedux.EXPORT_APPLY: {
          let exportStrategy = <IExportStrategy>(blotter.Strategies.get(StrategyConstants.ExportStrategyId));
          let actionTyped = <ExportRedux.ExportApplyAction>action;
          if (actionTyped.ExportDestination == ExportDestination.iPushPull && iPushPullHelper.IPPStatus != iPushPullHelper.ServiceStatus.Connected) {
            middlewareAPI.dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, "IPushPullLogin", actionTyped.Report))
          }
          else if (actionTyped.ExportDestination == ExportDestination.iPushPull && !actionTyped.Folder) {
            iPushPullHelper.GetDomainPages(blotter.BlotterOptions.iPushPullConfig.api_key).then((domainpages: IPPDomain[]) => {
              middlewareAPI.dispatch(ExportRedux.SetDomainPages(domainpages))
              middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(""))
            }).catch((err: any) => {
              middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(err))
            })
            middlewareAPI.dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, "IPushPullDomainPageSelector", actionTyped.Report))
          }
          else if (actionTyped.ExportDestination == ExportDestination.iPushPull) {
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
          let actionTyped = <ExportRedux.IPPLoginAction>action;
          iPushPullHelper.Login(actionTyped.Login, actionTyped.Password).then(() => {
            let report = middlewareAPI.getState().Popup.ScreenPopup.Params
            middlewareAPI.dispatch(PopupRedux.PopupHideScreen())
            middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(""))
            iPushPullHelper.GetDomainPages(blotter.BlotterOptions.iPushPullConfig.api_key).then((domainpages: IPPDomain[]) => {
              middlewareAPI.dispatch(ExportRedux.SetDomainPages(domainpages))
              middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(""))
            }).catch((error: any) => {
              middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(error))
            })
            middlewareAPI.dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, "IPushPullDomainPageSelector", report))
          }).catch((error: string) => {
            AdaptableBlotterLogger.LogError("Login failed", error);
            middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(error))
          })
          return next(action);
        }
        case SystemRedux.REPORT_STOP_LIVE: {
          let actionTyped = (<SystemRedux.ReportStopLiveAction>action)
          if (actionTyped.ExportDestination == ExportDestination.iPushPull) {
            let currentLiveReports = middlewareAPI.getState().System.CurrentLiveReports
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

          let gridState: GridState = middlewareAPI.getState().Grid
          let layoutState: LayoutState = middlewareAPI.getState().Layout
          let visibleColumnNames = gridState.Columns.filter(c => c.Visible).map(c => c.ColumnId)

          //create the default layout (if not there) so we can revert to it if needed
          let currentLayout = DEFAULT_LAYOUT
          let defaultLayoutIndex = layoutState.Layouts.findIndex(l => l.Name == DEFAULT_LAYOUT)
          let defaultLayout: ILayout = ObjectFactory.CreateLayout(gridState.Columns, [], blotter.getVendorGridState(visibleColumnNames, true), DEFAULT_LAYOUT)
          middlewareAPI.dispatch(LayoutRedux.LayoutPreSave(defaultLayoutIndex, defaultLayout));
          if (layoutState.Layouts.length > 0) {
            currentLayout = layoutState.CurrentLayout
          }

          //Create all calculated columns before we load the layout
          middlewareAPI.getState().CalculatedColumn.CalculatedColumns.forEach(cc => {
            blotter.addCalculatedColumnToGrid(cc)
          })

          //Create all free text columns before we load the layout
          middlewareAPI.getState().FreeTextColumn.FreeTextColumns.forEach(ftc => {
            blotter.addFreeTextColumnToGrid(ftc)
          })

          //load the default layout if its current
          if (currentLayout == DEFAULT_LAYOUT) {
            middlewareAPI.dispatch(LayoutRedux.LayoutSelect(currentLayout));
          }
          blotter.createMenu();

          blotter.InitAuditService()
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
