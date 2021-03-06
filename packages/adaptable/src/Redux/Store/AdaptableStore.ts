import { MathOperation, MessageType } from '../../PredefinedConfig/Common/Enums';
import * as Redux from 'redux';
import * as DeepDiff from 'deep-diff';
import { composeWithDevTools } from 'redux-devtools-extension';
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
import * as DataSourceRedux from '../ActionsReducers/DataSourceRedux';
import * as FilterRedux from '../ActionsReducers/FilterRedux';
import * as SystemFilterRedux from '../ActionsReducers/FilterRedux';
import * as ThemeRedux from '../ActionsReducers/ThemeRedux';
import * as FormatColumnRedux from '../ActionsReducers/FormatColumnRedux';
import * as GradientColumnRedux from '../ActionsReducers/GradientColumnRedux';
import * as ActionColumnRedux from '../ActionsReducers/ActionColumnRedux';
import * as ApplicationRedux from '../ActionsReducers/ApplicationRedux';
import * as SparklineColumnRedux from '../ActionsReducers/SparklineColumnRedux';
import * as FreeTextColumnRedux from '../ActionsReducers/FreeTextColumnRedux';
import * as LayoutRedux from '../ActionsReducers/LayoutRedux';
import * as DashboardRedux from '../ActionsReducers/DashboardRedux';
import * as ToolPanelRedux from '../ActionsReducers/ToolPanelRedux';
import * as CellValidationRedux from '../ActionsReducers/CellValidationRedux';
import * as PercentBarRedux from '../ActionsReducers/PercentBarRedux';
import * as ScheduleRedux from '../ActionsReducers/ScheduleRedux';
import * as EntitlementsRedux from '../ActionsReducers/EntitlementsRedux';
import * as CellSummaryRedux from '../ActionsReducers/CellSummaryRedux';
import * as SystemStatusRedux from '../ActionsReducers/SystemStatusRedux';
import * as TeamSharingRedux from '../ActionsReducers/TeamSharingRedux';
import * as UserInterfaceRedux from '../ActionsReducers/UserInterfaceRedux';
import * as QueryRedux from '../ActionsReducers/QueryRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { ISmartEditStrategy } from '../../Strategy/Interface/ISmartEditStrategy';
import {
  IBulkUpdateStrategy,
  BulkUpdateValidationResult,
} from '../../Strategy/Interface/IBulkUpdateStrategy';
import { IExportStrategy } from '../../Strategy/Interface/IExportStrategy';
import { IAdaptableStore } from './Interface/IAdaptableStore';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as ConfigConstants from '../../Utilities/Constants/ConfigConstants';
import { LayoutState } from '../../PredefinedConfig/LayoutState';
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';
import { Report } from '../../PredefinedConfig/ExportState';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import {
  BULK_UPDATE_VALUE_STATE_PROPERTY,
  CURRENT_CALENDAR_STATE_PROPERTY,
  SUMMARY_OPERATION_STATE_PROPERTY,
  CURRENT_LAYOUT_STATE_PROPERTY,
  QUICK_SEARCH_TEXT_STATE_PROPERTY,
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
  EMPTY_STRING,
  CURRENT_SHARED_QUERY_STATE_PROPERTY,
} from '../../Utilities/Constants/GeneralConstants';
import { ICellSummaryStrategy } from '../../Strategy/Interface/ICellSummaryStrategy';
import { CellSummmary } from '../../PredefinedConfig/Selection/CellSummmary';
import { PreviewHelper } from '../../Utilities/Helpers/PreviewHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { IUIConfirmation, InputAction, AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ChartVisibility } from '../../PredefinedConfig/Common/ChartEnums';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import IStorageEngine from './Interface/IStorageEngine';
import { CalculatedColumn } from '../../PredefinedConfig/CalculatedColumnState';
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
import { UpdatedRowInfo } from '../../Utilities/Services/Interface/IDataService';
import { DataChangedInfo } from '../../PredefinedConfig/Common/DataChangedInfo';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { IStrategyActionReturn } from '../../Strategy/Interface/IStrategyActionReturn';
import { TeamSharingImportInfo } from '../../PredefinedConfig/TeamSharingState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { createUuid } from '../../PredefinedConfig/Uuid';
import { ICalculatedColumnStrategy } from '../../Strategy/Interface/ICalculatedColumnStrategy';
import { IFreeTextColumnStrategy } from '../../Strategy/Interface/IFreeTextColumnStrategy';
import { IActionColumnStrategy } from '../../Strategy/Interface/IActionColumnStrategy';
import { ColumnFilter, UserFilter } from '../../PredefinedConfig/FilterState';

