import { ChartState } from '../../PredefinedConfig/ChartState';
import { ThemeState } from '../../PredefinedConfig/ThemeState';
import { SmartEditState } from '../../PredefinedConfig/SmartEditState';
import { ShortcutState } from '../../PredefinedConfig/ShortcutState';
import { QuickSearchState } from '../../PredefinedConfig/QuickSearchState';
import { PlusMinusState } from '../../PredefinedConfig/PlusMinusState';
import { LayoutState } from '../../PredefinedConfig/LayoutState';
import { FormatColumnState } from '../../PredefinedConfig/FormatColumnState';
import { FlashingCellState } from '../../PredefinedConfig/FlashingCellState';
import { ExportState } from '../../PredefinedConfig/ExportState';
import { DataSourceState, DataSource } from '../../PredefinedConfig/DataSourceState';
import { DashboardState } from '../../PredefinedConfig/DashboardState';
import { CustomSortState } from '../../PredefinedConfig/CustomSortState';
import { ConditionalStyleState } from '../../PredefinedConfig/ConditionalStyleState';
import { CellValidationState } from '../../PredefinedConfig/CellValidationState';
import { CellSummaryState } from '../../PredefinedConfig/CellSummaryState';
import { CalendarState } from '../../PredefinedConfig/CalendarState';
import { CalculatedColumnState } from '../../PredefinedConfig/CalculatedColumnState';
import { BulkUpdateState } from '../../PredefinedConfig/BulkUpdateState';
import { AlertState } from '../../PredefinedConfig/AlertState';
import { AdvancedSearchState } from '../../PredefinedConfig/AdvancedSearchState';
import { ConfigState } from '../../PredefinedConfig/ConfigState';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { ResetUserData, LoadState, InitState } from '../../Redux/Store/AdaptableStore';
import { ApiBase } from './ApiBase';
import Helper from '../../Utilities/Helpers/Helper';
import { ActionColumnState } from '../../PredefinedConfig/ActionColumnState';
import { ApplicationState } from '../../PredefinedConfig/ApplicationState';
import { UpdatedRowState } from '../../PredefinedConfig/UpdatedRowState';
import { SparklineColumnState } from '../../PredefinedConfig/SparklineColumnState';
import { EntitlementState } from '../../PredefinedConfig/EntitlementState';
import { FreeTextColumnState } from '../../PredefinedConfig/FreeTextColumnState';
import { PercentBarState } from '../../PredefinedConfig/PercentBarState';
import { FilterState, UserFilter } from '../../PredefinedConfig/FilterState';
import { SystemStatusState } from '../../PredefinedConfig/SystemStatusState';
import { ToolPanelState } from '../../PredefinedConfig/ToolPanelState';
import { UserInterfaceState } from '../../PredefinedConfig/UserInterfaceState';
import { ConfigApi } from '../ConfigApi';
import { AdaptableStateKey } from '../../PredefinedConfig/Common/Types';
import { Glue42State } from '../../PredefinedConfig/Glue42State';
import { AdaptableSearchState, ScheduleState } from '../../types';
import { AdaptableSortState } from '../Events/SearchChanged';
import { IPushPullState } from '../../PredefinedConfig/IPushPullState';

export class ConfigApiImpl extends ApiBase implements ConfigApi {
  public configInit(): void {
    this.dispatchAction(InitState());
  }

  public configClear(): void {
    //this doesnt work but should!
    this.dispatchAction(ResetUserData());
  }

  public configCopyAllStateToClipboard(): void {
    let state: AdaptableState = this.getAdaptableState();
    let stringifiedState = JSON.stringify(state);
    Helper.copyToClipboard(stringifiedState);
  }

  public configCopyUserStateToClipboard(): void {
    // This doesnt currently work...
    let state: AdaptableState = this.getAdaptableState();
    //  let userState = state
    let stringifiedState = JSON.stringify(state);
    Helper.copyToClipboard(stringifiedState);
  }

  public configDeleteLocalStorage(): void {
    //   a horrible rough and ready method which clears local storage and refreshes but is not nice.
    localStorage.removeItem(this.adaptable.adaptableOptions.adaptableId);
    window.location.reload();
  }

  public configGetAllState(): AdaptableState {
    return this.getAdaptableState();
  }

