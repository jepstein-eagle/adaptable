import { ChartState } from '../../PredefinedConfig/ChartState';
import { UserFilterState } from '../../PredefinedConfig/UserFilterState';
import { ThemeState } from '../../PredefinedConfig/ThemeState';
import { SmartEditState } from '../../PredefinedConfig/SmartEditState';
import { ShortcutState } from '../../PredefinedConfig/ShortcutState';
import { QuickSearchState } from '../../PredefinedConfig/QuickSearchState';
import { PlusMinusState } from '../../PredefinedConfig/PlusMinusState';
import { LayoutState } from '../../PredefinedConfig/LayoutState';
import { FormatColumnState } from '../../PredefinedConfig/FormatColumnState';
import { FlashingCellState } from '../../PredefinedConfig/FlashingCellState';
import { ExportState } from '../../PredefinedConfig/ExportState';
import { DataSourceState } from '../../PredefinedConfig/DataSourceState';
import { DashboardState } from '../../PredefinedConfig/DashboardState';
import { CustomSortState } from '../../PredefinedConfig/CustomSortState';
import { ConditionalStyleState } from '../../PredefinedConfig/ConditionalStyleState';
import { ColumnFilterState } from '../../PredefinedConfig/ColumnFilterState';
import { CellValidationState } from '../../PredefinedConfig/CellValidationState';
import { CellSummaryState } from '../../PredefinedConfig/CellSummaryState';
import { CalendarState } from '../../PredefinedConfig/CalendarState';
import { CalculatedColumnState } from '../../PredefinedConfig/CalculatedColumnState';
import { BulkUpdateState } from '../../PredefinedConfig/BulkUpdateState';
import { AlertState } from '../../PredefinedConfig/AlertState';
import { AdvancedSearchState } from '../../PredefinedConfig/AdvancedSearchState';
import { RunTimeState } from '../../PredefinedConfig/RunTimeState';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { ResetUserData, LoadState, InitState } from '../../Redux/Store/AdaptableStore';
import { ApiBase } from './ApiBase';
import { ConfigApi, AdaptableStateKey, AdaptableStateKeys } from '../ConfigApi';
import Helper from '../../Utilities/Helpers/Helper';
import { ActionColumnState } from '../../PredefinedConfig/ActionColumnState';
import { ApplicationState } from '../../PredefinedConfig/ApplicationState';
import { UpdatedRowState } from '../../PredefinedConfig/UpdatedRowState';
import { SparklineColumnState } from '../../PredefinedConfig/SparklineColumnState';
import { PartnerState } from '../../PredefinedConfig/PartnerState';

export class ConfigApiImpl extends ApiBase implements ConfigApi {
  public configInit(): void {
    this.dispatchAction(InitState());
  }

  public configClear(): void {
    //this doesnt work but should!
    this.dispatchAction(ResetUserData());
  }

  public configCopyAllStateToClipboard(): void {
    let state: AdaptableState = this.getBlotterState();
    let stringifiedState = JSON.stringify(state);
    Helper.copyToClipboard(stringifiedState);
  }

  public configCopyUserStateToClipboard(): void {
    // This doesnt currently work...
    let state: AdaptableState = this.getBlotterState();
    //  let userState = state
    let stringifiedState = JSON.stringify(state);
    Helper.copyToClipboard(stringifiedState);
  }

  public configDeleteLocalStorage(): void {
    //   a horrible rough and ready method which clears local storage and refreshes but is not nice.
    localStorage.removeItem(this.blotter.blotterOptions.blotterId);
    window.location.reload();
  }

  public configGetAllState(): AdaptableState {
    return this.getBlotterState();
  }