type EmitterCallback = (data?: any) => any;
type EmitterAnyCallback = (eventName: string, data?: any) => any;

declare var process: any;

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
    /*
This is the main store for Adaptable State
*/

    let rootReducerObject = {
      //  Reducers for Non-Persisted State
      Grid: GridRedux.GridReducer,
      Popup: PopupRedux.PopupReducer,
      System: SystemRedux.SystemReducer,
      SystemStatus: SystemStatusRedux.SystemStatusReducer,
      TeamSharing: TeamSharingRedux.TeamSharingReducer,
      Plugins: PluginsRedux.PluginsReducer,

      // IPushPull: (state: IPushPullState, action: Redux.Action) => {
      //   return state || null;
      // },
      // Glue42: (state: Glue42State, action: Redux.Action) => {
      //   return state || null;
      // },
      // OpenFin: (state: OpenFinState, action: Redux.Action) => {
      //   return state || null;
      // },

      ActionColumn: ActionColumnRedux.ActionColumnReducer,
      Entitlements: EntitlementsRedux.EntitlementsReducer,
      SparklineColumn: SparklineColumnRedux.SparklineColumnReducer,
      Filter: SystemFilterRedux.FilterReducer,
      UserInterface: UserInterfaceRedux.UserInterfaceStateReducer,

      // not sure
      CellSummary: CellSummaryRedux.CellSummaryReducer,

      // Reducers for Persisted State
      Alert: AlertRedux.AlertReducer,
      Application: ApplicationRedux.ApplicationReducer,
      BulkUpdate: BulkUpdateRedux.BulkUpdateReducer,
      CalculatedColumn: CalculatedColumnRedux.CalculatedColumnReducer,
      Calendar: CalendarRedux.CalendarReducer,
      CellValidation: CellValidationRedux.CellValidationReducer,
      Chart: ChartRedux.ChartReducer,
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
      Schedule: ScheduleRedux.ScheduleReducer,
      GradientColumn: GradientColumnRedux.GradientColumnReducer,
      PlusMinus: PlusMinusRedux.PlusMinusReducer,
      QuickSearch: QuickSearchRedux.QuickSearchReducer,
      Shortcut: ShortcutRedux.ShortcutReducer,
      SmartEdit: SmartEditRedux.SmartEditReducer,
      Theme: ThemeRedux.ThemeReducer,
      ToolPanel: ToolPanelRedux.ToolPanelReducer,
      UpdatedRow: UpdatedRowRedux.UpdatedRowReducer,
      Query: QueryRedux.QueryReducer,
    };

    // allow plugins to participate in the root reducer
    adaptable.forPlugins(plugin => {
      if (plugin.rootReducer) {
        rootReducerObject = { ...rootReducerObject, ...plugin.rootReducer(rootReducerObject) };
      }
    });

    const initialRootReducer: Redux.Reducer<AdaptableState> = Redux.combineReducers<AdaptableState>(
      rootReducerObject
    );

    const rootReducerWithResetManagement = (state: AdaptableState, action: Redux.Action) => {
      switch (action.type) {
        case RESET_STATE:
          //This trigger the persist of the state with nothing
          state.Query = undefined;
          state.Alert = undefined;
          state.BulkUpdate = undefined;
          state.CalculatedColumn = undefined;
          state.Calendar = undefined;
          state.CellValidation = undefined;
          state.ConditionalStyle = undefined;
          state.Chart = undefined;
          state.CustomSort = undefined;
          state.Dashboard.VisibleButtons = [];
          state.Dashboard = undefined;
          state.DataSource = undefined;
          state.Entitlements = undefined;
          state.Export = undefined;
          state.FlashingCell = undefined;
          state.FormatColumn = undefined;
          state.Filter.SystemFilters = [];
          state.Grid = undefined;
          state.Layout = undefined;
          state.PlusMinus = undefined;
          state.QuickSearch = undefined;
          state.Shortcut = undefined;
          state.SmartEdit = undefined;
          state.CellSummary = undefined;
          state.Theme = undefined;
          state.ToolPanel = undefined;
          break;
        case LOAD_STATE:
          const { State } = action as LoadStateAction;
          Object.keys(State).forEach(key => {
            state[key] = State[key];
          });
          break;
      }
      return initialRootReducer(state, action);
    };

    let storageEngine: IStorageEngine;

    this.emitter = new Emitter();

    // If the user has remote storage set then we use Remote Engine, otherwise we use Local Enginge
    // not sure we can do this as we need to be backwardly compatible with existing users so need to stick with adaptable id (which should be unique)
    // const localStorageKey =  'adaptable-adaptable-state-' + adaptable.adaptableOptions.primaryKey;

    storageEngine = createEngineLocal({
      adaptableId: adaptable.adaptableOptions.adaptableId,
      userName: adaptable.adaptableOptions.userName,
      predefinedConfig: adaptable.adaptableOptions.predefinedConfig,
      loadState: adaptable.adaptableOptions.stateOptions.loadState,
      persistState: adaptable.adaptableOptions.stateOptions.persistState,
    });

    const nonPersistentReduxKeys = [
      // Non Persisted State
      ConfigConstants.SYSTEM,
      ConfigConstants.GRID,
      ConfigConstants.POPUP,
      ConfigConstants.TEAM_SHARING,
      ConfigConstants.PLUGINS,

      // Config State - set ONLY in PredefinedConfig and never changed at runtime
      ConfigConstants.ENTITLEMENTS,
      ConfigConstants.SYSTEM_FILTER,
      //  ConfigConstants.USER_INTERFACE,
      // Config State - set ONLY in PredefinedConfig and never changed at runtime and contains functions
      ConfigConstants.ACTION_COLUMN,
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
      const emitterArg = { action, state, newState };
      this.emitter.emit(action.type, emitterArg);
      const finalState = emitterArg.newState;

      const shouldPersist = !NON_PERSIST_ACTIONS[action.type] && !init;
      if (shouldPersist) {
        const storageState = { ...finalState };

        nonPersistentReduxKeys.forEach(key => {
          delete storageState[key];
        });

        storageEngine.save(adaptable.adaptableOptions.stateOptions.saveState(storageState));
      }

      return finalState;
    };

    //TODO: need to check if we want the storage to be done before or after
    //we enrich the state with the AB middleware
    this.TheStore = Redux.createStore<AdaptableState, Redux.Action<any>, any, any>(
      persistedReducer,
      composeEnhancers(
        Redux.applyMiddleware(
          stateChangedAuditLogMiddleware(adaptable), // checks for changes in internal / user state and sends to audit log
          adaptableMiddleware(adaptable), // the main middleware that actually does stuff
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
           SHARED QUERY
          **********************
           */
          case QueryRedux.CURRENT_QUERY_CHANGE: {
            const actionTyped = action as QueryRedux.CurrentQueryChangeAction;

            let changedDetails: StatePropertyChangedDetails = {
              name: StrategyConstants.QueryStrategyId,
              actionType: action.type,
              state: newState.Query,
              diffInfo: diff,
              propertyName: CURRENT_SHARED_QUERY_STATE_PROPERTY,
              oldValue: oldState.Query.CurrentQuery,
              newValue: actionTyped.query,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }

          case QueryRedux.SHARED_QUERY_ADD: {
            const actionTyped = action as QueryRedux.SharedQueryAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.QueryStrategyId,
              actionType: action.type,
              state: newState.Query,
              diffInfo: diff,
              objectChanged: actionTyped.sharedQuery,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case QueryRedux.SHARED_QUERY_EDIT: {
            const actionTyped = action as QueryRedux.SharedQueryEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.QueryStrategyId,
              actionType: action.type,
              state: newState.Query,
              diffInfo: diff,
              objectChanged: actionTyped.sharedQuery,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case QueryRedux.SHARED_QUERY_DELETE: {
            const actionTyped = action as QueryRedux.SharedQueryDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.QueryStrategyId,
              actionType: action.type,
              state: newState.Query,
              diffInfo: diff,
              objectChanged: actionTyped.sharedQuery,
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
          COLUMN FILTER
         **********************
          */
          case FilterRedux.COLUMN_FILTER_ADD: {
            const actionTyped = action as FilterRedux.ColumnFilterAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.FilterStrategyId,
              actionType: action.type,
              state: newState.ColumnFilter,
              diffInfo: diff,
              objectChanged: actionTyped.columnFilter,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case FilterRedux.COLUMN_FILTER_EDIT: {
            const actionTyped = action as FilterRedux.ColumnFilterEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.FilterStrategyId,
              actionType: action.type,
              state: newState.ColumnFilter,
              diffInfo: diff,
              objectChanged: actionTyped.columnFilter,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case FilterRedux.COLUMN_FILTER_CLEAR: {
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.FilterStrategyId,
              actionType: action.type,
              state: newState.ColumnFilter,
              diffInfo: diff,
              objectChanged: undefined, // TODO: actionTyped.columnId - this should have the object not te column?
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case FilterRedux.COLUMN_FILTER_CLEAR_ALL: {
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.FilterStrategyId,
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
          case ScheduleRedux.REMINDER_SCHEDULE_ADD: {
            const actionTyped = action as ScheduleRedux.ReminderScheduleAddAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ReminderStrategyId,
              actionType: action.type,
              state: newState.Reminder,
              diffInfo: diff,
              objectChanged: actionTyped.reminderSchedule,
              stateObjectChangeType: StateObjectChangeType.Created,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ScheduleRedux.REMINDER_SCHEDULE_EDIT: {
            const actionTyped = action as ScheduleRedux.ReminderScheduleEditAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ReminderStrategyId,
              actionType: action.type,
              state: newState.Reminder,
              diffInfo: diff,
              objectChanged: actionTyped.reminderSchedule,
              stateObjectChangeType: StateObjectChangeType.Updated,
            };
            adaptable.AuditLogService.addUserStateChangeAuditLog(changedDetails);
            return ret;
          }
          case ScheduleRedux.REMINDER_SCHEDULE_DELETE: {
            const actionTyped = action as ScheduleRedux.ReminderScheduleDeleteAction;
            let changedDetails: StateObjectChangedDetails = {
              name: StrategyConstants.ReminderStrategyId,
              actionType: action.type,
              state: newState.Reminder,
              diffInfo: diff,
              objectChanged: actionTyped.reminderSchedule,
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
          case FilterRedux.USER_FILTER_ADD: {
            const actionTyped = action as FilterRedux.UserFilterAddAction;
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
          case FilterRedux.USER_FILTER_EDIT: {
            const actionTyped = action as FilterRedux.UserFilterEditAction;
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
          case FilterRedux.USER_FILTER_DELETE: {
            const actionTyped = action as FilterRedux.UserFilterDeleteAction;
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
// e.g. this should say when the current Shared Query has changed, or if a custom sort is being applied (it doesnt yet), but not when sorts have been added generally or searches changed
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
          case QueryRedux.CURRENT_QUERY_CHANGE: {
            const actionTyped = action as QueryRedux.CurrentQueryChangeAction;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.QueryStrategyId,
              action: action.type,
              info: actionTyped.query,
              data: actionTyped.query,
            };
            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }
          case ActionColumnRedux.ACTION_COLUMN_APPLY: {
            const actionTyped = action as ActionColumnRedux.ActionColumnApplyAction;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.ActionColumnStrategyId,
              action: action.type,
              info: actionTyped.actionColumnClickedInfo,
              data: actionTyped.actionColumnClickedInfo.actionColumn,
            };
            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }
          case CalculatedColumnRedux.CALCULATEDCOLUMN_ADD: {
            const actionTyped = action as CalculatedColumnRedux.CalculatedColumnAddAction;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.CalculatedColumnStrategyId,
              action: action.type,
              info: actionTyped.calculatedColumn.ColumnId,
              data: actionTyped.calculatedColumn,
            };
            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }
          case CalculatedColumnRedux.CALCULATEDCOLUMN_EDIT: {
            const actionTyped = action as CalculatedColumnRedux.CalculatedColumnEditAction;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.CalculatedColumnStrategyId,
              action: action.type,
              info: actionTyped.calculatedColumn.ColumnId,
              data: actionTyped.calculatedColumn,
            };
            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }
          case CalculatedColumnRedux.CALCULATEDCOLUMN_DELETE: {
            const actionTyped = action as CalculatedColumnRedux.CalculatedColumnDeleteAction;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.CalculatedColumnStrategyId,
              action: action.type,
              info: actionTyped.calculatedColumn.ColumnId,
              data: actionTyped.calculatedColumn,
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

          case FilterRedux.COLUMN_FILTER_ADD: {
            const actionTyped = action as FilterRedux.ColumnFilterAddAction;
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.FilterStrategyId,
              action: action.type,
              info: 'Column Filter Applied',
              data: {
                Column: actionTyped.columnFilter.ColumnId,
                ColumnFilter: adaptable.api.filterApi.columnFilterToString(
                  actionTyped.columnFilter
                ),
              },
            };
            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }
          case FilterRedux.COLUMN_FILTER_EDIT: {
            const actionTyped = action as FilterRedux.ColumnFilterEditAction;
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.FilterStrategyId,
              action: action.type,
              info: 'Column Filter Updated',
              data: {
                Column: actionTyped.columnFilter.ColumnId,
                ColumnFilter: adaptable.api.filterApi.columnFilterToString(
                  actionTyped.columnFilter
                ),
              },
            };

            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }

          case FilterRedux.COLUMN_FILTER_CLEAR: {
            const actionTyped = action as FilterRedux.ColumnFilterClearAction;

            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.FilterStrategyId,
              action: action.type,
              info: 'Column Filter Cleared',
              data: {
                Column: actionTyped.columnFilter,
              },
            };

            adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
            return next(action);
          }
          case LayoutRedux.LAYOUT_SELECT: {
            const actionTyped = action as LayoutRedux.LayoutSelectAction;
            let dataSource = state.Layout.Layouts!.find(l => l.Name == actionTyped.LayoutName);
            let functionAppliedDetails: FunctionAppliedDetails = {
              name: StrategyConstants.LayoutStrategyId,
              action: action.type,
              info: actionTyped.LayoutName,
              data: dataSource,
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
var adaptableMiddleware = (adaptable: IAdaptable): any =>
  function(
    middlewareAPI: Redux.MiddlewareAPI<Redux.Dispatch<Redux.Action<AdaptableState>>, AdaptableState>
  ) {
    return function(next: Redux.Dispatch<Redux.Action<AdaptableState>>) {
      return function(action: Redux.Action) {
        switch (action.type) {
          /*******************
           * SHARED QUERY ACTIONS
           *******************/

          /**
           * Use Case: User has deleted a Shared Query
           * Action: Need to check whether it is referenced elsewhere
           */
          case QueryRedux.SHARED_QUERY_DELETE: {
            const actionTyped = action as QueryRedux.SharedQueryDeleteAction;
            let ret: any;
            if (!adaptable.isSharedQueryReferenced(actionTyped.sharedQuery.Uuid)) {
              ret = next(action);
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
           * QUICK SEARCH ACTIONS
           *******************/

          /**
           * Use Case: User appliced Quick Search
           * Action: Redraw all rows
           */
          case QuickSearchRedux.QUICK_SEARCH_APPLY: {
            let ret = next(action);
            adaptable.redraw();
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
            if (
              adaptable.tryRemoveCalculatedColumnFromGrid(actionTyped.calculatedColumn.ColumnId)
            ) {
              let returnAction = next(action);
              return returnAction;
            }
            return null;
          }

          case CalculatedColumnRedux.CALCULATEDCOLUMN_EDIT: {
            const actionTyped = action as CalculatedColumnRedux.CalculatedColumnEditAction;
            adaptable.editCalculatedColumnInGrid(actionTyped.calculatedColumn);
            let returnAction = next(action);
            adaptable.redraw();
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
            const actionTyped = action as FreeTextColumnRedux.FreeTextColumnAddAction;
            adaptable.editFreeTextColumnInGrid(actionTyped.freeTextColumn);
            let returnAction = next(action);
            adaptable.redraw();
            return returnAction;
          }

          case FreeTextColumnRedux.FREE_TEXT_COLUMN_DELETE: {
            const actionTyped = action as FreeTextColumnRedux.FreeTextColumnDeleteAction;
            if (adaptable.tryRemoveFreeTextColumnFromGrid(actionTyped.freeTextColumn.ColumnId)) {
              let returnAction = next(action);
              return returnAction;
            }
            return null;
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
          // layout delete can trigger a new layout selection
          case LayoutRedux.LAYOUT_DELETE:
          case LayoutRedux.LAYOUT_SELECT: {
            let returnAction = next(action);
            let layoutState = middlewareAPI.getState().Layout;
            let gridState = middlewareAPI.getState().Grid;
            let currentLayout = layoutState.Layouts.find(l => l.Name == layoutState.CurrentLayout);

            if (gridState.CurrentLayout && gridState.CurrentLayout) {
              currentLayout = gridState.CurrentLayout;
            }

            if (currentLayout) {
              // tell grid the layout has been selected
              adaptable.setLayout(currentLayout);
            }

            if (!adaptable.adaptableOptions.layoutOptions?.autoSaveLayouts) {
              middlewareAPI.dispatch(LayoutRedux.LayoutUpdateCurrentDraft(currentLayout));
            }
            return returnAction;
          }
          case LayoutRedux.LAYOUT_ADD:
          case LayoutRedux.LAYOUT_SAVE: {
            let returnAction = next(action);
            const actionTyped = action as LayoutRedux.LayoutUpdateCurrentDraftAction;

            // if autosave is false
            if (!adaptable.adaptableOptions.layoutOptions?.autoSaveLayouts) {
              const layoutState = middlewareAPI.getState().Layout;
              // and the current layout is saved, make sure we also update the draft
              if (actionTyped.layout.Name === layoutState.CurrentLayout) {
                middlewareAPI.dispatch(LayoutRedux.LayoutUpdateCurrentDraft(actionTyped.layout));
              }
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
              adaptable.strategies.get(StrategyConstants.SmartEditStrategyId)
            );
            let state = middlewareAPI.getState();
            let returnAction = next(action);
            let apiReturn: IStrategyActionReturn<boolean> = SmartEditStrategy.CheckCorrectCellSelection();
            let popup = state.Popup.ScreenPopup;
            // this is a horrible hack and fix for a weird issue
            // we really need to do smart edit and bulk update better
            // but this fixes it for now
            if (popup.ComponentName != ScreenPopups.LayoutPopup) {
              if (apiReturn.Alert) {
                // check if Smart Edit is showing as popup and then close and show error (dont want to do that if from toolbar)
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
            let apiReturn: BulkUpdateValidationResult = BulkUpdateStrategy.checkCorrectCellSelection();
            let popup = state.Popup.ScreenPopup;
            // this is a horrible hack and fix for a weird issue
            // we really need to do smart edit and bulk update better
            // but this fixes it for now
            if (popup.ComponentName != ScreenPopups.LayoutPopup) {
              if (apiReturn.Alert) {
                // check if BulkUpdate is showing as popup
                if (popup.ComponentName == ScreenPopups.BulkUpdatePopup) {
                  //We close the BulkUpdatePopup
                  middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                  //We show the Error Popup -- assume that will alwasy be an Error
                  middlewareAPI.dispatch(PopupRedux.PopupShowAlert(apiReturn.Alert));
                }
              }
              middlewareAPI.dispatch(SystemRedux.BulkUpdateSetValidSelection(apiReturn));
            }
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
            let apiReturn = BulkUpdateStrategy.buildPreviewValues(state.BulkUpdate.BulkUpdateValue);
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
            BulkUpdateStrategy.applyBulkUpdate(newValues);
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
                  NewValue: gc.rawValue,
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

            exportStrategy.export(actionTyped.Report, actionTyped.ExportDestination);
            middlewareAPI.dispatch(PopupRedux.PopupHideScreen());

            return next(action);
          }

          // When deleting a report check if its the currently selected one
          // if it is then clear
          case ExportRedux.REPORT_DELETE: {
            const actionTyped = action as ExportRedux.ReportDeleteAction;
            let report: Report = actionTyped.report;
            let currentReport: string = middlewareAPI.getState().Export.CurrentReport;
            if (report && report.Name == currentReport) {
              middlewareAPI.dispatch(ExportRedux.ReportSelect(EMPTY_STRING));
            }
            return next(action);
          }

          /*******************
           * USER FILTER ACTIONS
           *******************/
          case FilterRedux.USER_FILTER_CREATE_FROM_COLUMN_FILTER: {
            const actionTyped = action as FilterRedux.CreateUserFilterFromColumnFilterAction;
            // first create a new user filter based on the column filter and input name
            let userFilter: UserFilter = ObjectFactory.CreateUserFilterFromColumnFilter(
              actionTyped.ColumnFilter,
              actionTyped.InputText
            );
            middlewareAPI.dispatch(FilterRedux.UserFilterAdd(userFilter));

            // then update a new column filter from the user filter - so that it will display the user filter name
            let columnFilter: ColumnFilter = actionTyped.ColumnFilter;
            // TODO;: Need to create this properly
            middlewareAPI.dispatch(FilterRedux.ColumnFilterEdit(columnFilter));

            return next(action);
          }

          /*******************
           * TEAM SHARING ACTIONS
           *******************/

          case TeamSharingRedux.TEAMSHARING_GET: {
            let returnAction = next(action);

            const { adaptableId, teamSharingOptions } = adaptable.adaptableOptions;

            teamSharingOptions
              .getSharedEntities(adaptableId)
              .then(sharedEntities => {
                middlewareAPI.dispatch(TeamSharingRedux.TeamSharingSet(sharedEntities));
              })
              .catch(error => {
                LoggingHelper.LogAdaptableError('TeamSharing get error : ' + error.message);
              });

            return returnAction;
          }

          case TeamSharingRedux.TEAMSHARING_SHARE: {
            const actionTyped = action as TeamSharingRedux.TeamSharingShareAction;
            let returnAction = next(action);

            const { adaptableId, teamSharingOptions } = adaptable.adaptableOptions;

            // const Description = prompt('Description', 'No Description');

            teamSharingOptions
              .getSharedEntities(adaptableId)
              .then(sharedEntities => {
                sharedEntities.push({
                  Uuid: createUuid(),
                  Entity: actionTyped.Entity,
                  FunctionName: actionTyped.FunctionName,
                  Description: actionTyped.Description,
                  UserName: adaptable.adaptableOptions.userName,
                  Timestamp: new Date().getTime(),
                });
                middlewareAPI.dispatch(TeamSharingRedux.TeamSharingSet(sharedEntities));
                return teamSharingOptions.setSharedEntities(adaptableId, sharedEntities);
              })
              .then(() => {
                middlewareAPI.dispatch(
                  PopupRedux.PopupShowAlert({
                    Header: 'Team Sharing',
                    Msg: 'Item Shared Successfully',
                    AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
                      MessageType.Info
                    ),
                  })
                );
              })
              .catch(error => {
                LoggingHelper.LogAdaptableError(
                  'TeamSharing share error : ' + error.message,
                  actionTyped.Entity
                );
                middlewareAPI.dispatch(
                  PopupRedux.PopupShowAlert({
                    Header: 'Team Sharing Error',
                    Msg: "Couldn't share item: " + error.message,
                    AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
                      MessageType.Error
                    ),
                  })
                );
              });

            return returnAction;
          }
          case TeamSharingRedux.TEAMSHARING_REMOVE_ITEM: {
            let returnAction = next(action);
            const actionTyped = action as TeamSharingRedux.TeamSharingRemoveItemAction;

            const { adaptableId, teamSharingOptions } = adaptable.adaptableOptions;

            teamSharingOptions
              .getSharedEntities(adaptableId)
              .then(sharedEntities => {
                const newSharedEntities = sharedEntities.filter(s => s.Uuid !== actionTyped.Uuid);
                middlewareAPI.dispatch(TeamSharingRedux.TeamSharingSet(newSharedEntities));
                return teamSharingOptions.setSharedEntities(adaptableId, newSharedEntities);
              })
              .then(() => {
                // middlewareAPI.dispatch(
                //   PopupRedux.PopupShowAlert({
                //     Header: 'Team Sharing',
                //     Msg: 'Item Removed Successfully',
                //     AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
                //       MessageType.Info
                //     ),
                //   })
                // );
              })
              .catch(error => {
                LoggingHelper.LogAdaptableError('TeamSharing remove error : ' + error.message);
                middlewareAPI.dispatch(
                  PopupRedux.PopupShowAlert({
                    Header: 'Team Sharing Error',
                    Msg: "Couldn't remove item: " + error.message,
                    AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
                      MessageType.Error
                    ),
                  })
                );
              });

            return returnAction;
          }
          case TeamSharingRedux.TEAMSHARING_IMPORT_ITEM: {
            let returnAction = next(action);
            const actionTyped = action as TeamSharingRedux.TeamSharingImportItemAction;
            const { FunctionName, Entity } = actionTyped;
            let importAction: Redux.Action;
            let overwriteConfirmation = false;

            const runCase = <T extends AdaptableObject>(
              teamSharingImportInfo: TeamSharingImportInfo<AdaptableObject>
            ) => {
              if (teamSharingImportInfo.FunctionEntities.some(x => x.Uuid === Entity.Uuid)) {
                overwriteConfirmation = true;
                importAction = teamSharingImportInfo.EditAction(Entity as T);
              } else {
                importAction = teamSharingImportInfo.AddAction(Entity as T);
              }
            };

            // JW - changed this to put responsibility on each strategy to return what it needs
            // think will be more likely to remember when we create a new strategy!
            let teamSharingAction = adaptable.StrategyService.getTeamSharingAction(FunctionName);
            if (teamSharingAction != undefined) {
              runCase(teamSharingAction);
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
            adaptable.setColumnOrder(actionTyped.VisibleColumnList);
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

            //Create all calculated columns which have stored in Adaptable State to be vendor Columns
            // do this before we load the layout
            let calculatedColumnStrategy = <ICalculatedColumnStrategy>(
              adaptable.strategies.get(StrategyConstants.CalculatedColumnStrategyId)
            );
            if (calculatedColumnStrategy) {
              calculatedColumnStrategy.addCalculatedColumnsToGrid();
            }

            //Create all free text columns before we load the layout
            let freeTextColumnStrategy = <IFreeTextColumnStrategy>(
              adaptable.strategies.get(StrategyConstants.FreeTextColumnStrategyId)
            );
            if (freeTextColumnStrategy) {
              freeTextColumnStrategy.addFreeTextColumnsToGrid();
            }

            //Create any action columns before we load the layout
            let actionColumnStrategy = <IActionColumnStrategy>(
              adaptable.strategies.get(StrategyConstants.ActionColumnStrategyId)
            );
            if (actionColumnStrategy) {
              actionColumnStrategy.addActionColumnsToGrid();
            }

            // make sure we have the grid columns in state, before we do any layout work
            adaptable.updateColumnsIntoStore();

            const layoutState: LayoutState | undefined = middlewareAPI.getState().Layout;
            const defaultLayout = adaptable.LayoutService.createDefaultLayoutIfNeeded();

            let currentLayout: string = layoutState?.CurrentLayout || defaultLayout?.Name;
            if (!adaptable.api.layoutApi.getLayoutByName(currentLayout)) {
              currentLayout = defaultLayout ? defaultLayout.Name : layoutState.Layouts[0].Name;
            }

            middlewareAPI.dispatch(LayoutRedux.LayoutSelect(currentLayout));

            // do this now so it sets strategy entitlements
            adaptable.StrategyService.setStrategiesEntitlements();
            // create the functions menu (for use in the dashboard and the toolpanel)
            adaptable.StrategyService.createStrategyFunctionMenus();

            return returnAction;
          }

          default: {
            let response: null | Redux.Action<any> = null;
            adaptable.forPlugins(plugin => {
              const middleware = plugin.reduxMiddleware(next);
              if (middleware && !response) {
                response = middleware(action, adaptable, middlewareAPI);
              }
            });
            return response || next(action);
          }
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

    GridRedux.GRID_SET_COLUMNS,
    GridRedux.GRID_ADD_COLUMN,
    GridRedux.GRID_EDIT_COLUMN,
    //  GridRedux.GRID_HIDE_COLUMN,
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
    GridRedux.SET_FUNCTION_DROPDOWN_MENUITEMS,

    GridRedux.SET_PIVOT_MODE_ON,
    GridRedux.SET_PIVOT_MODE_OFF,

    PopupRedux.POPUP_SHOW_SCREEN,
    PopupRedux.POPUP_HIDE_SCREEN,
    PopupRedux.POPUP_SHOW_LOADING,
    PopupRedux.POPUP_HIDE_LOADING,
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
  // Due to poor coding the Apply method only has warnings (though we mitigate by doing the same thing via the Api)
  // As few users currently audit functions and few have editable grids its not an urgent problem but one that we should fix

  // We need to add:  Chart, Pie Chart, Custom Sort ???, Export, Layout
  return [
    ActionColumnRedux.ACTION_COLUMN_APPLY,
    QueryRedux.CURRENT_QUERY_CHANGE,
    CalendarRedux.CALENDAR_SELECT,
    ChartRedux.CHART_DEFINITION_SELECT,
    DataSourceRedux.DATA_SOURCE_SELECT,
    ExportRedux.EXPORT_APPLY,
    FreeTextColumnRedux.FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE,
    FlashingCellsRedux.FLASHING_CELL_SELECT,
    FlashingCellsRedux.FLASHING_CELL_SELECT_ALL,
    QuickSearchRedux.QUICK_SEARCH_APPLY,
    QuickSearchRedux.QUICK_SEARCH_SET_STYLE,
    PlusMinusRedux.PLUS_MINUS_APPLY,
    ThemeRedux.THEME_SELECT,
    FilterRedux.COLUMN_FILTER_ADD,
    FilterRedux.COLUMN_FILTER_EDIT,
    FilterRedux.COLUMN_FILTER_CLEAR,
    CalculatedColumnRedux.CALCULATEDCOLUMN_ADD,
    CalculatedColumnRedux.CALCULATEDCOLUMN_EDIT,
    CalculatedColumnRedux.CALCULATEDCOLUMN_DELETE,
    LayoutRedux.LAYOUT_SELECT,
  ];
}

export function getPrimaryStateReduxActions(): string[] {
  return [RESET_STATE, INIT_STATE];
}
