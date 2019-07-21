import { ExportDestination, MathOperation, MessageType } from '../../PredefinedConfig/Common/Enums';
import * as Redux from 'redux';
import * as DeepDiff from 'deep-diff';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEngine as createEngineRemote } from './IAdaptableBlotterReduxRemoteStorageEngine';
import { createEngine as createEngineLocal } from './AdaptableBlotterReduxLocalStorageEngine';
import { licenseMergeReducer } from './AdaptableBlotterReduxMerger';

import * as MenuRedux from '../ActionsReducers/MenuRedux';
import * as PopupRedux from '../ActionsReducers/PopupRedux';
import * as ChartRedux from '../ActionsReducers/ChartRedux';
import * as AlertRedux from '../ActionsReducers/AlertRedux';
import * as SmartEditRedux from '../ActionsReducers/SmartEditRedux';
import * as BulkUpdateRedux from '../ActionsReducers/BulkUpdateRedux';
import * as CustomSortRedux from '../ActionsReducers/CustomSortRedux';
import * as CalculatedColumnRedux from '../ActionsReducers/CalculatedColumnRedux';
import * as ShortcutRedux from '../ActionsReducers/ShortcutRedux';
import * as GridRedux from '../ActionsReducers/GridRedux';
import * as SystemRedux from '../ActionsReducers/SystemRedux';
import * as PlusMinusRedux from '../ActionsReducers/PlusMinusRedux';
import * as ExportRedux from '../ActionsReducers/ExportRedux';
import * as FlashingCellsRedux from '../ActionsReducers/FlashingCellsRedux';
import * as CalendarRedux from '../ActionsReducers/CalendarRedux';
import * as ConditionalStyleRedux from '../ActionsReducers/ConditionalStyleRedux';
import * as QuickSearchRedux from '../ActionsReducers/QuickSearchRedux';
import * as AdvancedSearchRedux from '../ActionsReducers/AdvancedSearchRedux';
import * as DataSourceRedux from '../ActionsReducers/DataSourceRedux';
import * as ColumnFilterRedux from '../ActionsReducers/ColumnFilterRedux';
import * as UserFilterRedux from '../ActionsReducers/UserFilterRedux';
import * as SystemFilterRedux from '../ActionsReducers/SystemFilterRedux';
import * as ReminderRedux from '../ActionsReducers/ReminderRedux';
import * as ThemeRedux from '../ActionsReducers/ThemeRedux';
import * as FormatColumnRedux from '../ActionsReducers/FormatColumnRedux';
import * as ActionColumnRedux from '../ActionsReducers/ActionColumnRedux';
import * as FreeTextColumnRedux from '../ActionsReducers/FreeTextColumnRedux';
import * as LayoutRedux from '../ActionsReducers/LayoutRedux';
import * as ColumnCategoryRedux from '../ActionsReducers/ColumnCategoryRedux';
import * as DashboardRedux from '../ActionsReducers/DashboardRedux';
import * as CellValidationRedux from '../ActionsReducers/CellValidationRedux';
import * as PercentBarRedux from '../ActionsReducers/PercentBarRedux';
import * as EntitlementsRedux from '../ActionsReducers/EntitlementsRedux';
import * as CellSummaryRedux from '../ActionsReducers/CellSummaryRedux';
import * as TeamSharingRedux from '../ActionsReducers/TeamSharingRedux';
import * as UserInterfaceRedux from '../ActionsReducers/UserInterfaceRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { IAdaptableBlotter } from '../../Utilities/Interface/IAdaptableBlotter';
import { ISmartEditStrategy } from '../../Strategy/Interface/ISmartEditStrategy';
import { IBulkUpdateStrategy } from '../../Strategy/Interface/IBulkUpdateStrategy';
import { IShortcutStrategy } from '../../Strategy/Interface/IShortcutStrategy';
import { IExportStrategy } from '../../Strategy/Interface/IExportStrategy';
import { IPPDomain } from '../../Utilities/Interface/Reports/IPPDomain';
import { IPlusMinusStrategy } from '../../Strategy/Interface/IPlusMinusStrategy';
import { ISharedEntity } from '../../Utilities/Interface/ISharedEntity';
import { AdaptableBlotterState, IAdaptableBlotterStore } from './Interface/IAdaptableStore';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as ConfigConstants from '../../Utilities/Constants/ConfigConstants';
import { LayoutState } from '../../PredefinedConfig/RunTimeState/LayoutState';
import { GridState } from '../../PredefinedConfig/InternalState/GridState';
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';
import { FormatColumn } from '../../PredefinedConfig/RunTimeState/FormatColumnState';
import { Layout } from '../../PredefinedConfig/RunTimeState/LayoutState';
import { PlusMinusRule } from '../../PredefinedConfig/RunTimeState/PlusMinusState';
import { UserFilter } from '../../PredefinedConfig/RunTimeState/UserFilterState';
import { FreeTextColumn } from '../../PredefinedConfig/RunTimeState/FreeTextColumnState';
import { Report } from '../../PredefinedConfig/RunTimeState/ExportState';
import { CustomSort } from '../../PredefinedConfig/RunTimeState/CustomSortState';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import {
  DEFAULT_LAYOUT,
  CURRENT_ADVANCED_SEARCH_STATE_PROPERTY,
  BULK_UPDATE_VALUE_STATE_PROPERTY,
  CURRENT_CALENDAR_STATE_PROPERTY,
  SUMMARY_OPERATION_STATE_PROPERTY,
  CURRENT_LAYOUT_STATE_PROPERTY,
  QUICK_SEARCH_TEXT_STATE_PROPERTY,
  QUICK_SEARCH_DISPLAY_ACTION_STATE_PROPERTY,
  QUICK_SEARCH_STYLE_STATE_PROPERTY,
  CURRENT_DATA_SOURCE_STATE_PROPERTY,
  SMART_EDIT_MATH_OPERATION_STATE_PROPERTY,
  SMART_EDIT_VALUE_STATE_PROPERTY,
  CURRENT_THEME_STATE_PROPERTY,
  FLASHING_CELL_DEFAULT_UP_COLOR_STATE_PROPERTY,
  FLASHING_CELL_DEFAULT_DOWN_COLOR_STATE_PROPERTY,
  FLASHING_CELL_DEFAULT_DURATION_STATE_PROPERTY,
  CURRENT_CHART_NAME_STATE_PROPERTY,
  CURRENT_REPORT_STATE_PROPERTY,
} from '../../Utilities/Constants/GeneralConstants';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ICellSummaryStrategy } from '../../Strategy/Interface/ICellSummaryStrategy';
import { ICellSummmary } from '../../Utilities/Interface/SelectedCell/ICellSummmary';
import { PreviewHelper } from '../../Utilities/Helpers/PreviewHelper';
import { iPushPullHelper } from '../../Utilities/Helpers/iPushPullHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { BlotterHelper } from '../../Utilities/Helpers/BlotterHelper';
import { IUIConfirmation, InputAction } from '../../Utilities/Interface/IMessage';
import { ChartVisibility } from '../../PredefinedConfig/Common/ChartEnums';
import { IStrategyActionReturn } from '../../Strategy/Interface/IStrategyActionReturn';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import IStorageEngine from './Interface/IStorageEngine';
import { CalculatedColumn } from '../../PredefinedConfig/RunTimeState/CalculatedColumnState';
import { ConditionalStyle } from '../../PredefinedConfig/RunTimeState/ConditionalStyleState';
import { ColumnFilter } from '../../PredefinedConfig/RunTimeState/ColumnFilterState';
import { CellValidationRule } from '../../PredefinedConfig/RunTimeState/CellValidationState';
import { Shortcut } from '../../PredefinedConfig/RunTimeState/ShortcutState';
import { AdvancedSearch } from '../../PredefinedConfig/RunTimeState/AdvancedSearchState';
import { ConfigState } from '../../PredefinedConfig/ConfigState';
import {
  StatePropertyChangedDetails,
  StateObjectChangedDetails,
  StateObjectChangeType,
  FunctionAppliedDetails,
  StateChangedDetails,
} from '../../Api/Events/AuditEvents';

import * as Emitter from 'emittery';

type EmitterCallback = (data?: any) => any;
/*
This is the main store for the Adaptable Blotter
*/

const rootReducer: Redux.Reducer<AdaptableBlotterState> = Redux.combineReducers<
  AdaptableBlotterState
>({
  //  Reducers for Non-Persisted State
  Popup: PopupRedux.ShowPopupReducer,
  Menu: MenuRedux.MenuReducer,
  System: SystemRedux.SystemReducer,
  Grid: GridRedux.GridReducer,

  // Reducers for Persisted State
  ActionColumn: ActionColumnRedux.ActionColumnReducer,
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
  Reminder: ReminderRedux.ReminderReducer,
  TeamSharing: TeamSharingRedux.TeamSharingReducer,
  Theme: ThemeRedux.ThemeReducer,
  UserFilter: UserFilterRedux.UserFilterReducer,
  UserInterface: UserInterfaceRedux.UserInterfaceStateReducer,
});

export const RESET_STATE = 'RESET_STATE';
export const INIT_STATE = 'INIT_STATE';
export const LOAD_STATE = 'LOAD_STATE';

const NON_PERSIST_ACTIONS: { [key: string]: boolean } = {
  [LOAD_STATE]: true,
  '@@INIT': true,
  '@@redux/init': true,
  [INIT_STATE]: true,
  [RESET_STATE]: true,
};

export interface ResetUserDataAction extends Redux.Action {}
export interface InitStateAction extends Redux.Action {}
export interface LoadStateAction extends Redux.Action {
  State: { [s: string]: ConfigState };
}

export const ResetUserData = (): ResetUserDataAction => ({
  type: RESET_STATE,
});
export const InitState = (): ResetUserDataAction => ({
  type: INIT_STATE,
});
export const LoadState = (State: { [s: string]: ConfigState }): LoadStateAction => ({
  type: LOAD_STATE,
  State,
});

const rootReducerWithResetManagement = (state: AdaptableBlotterState, action: Redux.Action) => {
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
      state.Layout = undefined;
      state.PlusMinus = undefined;
      state.QuickSearch = undefined;
      state.Shortcut = undefined;
      state.SmartEdit = undefined;
      state.CellSummary = undefined;
      state.Theme = undefined;
      break;
    case LOAD_STATE:
      const { State } = <LoadStateAction>action;
      Object.keys(State).forEach(key => {
        state[key] = State[key];
      });
      break;
  }
  return rootReducer(state, action);
};

// const configServerUrl = "/adaptableblotter-config"
const configServerTeamSharingUrl = '/adaptableblotter-teamsharing';

export class AdaptableBlotterStore implements IAdaptableBlotterStore {
  public TheStore: Redux.Store<AdaptableBlotterState>;
  public Load: PromiseLike<any>;
  private emitter: Emitter;

  public on = (eventName: string, callback: EmitterCallback): (() => void) => {
    return this.emitter.on(eventName, callback);
  };
  public onAny = (callback: EmitterCallback): (() => void) => {
    return this.emitter.onAny(callback);
  };