  // im sure we can do this better
  private getUserStateKeys() {
    return [
      'ActionColumn',
      'AdvancedSearch',
      'Alert',
      'Application',
      'BulkUpdate',
      'CalculatedColumn',
      'Calendar',
      'CellSummary',
      'CellValidation',
      'Chart',
      'ConditionalStyle',
      'CustomSort',
      'Dashboard',
      'DataSource',
      'Entitlement',
      'Export',
      'FlashingCell',
      'FormatColumn',
      'FreeTextColumn',
      'Glue42',
      'GradientColumn',
      'IPushPull',
      'Layout',
      'PercentBar',
      'PlusMinus',
      'QuickSearch',
      'Reminder',
      'Shortcut',
      'SmartEdit',
      'SparklineColumn',
      'Filter',
      'SystemStatus',
      'Theme',
      'ToolPanel',
      'UpdatedRow',
      'UserFilter',
      'UserInterface',
    ];
  }

  public configGetAllUserState(): ConfigState[] {
    const userStateKeys = this.getUserStateKeys();
    const allState = this.configGetAllState();
    return userStateKeys.map(k => allState[k]);
  }

  public configloadUserState(state: { [s: string]: ConfigState }): void {
    const userStateKeys = this.getUserStateKeys();
    const userState = Object.keys(state).reduce(
      (xs, x) => (userStateKeys.indexOf(x) !== -1 ? { ...xs, [x]: state[x] } : xs),
      {}
    );
    this.dispatchAction(LoadState(userState));
  }