  // im sure we can do this better
  private getUserStateKeys() {
    return [
      'AdvancedSearch',
      'Alert',
      'BulkUpdate',
      'CalculatedColumn',
      'Calendar',
      'CellValidation',
      'Chart',
      'ColumnFilter',
      'ConditionalStyle',
      'CustomSort',
      'Dashboard',
      'DataSource',
      'Export',
      'FlashingCell',
      'FormatColumn',
      'Layout',
      'PlusMinus',
      'Partner',
      'QuickSearch',
      'SelectedCells',
      'Shortcut',
      'SmartEdit',
      'SparklineColumn',
      'Theme',
      'UserFilter',
    ];
  }

  public configGetAllUserState(): RunTimeState[] {
    const userStateKeys = this.getUserStateKeys();
    const allState = this.configGetAllState();
    return userStateKeys.map(k => allState[k]);
  }

  public configloadUserState(state: { [s: string]: RunTimeState }): void {
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
  ): RunTimeState {
    switch (stateKey) {
      case 'ActionColumn':
        return returnJson
          ? JSON.stringify(this.getBlotterState().ActionColumn)
          : this.getBlotterState().ActionColumn;
      case 'AdvancedSearch':
        return returnJson
          ? JSON.stringify(this.getBlotterState().AdvancedSearch)
          : this.getBlotterState().AdvancedSearch;
      case 'Alert':
        return returnJson
          ? JSON.stringify(this.getBlotterState().Alert)
          : this.getBlotterState().Alert;
      case 'Application':
        return returnJson
          ? JSON.stringify(this.getBlotterState().Application)
          : this.getBlotterState().Application;
      case 'BulkUpdate':
        return returnJson
          ? JSON.stringify(this.getBlotterState().BulkUpdate)
          : this.getBlotterState().BulkUpdate;
      case 'CalculatedColumn':
        return returnJson
          ? JSON.stringify(this.getBlotterState().CalculatedColumn)
          : this.getBlotterState().CalculatedColumn;
      case 'Calendar':
        return returnJson
          ? JSON.stringify(this.getBlotterState().Calendar)
          : this.getBlotterState().Calendar;
      case 'CellValidation':
        return returnJson
          ? JSON.stringify(this.getBlotterState().CellValidation)
          : this.getBlotterState().CellValidation;
      case 'Chart':
        return returnJson
          ? JSON.stringify(this.getBlotterState().Chart)
          : this.getBlotterState().Chart;
      case 'ColumnFilter':
        return returnJson
          ? JSON.stringify(this.getBlotterState().ColumnFilter)
          : this.getBlotterState().ColumnFilter;
      case 'ConditionalStyle':
        return returnJson
          ? JSON.stringify(this.getBlotterState().ConditionalStyle)
          : this.getBlotterState().ConditionalStyle;
      case 'CustomSort':
        return returnJson
          ? JSON.stringify(this.getBlotterState().CustomSort)
          : this.getBlotterState().CustomSort;
      case 'Dashboard':
        return returnJson
          ? JSON.stringify(this.getBlotterState().Dashboard)
          : this.getBlotterState().Dashboard;
      case 'DataSource':
        return returnJson
          ? JSON.stringify(this.getBlotterState().DataSource)
          : this.getBlotterState().DataSource;
      case 'Export':
        return returnJson
          ? JSON.stringify(this.getBlotterState().Export)
          : this.getBlotterState().Export;
      case 'FlashingCell':
        return returnJson
          ? JSON.stringify(this.getBlotterState().FlashingCell)
          : this.getBlotterState().FlashingCell;
      case 'FormatColumn':
        return returnJson
          ? JSON.stringify(this.getBlotterState().FormatColumn)
          : this.getBlotterState().FormatColumn;
      case 'Layout':
        return returnJson
          ? JSON.stringify(this.getBlotterState().Layout)
          : this.getBlotterState().Layout;
      case 'Partner':
        return returnJson
          ? JSON.stringify(this.getBlotterState().Partner)
          : this.getBlotterState().Partner;
      case 'PlusMinus':
        return returnJson
          ? JSON.stringify(this.getBlotterState().PlusMinus)
          : this.getBlotterState().PlusMinus;
      case 'QuickSearch':
        return returnJson
          ? JSON.stringify(this.getBlotterState().QuickSearch)
          : this.getBlotterState().QuickSearch;
      case 'CellSummary':
        return returnJson
          ? JSON.stringify(this.getBlotterState().SelectedCells)
          : this.getBlotterState().CellSummary;
      case 'Shortcut':
        return returnJson
          ? JSON.stringify(this.getBlotterState().Shortcut)
          : this.getBlotterState().Shortcut;
      case 'SmartEdit':
        return returnJson
          ? JSON.stringify(this.getBlotterState().SmartEdit)
          : this.getBlotterState().SmartEdit;
      case 'SparklineColumn':
        return returnJson
          ? JSON.stringify(this.getBlotterState().SparklineColumn)
          : this.getBlotterState().SparklineColumn;
      case 'Theme':
        return returnJson
          ? JSON.stringify(this.getBlotterState().Theme)
          : this.getBlotterState().Theme;
      case 'UpdatedRow':
        return returnJson
          ? JSON.stringify(this.getBlotterState().UpdatedRow)
          : this.getBlotterState().UpdatedRow;
      case 'UserFilter':
        return returnJson
          ? JSON.stringify(this.getBlotterState().UserFilter)
          : this.getBlotterState().UserFilter;
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
  public configGetCellValidationState(returnJson: boolean = false): CellValidationState {
    return this.configGetUserStateByStateKey('CellValidation', returnJson) as CellValidationState;
  }
  public configGetChartState(returnJson: boolean = false): ChartState {
    return this.configGetUserStateByStateKey('Chart', returnJson) as ChartState;
  }
  public configGetColumnFilterState(returnJson: boolean = false): ColumnFilterState {
    return this.configGetUserStateByStateKey('ColumnFilter', returnJson) as ColumnFilterState;
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
  public configGetExportState(returnJson: boolean = false): ExportState {
    return this.configGetUserStateByStateKey('Export', returnJson) as ExportState;
  }
  public configGetFlashingCellState(returnJson: boolean = false): FlashingCellState {
    return this.configGetUserStateByStateKey('FlashingCell', returnJson) as FlashingCellState;
  }
  public configGetFormatColumnState(returnJson: boolean = false): FormatColumnState {
    return this.configGetUserStateByStateKey('FormatColumn', returnJson) as FormatColumnState;
  }
  public configGetLayoutState(returnJson: boolean = false): LayoutState {
    return this.configGetUserStateByStateKey('Layout', returnJson) as LayoutState;
  }
  public configGetPartnerState(returnJson: boolean = false): PartnerState {
    return this.configGetUserStateByStateKey('Partner', returnJson) as PartnerState;
  }
  public configGetPlusMinusState(returnJson: boolean = false): PlusMinusState {
    return this.configGetUserStateByStateKey('PlusMinus', returnJson) as PlusMinusState;
  }
  public configGetQuickSearchState(returnJson: boolean = false): QuickSearchState {
    return this.configGetUserStateByStateKey('QuickSearch', returnJson) as QuickSearchState;
  }
  public configGetCellSummaryState(returnJson: boolean = false): CellSummaryState {
    return this.configGetUserStateByStateKey('CellSummary', returnJson) as CellSummaryState;
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
  public configGetThemeState(returnJson: boolean = false): ThemeState {
    return this.configGetUserStateByStateKey('Theme', returnJson) as ThemeState;
  }
  public configGetUpdatedRowState(returnJson: boolean = false): UpdatedRowState {
    return this.configGetUserStateByStateKey('UpdatedRow', returnJson) as UpdatedRowState;
  }
  public configGetUserFilterState(returnJson: boolean = false): UserFilterState {
    return this.configGetUserStateByStateKey('UserFilter', returnJson) as UserFilterState;
  }
}