  public emit = (eventName: string, data: any): Promise<any> => {
    return this.emitter.emit(eventName, data);
  };

  constructor(blotter: IAdaptableBlotter) {
    let storageEngine: IStorageEngine;

    this.emitter = new Emitter();

    // If the user has remote storage set then we use Remote Engine, otherwise we use Local Enginge
    // We pass into the create method the blotterId, the config, and also the Licence Info
    // the Lience Info is needed so we can determine whether or not to load state
    // not sure we can do this as we need to be backwardly compatible with existing users so need to stick with blotter id (which shoudl be unique)
    // const localStorageKey =  'adaptable-blotter-state-' + blotter.blotterOptions.primaryKey;
    const localStorageKey = blotter.blotterOptions.blotterId;
    if (BlotterHelper.isConfigServerEnabled(blotter.blotterOptions)) {
      storageEngine = createEngineRemote(
        blotter.blotterOptions.configServerOptions.configServerUrl,
        blotter.blotterOptions.userName,
        blotter.blotterOptions.blotterId
      );
    } else {
      storageEngine = createEngineLocal(
        localStorageKey,
        blotter.blotterOptions.predefinedConfig,
        blotter.LicenceService.LicenceInfo
      );
    }

    const nonPersistentReduxKeys = [
      // Non Persisted State
      ConfigConstants.SYSTEM,
      ConfigConstants.GRID,
      ConfigConstants.MENU,
      ConfigConstants.POPUP,
      ConfigConstants.TEAM_SHARING,
      // Config State - set ONLY in PredefinedConfig and never changed at runtime
      ConfigConstants.USER_INTERFACE,
      ConfigConstants.ENTITLEMENTS,
      ConfigConstants.APPLICATION,
    ];

    let rootReducer = licenseMergeReducer(
      rootReducerWithResetManagement,
      blotter.LicenceService.LicenceInfo,
      LOAD_STATE
    );

    let composeEnhancers;
    if ('production' != process.env.NODE_ENV) {
      composeEnhancers = composeWithDevTools({
        // Specify here name, actionsBlacklist, actionsCreators and other options if needed
      });
    } else {
      composeEnhancers = (x: any) => x;
    }

    const persistedReducer = (state: AdaptableBlotterState, action: Redux.Action) => {
      const init = state === undefined;
      const newState = rootReducer(state, action);

      // ideally the reducer should be pure,
      // but having the emitter emit the event here
      // is really useful
      this.emitter.emit(action.type, { action, state, newState });

      const shouldPersist = !NON_PERSIST_ACTIONS[action.type] && !init;
      if (shouldPersist) {
        const storageState = { ...newState };

        nonPersistentReduxKeys.forEach(key => {
          delete storageState[key];
        });

        storageEngine.save(storageState);
      }

      return newState;
    };

    //TODO: need to check if we want the storage to be done before or after
    //we enrich the state with the AB middleware
    this.TheStore = Redux.createStore<AdaptableBlotterState>(
      persistedReducer,
      composeEnhancers(
        Redux.applyMiddleware(
          stateChangedAuditLogMiddleware(blotter), // checks for changes in internal / user state and sends to audit log
          adaptableBlotterMiddleware(blotter), // the main middleware that actually does stuff
          functionAppliedLogMiddleware(blotter) // looks at when functions are applied (e..g Quick Search) and logs accordingly
        )
      )
    );

    this.Load = storageEngine
      .load()
      .then(storedState => {
        if (storedState) {
          this.TheStore.dispatch(LoadState(storedState));
        }
      })
      .then(
        () => this.TheStore.dispatch(InitState()),
        e => {
          LoggingHelper.LogAdaptableBlotterError(
            'Failed to load previous adaptable blotter state : ',
            e
          );
          //for now i'm still initializing the AB even if loading state has failed....
          //we may revisit that later
          this.TheStore.dispatch(InitState());
          this.TheStore.dispatch(
            PopupRedux.PopupShowAlert({
              Header: 'Configuration',
              Msg: 'Error loading your configuration:' + e,
              MessageType: MessageType.Error,
              ShowAsPopup: true,
            })
          );
        }
      );
  }
}