  public configGetUserStateByStateKey(
    stateKey: AdaptableStateKey,
    returnJson: boolean = false
  ): ConfigState | string {
    switch (stateKey) {
      case 'ActionColumn':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().ActionColumn)
          : this.getAdaptableState().ActionColumn;
      case 'AdvancedSearch':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().AdvancedSearch)
          : this.getAdaptableState().AdvancedSearch;
      case 'Alert':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().Alert)
          : this.getAdaptableState().Alert;
      case 'Application':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().Application)
          : this.getAdaptableState().Application;
      case 'BulkUpdate':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().BulkUpdate)
          : this.getAdaptableState().BulkUpdate;
      case 'CalculatedColumn':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().CalculatedColumn)
          : this.getAdaptableState().CalculatedColumn;
      case 'Calendar':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().Calendar)
          : this.getAdaptableState().Calendar;
      case 'CellSummary':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().SelectedCells)
          : this.getAdaptableState().CellSummary;
      case 'CellValidation':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().CellValidation)
          : this.getAdaptableState().CellValidation;
      case 'Chart':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().Chart)
          : this.getAdaptableState().Chart;

      case 'ConditionalStyle':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().ConditionalStyle)
          : this.getAdaptableState().ConditionalStyle;
      case 'CustomSort':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().CustomSort)
          : this.getAdaptableState().CustomSort;
      case 'Dashboard':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().Dashboard)
          : this.getAdaptableState().Dashboard;
      case 'DataSource':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().DataSource)
          : this.getAdaptableState().DataSource;
      case 'Entitlement':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().Entitlements)
          : this.getAdaptableState().Entitlements;
      case 'Export':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().Export)
          : this.getAdaptableState().Export;
      case 'FlashingCell':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().FlashingCell)
          : this.getAdaptableState().FlashingCell;
      case 'FormatColumn':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().FormatColumn)
          : this.getAdaptableState().FormatColumn;
      case 'FreeTextColumn':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().FreeTextColumn)
          : this.getAdaptableState().FreeTextColumn;
      case 'Glue42':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().Glue42)
          : this.getAdaptableState().Glue42;
      case 'GradientColumn':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().GradientColumn)
          : this.getAdaptableState().GradientColumn;
      case 'IPushPull':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().IPushPull)
          : this.getAdaptableState().IPushPull;
      case 'Layout':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().Layout)
          : this.getAdaptableState().Layout;
      case 'PercentBar':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().PercentBar)
          : this.getAdaptableState().PercentBar;

      case 'PlusMinus':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().PlusMinus)
          : this.getAdaptableState().PlusMinus;
      case 'QuickSearch':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().QuickSearch)
          : this.getAdaptableState().QuickSearch;
      case 'Schedule':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().Schedule)
          : this.getAdaptableState().Schedule;

      case 'Shortcut':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().Shortcut)
          : this.getAdaptableState().Shortcut;
      case 'SmartEdit':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().SmartEdit)
          : this.getAdaptableState().SmartEdit;
      case 'SparklineColumn':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().SparklineColumn)
          : this.getAdaptableState().SparklineColumn;
      case 'Filter':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().Filter)
          : this.getAdaptableState().Filter;
      case 'SystemStatus':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().SystemStatus)
          : this.getAdaptableState().SystemStatus;
      case 'Theme':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().Theme)
          : this.getAdaptableState().Theme;
      case 'ToolPanel':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().ToolPanel)
          : this.getAdaptableState().ToolPanel;
      case 'UpdatedRow':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().UpdatedRow)
          : this.getAdaptableState().UpdatedRow;
      case 'UserFilter':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().UserFilter)
          : this.getAdaptableState().UserFilter;
      case 'UserInterface':
        return returnJson
          ? JSON.stringify(this.getAdaptableState().UserInterface)
          : this.getAdaptableState().UserInterface;
    }
  }

  public configGetActionColumnState(returnJson: boolean = false): ActionColumnState {
    return this.configGetUserStateByStateKey('ActionColumn', returnJson) as ActionColumnState;
  }

  public configGetAdvancedSearchState(returnJson: boolean = false): AdvancedSearchState {
    return this.configGetUserStateByStateKey('AdvancedSearch', returnJson) as AdvancedSearchState;
  }
  public configGetAlertState(returnJson: boolean = false): AlertState {
    return this.configGetUserStateByStateKey('Alert', returnJson) as AlertState;
  }
  public configGetApplicationState(returnJson: boolean = false): ApplicationState {
    return this.configGetUserStateByStateKey('Application', returnJson) as ApplicationState;
  }
  public configGetBulkUpdateState(returnJson: boolean = false): BulkUpdateState {
    return this.configGetUserStateByStateKey('BulkUpdate', returnJson) as BulkUpdateState;
  }
  public configGetCalculatedColumnState(returnJson: boolean = false): CalculatedColumnState {
    return this.configGetUserStateByStateKey(
      'CalculatedColumn',
      returnJson
    ) as CalculatedColumnState;
  }
  public configGetCalendarState(returnJson: boolean = false): CalendarState {
    return this.configGetUserStateByStateKey('Calendar', returnJson) as CalendarState;
  }
  public configGetCellSummaryState(returnJson: boolean = false): CellSummaryState {
    return this.configGetUserStateByStateKey('CellSummary', returnJson) as CellSummaryState;
  }
  public configGetCellValidationState(returnJson: boolean = false): CellValidationState {
    return this.configGetUserStateByStateKey('CellValidation', returnJson) as CellValidationState;
  }
  public configGetChartState(returnJson: boolean = false): ChartState {
    return this.configGetUserStateByStateKey('Chart', returnJson) as ChartState;
  }

  public configGetConditionalStyleState(returnJson: boolean = false): ConditionalStyleState {
    return this.configGetUserStateByStateKey(
      'ConditionalStyle',
      returnJson
    ) as ConditionalStyleState;
  }
  public configGetCustomSortState(returnJson: boolean = false): CustomSortState {
    return this.configGetUserStateByStateKey('CustomSort', returnJson) as CustomSortState;
  }
  public configGetDashboardState(returnJson: boolean = false): DashboardState {
    return this.configGetUserStateByStateKey('Dashboard', returnJson) as DashboardState;
  }
  public configGetDataSourceState(returnJson: boolean = false): DataSourceState {
    return this.configGetUserStateByStateKey('DataSource', returnJson) as DataSourceState;
  }
  public configGetEntitlementState(returnJson: boolean): EntitlementState {
    return this.configGetUserStateByStateKey('Entitlement', returnJson) as EntitlementState;
  }
  public configGetExportState(returnJson: boolean = false): ExportState {
    return this.configGetUserStateByStateKey('Export', returnJson) as ExportState;
  }
  public configGetFlashingCellState(returnJson: boolean = false): FlashingCellState {
    return this.configGetUserStateByStateKey('FlashingCell', returnJson) as FlashingCellState;
  }
  public configGetFreeTextColumnState(returnJson: boolean = false): FreeTextColumnState {
    return this.configGetUserStateByStateKey('FreeTextColumn', returnJson) as FreeTextColumnState;
  }
  public configGetFormatColumnState(returnJson: boolean = false): FormatColumnState {
    return this.configGetUserStateByStateKey('FormatColumn', returnJson) as FormatColumnState;
  }
  public configGetLayoutState(returnJson: boolean = false): LayoutState {
    return this.configGetUserStateByStateKey('Layout', returnJson) as LayoutState;
  }

  public configGetIPushPullState(returnJson: boolean = false): IPushPullState {
    return this.configGetUserStateByStateKey('IPushPull', returnJson) as IPushPullState;
  }
  public configGetGlue42State(returnJson: boolean = false): Glue42State {
    return this.configGetUserStateByStateKey('Glue42', returnJson) as Glue42State;
  }
  public configGetPercentBarState(returnJson: boolean = false): PercentBarState {
    return this.configGetUserStateByStateKey('PercentBar', returnJson) as PercentBarState;
  }
  public configGetPlusMinusState(returnJson: boolean = false): PlusMinusState {
    return this.configGetUserStateByStateKey('PlusMinus', returnJson) as PlusMinusState;
  }
  public configGetQuickSearchState(returnJson: boolean = false): QuickSearchState {
    return this.configGetUserStateByStateKey('QuickSearch', returnJson) as QuickSearchState;
  }
  public configGetScheduleState(returnJson: boolean = false): ScheduleState {
    return this.configGetUserStateByStateKey('Schedule', returnJson) as ScheduleState;
  }
  public configGetShortcutState(returnJson: boolean = false): ShortcutState {
    return this.configGetUserStateByStateKey('Shortcut', returnJson) as ShortcutState;
  }
  public configGetSmartEditState(returnJson: boolean = false): SmartEditState {
    return this.configGetUserStateByStateKey('SmartEdit', returnJson) as SmartEditState;
  }
  public configGetSparklineColumnState(returnJson: boolean = false): SparklineColumnState {
    return this.configGetUserStateByStateKey('SparklineColumn', returnJson) as SparklineColumnState;
  }
  public configGetFilterState(returnJson: boolean = false): FilterState {
    return this.configGetUserStateByStateKey('Filter', returnJson) as FilterState;
  }
  public configGetSystemStatusState(returnJson: boolean = false): SystemStatusState {
    return this.configGetUserStateByStateKey('SystemStatus', returnJson) as SystemStatusState;
  }
  public configGetThemeState(returnJson: boolean = false): ThemeState {
    return this.configGetUserStateByStateKey('Theme', returnJson) as ThemeState;
  }
  public configGetToolPanelState(returnJson: boolean = false): ToolPanelState {
    return this.configGetUserStateByStateKey('ToolPanel', returnJson) as ToolPanelState;
  }
  public configGetUpdatedRowState(returnJson: boolean = false): UpdatedRowState {
    return this.configGetUserStateByStateKey('UpdatedRow', returnJson) as UpdatedRowState;
  }

  public configGetUserInterfaceState(returnJson: boolean = false): UserInterfaceState {
    return this.configGetUserStateByStateKey('UserInterface', returnJson) as UserInterfaceState;
  }

  public configGetAdaptableSearchState(): AdaptableSearchState {
    const currentDataSource: DataSource = this.adaptable.api.dataSourceApi.getCurrentDataSource();

    // lets get the searchstate
    const adaptableSearchState: AdaptableSearchState = {
      dataSource: this.adaptable.api.dataSourceApi.getCurrentDataSource(),
      advancedSearch: this.adaptable.api.advancedSearchApi.getCurrentAdvancedSearch(),
      columnFilters: this.adaptable.api.filterApi.getAllColumnFilter(),
      // should we be be getting other Filter info or is it enough just to send the column filters?
    };
    return adaptableSearchState;
  }

  public configGetAdaptableSortState(): AdaptableSortState {
    const adaptableSortState: AdaptableSortState = {
      columnSorts: this.adaptable.api.gridApi.getColumnSorts(),
      customSorts: this.adaptable.api.customSortApi.getAllCustomSort(),
    };
    return adaptableSortState;
  }
}
