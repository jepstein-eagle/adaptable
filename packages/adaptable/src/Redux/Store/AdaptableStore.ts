import {
  ExportDestination,
  MathOperation,
  MessageType,
  LiveReportTrigger,
} from '../../PredefinedConfig/Common/Enums';
import * as Redux from 'redux';
import * as DeepDiff from 'deep-diff';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEngine as createEngineRemote } from './AdaptableReduxRemoteStorageEngine';
import { createEngine as createEngineLocal } from './AdaptableReduxLocalStorageEngine';
import { mergeReducer } from './AdaptableReduxMerger';

import * as PopupRedux from '../ActionsReducers/PopupRedux';
import * as PluginsRedux from '../ActionsReducers/PluginsRedux';
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
import * as UpdatedRowRedux from '../ActionsReducers/UpdatedRowRedux';
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
import * as ApplicationRedux from '../ActionsReducers/ApplicationRedux';
import * as SparklineColumnRedux from '../ActionsReducers/SparklineColumnRedux';
import * as FreeTextColumnRedux from '../ActionsReducers/FreeTextColumnRedux';
import * as LayoutRedux from '../ActionsReducers/LayoutRedux';
import * as NamedFilterRedux from '../ActionsReducers/NamedFilterRedux';
import * as ColumnCategoryRedux from '../ActionsReducers/ColumnCategoryRedux';
import * as DashboardRedux from '../ActionsReducers/DashboardRedux';
import * as ToolPanelRedux from '../ActionsReducers/ToolPanelRedux';
import * as CellValidationRedux from '../ActionsReducers/CellValidationRedux';
import * as PercentBarRedux from '../ActionsReducers/PercentBarRedux';
import * as EntitlementsRedux from '../ActionsReducers/EntitlementsRedux';
import * as CellSummaryRedux from '../ActionsReducers/CellSummaryRedux';
import * as SystemStatusRedux from '../ActionsReducers/SystemStatusRedux';
import * as TeamSharingRedux from '../ActionsReducers/TeamSharingRedux';
import * as UserInterfaceRedux from '../ActionsReducers/UserInterfaceRedux';
import * as PartnerRedux from '../ActionsReducers/PartnerRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { ISmartEditStrategy } from '../../Strategy/Interface/ISmartEditStrategy';
import {
  IBulkUpdateStrategy,
  BulkUpdateValidationResult,
} from '../../Strategy/Interface/IBulkUpdateStrategy';
import { IExportStrategy } from '../../Strategy/Interface/IExportStrategy';
import { SharedEntity } from '../../Utilities/Interface/SharedEntity';
import { IAdaptableStore } from './Interface/IAdaptableStore';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as ConfigConstants from '../../Utilities/Constants/ConfigConstants';
import { LayoutState, VendorGridInfo } from '../../PredefinedConfig/LayoutState';
import { GridState } from '../../PredefinedConfig/GridState';
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';
import { FormatColumn } from '../../PredefinedConfig/FormatColumnState';
import { Layout } from '../../PredefinedConfig/LayoutState';
import { PlusMinusRule } from '../../PredefinedConfig/PlusMinusState';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { FreeTextColumn } from '../../PredefinedConfig/FreeTextColumnState';
import { Report } from '../../PredefinedConfig/ExportState';
import { CustomSort } from '../../PredefinedConfig/CustomSortState';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
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
import { CellSummmary } from '../../Utilities/Interface/Selection/CellSummmary';
import { PreviewHelper } from '../../Utilities/Helpers/PreviewHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { AdaptableHelper } from '../../Utilities/Helpers/AdaptableHelper';
import { IUIConfirmation, InputAction, AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ChartVisibility } from '../../PredefinedConfig/Common/ChartEnums';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import IStorageEngine from './Interface/IStorageEngine';
import { CalculatedColumn } from '../../PredefinedConfig/CalculatedColumnState';
import { ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
import { ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
import { Shortcut } from '../../PredefinedConfig/ShortcutState';
import { AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';
import { ConfigState } from '../../PredefinedConfig/ConfigState';
import {
  StatePropertyChangedDetails,
  StateObjectChangedDetails,
  StateObjectChangeType,
  FunctionAppliedDetails,
  StateChangedDetails,
} from '../../Api/Events/AuditEvents';

import Emitter from '../../Utilities/Emitter';
import { ChartDefinition } from '../../PredefinedConfig/ChartState';
import { ActionColumn } from '../../PredefinedConfig/ActionColumnState';
import { StrategyParams } from '../../View/Components/SharedProps/StrategyViewPopupProps';
import { UpdatedRowInfo } from '../../Utilities/Services/Interface/IDataService';
import { DataChangedInfo } from '../../AdaptableOptions/CommonObjects/DataChangedInfo';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { ServiceStatus } from '../../Utilities/Services/PushPullService';
import { IPushPullDomain } from '../../PredefinedConfig/PartnerState';
import { IStrategyActionReturn } from '../../Strategy/Interface/IStrategyActionReturn';

type EmitterCallback = (data?: any) => any;
type EmitterAnyCallback = (eventName: string, data?: any) => any;
/*
This is the main store for Adaptable State
*/

const rootReducer: Redux.Reducer<AdaptableState> = Redux.combineReducers<AdaptableState>({
  //  Reducers for Non-Persisted State
  Grid: GridRedux.GridReducer,
  Popup: PopupRedux.PopupReducer,
  System: SystemRedux.SystemReducer,
  SystemStatus: SystemStatusRedux.SystemStatusReducer,
  TeamSharing: TeamSharingRedux.TeamSharingReducer,
  Plugins: PluginsRedux.PluginsReducer,

  ActionColumn: ActionColumnRedux.ActionColumnReducer,
  Entitlements: EntitlementsRedux.EntitlementsReducer,
  NamedFilter: NamedFilterRedux.NamedFilterReducer,
  Partner: PartnerRedux.PartnerReducer,
  SparklineColumn: SparklineColumnRedux.SparklineColumnReducer,
  SystemFilter: SystemFilterRedux.SystemFilterReducer,
  UserInterface: UserInterfaceRedux.UserInterfaceStateReducer,

  // Reducers for Persisted State
  AdvancedSearch: AdvancedSearchRedux.AdvancedSearchReducer,
  Alert: AlertRedux.AlertReducer,
  Application: ApplicationRedux.ApplicationReducer,
  BulkUpdate: BulkUpdateRedux.BulkUpdateReducer,
  CalculatedColumn: CalculatedColumnRedux.CalculatedColumnReducer,
  Calendar: CalendarRedux.CalendarReducer,
  CellSummary: CellSummaryRedux.CellSummaryReducer,
  CellValidation: CellValidationRedux.CellValidationReducer,
  Chart: ChartRedux.ChartReducer,
  ColumnCategory: ColumnCategoryRedux.ColumnCategoryReducer,
  ColumnFilter: ColumnFilterRedux.ColumnFilterReducer,
  ConditionalStyle: ConditionalStyleRedux.ConditionalStyleReducer,
  CustomSort: CustomSortRedux.CustomSortReducer,
  Dashboard: DashboardRedux.DashboardReducer,
  DataSource: DataSourceRedux.DataSourceReducer,
  Export: ExportRedux.ExportReducer,
  FlashingCell: FlashingCellsRedux.FlashingCellReducer,
  FormatColumn: FormatColumnRedux.FormatColumnReducer,
  FreeTextColumn: FreeTextColumnRedux.FreeTextColumnReducer,
  Layout: LayoutRedux.LayoutReducer,
  PercentBar: PercentBarRedux.PercentBarReducer,
  PlusMinus: PlusMinusRedux.PlusMinusReducer,
  QuickSearch: QuickSearchRedux.QuickSearchReducer,
  Reminder: ReminderRedux.ReminderReducer,
  Shortcut: ShortcutRedux.ShortcutReducer,
  SmartEdit: SmartEditRedux.SmartEditReducer,
  Theme: ThemeRedux.ThemeReducer,
  ToolPanel: ToolPanelRedux.ToolPanelReducer,
  UpdatedRow: UpdatedRowRedux.UpdatedRowReducer,
  UserFilter: UserFilterRedux.UserFilterReducer,
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

const rootReducerWithResetManagement = (state: AdaptableState, action: Redux.Action) => {
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
      state.Partner = undefined;
      state.ToolPanel = undefined;
      break;
    case LOAD_STATE:
      const { State } = action as LoadStateAction;
      Object.keys(State).forEach(key => {
        state[key] = State[key];
      });
      break;
  }
  return rootReducer(state, action);
};

// const configServerUrl = "/adaptableadaptable-config"
const configServerTeamSharingUrl = '/adaptableadaptable-teamsharing';

export class AdaptableStore implements IAdaptableStore {
  public TheStore: Redux.Store<AdaptableState>;
  public Load: PromiseLike<any>;
  private emitter: Emitter;

  private loadStartOnStartup: boolean = true; // set to false if you want no state

  public on = (eventName: string, callback: EmitterCallback): (() => void) => {
    return this.emitter.on(eventName, callback);
  };
  public onAny = (callback: EmitterAnyCallback): (() => void) => {
    return this.emitter.onAny(callback);
  };

  public emit = (eventName: string, data: any): Promise<any> => {
    return this.emitter.emit(eventName, data);
  };

  constructor(adaptable: IAdaptable) {
    let storageEngine: IStorageEngine;

    this.emitter = new Emitter();

    // If the user has remote storage set then we use Remote Engine, otherwise we use Local Enginge
    // not sure we can do this as we need to be backwardly compatible with existing users so need to stick with adaptable id (which should be unique)
    // const localStorageKey =  'adaptable-adaptable-state-' + adaptable.adaptableOptions.primaryKey;

    if (AdaptableHelper.isConfigServerEnabled(adaptable.adaptableOptions)) {
      storageEngine = createEngineRemote({
        url: adaptable.adaptableOptions.configServerOptions.configServerUrl,
        userName: adaptable.adaptableOptions.userName,
        adaptableId: adaptable.adaptableOptions.adaptableId,
        loadState: adaptable.adaptableOptions.stateOptions.loadState,
        persistState: adaptable.adaptableOptions.stateOptions.persistState,
      });
    } else {
      storageEngine = createEngineLocal({
        adaptableId: adaptable.adaptableOptions.adaptableId,
        userName: adaptable.adaptableOptions.userName,
        predefinedConfig: adaptable.adaptableOptions.predefinedConfig,
        loadState: adaptable.adaptableOptions.stateOptions.loadState,
        persistState: adaptable.adaptableOptions.stateOptions.persistState,
      });
    }

    const nonPersistentReduxKeys = [
      // Non Persisted State
      ConfigConstants.SYSTEM,
      ConfigConstants.GRID,
      ConfigConstants.POPUP,
      ConfigConstants.TEAM_SHARING,
      ConfigConstants.PLUGINS,

      // Config State - set ONLY in PredefinedConfig and never changed at runtime
      ConfigConstants.APPLICATION,
      ConfigConstants.ENTITLEMENTS,
      ConfigConstants.PARTNER,
      ConfigConstants.SYSTEM_FILTER,
      ConfigConstants.USER_INTERFACE,
      // Config State - set ONLY in PredefinedConfig and never changed at runtime and contains functions
      ConfigConstants.ACTION_COLUMN,
      ConfigConstants.NAMED_FILTER,
      ConfigConstants.SPARKLINE_COLUMN,
    ];

    // this is now VERY BADLY NAMED!
    let rootReducer = mergeReducer(rootReducerWithResetManagement, LOAD_STATE);

    let composeEnhancers;
    if ('production' != process.env.NODE_ENV) {
      composeEnhancers = composeWithDevTools({
        // Specify here name, actionsBlacklist, actionsCreators and other options if needed
      });
    } else {
      composeEnhancers = (x: any) => x;
    }

    const persistedReducer = (state: AdaptableState, action: Redux.Action) => {
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

        storageEngine.save(adaptable.adaptableOptions.stateOptions.saveState(storageState));
      }

      return newState;
    };

    //TODO: need to check if we want the storage to be done before or after
    //we enrich the state with the AB middleware
    this.TheStore = Redux.createStore<AdaptableState, Redux.Action<any>, any, any>(
      persistedReducer,
      composeEnhancers(
        Redux.applyMiddleware(
          stateChangedAuditLogMiddleware(adaptable), // checks for changes in internal / user state and sends to audit log
          adaptableadaptableMiddleware(adaptable), // the main middleware that actually does stuff
          functionAppliedLogMiddleware(adaptable) // looks at when functions are applied (e..g Quick Search) and logs accordingly
        )
      )
    );

    this.Load = storageEngine
      .load()
      .then(storedState => {
        if (storedState && this.loadStartOnStartup) {
          this.TheStore.dispatch(
            LoadState(adaptable.adaptableOptions.stateOptions.applyState(storedState))
          );
        }
      })
      .then(
        () => this.TheStore.dispatch(InitState()),
        e => {
          LoggingHelper.LogAdaptableError('Failed to load previous Adaptable State : ', e);
          //for now i'm still initializing Adaptable even if loading state has failed....
          //we may revisit that later
          this.TheStore.dispatch(InitState());
          this.TheStore.dispatch(
            PopupRedux.PopupShowAlert({
              Header: 'Configuration',
              Msg: 'Error loading your configuration:' + e,
              AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
                MessageType.Error
              ),
            })
          );
        }
      );
  }
}

// this function checks for any differences in the state and sends it to AUDIT LOGGER (for use in Audit Log)
// we now allow users to differentiate between user and internal state so we check for both
// NOTE: the Audit Logger is also responsible for firing AuditEventApi changes if that has been set
var stateChangedAuditLogMiddleware = (adaptable: IAdaptable): any =>
  function(
    middlewareAPI: Redux.MiddlewareAPI<Redux.Dispatch<Redux.Action<AdaptableState>>, AdaptableState>
  ) {
    return function(next: Redux.Dispatch<Redux.Action<AdaptableState>>) {
      return function(action: Redux.Action) {
        if (
          // if audit state is turned off, then get out
          !adaptable.isInitialised ||
          !adaptable.AuditLogService.isAuditStateChangesEnabled
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
          if (adaptable.AuditLogService.isAuditInternalStateChangesEnabled) {
            let oldState = middlewareAPI.getState();
            let ret = next(action);
            let newState = middlewareAPI.getState();
            let diff = adaptable.AuditLogService.convertAuditMessageToText(
              DeepDiff.diff(oldState, newState)
            );

            let stateChangedDetails: StateChangedDetails = {
              name: 'Internal State Changes', // we dont know the name
              actionType: action.type,
              state: null,
              diffInfo: diff,
            };

            adaptable.AuditLogService.addInternalStateChangeAuditLog(stateChangedDetails);
            return ret;
          } else {
            return next(action);
          }
        }

        // Unlikely but possible that ONLY Internal Audit is on so get out if so...
        if (!adaptable.AuditLogService.isAuditUserStateChangesEnabled) {
          return next(action);
        }

        // We have User Changes Audit On
        // Get the OldState, NewState and Diff - as required for each use case
        let oldState = middlewareAPI.getState();
        let ret = next(action);
        let newState = middlewareAPI.getState();
        let diff = adaptable.AuditLogService.convertAuditMessageToText(
          DeepDiff.diff(oldState, newState)
        );

        switch (action.type) {
          /*
          **********************
           ADVANCED SEARCH
          **********************
           */
          case AdvancedSearchRedux.ADVANCED_SEARCH_SELECT: {
            const actionTyped = action as AdvancedSearchRedux.AdvancedSearchSelectAction;

            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.AdvancedSearchStrategyId,
              actionType: action.type,
              state: newState.AdvancedSearch,
              diffInfo: diff,
              propertyName: CURRENT_ADVANCED_SEARCH_STATE_PROPERTY,
              oldValue: oldState.AdvancedSearch.CurrentAdvancedSearch,
              newValue: actionTyped.selectedSearchName,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case AdvancedSearchRedux.ADVANCED_SEARCH_ADD: {
            const actionTyped = action as AdvancedSearchRedux.AdvancedSearchAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.AdvancedSearchStrategyId,
              actionType: action.type,
              state: newState.AdvancedSearch,
              diffInfo: diff,
              objectChanged: actionTyped.advancedSearch,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case AdvancedSearchRedux.ADVANCED_SEARCH_EDIT: {
            const actionTyped = action as AdvancedSearchRedux.AdvancedSearchEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.AdvancedSearchStrategyId,
              actionType: action.type,
              state: newState.AdvancedSearch,
              diffInfo: diff,
              objectChanged: actionTyped.advancedSearch,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case AdvancedSearchRedux.ADVANCED_SEARCH_DELETE: {
            const actionTyped = action as AdvancedSearchRedux.AdvancedSearchDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.AdvancedSearchStrategyId,
              actionType: action.type,
              state: newState.AdvancedSearch,
              diffInfo: diff,
              objectChanged: actionTyped.advancedSearch,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
           ALERT
          **********************
           */
          case AlertRedux.ALERT_DEFIINITION_ADD: {
            const actionTyped = action as AlertRedux.AlertDefinitionAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.AlertStrategyId,
              actionType: action.type,
              state: newState.Alert,
              diffInfo: diff,
              objectChanged: actionTyped.alertDefinition,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case AlertRedux.ALERT_DEFIINITION_EDIT: {
            const actionTyped = action as AlertRedux.AlertDefinitionEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.AlertStrategyId,
              actionType: action.type,
              state: newState.Alert,
              diffInfo: diff,
              objectChanged: actionTyped.alertDefinition,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case AlertRedux.ALERT_DEFIINITION_DELETE: {
            const actionTyped = action as AlertRedux.AlertDefinitionDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.AlertStrategyId,
              actionType: action.type,
              state: newState.Alert,
              diffInfo: diff,
              objectChanged: actionTyped.alertDefinition,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
           BULK UPDATE
          **********************
           */
          case BulkUpdateRedux.BULK_UPDATE_CHANGE_VALUE: {
            const actionTyped = action as BulkUpdateRedux.BulkUpdateChangeValueAction;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.BulkUpdateStrategyId,
              actionType: action.type,
              state: newState.BulkUpdate,
              diffInfo: diff,
              propertyName: BULK_UPDATE_VALUE_STATE_PROPERTY,
              oldValue: oldState.BulkUpdate.BulkUpdateValue,
              newValue: actionTyped.bulkUpdateValue,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }

          /*
          **********************
           CALCULATED COLUMN
          **********************
           */
          case CalculatedColumnRedux.CALCULATEDCOLUMN_ADD: {
            const actionTyped = action as CalculatedColumnRedux.CalculatedColumnAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CalculatedColumnStrategyId,
              actionType: action.type,
              state: newState.CalculatedColumn,
              diffInfo: diff,
              objectChanged: actionTyped.calculatedColumn,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case CalculatedColumnRedux.CALCULATEDCOLUMN_EDIT: {
            const actionTyped = action as CalculatedColumnRedux.CalculatedColumnEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CalculatedColumnStrategyId,
              actionType: action.type,
              state: newState.CalculatedColumn,
              diffInfo: diff,
              objectChanged: actionTyped.calculatedColumn,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case CalculatedColumnRedux.CalculatedColumnDelete: {
            const actionTyped = action as CalculatedColumnRedux.CalculatedColumnDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CalculatedColumnStrategyId,
              actionType: action.type,
              state: newState.CalculatedColumn,
              diffInfo: diff,
              objectChanged: actionTyped.calculatedColumn,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
           CALENDAR
          **********************
           */
          case CalendarRedux.CALENDAR_SELECT: {
            const actionTyped = action as CalendarRedux.CalendarSelectAction;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.CalendarStrategyId,
              actionType: action.type,
              state: newState.Calendar,
              diffInfo: diff,
              propertyName: CURRENT_CALENDAR_STATE_PROPERTY,
              oldValue: oldState.Calendar.CurrentCalendar,
              newValue: actionTyped.selectedCalendarName,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
           CELL SUMMARY
          **********************
           */
          case CellSummaryRedux.CELL_SUMMARY_CHANGE_OPERATION: {
            const actionTyped = action as CellSummaryRedux.CellSummaryChangeOperationAction;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.CellSummaryStrategyId,
              actionType: action.type,
              state: newState.CellSummary,
              diffInfo: diff,
              propertyName: SUMMARY_OPERATION_STATE_PROPERTY,
              oldValue: oldState.CellSummary.SummaryOperation,
              newValue: actionTyped.SummaryOperation,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
           CELL VALIDATION
          **********************
           */
          case CellValidationRedux.CELL_VALIDATION_ADD: {
            const actionTyped = action as CellValidationRedux.CellValidationAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CellValidationStrategyId,
              actionType: action.type,
              state: newState.CellValidation,
              diffInfo: diff,
              objectChanged: actionTyped.cellValidationRule,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case CellValidationRedux.CELL_VALIDATION_EDIT: {
            const actionTyped = action as CellValidationRedux.CellValidationEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CellValidationStrategyId,
              actionType: action.type,
              state: newState.CellValidation,
              diffInfo: diff,
              objectChanged: actionTyped.cellValidationRule,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case CellValidationRedux.CELL_VALIDATION_DELETE: {
            const actionTyped = action as CellValidationRedux.CellValidationDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CellValidationStrategyId,
              actionType: action.type,
              state: newState.CellValidation,
              diffInfo: diff,
              objectChanged: actionTyped.cellValidationRule,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
           CHART
          **********************
           */
          case ChartRedux.CHART_DEFINITION_SELECT: {
            const actionTyped = action as ChartRedux.ChartDefinitionSelectAction;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.ChartStrategyId,
              actionType: action.type,
              state: newState.Chart,
              diffInfo: diff,
              propertyName: CURRENT_CHART_NAME_STATE_PROPERTY,
              oldValue: oldState.Chart.CurrentChartName,
              newValue: actionTyped.chartName,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ChartRedux.CHART_DEFINITION_ADD: {
            const actionTyped = action as ChartRedux.ChartDefinitionAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ChartStrategyId,
              actionType: action.type,
              state: newState.Chart,
              diffInfo: diff,
              objectChanged: actionTyped.chartDefinition,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ChartRedux.CHART_DEFINITION_EDIT: {
            const actionTyped = action as ChartRedux.ChartDefinitionEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ChartStrategyId,
              actionType: action.type,
              state: newState.Chart,
              diffInfo: diff,
              objectChanged: actionTyped.chartDefinition,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ChartRedux.CHART_DEFINITION_DELETE: {
            const actionTyped = action as ChartRedux.ChartDefinitionDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ChartStrategyId,
              actionType: action.type,
              state: newState.Chart,
              diffInfo: diff,
              objectChanged: actionTyped.chartDefinition,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
          COLUMN CATEGORY
          **********************
           */
          case ColumnCategoryRedux.COLUMN_CATEGORY_ADD: {
            const actionTyped = action as ColumnCategoryRedux.ColumnCategoryAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ColumnCategoryStrategyId,
              actionType: action.type,
              state: newState.ColumnCategory,
              diffInfo: diff,
              objectChanged: actionTyped.columnCategory,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ColumnCategoryRedux.COLUMN_CATEGORY_EDIT: {
            const actionTyped = action as ColumnCategoryRedux.ColumnCategoryEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ColumnCategoryStrategyId,
              actionType: action.type,
              state: newState.ColumnCategory,
              diffInfo: diff,
              objectChanged: actionTyped.columnCategory,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ColumnCategoryRedux.COLUMN_CATEGORY_DELETE: {
            const actionTyped = action as ColumnCategoryRedux.ColumnCategoryDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ColumnCategoryStrategyId,
              actionType: action.type,
              state: newState.ColumnCategory,
              diffInfo: diff,
              objectChanged: actionTyped.columnCategory,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
          COLUMN FILTER
         **********************
          */
          case ColumnFilterRedux.COLUMN_FILTER_ADD: {
            const actionTyped = action as ColumnFilterRedux.ColumnFilterAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ColumnFilterStrategyId,
              actionType: action.type,
              state: newState.ColumnFilter,
              diffInfo: diff,
              objectChanged: actionTyped.columnFilter,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ColumnFilterRedux.COLUMN_FILTER_EDIT: {
            const actionTyped = action as ColumnFilterRedux.ColumnFilterEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ColumnFilterStrategyId,
              actionType: action.type,
              state: newState.ColumnFilter,
              diffInfo: diff,
              objectChanged: actionTyped.columnFilter,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ColumnFilterRedux.COLUMN_FILTER_CLEAR: {
            const actionTyped = action as ColumnFilterRedux.ColumnFilterClearAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ColumnFilterStrategyId,
              actionType: action.type,
              state: newState.ColumnFilter,
              diffInfo: diff,
              objectChanged: undefined, // TODO: actionTyped.columnId - this should have the object not te column?
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
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
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }

          /*
          **********************
          CONDITIONAL STYLE
          **********************
           */
          case ConditionalStyleRedux.CONDITIONAL_STYLE_ADD: {
            const actionTyped = action as ConditionalStyleRedux.ConditionalStyleAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ConditionalStyleStrategyId,
              actionType: action.type,
              state: newState.ConditionalStyle,
              diffInfo: diff,
              objectChanged: actionTyped.conditionalStyle,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ConditionalStyleRedux.CONDITIONAL_STYLE_EDIT: {
            const actionTyped = action as ConditionalStyleRedux.ConditionalStyleEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ConditionalStyleStrategyId,
              actionType: action.type,
              state: newState.ConditionalStyle,
              diffInfo: diff,
              objectChanged: actionTyped.conditionalStyle,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ConditionalStyleRedux.CONDITIONAL_STYLE_DELETE: {
            const actionTyped = action as ConditionalStyleRedux.ConditionalStyleDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ConditionalStyleStrategyId,
              actionType: action.type,
              state: newState.ConditionalStyle,
              diffInfo: diff,
              objectChanged: actionTyped.conditionalStyle,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
          CUSTOM SORT
          **********************
           */
          case CustomSortRedux.CUSTOM_SORT_ADD: {
            const actionTyped = action as CustomSortRedux.CustomSortAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CustomSortStrategyId,
              actionType: action.type,
              state: newState.CustomSort,
              diffInfo: diff,
              objectChanged: actionTyped.customSort,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case CustomSortRedux.CUSTOM_SORT_EDIT: {
            const actionTyped = action as CustomSortRedux.CustomSortEditAction;

            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CustomSortStrategyId,
              actionType: action.type,
              state: newState.CustomSort,
              diffInfo: diff,
              objectChanged: actionTyped.customSort,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case CustomSortRedux.CUSTOM_SORT_DELETE: {
            const actionTyped = action as CustomSortRedux.CustomSortDeleteAction;

            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.CustomSortStrategyId,
              actionType: action.type,
              state: newState.CustomSort,
              diffInfo: diff,
              objectChanged: actionTyped.customSort,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
          DATA SOURCE
          **********************
           */
          case DataSourceRedux.DATA_SOURCE_SELECT: {
            const actionTyped = action as DataSourceRedux.DataSourceSelectAction;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.DataSourceStrategyId,
              actionType: action.type,
              state: newState.DataSource,
              diffInfo: diff,
              propertyName: CURRENT_DATA_SOURCE_STATE_PROPERTY,
              oldValue: oldState.DataSource.CurrentDataSource,
              newValue: actionTyped.SelectedDataSource,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case DataSourceRedux.DATA_SOURCE_ADD: {
            const actionTyped = action as DataSourceRedux.DataSourceAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.DataSourceStrategyId,
              actionType: action.type,
              state: newState.DataSource,
              diffInfo: diff,
              objectChanged: actionTyped.dataSource,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case DataSourceRedux.DATA_SOURCE_EDIT: {
            const actionTyped = action as DataSourceRedux.DataSourceEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.DataSourceStrategyId,
              actionType: action.type,
              state: newState.DataSource,
              diffInfo: diff,
              objectChanged: actionTyped.dataSource,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case DataSourceRedux.DATA_SOURCE_DELETE: {
            const actionTyped = action as DataSourceRedux.DataSourceDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.DataSourceStrategyId,
              actionType: action.type,
              state: newState.DataSource,
              diffInfo: diff,
              objectChanged: actionTyped.dataSource,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
           EXPORT
          **********************
           */
          case ExportRedux.REPORT_SELECT: {
            const actionTyped = action as ExportRedux.ReportSelectAction;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.ExportStrategyId,
              actionType: action.type,
              state: newState.Export,
              diffInfo: diff,
              propertyName: CURRENT_REPORT_STATE_PROPERTY,
              oldValue: oldState.Export.CurrentReport,
              newValue: actionTyped.SelectedReport,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ExportRedux.REPORT_ADD: {
            const actionTyped = action as ExportRedux.ReportAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ExportStrategyId,
              actionType: action.type,
              state: newState.Export,
              diffInfo: diff,
              objectChanged: actionTyped.report,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ExportRedux.REPORT_EDIT: {
            const actionTyped = action as ExportRedux.ReportEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ExportStrategyId,
              actionType: action.type,
              state: newState.Export,
              diffInfo: diff,
              objectChanged: actionTyped.report,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ExportRedux.REPORT_DELETE: {
            const actionTyped = action as ExportRedux.ReportDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ExportStrategyId,
              actionType: action.type,
              state: newState.Export,
              diffInfo: diff,
              objectChanged: actionTyped.report,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          } /*
          **********************
          FLASHING CELL
          **********************
           */
          case FlashingCellsRedux.FLASHING_CELL_CHANGE_UP_COLOR: {
            const actionTyped = action as FlashingCellsRedux.FlashingCellChangeUpColorAction;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.FlashingCellsStrategyId,
              actionType: action.type,
              state: newState.FlashingCell,
              diffInfo: diff,
              propertyName: FLASHING_CELL_DEFAULT_UP_COLOR_STATE_PROPERTY,
              oldValue: oldState.FlashingCell.DefaultUpColor,
              newValue: actionTyped.UpColor,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case FlashingCellsRedux.FLASHING_CELL_CHANGE_DOWN_COLOR: {
            const actionTyped = action as FlashingCellsRedux.FlashingCellChangeDownColorAction;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.FlashingCellsStrategyId,
              actionType: action.type,
              state: newState.FlashingCell,
              diffInfo: diff,
              propertyName: FLASHING_CELL_DEFAULT_DOWN_COLOR_STATE_PROPERTY,
              oldValue: oldState.FlashingCell.DefautDownColor,
              newValue: actionTyped.DownColor,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case FlashingCellsRedux.FLASHING_CELL_CHANGE_DURATION: {
            const actionTyped = action as FlashingCellsRedux.FlashingCellChangeDurationAction;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.FlashingCellsStrategyId,
              actionType: action.type,
              state: newState.FlashingCell,
              diffInfo: diff,
              propertyName: FLASHING_CELL_DEFAULT_DURATION_STATE_PROPERTY,
              oldValue: oldState.FlashingCell.DefaultDuration.toString(),
              newValue: actionTyped.NewFlashDuration.toString(),
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
          FORMAT COLUMN
          **********************
           */
          case FormatColumnRedux.FORMAT_COLUMN_ADD: {
            const actionTyped = action as FormatColumnRedux.FormatColumnAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.FormatColumnStrategyId,
              actionType: action.type,
              state: newState.FormatColumn,
              diffInfo: diff,
              objectChanged: actionTyped.formatColumn,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case FormatColumnRedux.FORMAT_COLUMN_EDIT: {
            const actionTyped = action as FormatColumnRedux.FormatColumnEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.FormatColumnStrategyId,
              actionType: action.type,
              state: newState.FormatColumn,
              diffInfo: diff,
              objectChanged: actionTyped.formatColumn,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case FormatColumnRedux.FORMAT_COLUMN_DELETE: {
            const actionTyped = action as FormatColumnRedux.FormatColumnDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.FormatColumnStrategyId,
              actionType: action.type,
              state: newState.FormatColumn,
              diffInfo: diff,
              objectChanged: actionTyped.formatColumn,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
          FREE TEXT COLUMN
          **********************
           */
          case FreeTextColumnRedux.FREE_TEXT_COLUMN_ADD: {
            const actionTyped = action as FreeTextColumnRedux.FreeTextColumnAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.FreeTextColumnStrategyId,
              actionType: action.type,
              state: newState.FreeTextColumn,
              diffInfo: diff,
              objectChanged: actionTyped.freeTextColumn,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case FreeTextColumnRedux.FREE_TEXT_COLUMN_EDIT: {
            const actionTyped = action as FreeTextColumnRedux.FreeTextColumnEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.FreeTextColumnStrategyId,
              actionType: action.type,
              state: newState.FreeTextColumn,
              diffInfo: diff,
              objectChanged: actionTyped.freeTextColumn,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case FreeTextColumnRedux.FREE_TEXT_COLUMN_DELETE: {
            const actionTyped = action as FreeTextColumnRedux.FreeTextColumnDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.FreeTextColumnStrategyId,
              actionType: action.type,
              state: newState.FreeTextColumn,
              diffInfo: diff,
              objectChanged: actionTyped.freeTextColumn,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }

          /*
          **********************
          LAYOUT
          **********************
           */
          case LayoutRedux.LAYOUT_SELECT: {
            const actionTyped = action as LayoutRedux.LayoutSelectAction;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.LayoutStrategyId,
              actionType: action.type,
              state: newState.Layout,
              diffInfo: diff,
              propertyName: CURRENT_LAYOUT_STATE_PROPERTY,
              oldValue: oldState.Layout.CurrentLayout,
              newValue: actionTyped.LayoutName,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case LayoutRedux.LAYOUT_SAVE: {
            const actionTyped = action as LayoutRedux.LayoutSaveAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.LayoutStrategyId,
              actionType: action.type,
              state: newState.Layout,
              diffInfo: diff,
              objectChanged: actionTyped.layout,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case LayoutRedux.LAYOUT_ADD: {
            const actionTyped = action as LayoutRedux.LayoutAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.LayoutStrategyId,
              actionType: action.type,
              state: newState.Layout,
              diffInfo: diff,
              objectChanged: actionTyped.layout,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case LayoutRedux.LAYOUT_EDIT: {
            const actionTyped = action as LayoutRedux.LayoutEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.LayoutStrategyId,
              actionType: action.type,
              state: newState.Layout,
              diffInfo: diff,
              objectChanged: actionTyped.layout,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case LayoutRedux.LAYOUT_DELETE: {
            const actionTyped = action as LayoutRedux.LayoutDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.LayoutStrategyId,
              actionType: action.type,
              state: newState.Layout,
              diffInfo: diff,
              objectChanged: actionTyped.layout,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
          PERCENT BAR
          **********************
           */
          case PercentBarRedux.PERCENT_BAR_ADD: {
            const actionTyped = action as PercentBarRedux.PercentBarAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.PercentBarStrategyId,
              actionType: action.type,
              state: newState.PercentBar,
              diffInfo: diff,
              objectChanged: actionTyped.percentBar,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case PercentBarRedux.PERCENT_BAR_EDIT: {
            const actionTyped = action as PercentBarRedux.PercentBarEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.PercentBarStrategyId,
              actionType: action.type,
              state: newState.PercentBar,
              diffInfo: diff,
              objectChanged: actionTyped.percentBar,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case PercentBarRedux.PERCENT_BAR_DELETE: {
            const actionTyped = action as PercentBarRedux.PercentBarDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.PercentBarStrategyId,
              actionType: action.type,
              state: newState.PercentBar,
              diffInfo: diff,
              objectChanged: actionTyped.percentBar,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }

          /*
          **********************
          Sparklines
          **********************
           */
          case SparklineColumnRedux.SPARKLINE_COLUMNS_ADD: {
            let actionTyped = <SparklineColumnRedux.SparklineColumnAddAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.SparklineStrategyId,
              actionType: action.type,
              state: newState.SparklineColumn,
              diffInfo: diff,
              objectChanged: actionTyped.sparklineColumn,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case SparklineColumnRedux.SPARKLINE_COLUMNS_EDIT: {
            let actionTyped = <SparklineColumnRedux.SparklineColumnEditAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.SparklineStrategyId,
              actionType: action.type,
              state: newState.SparklineColumn,
              diffInfo: diff,
              objectChanged: actionTyped.sparklineColumn,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case SparklineColumnRedux.SPARKLINE_COLUMNS_DELETE: {
            let actionTyped = <SparklineColumnRedux.SparklineColumnDeleteAction>action;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.SparklineStrategyId,
              actionType: action.type,
              state: newState.SparklineColumn,
              diffInfo: diff,
              objectChanged: actionTyped.sparklineColumn,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
          PLUS / MINUS
          **********************
           */
          case PlusMinusRedux.PLUS_MINUS_RULE_ADD: {
            const actionTyped = action as PlusMinusRedux.PlusMinusRuleAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.PlusMinusStrategyId,
              actionType: action.type,
              state: newState.PlusMinus,
              diffInfo: diff,
              objectChanged: actionTyped.plusMinusRule,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case PlusMinusRedux.PLUS_MINUS_RULE_EDIT: {
            const actionTyped = action as PlusMinusRedux.PlusMinusRuleEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.PlusMinusStrategyId,
              actionType: action.type,
              state: newState.PlusMinus,
              diffInfo: diff,
              objectChanged: actionTyped.plusMinusRule,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case PlusMinusRedux.PLUS_MINUS_RULE_DELETE: {
            const actionTyped = action as PlusMinusRedux.PlusMinusRuleDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.PlusMinusStrategyId,
              actionType: action.type,
              state: newState.PlusMinus,
              diffInfo: diff,
              objectChanged: actionTyped.plusMinusRule,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
          QUICK SEARCH
          **********************
           */
          case QuickSearchRedux.QUICK_SEARCH_APPLY: {
            const actionTyped = action as QuickSearchRedux.QuickSearchApplyAction;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.QuickSearchStrategyId,
              actionType: action.type,
              state: newState.QuickSearch,
              diffInfo: diff,
              propertyName: QUICK_SEARCH_TEXT_STATE_PROPERTY,
              oldValue: oldState.QuickSearch.QuickSearchText,
              newValue: actionTyped.quickSearchText,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case QuickSearchRedux.QUICK_SEARCH_SET_DISPLAY: {
            const actionTyped = action as QuickSearchRedux.QuickSearchSetDisplayAction;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.QuickSearchStrategyId,
              actionType: action.type,
              state: newState.QuickSearch,
              diffInfo: diff,
              propertyName: QUICK_SEARCH_DISPLAY_ACTION_STATE_PROPERTY,
              oldValue: oldState.QuickSearch.DisplayAction,
              newValue: actionTyped.DisplayAction,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case QuickSearchRedux.QUICK_SEARCH_SET_STYLE: {
            const actionTyped = action as QuickSearchRedux.QuickSearchSetStyleAction;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.QuickSearchStrategyId,
              actionType: action.type,
              state: newState.QuickSearch,
              diffInfo: diff,
              propertyName: QUICK_SEARCH_STYLE_STATE_PROPERTY,
              oldValue: adaptable.AuditLogService.convertAuditMessageToText(
                oldState.QuickSearch.Style
              ),
              newValue: adaptable.AuditLogService.convertAuditMessageToText(actionTyped.style),
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }

          /*
          **********************
          REMINDER
          **********************
           */
          case ReminderRedux.REMINDER_ADD: {
            const actionTyped = action as ReminderRedux.ReminderAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ReminderStrategyId,
              actionType: action.type,
              state: newState.Reminder,
              diffInfo: diff,
              objectChanged: actionTyped.reminder,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ReminderRedux.REMINDER_EDIT: {
            const actionTyped = action as ReminderRedux.ReminderEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ReminderStrategyId,
              actionType: action.type,
              state: newState.Reminder,
              diffInfo: diff,
              objectChanged: actionTyped.reminder,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ReminderRedux.REMINDER_DELETE: {
            const actionTyped = action as ReminderRedux.ReminderDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ReminderStrategyId,
              actionType: action.type,
              state: newState.Reminder,
              diffInfo: diff,
              objectChanged: actionTyped.reminder,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
          SHORTCUT
          **********************
           */
          case ShortcutRedux.SHORTCUT_ADD: {
            const actionTyped = action as ShortcutRedux.ShortcutAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ShortcutStrategyId,
              actionType: action.type,
              state: newState.Shortcut,
              diffInfo: diff,
              objectChanged: actionTyped.shortcut,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ShortcutRedux.SHORTCUT_EDIT: {
            const actionTyped = action as ShortcutRedux.ShortcutEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ShortcutStrategyId,
              actionType: action.type,
              state: newState.Shortcut,
              diffInfo: diff,
              objectChanged: actionTyped.shortcut,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ShortcutRedux.SHORTCUT_DELETE: {
            const actionTyped = action as ShortcutRedux.ShortcutDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ShortcutStrategyId,
              actionType: action.type,
              state: newState.Shortcut,
              diffInfo: diff,
              objectChanged: actionTyped.shortcut,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
          SMART EDIT
          **********************
           */
          case SmartEditRedux.SMARTEDIT_CHANGE_VALUE: {
            const actionTyped = action as SmartEditRedux.SmartEditChangeValueAction;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.SmartEditStrategyId,
              actionType: action.type,
              state: newState.SmartEdit,
              diffInfo: diff,
              propertyName: SMART_EDIT_VALUE_STATE_PROPERTY,
              oldValue: oldState.SmartEdit.SmartEditValue.toString(),
              newValue: actionTyped.value.toString(),
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case SmartEditRedux.SMARTEDIT_CHANGE_OPERATION: {
            const actionTyped = action as SmartEditRedux.SmartEditChangeOperationAction;
            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.SmartEditStrategyId,
              actionType: action.type,
              state: newState.SmartEdit,
              diffInfo: diff,
              propertyName: SMART_EDIT_MATH_OPERATION_STATE_PROPERTY,
              oldValue: oldState.SmartEdit.MathOperation,
              newValue: actionTyped.MathOperation,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
          THEME
          **********************
           */
          case ThemeRedux.THEME_SELECT: {
            const actionTyped = action as ThemeRedux.ThemeSelectAction;

            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.ThemeStrategyId,
              actionType: action.type,
              state: newState.Theme,
              diffInfo: diff,
              propertyName: CURRENT_THEME_STATE_PROPERTY,
              oldValue: oldState.Theme.CurrentTheme,
              newValue: actionTyped.type,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          /*
          **********************
          USER FILTER
          **********************
           */
          case UserFilterRedux.USER_FILTER_ADD: {
            const actionTyped = action as UserFilterRedux.UserFilterAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.UserFilterStrategyId,
              actionType: action.type,
              state: newState.UserFilter,
              diffInfo: diff,
              objectChanged: actionTyped.userFilter,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case UserFilterRedux.USER_FILTER_EDIT: {
            const actionTyped = action as UserFilterRedux.UserFilterEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.UserFilterStrategyId,
              actionType: action.type,
              state: newState.UserFilter,
              diffInfo: diff,
              objectChanged: actionTyped.userFilter,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case UserFilterRedux.USER_FILTER_DELETE: {
            const actionTyped = action as UserFilterRedux.UserFilterDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.UserFilterStrategyId,
              actionType: action.type,
              state: newState.UserFilter,
              diffInfo: diff,
              objectChanged: actionTyped.userFilter,
              stateObjectChangeType: StateObjectChangeType.Deleted,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
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

            adaptable.AuditLogService.addUserStateChangeAuditLog(stateChangedDetails);
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
var functionAppliedLogMiddleware = (adaptable: IAdaptable): any =>
  function(
    middlewareAPI: Redux.MiddlewareAPI<Redux.Dispatch<Redux.Action<AdaptableState>>, AdaptableState>
  ) {
    return function(next: Redux.Dispatch<Redux.Action<AdaptableState>>) {
      return function(action: Redux.Action) {
        if (!adaptable.AuditLogService.isAuditFunctionEventsEnabled) {
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
            const actionTyped = action as AdvancedSearchRedux.AdvancedSearchSelectAction;
            let advancedSearch = state.AdvancedSearch.AdvancedSearches.find(
              as => as.Name == actionTyped.selectedSearchName
            );
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.AdvancedSearchStrategyId,
              action: action.type,
              info: actionTyped.selectedSearchName,
              data: advancedSearch,
            };
            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case CalendarRedux.CALENDAR_SELECT: {
            const actionTyped = action as CalendarRedux.CalendarSelectAction;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.CalendarStrategyId,
              action: action.type,
              info: CURRENT_CALENDAR_STATE_PROPERTY,
              data: actionTyped.selectedCalendarName,
            };
            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case ChartRedux.CHART_DEFINITION_SELECT: {
            const actionTyped = action as ChartRedux.ChartDefinitionSelectAction;
            let chart = state.Chart.ChartDefinitions.find(cd => cd.Name == actionTyped.chartName);
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.ChartStrategyId,
              action: action.type,
              info: actionTyped.chartName,
              data: chart,
            };
            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case DataSourceRedux.DATA_SOURCE_SELECT: {
            const actionTyped = action as DataSourceRedux.DataSourceSelectAction;
            let dataSource = state.DataSource.DataSources!.find(
              ds => ds.Name == actionTyped.SelectedDataSource
            );
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.DataSourceStrategyId,
              action: action.type,
              info: actionTyped.SelectedDataSource,
              data: dataSource,
            };
            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case ExportRedux.EXPORT_APPLY: {
            const actionTyped = action as ExportRedux.ExportApplyAction;
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.ExportStrategyId,
              action: action.type,
              info: actionTyped.Report.Name,
              data: actionTyped.Report,
            };
            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case FlashingCellsRedux.FLASHING_CELL_SELECT: {
            const actionTyped = action as FlashingCellsRedux.FlashingCellSelectAction;
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.FlashingCellsStrategyId,
              action: action.type,
              info: adaptable.AuditLogService.convertAuditMessageToText(actionTyped.FlashingCell),
              data: actionTyped.FlashingCell,
            };
            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case FlashingCellsRedux.FLASHING_CELL_SELECT_ALL: {
            const actionTyped = action as FlashingCellsRedux.FlashingCellSelectAllAction;
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.FlashingCellsStrategyId,
              action: action.type,
              info: adaptable.AuditLogService.convertAuditMessageToText(actionTyped.FlashingCells),
              data: actionTyped.FlashingCells,
            };
            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case FreeTextColumnRedux.FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE: {
            const actionTyped = action as FreeTextColumnRedux.FreeTextColumnAddEditStoredValueAction;
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.FreeTextColumnStrategyId,
              action: action.type,
              info: actionTyped.FreeTextColumn.ColumnId,
              data: actionTyped.FreeTextStoredValue,
            };
            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          // should we create a Quick Search Clear?  Might be neater...
          case QuickSearchRedux.QUICK_SEARCH_APPLY: {
            const actionTyped = action as QuickSearchRedux.QuickSearchApplyAction;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.QuickSearchStrategyId,
              action: action.type,
              info: actionTyped.quickSearchText,
              data: state.QuickSearch,
            };

            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }
          case QuickSearchRedux.QUICK_SEARCH_SET_DISPLAY: {
            const actionTyped = action as QuickSearchRedux.QuickSearchSetDisplayAction;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.QuickSearchStrategyId,
              action: action.type,
              info: actionTyped.DisplayAction,
              data: state.QuickSearch,
            };

            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }
          case QuickSearchRedux.QUICK_SEARCH_SET_STYLE: {
            const actionTyped = action as QuickSearchRedux.QuickSearchSetStyleAction;
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.QuickSearchStrategyId,
              action: action.type,
              info: actionTyped.style.ClassName,
              data: state.QuickSearch,
            };

            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }
          case PlusMinusRedux.PLUS_MINUS_APPLY: {
            const actionTyped = action as PlusMinusRedux.PlusMinusApplyAction;
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.PlusMinusStrategyId,
              action: action.type,
              info: 'KeyPressed:',
              data: actionTyped.GridCells,
            };

            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case ThemeRedux.THEME_SELECT: {
            const actionTyped = action as ThemeRedux.ThemeSelectAction;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.ThemeStrategyId,
              action: action.type,
              info: CURRENT_THEME_STATE_PROPERTY,
              data: actionTyped.Theme,
            };
            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case ColumnFilterRedux.COLUMN_FILTER_ADD: {
            const actionTyped = action as ColumnFilterRedux.ColumnFilterAddAction;
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
            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }
          case ColumnFilterRedux.COLUMN_FILTER_EDIT: {
            const actionTyped = action as ColumnFilterRedux.ColumnFilterEditAction;
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

            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case ColumnFilterRedux.COLUMN_FILTER_CLEAR: {
            const actionTyped = action as ColumnFilterRedux.ColumnFilterClearAction;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.ColumnFilterStrategyId,
              action: action.type,
              info: 'Column Filter Cleared',
              data: {
                Column: actionTyped.columnFilter,
              },
            };

            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
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
// Please document each use case where we have to use the Store rather than a strategy or a popup screen
var adaptableadaptableMiddleware = (adaptable: IAdaptable): any =>
  function(
    middlewareAPI: Redux.MiddlewareAPI<Redux.Dispatch<Redux.Action<AdaptableState>>, AdaptableState>
  ) {
    return function(next: Redux.Dispatch<Redux.Action<AdaptableState>>) {
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
            adaptable.applyGridFiltering();
            return ret;
          }

          /**
           * Use Case: User has deleted an Advanced Search
           * Action: If the deleted Advanced Search was the currently selected one: Apply Grid Filtering
           */
          case AdvancedSearchRedux.ADVANCED_SEARCH_DELETE: {
            const actionTyped = action as AdvancedSearchRedux.AdvancedSearchDeleteAction;
            let CurrentAdvancedSearch = middlewareAPI.getState().AdvancedSearch
              .CurrentAdvancedSearch;
            let ret = next(action);
            if (CurrentAdvancedSearch == actionTyped.advancedSearch.Name) {
              adaptable.applyGridFiltering();
            }
            return ret;
          }

          /*******************
           * ALERT ACTIONS
           *******************/

          /**
           * Use Case: User has deleted a System Alert which has a Highlight Cell
           * Action: Refresh the cell (to clear the style)
           */
          case SystemRedux.SYSTEM_ALERT_DELETE: {
            const actionTyped = action as SystemRedux.SystemAlertDeleteAction;
            let ret = next(action);
            if (
              actionTyped.Alert.AlertDefinition.AlertProperties.HighlightCell &&
              actionTyped.Alert.DataChangedInfo
            ) {
              let record = actionTyped.Alert.DataChangedInfo.RowNode;
              adaptable.refreshCells([record], [actionTyped.Alert.DataChangedInfo.ColumnId]);
            }
            return ret;
          }

          /**
           * Use Case: User has deleted all System Alerts some of which have a Highlight Cell
           * Action: Refresh the cell (to clear the style)
           */
          case SystemRedux.SYSTEM_ALERT_DELETE_ALL: {
            const actionTyped = action as SystemRedux.SystemAlertDeleteAllAction;

            let ret = next(action);
            let alerts: AdaptableAlert[] = actionTyped.Alerts;
            alerts.forEach(alert => {
              if (alert.AlertDefinition.AlertProperties.HighlightCell && alert.DataChangedInfo) {
                let record = alert.DataChangedInfo.RowNode;
                adaptable.refreshCells([record], [alert.DataChangedInfo.ColumnId]);
              }
            });

            return ret;
          }

          /*******************
           * UPDATED ROW ACTIONS
           *******************/

          /**
           * Use Case: User has deleted a Updated Row
           * Action: Refresh the row (to clear the style)
           */
          case SystemRedux.SYSTEM_UPDATED_ROW_DELETE: {
            const actionTyped = action as SystemRedux.SystemUpdatedRowDeleteAction;
            let ret = next(action);
            let rowNode: any[] = adaptable.getRowNodeForPrimaryKey(
              actionTyped.updatedRowInfo.primaryKeyValue
            );
            adaptable.redrawRow(rowNode);
            return ret;
          }

          /**
           * Use Case: User has deleted all Updated Rows
           * Action: Refresh the rows (to clear the style)
           */
          case SystemRedux.SYSTEM_UPDATED_ROW_DELETE_ALL: {
            const actionTyped = action as SystemRedux.SystemUpdatedRowDeleteAllAction;
            let ret = next(action);
            let updatedRowInfos: UpdatedRowInfo[] = actionTyped.updatedRowInfos;
            updatedRowInfos.forEach(uri => {
              let rowNode: any[] = adaptable.getRowNodeForPrimaryKey(uri.primaryKeyValue);
              adaptable.redrawRow(rowNode);
            });
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
            let returnObj = adaptable.CalculatedColumnExpressionService.IsExpressionValid(
              (action as SystemRedux.CalculatedColumnIsExpressionValidAction).expression
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
           * Use Cases: User has created / edited / deleted a Calculated Column
           * Action:  Tell Adaptableso it can do what it needs
           */

          case CalculatedColumnRedux.CALCULATEDCOLUMN_ADD: {
            let returnAction = next(action);
            let calculatedColumn: CalculatedColumn = (action as CalculatedColumnRedux.CalculatedColumnAddAction)
              .calculatedColumn;
            adaptable.addCalculatedColumnToGrid(calculatedColumn);
            return returnAction;
          }

          case CalculatedColumnRedux.CALCULATEDCOLUMN_DELETE: {
            const actionTyped = action as CalculatedColumnRedux.CalculatedColumnDeleteAction;
            adaptable.removeCalculatedColumnFromGrid(actionTyped.calculatedColumn.ColumnId);
            let returnAction = next(action);
            return returnAction;
          }

          case CalculatedColumnRedux.CALCULATEDCOLUMN_EDIT: {
            const actionTyped = action as CalculatedColumnRedux.CalculatedColumnEditAction;
            adaptable.editCalculatedColumnInGrid(actionTyped.calculatedColumn);
            let returnAction = next(action);
            return returnAction;
          }

          /*******************
           * FREE TEXT COLUMN ACTIONS
           *******************/

          /**
           * Use Cases: User has created / edited / deleted a Free Text column
           * Action:  Tell Adaptableso it can do what it needs
           */
          case FreeTextColumnRedux.FREE_TEXT_COLUMN_ADD: {
            const actionTyped = action as FreeTextColumnRedux.FreeTextColumnAddAction;
            adaptable.addFreeTextColumnToGrid(actionTyped.freeTextColumn);
            let returnAction = next(action);
            return returnAction;
          }

          case FreeTextColumnRedux.FREE_TEXT_COLUMN_EDIT: {
            const actionTyped = action as FreeTextColumnRedux.FreeTextColumnEditAction;
            adaptable.editFreeTextColumnInGrid(actionTyped.freeTextColumn);
            let returnAction = next(action);
            return returnAction;
          }

          case FreeTextColumnRedux.FREE_TEXT_COLUMN_DELETE: {
            const actionTyped = action as FreeTextColumnRedux.FreeTextColumnDeleteAction;
            adaptable.removeFreeTextColumnFromGrid(actionTyped.freeTextColumn.ColumnId);
            let returnAction = next(action);
            return returnAction;
          }

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
            const actionTyped = action as ColumnCategoryRedux.ColumnCategoryDeleteAction;
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
           * Also - check if the chart being deleted is the current chart and if so then update the current selected chart to empty.
           * Note:  No need to worry about using a popup as cannot delete a chart while in popup (other than through api)
           */
          case ChartRedux.CHART_DEFINITION_DELETE: {
            let returnAction = next(action);
            middlewareAPI.dispatch(SystemRedux.ChartSetChartVisibility(ChartVisibility.Hidden));

            let chartState = middlewareAPI.getState().Chart;
            let currentChartName = chartState.CurrentChartName;

            if (StringExtensions.IsNotNullOrEmpty(currentChartName)) {
              const actionTyped = action as ChartRedux.ChartDefinitionDeleteAction;

              let chartDefinition: ChartDefinition = actionTyped.chartDefinition;
              if (chartDefinition && currentChartName == actionTyped.chartDefinition.Name) {
                middlewareAPI.dispatch(ChartRedux.ChartDefinitionSelect(''));
              }
            }
            return returnAction;
          }

          /**
           * Use Case: User clears the currrent chart
           * Action:  Set chart visibility to hidden
           */
          case ChartRedux.CHART_DEFINITION_SELECT: {
            const actionTyped = action as ChartRedux.ChartDefinitionSelectAction;
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
            const actionTyped = action as SystemRedux.ChartSetChartVisibiityAction;
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
              if (currentLayout.AdaptableGridInfo == null) {
                currentLayout.AdaptableGridInfo = {
                  CurrentColumns: currentLayout.Columns,
                  CurrentColumnSorts: currentLayout.ColumnSorts,
                };
              }

              let hasNoVendorGridInfo: boolean = currentLayout.VendorGridInfo == null;
              if (hasNoVendorGridInfo) {
                adaptable.setGroupedColumns(currentLayout.GroupedColumns);
                adaptable.setPivotingDetails(currentLayout.PivotDetails);
              }

              let gridState: GridState = middlewareAPI.getState().Grid;
              // set columns
              let adaptableColumns: AdaptableColumn[] = [];
              currentLayout.AdaptableGridInfo.CurrentColumns.forEach(c => {
                let column = ColumnHelper.getColumnFromId(c, gridState.Columns);
                if (column) {
                  adaptableColumns.push(column);
                } else {
                  LoggingHelper.LogAdaptableWarning(
                    "Column '" + c + "' not found while selecting layout: " + currentLayout
                  );
                }
              });
              middlewareAPI.dispatch(SystemRedux.SetNewColumnListOrder(adaptableColumns));
              // set sort
              middlewareAPI.dispatch(
                GridRedux.GridSetSort(currentLayout.AdaptableGridInfo.CurrentColumnSorts)
              );
              adaptable.setColumnSort(currentLayout.AdaptableGridInfo.CurrentColumnSorts);

              // set pivot mode
              adaptable.setPivotMode(currentLayout.PivotDetails, currentLayout.VendorGridInfo);

              // set vendor specific info
              adaptable.setVendorGridLayoutInfo(currentLayout.VendorGridInfo);
              //  adaptable.reloadGrid();
              if (hasNoVendorGridInfo) {
                let currentGridVendorInfo =
                  currentLayout.Name == DEFAULT_LAYOUT
                    ? adaptable.getVendorGridDefaultLayoutInfo()
                    : adaptable.getVendorGridLayoutInfo(
                        currentLayout.AdaptableGridInfo.CurrentColumns
                      );

                currentLayout.VendorGridInfo = currentGridVendorInfo;
                middlewareAPI.dispatch(LayoutRedux.LayoutSave(currentLayout));
              }
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
            const actionTyped = action as LayoutRedux.LayoutSaveAction;
            let layout: Layout = Helper.cloneObject(actionTyped.layout);
            if (layout.AdaptableGridInfo == null) {
              layout.AdaptableGridInfo = {
                CurrentColumns: layout.Columns,
                CurrentColumnSorts: layout.ColumnSorts,
              };
            }
            if (layout.VendorGridInfo == null) {
              adaptable.setGroupedColumns(layout.GroupedColumns);
              adaptable.setPivotingDetails(layout.PivotDetails);
            }

            let layouts: Layout[] = adaptable.api.layoutApi.getAllLayout();
            let isExistingLayout: boolean = layouts.find(l => l.Uuid == layout.Uuid) != null;

            // if its default layout then we need to use the id for that one to prevent 2 layouts being created
            // - this is all a bit messy and needs refactoring
            if (layout.Name == DEFAULT_LAYOUT) {
              let currentDefaultLayout = layouts.find(l => l.Name == DEFAULT_LAYOUT);
              if (currentDefaultLayout) {
                layout.Uuid = currentDefaultLayout.Uuid;
                isExistingLayout = true;
              }
            }
            if (isExistingLayout) {
              let currentGridVendorInfo =
                layout.Name == DEFAULT_LAYOUT
                  ? adaptable.getVendorGridDefaultLayoutInfo()
                  : adaptable.getVendorGridLayoutInfo(layout.AdaptableGridInfo.CurrentColumns);

              layout.VendorGridInfo = currentGridVendorInfo;
              middlewareAPI.dispatch(LayoutRedux.LayoutEdit(layout));
            } else {
              middlewareAPI.dispatch(LayoutRedux.LayoutAdd(layout));
            }
            return returnAction;
          }
          case LayoutRedux.LAYOUT_RESTORE: {
            let returnAction = next(action);
            const actionTyped = action as LayoutRedux.LayoutRestoreAction;
            let layout: Layout = Helper.cloneObject(actionTyped.layout);
            layout.VendorGridInfo = null;
            layout.AdaptableGridInfo = null;
            if (layout.GroupedColumns == null) {
              layout.GroupedColumns = [];
            }
            adaptable.setGroupedColumns(layout.GroupedColumns);
            adaptable.setPivotingDetails(layout.PivotDetails);

            middlewareAPI.dispatch(LayoutRedux.LayoutEdit(layout));
            middlewareAPI.dispatch(LayoutRedux.LayoutSelect(layout.Name));
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
              adaptable.strategies.get(StrategyConstants.SmartEditStrategyId)
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
              adaptable.strategies.get(StrategyConstants.SmartEditStrategyId)
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
           * Action (2):  Sends these new values to the Smart Edit Strategy (which will, in turn, apply them to Adaptable)
           */
          case SmartEditRedux.SMARTEDIT_APPLY: {
            let SmartEditStrategy = <ISmartEditStrategy>(
              adaptable.strategies.get(StrategyConstants.SmartEditStrategyId)
            );
            const actionTyped = action as SmartEditRedux.SmartEditApplyAction;
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
              adaptable.strategies.get(StrategyConstants.BulkUpdateStrategyId)
            );
            let state = middlewareAPI.getState();
            let returnAction = next(action);
            let apiReturn: BulkUpdateValidationResult = BulkUpdateStrategy.CheckCorrectCellSelection();

            if (apiReturn.Alert) {
              // check if BulkUpdate is showing as popup
              let popup = state.Popup.ScreenPopup;
              if (popup.ComponentName == ScreenPopups.BulkUpdatePopup) {
                //We close the BulkUpdatePopup
                middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                //We show the Error Popup -- assume that will alwasy be an Error
                middlewareAPI.dispatch(PopupRedux.PopupShowAlert(apiReturn.Alert));
              }
            }
            middlewareAPI.dispatch(SystemRedux.BulkUpdateSetValidSelection(apiReturn));
            return returnAction;
          }

          // Here we have all actions that triggers a refresh of the BulkUpdatePreview
          case BulkUpdateRedux.BULK_UPDATE_CHANGE_VALUE: {
            //all our logic needs to be executed AFTER the main reducers
            //so our state is up to date which allow us not to care about the data within each different action
            let returnAction = next(action);

            let BulkUpdateStrategy = <IBulkUpdateStrategy>(
              adaptable.strategies.get(StrategyConstants.BulkUpdateStrategyId)
            );
            let state = middlewareAPI.getState();
            let apiReturn = BulkUpdateStrategy.BuildPreviewValues(state.BulkUpdate.BulkUpdateValue);
            middlewareAPI.dispatch(SystemRedux.BulkUpdateSetPreview(apiReturn));
            return returnAction;
          }

          case BulkUpdateRedux.BULK_UPDATE_APPLY: {
            let BulkUpdateStrategy = <IBulkUpdateStrategy>(
              adaptable.strategies.get(StrategyConstants.BulkUpdateStrategyId)
            );
            const actionTyped = action as BulkUpdateRedux.BulkUpdateApplyAction;
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
            const actionTyped = action as PlusMinusRedux.PlusMinusApplyAction;
            if (ArrayExtensions.IsNotNullOrEmpty(actionTyped.GridCells)) {
              let dataChangedInfos: DataChangedInfo[] = actionTyped.GridCells.map(gc => {
                return {
                  OldValue: adaptable.getDisplayValue(gc.primaryKeyValue, gc.columnId),
                  NewValue: gc.value,
                  ColumnId: gc.columnId,
                  PrimaryKeyValue: gc.primaryKeyValue,
                };
              });
              dataChangedInfos.forEach(dc => {
                adaptable.setValue(dc, true);
              });
            }
            middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
            return next(action);
          }

          /*******************
           * EXPORT ACTIONS
           *******************/

          case ExportRedux.EXPORT_APPLY: {
            let exportStrategy = <IExportStrategy>(
              adaptable.strategies.get(StrategyConstants.ExportStrategyId)
            );
            const actionTyped = action as ExportRedux.ExportApplyAction;
            if (actionTyped.ExportDestination == ExportDestination.iPushPull) {
              // for ipushpull we neeed to show a series of pages (login, domain pages etc.) before we actually get to export
              // so we have a series of actions depending on where we are in the process
              if (adaptable.PushPullService.getIPPStatus() != ServiceStatus.Connected) {
                let params: StrategyParams = {
                  value: actionTyped.Report.Name,
                  source: 'Other',
                };

                middlewareAPI.dispatch(
                  PopupRedux.PopupShowScreen(
                    StrategyConstants.ExportStrategyId,
                    'IPushPullLogin',
                    params,
                    { footer: false }
                  )
                );
              } else if (!actionTyped.Folder) {
                adaptable.PushPullService.GetDomainPages()
                  .then((domainpages: IPushPullDomain[]) => {
                    middlewareAPI.dispatch(SystemRedux.SetIPushPullDomainsPages(domainpages));
                    middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(''));
                  })
                  .catch((err: any) => {
                    middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(err));
                  });
                let params: StrategyParams = {
                  value: actionTyped.Report.Name,
                  source: 'Other',
                };
                middlewareAPI.dispatch(
                  PopupRedux.PopupShowScreen(
                    StrategyConstants.ExportStrategyId,
                    'IPushPullDomainPageSelector',
                    params,
                    { footer: false }
                  )
                );
              } else {
                exportStrategy.Export(
                  actionTyped.Report,
                  actionTyped.ExportDestination,
                  actionTyped.IsLiveReport,
                  actionTyped.Folder,
                  actionTyped.Page
                );
                middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
              }
            } else {
              // for all other destinations we can go straight to export
              // if its Openfin then we will get the page from the OpenFin Helper
              // if its Glue then we dont currently get a page but we probably should
              exportStrategy.Export(
                actionTyped.Report,
                actionTyped.ExportDestination,
                actionTyped.IsLiveReport
              );
              middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
            }
            return next(action);
          }

          case ExportRedux.IPP_LOGIN: {
            const actionTyped = action as ExportRedux.IPPLoginAction;
            adaptable.PushPullService.Login(actionTyped.Login, actionTyped.Password)
              .then(() => {
                let report = middlewareAPI.getState().Popup.ScreenPopup.Params;
                middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(''));

                const result = adaptable.PushPullService.GetDomainPages()
                  .then((domainpages: IPushPullDomain[]) => {
                    middlewareAPI.dispatch(SystemRedux.SetIPushPullDomainsPages(domainpages));
                    middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(''));
                  })
                  .catch((error: any) => {
                    middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(error));
                  });
                let params: StrategyParams = {
                  value: report,
                  source: 'Other',
                };
                middlewareAPI.dispatch(
                  PopupRedux.PopupShowScreen(
                    StrategyConstants.ExportStrategyId,
                    'IPushPullDomainPageSelector',
                    params,
                    { footer: false }
                  )
                );
                return result;
              })
              .catch((error: string) => {
                middlewareAPI.dispatch(ExportRedux.IPPLoginFailed(error));
                LoggingHelper.LogAdaptableError('Login failed', error);
                middlewareAPI.dispatch(SystemRedux.ReportSetErrorMessage(error));
              });
            return next(action);
          }
          case SystemRedux.REPORT_START_LIVE: {
            let ret = next(action);
            const actionTyped = action as SystemRedux.ReportStartLiveAction;
            // fire the Live Report event for Export Started
            adaptable.ReportService.PublishLiveReportUpdatedEvent(
              actionTyped.ExportDestination,
              LiveReportTrigger.ExportStarted
            );
            // set livereport on
            adaptable.api.internalApi.setLiveReportRunningOn();
            return ret;
          }
          case SystemRedux.REPORT_STOP_LIVE: {
            const actionTyped = action as SystemRedux.ReportStopLiveAction;
            if (actionTyped.ExportDestination == ExportDestination.iPushPull) {
              let currentLiveReports = middlewareAPI.getState().System.CurrentLiveReports;
              let lre = currentLiveReports.find(
                x =>
                  x.Report == actionTyped.Report &&
                  x.ExportDestination == actionTyped.ExportDestination
              );
              adaptable.PushPullService.UnloadPage(lre.PageName);
            }
            let ret = next(action);
            // fire the Live Report event for Export Stopped
            adaptable.ReportService.PublishLiveReportUpdatedEvent(
              actionTyped.ExportDestination,
              LiveReportTrigger.ExportStopped
            );
            // set livereport off
            adaptable.api.internalApi.setLiveReportRunningOff();
            return ret;
          }

          /*******************
           * USER FILTER ACTIONS
           *******************/
          case UserFilterRedux.USER_FILTER_CREATE_FROM_COLUMN_FILTER: {
            const actionTyped = action as UserFilterRedux.CreateUserFilterFromColumnFilterAction;
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
            const actionTyped = action as TeamSharingRedux.TeamSharingShareAction;
            let returnAction = next(action);
            let xhr = new XMLHttpRequest();
            xhr.onerror = (ev: any) =>
              LoggingHelper.LogAdaptableError(
                'TeamSharing share error :' + ev.message,
                actionTyped.Entity
              );
            xhr.ontimeout = () =>
              LoggingHelper.LogAdaptableWarning('TeamSharing share timeout', actionTyped.Entity);
            xhr.onload = () => {
              if (xhr.readyState == 4) {
                if (xhr.status != 200) {
                  LoggingHelper.LogAdaptableError(
                    'TeamSharing share error : ' + xhr.statusText,
                    actionTyped.Entity
                  );
                  middlewareAPI.dispatch(
                    PopupRedux.PopupShowAlert({
                      Header: 'Team Sharing Error',
                      Msg: "Couldn't share item: " + xhr.statusText,
                      AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
                        MessageType.Error
                      ),
                    })
                  );
                } else {
                  middlewareAPI.dispatch(
                    PopupRedux.PopupShowAlert({
                      Header: 'Team Sharing',
                      Msg: 'Item Shared Successfully',
                      AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
                        MessageType.Info
                      ),
                    })
                  );
                }
              }
            };
            //we make the request async
            xhr.open('POST', configServerTeamSharingUrl, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            let obj: SharedEntity = {
              entity: actionTyped.Entity,
              user: adaptable.adaptableOptions.userName,
              adaptable_id: adaptable.adaptableOptions.adaptableId,
              functionName: actionTyped.FunctionName,
              timestamp: new Date(),
            };
            xhr.send(JSON.stringify(obj));
            return returnAction;
          }
          case TeamSharingRedux.TEAMSHARING_GET: {
            let returnAction = next(action);
            let xhr = new XMLHttpRequest();
            xhr.onerror = (ev: any) =>
              LoggingHelper.LogAdaptableError('TeamSharing get error :' + ev.message);
            xhr.ontimeout = () => LoggingHelper.LogAdaptableWarning('TeamSharing get timeout');
            xhr.onload = () => {
              if (xhr.readyState == 4) {
                if (xhr.status != 200) {
                  LoggingHelper.LogAdaptableError('TeamSharing get error : ' + xhr.statusText);
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
            const actionTyped = action as TeamSharingRedux.TeamSharingImportItemAction;
            let importAction: Redux.Action;
            let overwriteConfirmation = false;
            switch (actionTyped.FunctionName) {
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
                  AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
                    MessageType.Info
                  ),
                })
              );
            } else {
              LoggingHelper.LogAdaptableError('Unknown item type', actionTyped.Entity);
              middlewareAPI.dispatch(
                PopupRedux.PopupShowAlert({
                  Header: 'Team Sharing Error:',
                  Msg: 'Item not recognized. Cannot import',
                  AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
                    MessageType.Error
                  ),
                })
              );
            }
            return returnAction;
          }

          case SystemRedux.SET_NEW_COLUMN_LIST_ORDER:
            const actionTyped = action as SystemRedux.SetNewColumnListOrderAction;
            adaptable.setNewColumnListOrder(actionTyped.VisibleColumnList);
            return next(action);

          /*******************
           * GRID (INTERNAL) ACTIONS
           *******************/
          case GridRedux.GRID_SET_VALUE_LIKE_EDIT: {
            const actionTyped = action as GridRedux.GridSetValueLikeEditAction;
            adaptable.setValue(actionTyped.DataChangedInfo, true);
            return next(action);
          }

          case GridRedux.GRID_SET_VALUE_LIKE_EDIT_BATCH: {
            const actionTyped = action as GridRedux.GridSetValueLikeEditBatchAction;
            actionTyped.DataChangedInfoBatch.forEach(dc => {
              adaptable.setValue(dc, true);
            });

            return next(action);
          }

          case GridRedux.GRID_HIDE_COLUMN: {
            const actionTyped = action as GridRedux.GridHideColumnAction;
            let columnList = [].concat(
              middlewareAPI.getState().Grid.Columns.filter(c => c.Visible)
            );
            let columnIndex = columnList.findIndex(x => x.ColumnId == actionTyped.ColumnId);
            columnList.splice(columnIndex, 1);
            adaptable.setNewColumnListOrder(columnList);
            return next(action);
          }
          case GridRedux.GRID_SELECT_COLUMN: {
            const actionTyped = action as GridRedux.GridSelectColumnAction;
            adaptable.selectColumn(actionTyped.ColumnId);
            return next(action);
          }
          case GridRedux.GRID_CREATE_CELLS_SUMMARY: {
            let SelectedCellsStrategy = <ICellSummaryStrategy>(
              adaptable.strategies.get(StrategyConstants.CellSummaryStrategyId)
            );
            let returnAction = next(action);
            let selectedCellInfo = middlewareAPI.getState().Grid.SelectedCellInfo;
            let apiSummaryReturn: CellSummmary = SelectedCellsStrategy.CreateCellSummary(
              selectedCellInfo
            );
            middlewareAPI.dispatch(GridRedux.GridSetCellSummary(apiSummaryReturn));
            return returnAction;
          }

          case GridRedux.GRID_REFRESH_CELLS: {
            const actionTyped = action as GridRedux.GridRefreshCellsAction;

            let ret = next(action);
            adaptable.refreshCells(actionTyped.rows, actionTyped.columnIds);

            return ret;
          }

          /*******************
           * POPUP (INTERNAL) ACTIONS
           *******************/
          case PopupRedux.POPUP_CONFIRM_PROMPT: {
            let promptConfirmationAction = middlewareAPI.getState().Popup.PromptPopup.ConfirmAction;
            if (promptConfirmationAction) {
              let inputText: string = (action as InputAction).InputText;
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
            adaptable.showQuickFilter();
            return next(action);
          }

          case GridRedux.GRID_QUICK_FILTER_BAR_HIDE: {
            adaptable.hideQuickFilter();
            return next(action);
          }

          case GridRedux.FILTER_FORM_HIDE: {
            adaptable.hideFilterForm();
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
            adaptable.setColumnIntoStore();

            let gridState: GridState = middlewareAPI.getState().Grid;
            let layoutState: LayoutState = middlewareAPI.getState().Layout;

            //create the default layout (if not there) so we can revert to it if needed
            let currentLayout = DEFAULT_LAYOUT;
            let defaultLayout: Layout = ObjectFactory.CreateLayout(
              gridState.Columns,
              [],
              adaptable.getVendorGridDefaultLayoutInfo(),
              DEFAULT_LAYOUT
            );
            middlewareAPI.dispatch(LayoutRedux.LayoutSave(defaultLayout));
            if (layoutState.Layouts.length > 0) {
              currentLayout = layoutState.CurrentLayout;
            }

            //Create all calculated columns before we load the layout
            middlewareAPI
              .getState()
              .CalculatedColumn.CalculatedColumns.forEach((cc: CalculatedColumn) => {
                adaptable.addCalculatedColumnToGrid(cc);
              });

            //Create all free text columns before we load the layout
            middlewareAPI
              .getState()
              .FreeTextColumn.FreeTextColumns.forEach((ftc: FreeTextColumn) => {
                adaptable.addFreeTextColumnToGrid(ftc);
              });

            //Create all action columns before we load the layout
            middlewareAPI.getState().ActionColumn.ActionColumns.forEach((ac: ActionColumn) => {
              adaptable.addActionColumnToGrid(ac);
            });

            //load the default layout if its current
            if (currentLayout == DEFAULT_LAYOUT) {
              middlewareAPI.dispatch(LayoutRedux.LayoutSelect(currentLayout));
            }

            // create the functions menu (for use in the home toolbar and the toolpanel)
            adaptable.createFunctionMenu();

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

    SystemRedux.SYSTEM_ALERT_ADD,
    SystemRedux.SYSTEM_ALERT_DELETE,
    SystemRedux.SYSTEM_ALERT_DELETE_ALL,

    SystemRedux.SYSTEM_UPDATED_ROW_ADD,
    SystemRedux.SYSTEM_UPDATED_ROW_DELETE,
    SystemRedux.SYSTEM_UPDATED_ROW_DELETE_ALL,

    SystemRedux.REPORT_START_LIVE,
    SystemRedux.REPORT_STOP_LIVE,
    SystemRedux.SET_IPP_DOMAIN_PAGES,
    SystemRedux.REPORT_SET_ERROR_MESSAGE,

    ExportRedux.IPP_LOGIN,
    ExportRedux.IPP_LOGIN_FAILED,

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

    GridRedux.GRID_SELECT_COLUMN,
    GridRedux.GRID_SET_COLUMNS,
    GridRedux.GRID_ADD_COLUMN,
    GridRedux.GRID_EDIT_COLUMN,
    GridRedux.GRID_HIDE_COLUMN,
    GridRedux.GRID_SET_VALUE_LIKE_EDIT,
    GridRedux.GRID_SET_SORT,
    GridRedux.GRID_SET_SELECTED_CELLS,
    GridRedux.GRID_SET_SELECTED_ROWS,
    GridRedux.GRID_CREATE_CELLS_SUMMARY,
    GridRedux.GRID_SET_CELLS_SUMMARY,
    GridRedux.GRID_REFRESH_CELLS,
    GridRedux.FILTER_FORM_HIDE,
    GridRedux.GRID_QUICK_FILTER_BAR_SHOW,
    GridRedux.GRID_QUICK_FILTER_BAR_HIDE,
    GridRedux.SET_MAIN_MENUITEMS,
    GridRedux.SET_GLUE42_AVAILABLE_ON,
    GridRedux.SET_GLUE42_AVAILABLE_OFF,
    GridRedux.SET_IPUSHPULL_AVAILABLE_ON,
    GridRedux.SET_IPUSHPULL_AVAILABLE_OFF,
    GridRedux.SET_LIVE_REPORT_RUNNING_ON,
    GridRedux.SET_LIVE_REPORT_RUNNING_OFF,
    GridRedux.SET_PIVOT_MODE_ON,
    GridRedux.SET_PIVOT_MODE_OFF,

    PopupRedux.POPUP_SHOW_SCREEN,
    PopupRedux.POPUP_HIDE_SCREEN,
    PopupRedux.POPUP_SHOW_LOADING,
    PopupRedux.POPUP_HIDE_LOADING,
    PopupRedux.POPUP_SHOW_GRID_INFO,
    PopupRedux.POPUP_HIDE_GRID_INFO,
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
  // Due to poor coding the Apply method only has warnings (though we mitigate by doing the same thing via the API)
  // As few users currently audit functions and few have editable grids its not an urgent problem but one that we should fix

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