// this function checks for any differences in the state and sends it to AUDIT LOGGER (for use in Audit Log)
// we now allow users to differentiate between user and internal state so we check for both
// NOTE:  the Audit Logger is also responsible for firing AuditEventApi changes if that has been set
var stateChangedAuditLogMiddleware = (adaptableBlotter: IAdaptableBlotter): any =>
  function(middlewareAPI: Redux.MiddlewareAPI<AdaptableBlotterState>) {
    return function(next: Redux.Dispatch<AdaptableBlotterState>) {
      return function(action: Redux.Action) {
        if (
          // if audit state is turned off, then get out
          !adaptableBlotter.isInitialised ||
          !adaptableBlotter.AuditLogService.isAuditStateChangesEnabled
        ) {
          return next(action);
        }

        // If Reset or Init State then dont log
        if (ArrayExtensions.ContainsItem(getPrimaryStateReduxActions(), action.type)) {
          return next(action);
        }

        // for non persisting actions (e.g. system, grid, menu and popup state functions)
        // we audit state changes only if audit is set to log internal state
        // and we send a diff of the change to Audit Log for Internal Changes
        if (ArrayExtensions.ContainsItem(getNonPersistedReduxActions(), action.type)) {
          if (adaptableBlotter.AuditLogService.isAuditInternalStateChangesEnabled) {
            let oldState = middlewareAPI.getState();
            let ret = next(action);
            let newState = middlewareAPI.getState();
            let diff = adaptableBlotter.AuditLogService.convertAuditMessageToText(
              DeepDiff.diff(oldState, newState)
            );

            let stateChangedDetails: StateChangedDetails = {
              name: 'Internal State Changes', // we dont know the name
              actionType: action.type,
              state: null,
              diffInfo: diff,
            };

            adaptableBlotter.AuditLogService.addInternalStateChangeAuditLog(stateChangedDetails);
            return ret;
          } else {
            return next(action);
          }
        }

        // Unlikely but possible that ONLY Internal Audit is on so get out if so...
        if (!adaptableBlotter.AuditLogService.isAuditUserStateChangesEnabled) {
          return next(action);
        }

        // We have User Changes Audit On
        // Get the OldState, NewState and Diff - as required for each use case
        let oldState = middlewareAPI.getState();
        let ret = next(action);
        let newState = middlewareAPI.getState();
        let diff = adaptableBlotter.AuditLogService.convertAuditMessageToText(
          DeepDiff.diff(oldState, newState)
        );

        switch (action.type) {
          /* 
          **********************
           ADVANCED SEARCH
          **********************
           */
          case AdvancedSearchRedux.ADVANCED_SEARCH_SELECT: {
            let actionTyped = <AdvancedSearchRedux.AdvancedSearchSelectAction>action;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.AdvancedSearchStrategyId,
              actionType: action.type,
              state: newState.AdvancedSearch,
              diffInfo: diff,
              propertyName: CURRENT_ADVANCED_SEARCH_STATE_PROPERTY,
              oldValue: oldState.AdvancedSearch.CurrentAdvancedSearch,
              newValue: actionTyped.selectedSearchName,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case AdvancedSearchRedux.ADVANCED_SEARCH_ADD: {
            let actionTyped = <AdvancedSearchRedux.AdvancedSearchAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.AdvancedSearchStrategyId,
              actionType: action.type,
              state: newState.AdvancedSearch,
              diffInfo: diff,
              objectChanged: actionTyped.advancedSearch,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case AdvancedSearchRedux.ADVANCED_SEARCH_EDIT: {
            let actionTyped = <AdvancedSearchRedux.AdvancedSearchEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.AdvancedSearchStrategyId,
              actionType: action.type,
              state: newState.AdvancedSearch,
              diffInfo: diff,
              objectChanged: actionTyped.advancedSearch,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case AdvancedSearchRedux.ADVANCED_SEARCH_DELETE: {
            let actionTyped = <AdvancedSearchRedux.AdvancedSearchDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.AdvancedSearchStrategyId,
              actionType: action.type,
              state: newState.AdvancedSearch,
              diffInfo: diff,
              objectChanged: actionTyped.advancedSearch,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
           ALERT
          **********************
           */
          case AlertRedux.ALERT_DEFIINITION_ADD: {
            let actionTyped = <AlertRedux.AlertDefinitionAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.AlertStrategyId,
              actionType: action.type,
              state: newState.Alert,
              diffInfo: diff,
              objectChanged: actionTyped.alertDefinition,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case AlertRedux.ALERT_DEFIINITION_EDIT: {
            let actionTyped = <AlertRedux.AlertDefinitionEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.AlertStrategyId,
              actionType: action.type,
              state: newState.Alert,
              diffInfo: diff,
              objectChanged: actionTyped.alertDefinition,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case AlertRedux.ALERT_DEFIINITION_DELETE: {
            let actionTyped = <AlertRedux.AlertDefinitionDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.AlertStrategyId,
              actionType: action.type,
              state: newState.Alert,
              diffInfo: diff,
              objectChanged: actionTyped.alertDefinition,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
           BULK UPDATE
          **********************
           */
          case BulkUpdateRedux.BULK_UPDATE_CHANGE_VALUE: {
            let actionTyped = <BulkUpdateRedux.BulkUpdateChangeValueAction>action;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.BulkUpdateStrategyId,
              actionType: action.type,
              state: newState.BulkUpdate,
              diffInfo: diff,
              propertyName: BULK_UPDATE_VALUE_STATE_PROPERTY,
              oldValue: oldState.BulkUpdate.BulkUpdateValue,
              newValue: actionTyped.bulkUpdateValue,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }

          /* 
          **********************
           CALCULATED COLUMN
          **********************
           */
          case CalculatedColumnRedux.CALCULATEDCOLUMN_ADD: {
            let actionTyped = <CalculatedColumnRedux.CalculatedColumnAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CalculatedColumnStrategyId,
              actionType: action.type,
              state: newState.CalculatedColumn,
              diffInfo: diff,
              objectChanged: actionTyped.calculatedColumn,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case CalculatedColumnRedux.CALCULATEDCOLUMN_EDIT: {
            let actionTyped = <CalculatedColumnRedux.CalculatedColumnEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CalculatedColumnStrategyId,
              actionType: action.type,
              state: newState.CalculatedColumn,
              diffInfo: diff,
              objectChanged: actionTyped.calculatedColumn,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case CalculatedColumnRedux.CalculatedColumnDelete: {
            let actionTyped = <CalculatedColumnRedux.CalculatedColumnDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CalculatedColumnStrategyId,
              actionType: action.type,
              state: newState.CalculatedColumn,
              diffInfo: diff,
              objectChanged: actionTyped.calculatedColumn,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
           CALENDAR
          **********************
           */
          case CalendarRedux.CALENDAR_SELECT: {
            let actionTyped = <CalendarRedux.CalendarSelectAction>action;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.CalendarStrategyId,
              actionType: action.type,
              state: newState.Calendar,
              diffInfo: diff,
              propertyName: CURRENT_CALENDAR_STATE_PROPERTY,
              oldValue: oldState.Calendar.CurrentCalendar,
              newValue: actionTyped.selectedCalendarName,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
           CELL SUMMARY
          **********************
           */
          case CellSummaryRedux.CELL_SUMMARY_CHANGE_OPERATION: {
            let actionTyped = <CellSummaryRedux.CellSummaryChangeOperationAction>action;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.CellSummaryStrategyId,
              actionType: action.type,
              state: newState.CellSummary,
              diffInfo: diff,
              propertyName: SUMMARY_OPERATION_STATE_PROPERTY,
              oldValue: oldState.CellSummary.SummaryOperation,
              newValue: actionTyped.SummaryOperation,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
           CELL VALIDATION
          **********************
           */
          case CellValidationRedux.CELL_VALIDATION_ADD: {
            let actionTyped = <CellValidationRedux.CellValidationAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CellValidationStrategyId,
              actionType: action.type,
              state: newState.CellValidation,
              diffInfo: diff,
              objectChanged: actionTyped.cellValidationRule,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case CellValidationRedux.CELL_VALIDATION_EDIT: {
            let actionTyped = <CellValidationRedux.CellValidationEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CellValidationStrategyId,
              actionType: action.type,
              state: newState.CellValidation,
              diffInfo: diff,
              objectChanged: actionTyped.cellValidationRule,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case CellValidationRedux.CELL_VALIDATION_DELETE: {
            let actionTyped = <CellValidationRedux.CellValidationDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CellValidationStrategyId,
              actionType: action.type,
              state: newState.CellValidation,
              diffInfo: diff,
              objectChanged: actionTyped.cellValidationRule,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
           CHART
          **********************
           */
          case ChartRedux.CHART_DEFINITION_SELECT: {
            let actionTyped = <ChartRedux.ChartDefinitionSelectAction>action;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.ChartStrategyId,
              actionType: action.type,
              state: newState.Chart,
              diffInfo: diff,
              propertyName: CURRENT_CHART_NAME_STATE_PROPERTY,
              oldValue: oldState.Chart.CurrentChartName,
              newValue: actionTyped.chartName,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ChartRedux.CHART_DEFINITION_ADD: {
            let actionTyped = <ChartRedux.ChartDefinitionAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ChartStrategyId,
              actionType: action.type,
              state: newState.Chart,
              diffInfo: diff,
              objectChanged: actionTyped.chartDefinition,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ChartRedux.CHART_DEFINITION_EDIT: {
            let actionTyped = <ChartRedux.ChartDefinitionEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ChartStrategyId,
              actionType: action.type,
              state: newState.Chart,
              diffInfo: diff,
              objectChanged: actionTyped.chartDefinition,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ChartRedux.CHART_DEFINITION_DELETE: {
            let actionTyped = <ChartRedux.ChartDefinitionDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ChartStrategyId,
              actionType: action.type,
              state: newState.Chart,
              diffInfo: diff,
              objectChanged: actionTyped.chartDefinition,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
          COLUMN CATEGORY
          **********************
           */
          case ColumnCategoryRedux.COLUMN_CATEGORY_ADD: {
            let actionTyped = <ColumnCategoryRedux.ColumnCategoryAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ColumnCategoryStrategyId,
              actionType: action.type,
              state: newState.ColumnCategory,
              diffInfo: diff,
              objectChanged: actionTyped.columnCategory,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ColumnCategoryRedux.COLUMN_CATEGORY_EDIT: {
            let actionTyped = <ColumnCategoryRedux.ColumnCategoryEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ColumnCategoryStrategyId,
              actionType: action.type,
              state: newState.ColumnCategory,
              diffInfo: diff,
              objectChanged: actionTyped.columnCategory,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ColumnCategoryRedux.COLUMN_CATEGORY_DELETE: {
            let actionTyped = <ColumnCategoryRedux.ColumnCategoryDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ColumnCategoryStrategyId,
              actionType: action.type,
              state: newState.ColumnCategory,
              diffInfo: diff,
              objectChanged: actionTyped.columnCategory,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
          COLUMN FILTER
         **********************
          */
          case ColumnFilterRedux.COLUMN_FILTER_ADD: {
            let actionTyped = <ColumnFilterRedux.ColumnFilterAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ColumnFilterStrategyId,
              actionType: action.type,
              state: newState.ColumnFilter,
              diffInfo: diff,
              objectChanged: actionTyped.columnFilter,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ColumnFilterRedux.COLUMN_FILTER_EDIT: {
            let actionTyped = <ColumnFilterRedux.ColumnFilterEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ColumnFilterStrategyId,
              actionType: action.type,
              state: newState.ColumnFilter,
              diffInfo: diff,
              objectChanged: actionTyped.columnFilter,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ColumnFilterRedux.COLUMN_FILTER_CLEAR: {
            let actionTyped = <ColumnFilterRedux.ColumnFilterClearAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ColumnFilterStrategyId,
              actionType: action.type,
              state: newState.ColumnFilter,
              diffInfo: diff,
              objectChanged: undefined, // TODO: actionTyped.columnId - this should have the object not te column?
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ColumnFilterRedux.COLUMN_FILTER_CLEAR_ALL: {
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ColumnFilterStrategyId,
              actionType: action.type,
              state: newState.ColumnFilter,
              diffInfo: diff,
              objectChanged: null,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }

          /* 
          **********************
          CONDITIONAL STYLE
          **********************
           */
          case ConditionalStyleRedux.CONDITIONAL_STYLE_ADD: {
            let actionTyped = <ConditionalStyleRedux.ConditionalStyleAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ConditionalStyleStrategyId,
              actionType: action.type,
              state: newState.ConditionalStyle,
              diffInfo: diff,
              objectChanged: actionTyped.conditionalStyle,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ConditionalStyleRedux.CONDITIONAL_STYLE_EDIT: {
            let actionTyped = <ConditionalStyleRedux.ConditionalStyleEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ConditionalStyleStrategyId,
              actionType: action.type,
              state: newState.ConditionalStyle,
              diffInfo: diff,
              objectChanged: actionTyped.conditionalStyle,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ConditionalStyleRedux.CONDITIONAL_STYLE_DELETE: {
            let actionTyped = <ConditionalStyleRedux.ConditionalStyleDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ConditionalStyleStrategyId,
              actionType: action.type,
              state: newState.ConditionalStyle,
              diffInfo: diff,
              objectChanged: actionTyped.conditionalStyle,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
          CUSTOM SORT
          **********************
           */
          case CustomSortRedux.CUSTOM_SORT_ADD: {
            let actionTyped = <CustomSortRedux.CustomSortAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CustomSortStrategyId,
              actionType: action.type,
              state: newState.CustomSort,
              diffInfo: diff,
              objectChanged: actionTyped.customSort,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case CustomSortRedux.CUSTOM_SORT_EDIT: {
            let actionTyped = <CustomSortRedux.CustomSortEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CustomSortStrategyId,
              actionType: action.type,
              state: newState.CustomSort,
              diffInfo: diff,
              objectChanged: actionTyped.customSort,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case CustomSortRedux.CUSTOM_SORT_DELETE: {
            let actionTyped = <CustomSortRedux.CustomSortDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CustomSortStrategyId,
              actionType: action.type,
              state: newState.CustomSort,
              diffInfo: diff,
              objectChanged: actionTyped.customSort,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
          DATA SOURCE
          **********************
           */
          case DataSourceRedux.DATA_SOURCE_SELECT: {
            let actionTyped = <DataSourceRedux.DataSourceSelectAction>action;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.DataSourceStrategyId,
              actionType: action.type,
              state: newState.DataSource,
              diffInfo: diff,
              propertyName: CURRENT_DATA_SOURCE_STATE_PROPERTY,
              oldValue: oldState.DataSource.CurrentDataSource,
              newValue: actionTyped.SelectedDataSource,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case DataSourceRedux.DATA_SOURCE_ADD: {
            let actionTyped = <DataSourceRedux.DataSourceAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.DataSourceStrategyId,
              actionType: action.type,
              state: newState.DataSource,
              diffInfo: diff,
              objectChanged: actionTyped.dataSource,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case DataSourceRedux.DATA_SOURCE_EDIT: {
            let actionTyped = <DataSourceRedux.DataSourceEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.DataSourceStrategyId,
              actionType: action.type,
              state: newState.DataSource,
              diffInfo: diff,
              objectChanged: actionTyped.dataSource,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case DataSourceRedux.DATA_SOURCE_DELETE: {
            let actionTyped = <DataSourceRedux.DataSourceDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.DataSourceStrategyId,
              actionType: action.type,
              state: newState.DataSource,
              diffInfo: diff,
              objectChanged: actionTyped.dataSource,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
           EXPORT
          **********************
           */
          case ExportRedux.REPORT_SELECT: {
            let actionTyped = <ExportRedux.ReportSelectAction>action;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.ExportStrategyId,
              actionType: action.type,
              state: newState.Export,
              diffInfo: diff,
              propertyName: CURRENT_REPORT_STATE_PROPERTY,
              oldValue: oldState.Export.CurrentReport,
              newValue: actionTyped.SelectedReport,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ExportRedux.REPORT_ADD: {
            let actionTyped = <ExportRedux.ReportAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ExportStrategyId,
              actionType: action.type,
              state: newState.Export,
              diffInfo: diff,
              objectChanged: actionTyped.report,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ExportRedux.REPORT_EDIT: {
            let actionTyped = <ExportRedux.ReportEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ExportStrategyId,
              actionType: action.type,
              state: newState.Export,
              diffInfo: diff,
              objectChanged: actionTyped.report,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ExportRedux.REPORT_DELETE: {
            let actionTyped = <ExportRedux.ReportDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ExportStrategyId,
              actionType: action.type,
              state: newState.Export,
              diffInfo: diff,
              objectChanged: actionTyped.report,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          } /* 
          **********************
          FLASHING CELL
          **********************
           */
          case FlashingCellsRedux.FLASHING_CELL_CHANGE_UP_COLOR: {
            let actionTyped = <FlashingCellsRedux.FlashingCellChangeUpColorAction>action;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.FlashingCellsStrategyId,
              actionType: action.type,
              state: newState.FlashingCell,
              diffInfo: diff,
              propertyName: FLASHING_CELL_DEFAULT_UP_COLOR_STATE_PROPERTY,
              oldValue: oldState.FlashingCell.DefaultUpColor,
              newValue: actionTyped.UpColor,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case FlashingCellsRedux.FLASHING_CELL_CHANGE_DOWN_COLOR: {
            let actionTyped = <FlashingCellsRedux.FlashingCellChangeDownColorAction>action;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.FlashingCellsStrategyId,
              actionType: action.type,
              state: newState.FlashingCell,
              diffInfo: diff,
              propertyName: FLASHING_CELL_DEFAULT_DOWN_COLOR_STATE_PROPERTY,
              oldValue: oldState.FlashingCell.DefautDownColor,
              newValue: actionTyped.DownColor,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case FlashingCellsRedux.FLASHING_CELL_CHANGE_DURATION: {
            let actionTyped = <FlashingCellsRedux.FlashingCellChangeDurationAction>action;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.FlashingCellsStrategyId,
              actionType: action.type,
              state: newState.FlashingCell,
              diffInfo: diff,
              propertyName: FLASHING_CELL_DEFAULT_DURATION_STATE_PROPERTY,
              oldValue: oldState.FlashingCell.DefaultDuration.toString(),
              newValue: actionTyped.NewFlashDuration.toString(),
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
          FORMAT COLUMN
          **********************
           */
          case FormatColumnRedux.FORMAT_COLUMN_ADD: {
            let actionTyped = <FormatColumnRedux.FormatColumnAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.FormatColumnStrategyId,
              actionType: action.type,
              state: newState.FormatColumn,
              diffInfo: diff,
              objectChanged: actionTyped.formatColumn,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case FormatColumnRedux.FORMAT_COLUMN_EDIT: {
            let actionTyped = <FormatColumnRedux.FormatColumnEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.FormatColumnStrategyId,
              actionType: action.type,
              state: newState.FormatColumn,
              diffInfo: diff,
              objectChanged: actionTyped.formatColumn,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case FormatColumnRedux.FORMAT_COLUMN_DELETE: {
            let actionTyped = <FormatColumnRedux.FormatColumnDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.FormatColumnStrategyId,
              actionType: action.type,
              state: newState.FormatColumn,
              diffInfo: diff,
              objectChanged: actionTyped.formatColumn,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
          FREE TEXT COLUMN
          **********************
           */
          case FreeTextColumnRedux.FREE_TEXT_COLUMN_ADD: {
            let actionTyped = <FreeTextColumnRedux.FreeTextColumnAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.FreeTextColumnStrategyId,
              actionType: action.type,
              state: newState.FreeTextColumn,
              diffInfo: diff,
              objectChanged: actionTyped.freeTextColumn,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case FreeTextColumnRedux.FREE_TEXT_COLUMN_EDIT: {
            let actionTyped = <FreeTextColumnRedux.FreeTextColumnEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.FreeTextColumnStrategyId,
              actionType: action.type,
              state: newState.FreeTextColumn,
              diffInfo: diff,
              objectChanged: actionTyped.freeTextColumn,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case FreeTextColumnRedux.FREE_TEXT_COLUMN_DELETE: {
            let actionTyped = <FreeTextColumnRedux.FreeTextColumnDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.FreeTextColumnStrategyId,
              actionType: action.type,
              state: newState.FreeTextColumn,
              diffInfo: diff,
              objectChanged: actionTyped.freeTextColumn,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }

          /* 
          **********************
          LAYOUT
          **********************
           */
          case LayoutRedux.LAYOUT_SELECT: {
            let actionTyped = <LayoutRedux.LayoutSelectAction>action;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.LayoutStrategyId,
              actionType: action.type,
              state: newState.Layout,
              diffInfo: diff,
              propertyName: CURRENT_LAYOUT_STATE_PROPERTY,
              oldValue: oldState.Layout.CurrentLayout,
              newValue: actionTyped.LayoutName,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case LayoutRedux.LAYOUT_SAVE: {
            let actionTyped = <LayoutRedux.LayoutSaveAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.LayoutStrategyId,
              actionType: action.type,
              state: newState.Layout,
              diffInfo: diff,
              objectChanged: actionTyped.layout,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case LayoutRedux.LAYOUT_ADD: {
            let actionTyped = <LayoutRedux.LayoutAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.LayoutStrategyId,
              actionType: action.type,
              state: newState.Layout,
              diffInfo: diff,
              objectChanged: actionTyped.layout,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case LayoutRedux.LAYOUT_EDIT: {
            let actionTyped = <LayoutRedux.LayoutEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.LayoutStrategyId,
              actionType: action.type,
              state: newState.Layout,
              diffInfo: diff,
              objectChanged: actionTyped.layout,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case LayoutRedux.LAYOUT_DELETE: {
            let actionTyped = <LayoutRedux.LayoutDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.LayoutStrategyId,
              actionType: action.type,
              state: newState.Layout,
              diffInfo: diff,
              objectChanged: actionTyped.layout,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
          PERCENT BAR
          **********************
           */
          case PercentBarRedux.PERCENT_BAR_ADD: {
            let actionTyped = <PercentBarRedux.PercentBarAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.PercentBarStrategyId,
              actionType: action.type,
              state: newState.PercentBar,
              diffInfo: diff,
              objectChanged: actionTyped.percentBar,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case PercentBarRedux.PERCENT_BAR_EDIT: {
            let actionTyped = <PercentBarRedux.PercentBarEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.PercentBarStrategyId,
              actionType: action.type,
              state: newState.PercentBar,
              diffInfo: diff,
              objectChanged: actionTyped.percentBar,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case PercentBarRedux.PERCENT_BAR_DELETE: {
            let actionTyped = <PercentBarRedux.PercentBarDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.PercentBarStrategyId,
              actionType: action.type,
              state: newState.PercentBar,
              diffInfo: diff,
              objectChanged: actionTyped.percentBar,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
          PLUS / MINUS
          **********************
           */
          case PlusMinusRedux.PLUS_MINUS_RULE_ADD: {
            let actionTyped = <PlusMinusRedux.PlusMinusRuleAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.PlusMinusStrategyId,
              actionType: action.type,
              state: newState.PlusMinus,
              diffInfo: diff,
              objectChanged: actionTyped.plusMinusRule,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case PlusMinusRedux.PLUS_MINUS_RULE_EDIT: {
            let actionTyped = <PlusMinusRedux.PlusMinusRuleEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.PlusMinusStrategyId,
              actionType: action.type,
              state: newState.PlusMinus,
              diffInfo: diff,
              objectChanged: actionTyped.plusMinusRule,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case PlusMinusRedux.PLUS_MINUS_RULE_DELETE: {
            let actionTyped = <PlusMinusRedux.PlusMinusRuleDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.PlusMinusStrategyId,
              actionType: action.type,
              state: newState.PlusMinus,
              diffInfo: diff,
              objectChanged: actionTyped.plusMinusRule,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
          QUICK SEARCH
          **********************
           */
          case QuickSearchRedux.QUICK_SEARCH_APPLY: {
            let actionTyped = <QuickSearchRedux.QuickSearchApplyAction>action;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.QuickSearchStrategyId,
              actionType: action.type,
              state: newState.QuickSearch,
              diffInfo: diff,
              propertyName: QUICK_SEARCH_TEXT_STATE_PROPERTY,
              oldValue: oldState.QuickSearch.QuickSearchText,
              newValue: actionTyped.quickSearchText,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case QuickSearchRedux.QUICK_SEARCH_SET_DISPLAY: {
            let actionTyped = <QuickSearchRedux.QuickSearchSetDisplayAction>action;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.QuickSearchStrategyId,
              actionType: action.type,
              state: newState.QuickSearch,
              diffInfo: diff,
              propertyName: QUICK_SEARCH_DISPLAY_ACTION_STATE_PROPERTY,
              oldValue: oldState.QuickSearch.DisplayAction,
              newValue: actionTyped.DisplayAction,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case QuickSearchRedux.QUICK_SEARCH_SET_STYLE: {
            let actionTyped = <QuickSearchRedux.QuickSearchSetStyleAction>action;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.QuickSearchStrategyId,
              actionType: action.type,
              state: newState.QuickSearch,
              diffInfo: diff,
              propertyName: QUICK_SEARCH_STYLE_STATE_PROPERTY,
              oldValue: adaptableBlotter.AuditLogService.convertAuditMessageToText(
                oldState.QuickSearch.Style
              ),
              newValue: adaptableBlotter.AuditLogService.convertAuditMessageToText(
                actionTyped.style
              ),
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }

          /* 
          **********************
          REMINDER
          **********************
           */
          case ReminderRedux.REMINDER_ADD: {
            let actionTyped = <ReminderRedux.ReminderAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ReminderStrategyId,
              actionType: action.type,
              state: newState.Reminder,
              diffInfo: diff,
              objectChanged: actionTyped.reminder,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ReminderRedux.REMINDER_EDIT: {
            let actionTyped = <ReminderRedux.ReminderEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ReminderStrategyId,
              actionType: action.type,
              state: newState.Reminder,
              diffInfo: diff,
              objectChanged: actionTyped.reminder,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ReminderRedux.REMINDER_DELETE: {
            let actionTyped = <ReminderRedux.ReminderDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ReminderStrategyId,
              actionType: action.type,
              state: newState.Reminder,
              diffInfo: diff,
              objectChanged: actionTyped.reminder,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
          SHORTCUT
          **********************
           */
          case ShortcutRedux.SHORTCUT_ADD: {
            let actionTyped = <ShortcutRedux.ShortcutAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ShortcutStrategyId,
              actionType: action.type,
              state: newState.Shortcut,
              diffInfo: diff,
              objectChanged: actionTyped.shortcut,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ShortcutRedux.SHORTCUT_EDIT: {
            let actionTyped = <ShortcutRedux.ShortcutEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ShortcutStrategyId,
              actionType: action.type,
              state: newState.Shortcut,
              diffInfo: diff,
              objectChanged: actionTyped.shortcut,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ShortcutRedux.SHORTCUT_DELETE: {
            let actionTyped = <ShortcutRedux.ShortcutDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ShortcutStrategyId,
              actionType: action.type,
              state: newState.Shortcut,
              diffInfo: diff,
              objectChanged: actionTyped.shortcut,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
          SMART EDIT
          **********************
           */
          case SmartEditRedux.SMARTEDIT_CHANGE_VALUE: {
            let actionTyped = <SmartEditRedux.SmartEditChangeValueAction>action;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.SmartEditStrategyId,
              actionType: action.type,
              state: newState.SmartEdit,
              diffInfo: diff,
              propertyName: SMART_EDIT_VALUE_STATE_PROPERTY,
              oldValue: oldState.SmartEdit.SmartEditValue.toString(),
              newValue: actionTyped.value.toString(),
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case SmartEditRedux.SMARTEDIT_CHANGE_OPERATION: {
            let actionTyped = <SmartEditRedux.SmartEditChangeOperationAction>action;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.SmartEditStrategyId,
              actionType: action.type,
              state: newState.SmartEdit,
              diffInfo: diff,
              propertyName: SMART_EDIT_MATH_OPERATION_STATE_PROPERTY,
              oldValue: oldState.SmartEdit.MathOperation,
              newValue: actionTyped.MathOperation,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
          THEME
          **********************
           */
          case ThemeRedux.THEME_SELECT: {
            let actionTyped = <ThemeRedux.ThemeSelectAction>action;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.ThemeStrategyId,
              actionType: action.type,
              state: newState.Theme,
              diffInfo: diff,
              propertyName: CURRENT_THEME_STATE_PROPERTY,
              oldValue: oldState.Theme.CurrentTheme,
              newValue: actionTyped.type,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /* 
          **********************
          USER FILTER
          **********************
           */
          case UserFilterRedux.USER_FILTER_ADD: {
            let actionTyped = <UserFilterRedux.UserFilterAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.UserFilterStrategyId,
              actionType: action.type,
              state: newState.UserFilter,
              diffInfo: diff,
              objectChanged: actionTyped.userFilter,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case UserFilterRedux.USER_FILTER_EDIT: {
            let actionTyped = <UserFilterRedux.UserFilterEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.UserFilterStrategyId,
              actionType: action.type,
              state: newState.UserFilter,
              diffInfo: diff,
              objectChanged: actionTyped.userFilter,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case UserFilterRedux.USER_FILTER_DELETE: {
            let actionTyped = <UserFilterRedux.UserFilterDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.UserFilterStrategyId,
              actionType: action.type,
              state: newState.UserFilter,
              diffInfo: diff,
              objectChanged: actionTyped.userFilter,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /**
           * TODO: Dashboard,  Teamsharing
           *
           * NOT DOING AS THEY DONT CHANGE:  Entitlement, UserInterface
           */

          // leave this here in case we miss any actions and then at least we have the old and new state
          // but we wont have meaningful details of what has changed - so try to avoid
          default: {
            let stateChangedDetails: StateChangedDetails = {
              name: 'User State Changes', // we dont know the name
              actionType: action.type,
              state: null,
              diffInfo: diff,
            };

            adaptableBlotter.AuditLogService.addUserStateChangeAuditLog(stateChangedDetails);
            return ret;
          }
        }
      };
    };
  };

// this function is responsible for sending any  user-action functions to the audit
// there are relatively few - primarily relating to search and edit functions
// note it does not capture when something happens automatically as the result of a function (e.g. if a conditional style gets applied because a value has changed)
// e.g. this should say when the current Advanced search has changed, or if a custom sort is being applied (it doesnt yet), but not when sorts have been added generally or searches changed
var functionAppliedLogMiddleware = (adaptableBlotter: IAdaptableBlotter): any =>
  function(middlewareAPI: Redux.MiddlewareAPI<AdaptableBlotterState>) {
    return function(next: Redux.Dispatch<AdaptableBlotterState>) {
      return function(action: Redux.Action) {
        if (!adaptableBlotter.AuditLogService.isAuditFunctionEventsEnabled) {
          // not logging functions so leave...
          return next(action);
        }

        if (ArrayExtensions.NotContainsItem(getFunctionAppliedReduxActions(), action.type)) {
          // not an applied functions so leave...
          return next(action);
        }

        let state = middlewareAPI.getState();

        // Note: not done custom sort as not sure how!
        // Shortcut Apply, Bulk Update Apply and Smart Edit Apply we do in relevant Strategy
        switch (action.type) {
          case AdvancedSearchRedux.ADVANCED_SEARCH_SELECT: {
            let actionTyped = <AdvancedSearchRedux.AdvancedSearchSelectAction>action;
            let advancedSearch = state.AdvancedSearch.AdvancedSearches.find(
              as => as.Name == actionTyped.selectedSearchName
            );
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.AdvancedSearchStrategyId,
              action: action.type,
              info: actionTyped.selectedSearchName,
              data: advancedSearch,
            };
            adaptableBlotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case CalendarRedux.CALENDAR_SELECT: {
            let actionTyped = <CalendarRedux.CalendarSelectAction>action;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.CalendarStrategyId,
              action: action.type,
              info: CURRENT_CALENDAR_STATE_PROPERTY,
              data: actionTyped.selectedCalendarName,
            };
            adaptableBlotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case ChartRedux.CHART_DEFINITION_SELECT: {
            let actionTyped = <ChartRedux.ChartDefinitionSelectAction>action;
            let chart = state.Chart.ChartDefinitions.find(cd => cd.Name == actionTyped.chartName);
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.ChartStrategyId,
              action: action.type,
              info: actionTyped.chartName,
              data: chart,
            };
            adaptableBlotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case DataSourceRedux.DATA_SOURCE_SELECT: {
            let actionTyped = <DataSourceRedux.DataSourceSelectAction>action;
            let dataSource = state.DataSource.DataSources.find(
              ds => ds.Name == actionTyped.SelectedDataSource
            );
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.DataSourceStrategyId,
              action: action.type,
              info: actionTyped.SelectedDataSource,
              data: dataSource,
            };
            adaptableBlotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case ExportRedux.EXPORT_APPLY: {
            let actionTyped = <ExportRedux.ExportApplyAction>action;
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.ExportStrategyId,
              action: action.type,
              info: actionTyped.Report.Name,
              data: actionTyped.Report,
            };
            adaptableBlotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case FlashingCellsRedux.FLASHING_CELL_SELECT: {
            let actionTyped = <FlashingCellsRedux.FlashingCellSelectAction>action;
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.FlashingCellsStrategyId,
              action: action.type,
              info: adaptableBlotter.AuditLogService.convertAuditMessageToText(
                actionTyped.FlashingCell
              ),
              data: actionTyped.FlashingCell,
            };
            adaptableBlotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case FlashingCellsRedux.FLASHING_CELL_SELECT_ALL: {
            let actionTyped = <FlashingCellsRedux.FlashingCellSelectAllAction>action;
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.FlashingCellsStrategyId,
              action: action.type,
              info: adaptableBlotter.AuditLogService.convertAuditMessageToText(
                actionTyped.FlashingCells
              ),
              data: actionTyped.FlashingCells,
            };
            adaptableBlotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case FreeTextColumnRedux.FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE: {
            let actionTyped = <FreeTextColumnRedux.FreeTextColumnAddEditStoredValueAction>action;
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.FreeTextColumnStrategyId,
              action: action.type,
              info: actionTyped.FreeTextColumn.ColumnId,
              data: actionTyped.FreeTextStoredValue,
            };
            adaptableBlotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          // should we create a Quick Search Clear?  Might be neater...
          case QuickSearchRedux.QUICK_SEARCH_APPLY: {
            let actionTyped = <QuickSearchRedux.QuickSearchApplyAction>action;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.QuickSearchStrategyId,
              action: action.type,
              info: actionTyped.quickSearchText,
              data: state.QuickSearch,
            };

            adaptableBlotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }
          case QuickSearchRedux.QUICK_SEARCH_SET_DISPLAY: {
            let actionTyped = <QuickSearchRedux.QuickSearchSetDisplayAction>action;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.QuickSearchStrategyId,
              action: action.type,
              info: actionTyped.DisplayAction,
              data: state.QuickSearch,
            };

            adaptableBlotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }
          case QuickSearchRedux.QUICK_SEARCH_SET_STYLE: {
            let actionTyped = <QuickSearchRedux.QuickSearchSetStyleAction>action;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.QuickSearchStrategyId,
              action: action.type,
              info: actionTyped.style.ClassName,
              data: state.QuickSearch,
            };

            adaptableBlotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }
          case PlusMinusRedux.PLUS_MINUS_APPLY: {
            let actionTyped = <PlusMinusRedux.PlusMinusApplyAction>action;
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.PlusMinusStrategyId,
              action: action.type,
              info: 'KeyPressed:',
              data: actionTyped.CellInfos,
            };

            adaptableBlotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case ThemeRedux.THEME_SELECT: {
            let actionTyped = <ThemeRedux.ThemeSelectAction>action;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.ThemeStrategyId,
              action: action.type,
              info: CURRENT_THEME_STATE_PROPERTY,
              data: actionTyped.Theme,
            };
            adaptableBlotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case ColumnFilterRedux.COLUMN_FILTER_ADD: {
            let actionTyped = <ColumnFilterRedux.ColumnFilterAddAction>action;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.ColumnFilterStrategyId,
              action: action.type,
              info: 'Column Filter Applied',
              data: {
                Column: actionTyped.columnFilter.ColumnId,
                ColumnFilter: ExpressionHelper.ConvertExpressionToString(
                  actionTyped.columnFilter.Filter,
                  middlewareAPI.getState().Grid.Columns
                ),
              },
            };
            adaptableBlotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }
          case ColumnFilterRedux.COLUMN_FILTER_EDIT: {
            let actionTyped = <ColumnFilterRedux.ColumnFilterEditAction>action;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.ColumnFilterStrategyId,
              action: action.type,
              info: 'Column Filter Updated',
              data: {
                Column: actionTyped.columnFilter.ColumnId,
                ColumnFilter: ExpressionHelper.ConvertExpressionToString(
                  actionTyped.columnFilter.Filter,
                  middlewareAPI.getState().Grid.Columns
                ),
              },
            };

            adaptableBlotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case ColumnFilterRedux.COLUMN_FILTER_CLEAR: {
            let actionTyped = <ColumnFilterRedux.ColumnFilterClearAction>action;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.ColumnFilterStrategyId,
              action: action.type,
              info: 'Column Filter Cleared',
              data: {
                Column: actionTyped.columnFilter,
              },
            };

            adaptableBlotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          default: {
            // not one of the functions we log so nothing to do
            return next(action);
          }
        }
      };
    };
  };

// this is the main function for dealing with Redux Actions which require additional functionality to be triggered.
// Please document each use case where we have to use the Store
var adaptableBlotterMiddleware = (blotter: IAdaptableBlotter): any =>
  function(middlewareAPI: Redux.MiddlewareAPI<AdaptableBlotterState>) {
    return function(next: Redux.Dispatch<AdaptableBlotterState>) {
      return function(action: Redux.Action) {
        switch (action.type) {
          /*******************
           * ADVANCED SEARCH ACTIONS
           *******************/

          /**
           * Use Case: User has selected an Advanced Search
           * Action: Apply Grid Filtering
           */
          case AdvancedSearchRedux.ADVANCED_SEARCH_SELECT: {
            let ret = next(action);
            blotter.applyGridFiltering();
            return ret;
          }

          /**
           * Use Case: User has deleted an Advanced Search
           * Action: If the deleted Advanced Search was the currently selected one: Apply Grid Filtering
           */
          case AdvancedSearchRedux.ADVANCED_SEARCH_DELETE: {
            let actionTyped = <AdvancedSearchRedux.AdvancedSearchDeleteAction>action;
            let CurrentAdvancedSearch = middlewareAPI.getState().AdvancedSearch
              .CurrentAdvancedSearch;
            let ret = next(action);
            if (CurrentAdvancedSearch == actionTyped.advancedSearch.Name) {
              blotter.applyGridFiltering();
            }
            return ret;
          }

          /*******************
           * CALCULATED COLUMN ACTIONS
           *******************/

          /**
           * Use Case: User is creating a calculated column and want to check if its valid
           * Action: If it is valid, then clear any error; otherwise set one
           */
          case SystemRedux.CALCULATEDCOLUMN_IS_EXPRESSION_VALID: {
            let returnObj = blotter.CalculatedColumnExpressionService.IsExpressionValid(
              (<SystemRedux.CalculatedColumnIsExpressionValidAction>action).expression
            );
            if (!returnObj.IsValid) {
              middlewareAPI.dispatch(
                SystemRedux.CalculatedColumnSetErrorMessage(returnObj.ErrorMsg)
              );
            } else {
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
            let calculatedColumn: CalculatedColumn = (<
              CalculatedColumnRedux.CalculatedColumnAddAction
            >action).calculatedColumn;
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
            let actionTyped = <CalculatedColumnRedux.CalculatedColumnDeleteAction>action;
            let columnsLocalLayout = middlewareAPI.getState().Grid.Columns;

            blotter.removeCalculatedColumnFromGrid(actionTyped.calculatedColumn.ColumnId);
            // do we need this?
            let test = columnsLocalLayout.filter(
              col => col.ColumnId !== actionTyped.calculatedColumn.ColumnId
            );
            middlewareAPI.dispatch(SystemRedux.SetNewColumnListOrder(test));
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
            let actionTyped = <CalculatedColumnRedux.CalculatedColumnEditAction>action;
            let columnsLocalLayout = middlewareAPI.getState().Grid.Columns;
            blotter.editCalculatedColumnInGrid(actionTyped.calculatedColumn);
            middlewareAPI.dispatch(SystemRedux.SetNewColumnListOrder(columnsLocalLayout));
            let returnAction = next(action);
            return returnAction;
          }

          /*******************
           * FREE TEXT COLUMN ACTIONS
           *******************/
          case FreeTextColumnRedux.FREE_TEXT_COLUMN_ADD: {
            let returnAction = next(action);
            let freeTextColumn: FreeTextColumn = (<FreeTextColumnRedux.FreeTextColumnAddAction>(
              action
            )).freeTextColumn;
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
            let actionTyped = <ColumnCategoryRedux.ColumnCategoryDeleteAction>action;
            let conditionalStyleState = middlewareAPI.getState().ConditionalStyle;
            conditionalStyleState.ConditionalStyles.forEach((cs: ConditionalStyle) => {
              if (cs.ColumnCategoryId == actionTyped.columnCategory.ColumnCategoryId) {
                // some warning?
                middlewareAPI.dispatch(ConditionalStyleRedux.ConditionalStyleDelete(cs));
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
            middlewareAPI.dispatch(SystemRedux.ChartSetChartVisibility(ChartVisibility.Hidden));
            return returnAction;
          }

          /**
           * Use Case: User clears the currrent chart
           * Action:  Set chart visibility to hidden
           */
          case ChartRedux.CHART_DEFINITION_SELECT: {
            let actionTyped = <ChartRedux.ChartDefinitionSelectAction>action;
            if (StringExtensions.IsNullOrEmpty(actionTyped.chartName)) {
              middlewareAPI.dispatch(SystemRedux.ChartSetChartVisibility(ChartVisibility.Hidden));
            }
            let returnAction = next(action);
            return returnAction;
          }

          /**
           * Use Case: User sets chart visibility to Maximised (probably from the Chart popup by showing a chart)
           * Action:  Close all popups (so that user directly sees the chart)
           */
          case SystemRedux.CHART_SET_CHART_VISIBILITY: {
            let actionTyped = <SystemRedux.ChartSetChartVisibiityAction>action;
            if (actionTyped.ChartVisibility == ChartVisibility.Maximised) {
              middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
            }
            return next(action);
          }

          /*******************
           * LAYOUT ACTIONS
           *******************/
          case LayoutRedux.LAYOUT_SELECT: {
            let returnAction = next(action);
            let layoutState = middlewareAPI.getState().Layout;
            let currentLayout = layoutState.Layouts.find(l => l.Name == layoutState.CurrentLayout);
            if (currentLayout) {
              let gridState: GridState = middlewareAPI.getState().Grid;
              // set columns
              let blotterColumns: IColumn[] = [];
              currentLayout.Columns.forEach(c => {
                let column = ColumnHelper.getColumnFromId(c, gridState.Columns);
                if (column) {
                  blotterColumns.push(column);
                } else {
                  LoggingHelper.LogAdaptableBlotterWarning(
                    "Column '" + c + "' not found while selecting layout: " + currentLayout
                  );
                }
              });
              middlewareAPI.dispatch(SystemRedux.SetNewColumnListOrder(blotterColumns));
              // set sort
              middlewareAPI.dispatch(GridRedux.GridSetSort(currentLayout.ColumnSorts));
              blotter.setColumnSort(currentLayout.ColumnSorts);
              // set vendor specific info
              blotter.setVendorGridState(currentLayout.VendorGridInfo);
            }
            return returnAction;
          }
          case LayoutRedux.LAYOUT_DELETE: {
            let returnAction = next(action);
            let layoutState = middlewareAPI.getState().Layout;
            let currentLayout = layoutState.Layouts.find(l => l.Name == layoutState.CurrentLayout);
            if (!currentLayout) {
              // we have deleted the current layout (allowed) so lets make the layout default
              middlewareAPI.dispatch(LayoutRedux.LayoutSelect(DEFAULT_LAYOUT));
            }
            return returnAction;
          }
          case LayoutRedux.LAYOUT_SAVE: {
            let returnAction = next(action);
            let actionTyped = <LayoutRedux.LayoutSaveAction>action;
            let layout: Layout = Helper.cloneObject(actionTyped.layout);

            let forceFetch = layout.Name == DEFAULT_LAYOUT;
            layout.VendorGridInfo = blotter.getVendorGridState(layout.Columns, forceFetch);
            let layoutState = middlewareAPI.getState().Layout;
            let isExistingLayout: boolean =
              layoutState.Layouts.find(l => l.Uuid == actionTyped.layout.Uuid) != null;

            // if its default layout then we need to use the id for that one to prevent 2 layouts being created
            // - this is all a bit messy and needs refactoring
            if (layout.Name == DEFAULT_LAYOUT) {
              let currentDefaultLayout = layoutState.Layouts.find(l => l.Name == DEFAULT_LAYOUT);
              if (currentDefaultLayout) {
                layout.Uuid = currentDefaultLayout.Uuid;
                isExistingLayout = true;
              }
            }

            if (isExistingLayout) {
              middlewareAPI.dispatch(LayoutRedux.LayoutEdit(layout));
            } else {
              middlewareAPI.dispatch(LayoutRedux.LayoutAdd(layout));
            }
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
            let SmartEditStrategy = <ISmartEditStrategy>(
              blotter.strategies.get(StrategyConstants.SmartEditStrategyId)
            );
            let state = middlewareAPI.getState();
            let returnAction = next(action);
            let apiReturn: IStrategyActionReturn<
              boolean
            > = SmartEditStrategy.CheckCorrectCellSelection();

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
            } else {
              middlewareAPI.dispatch(SystemRedux.SmartEditSetValidSelection(true));
              let apiPreviewReturn = SmartEditStrategy.BuildPreviewValues(
                state.SmartEdit.SmartEditValue,
                state.SmartEdit.MathOperation as MathOperation
              );
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

            let SmartEditStrategy = <ISmartEditStrategy>(
              blotter.strategies.get(StrategyConstants.SmartEditStrategyId)
            );
            let state = middlewareAPI.getState();
            let apiReturn = SmartEditStrategy.BuildPreviewValues(
              state.SmartEdit.SmartEditValue,
              state.SmartEdit.MathOperation as MathOperation
            );
            middlewareAPI.dispatch(SystemRedux.SmartEditSetPreview(apiReturn));
            return returnAction;
          }

          /**
           * Use Case: User has clicked 'Apply' in Smart Edit popup or toolbar
           * Action (1):  Gets the values that need to be applied from the Preview Info and passes to Preview Helper (incl. whether to bypass validation)
           * Action (2):  Sends these new values to the Smart Edit Strategy (which will, in turn, apply them to the Blotter)
           */
          case SmartEditRedux.SMARTEDIT_APPLY: {
            let SmartEditStrategy = <ISmartEditStrategy>(
              blotter.strategies.get(StrategyConstants.SmartEditStrategyId)
            );
            let actionTyped = <SmartEditRedux.SmartEditApplyAction>action;
            let thePreview = middlewareAPI.getState().System.SmartEditPreviewInfo;
            let newValues = PreviewHelper.GetCellInfosFromPreview(
              thePreview,
              actionTyped.bypassCellValidationWarnings
            );
            SmartEditStrategy.ApplySmartEdit(newValues);
            middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
            return next(action);
          }

          /*******************
           * BULK UPDATE ACTIONS
           *******************/
          case SystemRedux.BULK_UPDATE_CHECK_CELL_SELECTION: {
            let BulkUpdateStrategy = <IBulkUpdateStrategy>(
              blotter.strategies.get(StrategyConstants.BulkUpdateStrategyId)
            );
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
              let apiPreviewReturn = BulkUpdateStrategy.BuildPreviewValues(
                state.BulkUpdate.BulkUpdateValue
              );
              middlewareAPI.dispatch(SystemRedux.BulkUpdateSetPreview(apiPreviewReturn));
            }
            return returnAction;
          }

          // Here we have all actions that triggers a refresh of the BulkUpdatePreview
          case BulkUpdateRedux.BULK_UPDATE_CHANGE_VALUE: {
            //all our logic needs to be executed AFTER the main reducers
            //so our state is up to date which allow us not to care about the data within each different action
            let returnAction = next(action);

            let BulkUpdateStrategy = <IBulkUpdateStrategy>(
              blotter.strategies.get(StrategyConstants.BulkUpdateStrategyId)
            );
            let state = middlewareAPI.getState();

            let apiReturn = BulkUpdateStrategy.BuildPreviewValues(state.BulkUpdate.BulkUpdateValue);
            middlewareAPI.dispatch(SystemRedux.BulkUpdateSetPreview(apiReturn));
            return returnAction;
          }

          case BulkUpdateRedux.BULK_UPDATE_APPLY: {
            let BulkUpdateStrategy = <IBulkUpdateStrategy>(
              blotter.strategies.get(StrategyConstants.BulkUpdateStrategyId)
            );
            let actionTyped = <BulkUpdateRedux.BulkUpdateApplyAction>action;
            let thePreview = middlewareAPI.getState().System.BulkUpdatePreviewInfo;
            let newValues = PreviewHelper.GetCellInfosFromPreview(
              thePreview,
              actionTyped.bypassCellValidationWarnings
            );
            BulkUpdateStrategy.ApplyBulkUpdate(newValues);
            middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
            return next(action);
          }

          /*******************
           * PLUS MINUS ACTIONS
           *******************/

          case PlusMinusRedux.PLUS_MINUS_APPLY: {
            // This is for the very rare use case that a Plus Minus breaks validation and the user wants to continue
            // in which case we just need to apply the values to the Grid
            let actionTyped = <PlusMinusRedux.PlusMinusApplyAction>action;
            if (ArrayExtensions.IsNotNullOrEmpty(actionTyped.CellInfos)) {
              blotter.setValueBatch(actionTyped.CellInfos);
            }
            middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
            return next(action);
          }

          /*******************
           * EXPORT ACTIONS
           *******************/

          case ExportRedux.EXPORT_APPLY: {
            let exportStrategy = <IExportStrategy>(
              blotter.strategies.get(StrategyConstants.ExportStrategyId)
            );
            let actionTyped = <ExportRedux.ExportApplyAction>action;
            if (
              actionTyped.ExportDestination == ExportDestination.iPushPull &&
              iPushPullHelper.getIPPStatus() != iPushPullHelper.ServiceStatus.Connected
            ) {
              middlewareAPI.dispatch(
                PopupRedux.PopupShowScreen(
                  StrategyConstants.ExportStrategyId,
                  'IPushPullLogin',
                  actionTyped.Report.Name
                )
              );
            } else if (
              actionTyped.ExportDestination == ExportDestination.iPushPull &&
              !actionTyped.Folder
            ) {
              iPushPullHelper
                .GetDomainPages(blotter.blotterOptions.iPushPullConfig.api_key)
                .then((domainpages: IPPDomain[]) => {
                  middlewareAPI.dispatch(SystemRedux.SetIPPDomainPages(domainpages));
                  middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(''));
                })
                .catch((err: any) => {
                  middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(err));
                });
              middlewareAPI.dispatch(
                PopupRedux.PopupShowScreen(
                  StrategyConstants.ExportStrategyId,
                  'IPushPullDomainPageSelector',
                  actionTyped.Report.Name
                )
              );
            } else if (actionTyped.ExportDestination == ExportDestination.iPushPull) {
              exportStrategy.Export(
                actionTyped.Report,
                actionTyped.ExportDestination,
                actionTyped.Folder,
                actionTyped.Page
              );
              middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
            } else {
              exportStrategy.Export(actionTyped.Report, actionTyped.ExportDestination);
              middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
            }
            return next(action);
          }

          case ExportRedux.IPP_LOGIN: {
            let actionTyped = <ExportRedux.IPPLoginAction>action;
            iPushPullHelper
              .Login(actionTyped.Login, actionTyped.Password)
              .then(() => {
                let report = middlewareAPI.getState().Popup.ScreenPopup.Params;
                middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(''));
                iPushPullHelper
                  .GetDomainPages(blotter.blotterOptions.iPushPullConfig.api_key)
                  .then((domainpages: IPPDomain[]) => {
                    middlewareAPI.dispatch(SystemRedux.SetIPPDomainPages(domainpages));
                    middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(''));
                  })
                  .catch((error: any) => {
                    middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(error));
                  });
                middlewareAPI.dispatch(
                  PopupRedux.PopupShowScreen(
                    StrategyConstants.ExportStrategyId,
                    'IPushPullDomainPageSelector',
                    report
                  )
                );
              })
              .catch((error: string) => {
                LoggingHelper.LogAdaptableBlotterError('Login failed', error);
                middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(error));
              });
            return next(action);
          }
          case SystemRedux.REPORT_STOP_LIVE: {
            let actionTyped = <SystemRedux.ReportStopLiveAction>action;
            if (actionTyped.ExportDestination == ExportDestination.iPushPull) {
              let currentLiveReports = middlewareAPI.getState().System.CurrentLiveReports;
              let lre = currentLiveReports.find(
                x =>
                  x.Report == actionTyped.Report &&
                  x.ExportDestination == actionTyped.ExportDestination
              );
              iPushPullHelper.UnloadPage(lre.WorkbookName);
            }
            return next(action);
          }

          /*******************
           * USER FILTER ACTIONS
           *******************/
          case UserFilterRedux.USER_FILTER_CREATE_FROM_COLUMN_FILTER: {
            let actionTyped = <UserFilterRedux.CreateUserFilterFromColumnFilterAction>action;
            // first create a new user filter based on the column filter and input name
            let userFilter: UserFilter = ObjectFactory.CreateUserFilterFromColumnFilter(
              actionTyped.ColumnFilter,
              actionTyped.InputText
            );
            middlewareAPI.dispatch(UserFilterRedux.UserFilterAdd(userFilter));

            // then update a new column filter from the user filter - so that it will display the user filter name
            let columnFilter: ColumnFilter = actionTyped.ColumnFilter;
            columnFilter.Filter = ExpressionHelper.CreateSingleColumnExpression(
              userFilter.ColumnId,
              [],
              [],
              [userFilter.Name],
              []
            );
            middlewareAPI.dispatch(ColumnFilterRedux.ColumnFilterEdit(columnFilter));

            return next(action);
          }

          /*******************
           * TEAM SHARING ACTIONS
           *******************/

          // Use case - an item needs to be shared between teams
          case TeamSharingRedux.TEAMSHARING_SHARE: {
            let actionTyped = <TeamSharingRedux.TeamSharingShareAction>action;
            let returnAction = next(action);
            let xhr = new XMLHttpRequest();
            xhr.onerror = (ev: any) =>
              LoggingHelper.LogAdaptableBlotterError(
                'TeamSharing share error :' + ev.message,
                actionTyped.Entity
              );
            xhr.ontimeout = () =>
              LoggingHelper.LogAdaptableBlotterWarning(
                'TeamSharing share timeout',
                actionTyped.Entity
              );
            xhr.onload = () => {
              if (xhr.readyState == 4) {
                if (xhr.status != 200) {
                  LoggingHelper.LogAdaptableBlotterError(
                    'TeamSharing share error : ' + xhr.statusText,
                    actionTyped.Entity
                  );
                  middlewareAPI.dispatch(
                    PopupRedux.PopupShowAlert({
                      Header: 'Team Sharing Error',
                      Msg: "Couldn't share item: " + xhr.statusText,
                      MessageType: MessageType.Error,
                      ShowAsPopup: true,
                    })
                  );
                } else {
                  middlewareAPI.dispatch(
                    PopupRedux.PopupShowAlert({
                      Header: 'Team Sharing',
                      Msg: 'Item Shared Successfully',
                      MessageType: MessageType.Info,
                      ShowAsPopup: true,
                    })
                  );
                }
              }
            };
            //we make the request async
            xhr.open('POST', configServerTeamSharingUrl, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            let obj: ISharedEntity = {
              entity: actionTyped.Entity,
              user: blotter.blotterOptions.userName,
              blotter_id: blotter.blotterOptions.blotterId,
              strategy: actionTyped.Strategy,
              timestamp: new Date(),
            };
            xhr.send(JSON.stringify(obj));
            return returnAction;
          }
          case TeamSharingRedux.TEAMSHARING_GET: {
            let returnAction = next(action);
            let xhr = new XMLHttpRequest();
            xhr.onerror = (ev: any) =>
              LoggingHelper.LogAdaptableBlotterError('TeamSharing get error :' + ev.message);
            xhr.ontimeout = () =>
              LoggingHelper.LogAdaptableBlotterWarning('TeamSharing get timeout');
            xhr.onload = () => {
              if (xhr.readyState == 4) {
                if (xhr.status != 200) {
                  LoggingHelper.LogAdaptableBlotterError(
                    'TeamSharing get error : ' + xhr.statusText
                  );
                } else {
                  middlewareAPI.dispatch(
                    TeamSharingRedux.TeamSharingSet(
                      JSON.parse(xhr.responseText, (key, value) => {
                        if (key == 'timestamp') {
                          return new Date(value);
                        }
                        return value;
                      })
                    )
                  );
                }
              }
            };
            //we make the request async
            xhr.open('GET', configServerTeamSharingUrl, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send();
            return returnAction;
          }
          case TeamSharingRedux.TEAMSHARING_IMPORT_ITEM: {
            let returnAction = next(action);
            let actionTyped = <TeamSharingRedux.TeamSharingImportItemAction>action;
            let importAction: Redux.Action;
            let overwriteConfirmation = false;
            switch (actionTyped.Strategy) {
              case StrategyConstants.CellValidationStrategyId:
                importAction = CellValidationRedux.CellValidationAdd(
                  actionTyped.Entity as CellValidationRule
                );
                break;
              case StrategyConstants.CalculatedColumnStrategyId: {
                let calcCol = actionTyped.Entity as CalculatedColumn;
                let idx = middlewareAPI
                  .getState()
                  .CalculatedColumn.CalculatedColumns.findIndex(
                    x => x.ColumnId == calcCol.ColumnId
                  );
                if (idx > -1) {
                  overwriteConfirmation = true;
                  importAction = CalculatedColumnRedux.CalculatedColumnEdit(calcCol);
                } else {
                  importAction = CalculatedColumnRedux.CalculatedColumnAdd(calcCol);
                }
                break;
              }
              case StrategyConstants.ConditionalStyleStrategyId:
                importAction = ConditionalStyleRedux.ConditionalStyleAdd(
                  actionTyped.Entity as ConditionalStyle
                );
                break;
              case StrategyConstants.CustomSortStrategyId: {
                let customSort = actionTyped.Entity as CustomSort;
                if (
                  middlewareAPI
                    .getState()
                    .CustomSort.CustomSorts.find(x => x.ColumnId == customSort.ColumnId)
                ) {
                  overwriteConfirmation = true;
                  importAction = CustomSortRedux.CustomSortEdit(customSort);
                } else {
                  importAction = CustomSortRedux.CustomSortAdd(customSort);
                }
                break;
              }
              case StrategyConstants.FormatColumnStrategyId: {
                let formatColumn = actionTyped.Entity as FormatColumn;
                if (
                  middlewareAPI
                    .getState()
                    .FormatColumn.FormatColumns.find(x => x.ColumnId == formatColumn.ColumnId)
                ) {
                  overwriteConfirmation = true;
                  importAction = FormatColumnRedux.FormatColumnEdit(formatColumn);
                } else {
                  importAction = FormatColumnRedux.FormatColumnAdd(formatColumn);
                }
                break;
              }
              case StrategyConstants.PlusMinusStrategyId: {
                let plusMinus = actionTyped.Entity as PlusMinusRule;
                importAction = PlusMinusRedux.PlusMinusRuleAdd(plusMinus);
                break;
              }
              case StrategyConstants.ShortcutStrategyId: {
                let shortcut = actionTyped.Entity as Shortcut;
                let shortcuts: Shortcut[];
                shortcuts = middlewareAPI.getState().Shortcut.Shortcuts;
                if (shortcuts) {
                  if (shortcuts.find(x => x.ShortcutKey == shortcut.ShortcutKey)) {
                    let index: number = shortcuts.findIndex(
                      si => si.ShortcutKey == shortcut.ShortcutKey
                    );
                    middlewareAPI.dispatch(ShortcutRedux.ShortcutDelete(shortcut));
                  }
                  importAction = ShortcutRedux.ShortcutAdd(shortcut);
                }
                break;
              }
              case StrategyConstants.UserFilterStrategyId: {
                let filter = actionTyped.Entity as UserFilter;
                //For now not too worry about that but I think we'll need to check ofr filter that have same name
                //currently the reducer checks for UID
                if (
                  middlewareAPI.getState().UserFilter.UserFilters.find(x => x.Name == filter.Name)
                ) {
                  overwriteConfirmation = true;
                }
                importAction = UserFilterRedux.UserFilterAdd(filter);
                // }
                break;
              }
              case StrategyConstants.AdvancedSearchStrategyId: {
                let search = actionTyped.Entity as AdvancedSearch;
                if (
                  middlewareAPI
                    .getState()
                    .AdvancedSearch.AdvancedSearches.find(x => x.Name == search.Name)
                ) {
                  overwriteConfirmation = true;
                }
                importAction = AdvancedSearchRedux.AdvancedSearchAdd(search);
                break;
              }
              case StrategyConstants.LayoutStrategyId: {
                let layout = actionTyped.Entity as Layout;
                let layoutIndex: number = middlewareAPI
                  .getState()
                  .Layout.Layouts.findIndex(x => x.Name == layout.Name);
                if (layoutIndex != -1) {
                  overwriteConfirmation = true;
                }
                importAction = LayoutRedux.LayoutSave(layout);
                break;
              }
              case StrategyConstants.ExportStrategyId: {
                let report = actionTyped.Entity as Report;
                let idx = middlewareAPI
                  .getState()
                  .Export.Reports.findIndex(x => x.Name == report.Name);
                if (idx > -1) {
                  overwriteConfirmation = true;
                }
                importAction = ExportRedux.ReportAdd(report);
                break;
              }
            }
            if (overwriteConfirmation) {
              let confirmation: IUIConfirmation = {
                CancelButtonText: 'Cancel Import',
                Header: 'Overwrite Config',
                Msg: 'This item will overwrite one of your config. Do you want to continue?',
                ConfirmButtonText: 'Import',
                CancelAction: null,
                ConfirmAction: importAction,
                ShowInputBox: false,
                MessageType: MessageType.Warning,
              };
              middlewareAPI.dispatch(PopupRedux.PopupShowConfirmation(confirmation));
            } else if (importAction) {
              middlewareAPI.dispatch(importAction);
              middlewareAPI.dispatch(
                PopupRedux.PopupShowAlert({
                  Header: 'Team Sharing',
                  Msg: 'Item Successfully Imported',
                  MessageType: MessageType.Info,
                  ShowAsPopup: true,
                })
              );
            } else {
              LoggingHelper.LogAdaptableBlotterError('Unknown item type', actionTyped.Entity);
              middlewareAPI.dispatch(
                PopupRedux.PopupShowAlert({
                  Header: 'Team Sharing Error:',
                  Msg: 'Item not recognized. Cannot import',
                  MessageType: MessageType.Error,
                  ShowAsPopup: true,
                })
              );
            }
            return returnAction;
          }

          case SystemRedux.SET_NEW_COLUMN_LIST_ORDER:
            let actionTyped = <SystemRedux.SetNewColumnListOrderAction>action;
            blotter.setNewColumnListOrder(actionTyped.VisibleColumnList);
            return next(action);

          /*******************
           * GRID (INTERNAL) ACTIONS
           *******************/
          case GridRedux.GRID_SET_VALUE_LIKE_EDIT: {
            let actionTyped = <GridRedux.GridSetValueLikeEditAction>action;
            blotter.setValue(actionTyped.CellInfo);
            return next(action);
          }
          case GridRedux.GRID_HIDE_COLUMN: {
            let actionTyped = <GridRedux.GridHideColumnAction>action;
            let columnList = [].concat(
              middlewareAPI.getState().Grid.Columns.filter(c => c.Visible)
            );
            let columnIndex = columnList.findIndex(x => x.ColumnId == actionTyped.ColumnId);
            columnList.splice(columnIndex, 1);
            blotter.setNewColumnListOrder(columnList);
            return next(action);
          }
          case GridRedux.GRID_SELECT_COLUMN: {
            let actionTyped = <GridRedux.GridSelectColumnAction>action;
            blotter.selectColumn(actionTyped.ColumnId);
            return next(action);
          }
          case GridRedux.GRID_CREATE_CELLS_SUMMARY: {
            let SelectedCellsStrategy = <ICellSummaryStrategy>(
              blotter.strategies.get(StrategyConstants.CellSummaryStrategyId)
            );
            let returnAction = next(action);
            let selectedCellInfo = middlewareAPI.getState().Grid.SelectedCellInfo;
            let apiSummaryReturn: ICellSummmary = SelectedCellsStrategy.CreateCellSummary(
              selectedCellInfo
            );
            middlewareAPI.dispatch(GridRedux.GridSetCellSummary(apiSummaryReturn));
            return returnAction;
          }

          /*******************
           * POPUP (INTERNAL) ACTIONS
           *******************/
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
          case GridRedux.GRID_QUICK_FILTER_BAR_SHOW: {
            blotter.showQuickFilter();
            return next(action);
          }

          case GridRedux.GRID_QUICK_FILTER_BAR_HIDE: {
            blotter.hideQuickFilter();
            return next(action);
          }

          case GridRedux.FILTER_FORM_HIDE: {
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

            let gridState: GridState = middlewareAPI.getState().Grid;
            let layoutState: LayoutState = middlewareAPI.getState().Layout;
            let visibleColumnNames = gridState.Columns.filter(c => c.Visible).map(c => c.ColumnId);

            //create the default layout (if not there) so we can revert to it if needed
            let currentLayout = DEFAULT_LAYOUT;
            let defaultLayout: Layout = ObjectFactory.CreateLayout(
              gridState.Columns,
              [],
              blotter.getVendorGridState(visibleColumnNames, true),
              DEFAULT_LAYOUT
            );
            middlewareAPI.dispatch(LayoutRedux.LayoutSave(defaultLayout));
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

            //Create all action columns before we load the layout
            middlewareAPI.getState().ActionColumn.ActionColumns.forEach(ac => {
              blotter.addActionColumnToGrid(ac);
            });

            //load the default layout if its current
            if (currentLayout == DEFAULT_LAYOUT) {
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

export function getNonPersistedReduxActions(): string[] {
  return [
    RESET_STATE,
    INIT_STATE,
    LOAD_STATE,

    SystemRedux.SYSTEM_SET_HEALTH_STATUS,
    SystemRedux.SYSTEM_CLEAR_HEALTH_STATUS,
    SystemRedux.SYSTEM_ALERT_ADD,
    SystemRedux.SYSTEM_ALERT_DELETE,
    SystemRedux.SYSTEM_ALERT_DELETE_ALL,

    SystemRedux.REPORT_START_LIVE,
    SystemRedux.REPORT_STOP_LIVE,
    SystemRedux.SET_IPP_DOMAIN_PAGES,
    SystemRedux.REPORT_SET_ERROR_MESSAGE,

    SystemRedux.SMARTEDIT_CHECK_CELL_SELECTION,
    SystemRedux.SMARTEDIT_FETCH_PREVIEW,
    SystemRedux.SMARTEDIT_SET_VALID_SELECTION,
    SystemRedux.SMARTEDIT_SET_PREVIEW,

    SystemRedux.BULK_UPDATE_CHECK_CELL_SELECTION,
    SystemRedux.BULK_UPDATE_SET_VALID_SELECTION,
    SystemRedux.BULK_UPDATE_SET_PREVIEW,

    SystemRedux.CHART_SET_CHART_DATA,
    SystemRedux.CHART_SET_CHART_VISIBILITY,

    SystemRedux.CALCULATEDCOLUMN_SET_ERROR_MESSAGE,
    SystemRedux.CALCULATEDCOLUMN_IS_EXPRESSION_VALID,

    SystemRedux.QUICK_SEARCH_SET_RANGE,
    SystemRedux.QUICK_SEARCH_CLEAR_RANGE,
    SystemRedux.QUICK_SEARCH_SET_VISIBLE_COLUMN_EXPRESSIONS,
    SystemRedux.QUICK_SEARCH_CLEAR_VISIBLE_COLUMN_EXPRESSIONS,

    SystemRedux.SET_NEW_COLUMN_LIST_ORDER,

    GridRedux.GRID_SET_COLUMNS,
    GridRedux.GRID_ADD_COLUMN,
    GridRedux.GRID_EDIT_COLUMN,
    GridRedux.GRID_HIDE_COLUMN,
    GridRedux.GRID_SET_VALUE_LIKE_EDIT,
    GridRedux.GRID_SELECT_COLUMN,
    GridRedux.GRID_SET_SORT,
    GridRedux.GRID_SET_SELECTED_CELLS,
    GridRedux.GRID_CREATE_CELLS_SUMMARY,
    GridRedux.GRID_SET_CELLS_SUMMARY,
    GridRedux.GRID_QUICK_FILTER_BAR_SHOW,
    GridRedux.GRID_QUICK_FILTER_BAR_HIDE,

    MenuRedux.SET_MENUITEMS,
    MenuRedux.BUILD_COLUMN_CONTEXT_MENU,
    MenuRedux.ADD_ITEM_COLUMN_CONTEXT_MENU,
    MenuRedux.CLEAR_COLUMN_CONTEXT_MENU,

    PopupRedux.POPUP_SHOW_SCREEN,
    PopupRedux.POPUP_HIDE_SCREEN,
    PopupRedux.POPUP_SHOW_LOADING,
    PopupRedux.POPUP_HIDE_LOADING,
    PopupRedux.POPUP_SHOW_ABOUT,
    PopupRedux.POPUP_HIDE_ABOUT,
    PopupRedux.POPUP_SHOW_ALERT,
    PopupRedux.POPUP_HIDE_ALERT,
    PopupRedux.POPUP_SHOW_PROMPT,
    PopupRedux.POPUP_HIDE_PROMPT,
    PopupRedux.POPUP_CONFIRM_PROMPT,
    PopupRedux.POPUP_SHOW_CONFIRMATION,
    PopupRedux.POPUP_CONFIRM_CONFIRMATION,
    PopupRedux.POPUP_CANCEL_CONFIRMATION,
    PopupRedux.POPUP_CLEAR_PARAM,
  ];
}

export function getFunctionAppliedReduxActions(): string[] {
  // NOTE: We have an issue with how we have built Smart Edit and Bulk Update that we are not able to capture the Apply
  // Due to poor coding the Apply method only has warnings
  // As few users currently audit functions and few have editable grids its not an urgent problemb but one that we should fix

  // We need to add:  Chart, Pie Chart, Custom Sort ???, Export, Layout
  return [
    AdvancedSearchRedux.ADVANCED_SEARCH_SELECT,
    CalendarRedux.CALENDAR_SELECT,
    ChartRedux.CHART_DEFINITION_SELECT,
    DataSourceRedux.DATA_SOURCE_SELECT,
    ExportRedux.EXPORT_APPLY,
    FreeTextColumnRedux.FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE,
    FlashingCellsRedux.FLASHING_CELL_SELECT,
    FlashingCellsRedux.FLASHING_CELL_SELECT_ALL,
    QuickSearchRedux.QUICK_SEARCH_APPLY,
    QuickSearchRedux.QUICK_SEARCH_SET_DISPLAY,
    QuickSearchRedux.QUICK_SEARCH_SET_STYLE,
    PlusMinusRedux.PLUS_MINUS_APPLY,
    ThemeRedux.THEME_SELECT,
    ColumnFilterRedux.COLUMN_FILTER_ADD,
    ColumnFilterRedux.COLUMN_FILTER_EDIT,
    ColumnFilterRedux.COLUMN_FILTER_CLEAR,
  ];
}

export function getPrimaryStateReduxActions(): string[] {
  return [RESET_STATE, INIT_STATE];
}
