import { ChartState } from '../../PredefinedConfig/RunTimeState/ChartState';
import { UserFilterState } from '../../PredefinedConfig/RunTimeState/UserFilterState';
import { ThemeState } from '../../PredefinedConfig/RunTimeState/ThemeState';
import { SmartEditState } from '../../PredefinedConfig/RunTimeState/SmartEditState';
import { ShortcutState } from '../../PredefinedConfig/RunTimeState/ShortcutState';
import { QuickSearchState } from '../../PredefinedConfig/RunTimeState/QuickSearchState';
import { PlusMinusState } from '../../PredefinedConfig/RunTimeState/PlusMinusState';
import { LayoutState } from '../../PredefinedConfig/RunTimeState/LayoutState';
import { FormatColumnState } from '../../PredefinedConfig/RunTimeState/FormatColumnState';
import { FlashingCellState } from '../../PredefinedConfig/RunTimeState/FlashingCellState';
import { ExportState } from '../../PredefinedConfig/RunTimeState/ExportState';
import { DataSourceState } from '../../PredefinedConfig/RunTimeState/DataSourceState';
import { DashboardState } from '../../PredefinedConfig/RunTimeState/DashboardState';
import { CustomSortState } from '../../PredefinedConfig/RunTimeState/CustomSortState';
import { ConditionalStyleState } from '../../PredefinedConfig/RunTimeState/ConditionalStyleState';
import { ColumnFilterState } from '../../PredefinedConfig/RunTimeState/ColumnFilterState';
import { CellValidationState } from '../../PredefinedConfig/RunTimeState/CellValidationState';
import { CellSummaryState } from '../../PredefinedConfig/RunTimeState/CellSummaryState';
import { CalendarState } from '../../PredefinedConfig/RunTimeState/CalendarState';
import { CalculatedColumnState } from '../../PredefinedConfig/RunTimeState/CalculatedColumnState';
import { BulkUpdateState } from '../../PredefinedConfig/RunTimeState/BulkUpdateState';
import { AlertState } from '../../PredefinedConfig/RunTimeState/AlertState';
import { AdvancedSearchState } from '../../PredefinedConfig/RunTimeState/AdvancedSearchState';
import { RunTimeState } from '../../PredefinedConfig/RunTimeState/RunTimeState';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { ResetUserData, LoadState, InitState } from '../../Redux/Store/AdaptableBlotterStore';
import { StateChangedTrigger } from '../../PredefinedConfig/Common/Enums';
import { ApiBase } from './ApiBase';
import { IConfigApi } from '../Interface/IConfigApi';
import Helper from '../../Utilities/Helpers/Helper';

export class ConfigApi extends ApiBase implements IConfigApi {
  public configInit(): void {
    this.dispatchAction(InitState());
  }

  public configClear(): void {
    //this doesnt work but should!
    this.dispatchAction(ResetUserData());
  }

  public configCopyAllStateToClipboard(): void {
    let state: AdaptableBlotterState = this.getBlotterState();
    let stringifiedState = JSON.stringify(state);
    Helper.copyToClipboard(stringifiedState);
  }

  public configCopyUserStateToClipboard(): void {
    // This doesnt currently work...
    let state: AdaptableBlotterState = this.getBlotterState();
    //  let userState = state
    let stringifiedState = JSON.stringify(state);
    Helper.copyToClipboard(stringifiedState);
  }

  public configDeleteLocalStorage(): void {
    //   a horrible rough and ready method which clears local storage and refreshes but is not nice.
    localStorage.removeItem(this.blotter.blotterOptions.blotterId);
    window.location.reload();
  }

  public configGetAllState(): AdaptableBlotterState {
    return this.getBlotterState();
  }

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
      'QuickSearch',
      'SelectedCells',
      'Shortcut',
      'SmartEdit',
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

  public configGetUserStateByFunction(
    functionName:
      | 'AdvancedSearch'
      | 'Alert'
      | 'BulkUpdate'
      | 'CalculatedColumn'
      | 'Calendar'
      | 'CellValidation'
      | 'Chart'
      | 'ColumnFilter'
      | 'ConditionalStyle'
      | 'CustomSort'
      | 'Dashboard'
      | 'DataSource'
      | 'Export'
      | 'FlashingCell'
      | 'FormatColumn'
      | 'Layout'
      | 'PlusMinus'
      | 'QuickSearch'
      | 'CellSummary'
      | 'Shortcut'
      | 'SmartEdit'
      | 'Theme'
      | 'UserFilter',
    returnJson: boolean = false
  ): RunTimeState {
    switch (functionName as StateChangedTrigger) {
      case StateChangedTrigger.AdvancedSearch:
        return returnJson
          ? JSON.stringify(this.getBlotterState().AdvancedSearch)
          : this.getBlotterState().AdvancedSearch;
      case StateChangedTrigger.Alert:
        return returnJson
          ? JSON.stringify(this.getBlotterState().Alert)
          : this.getBlotterState().Alert;
      case StateChangedTrigger.BulkUpdate:
        return returnJson
          ? JSON.stringify(this.getBlotterState().BulkUpdate)
          : this.getBlotterState().BulkUpdate;
      case StateChangedTrigger.CalculatedColumn:
        return returnJson
          ? JSON.stringify(this.getBlotterState().CalculatedColumn)
          : this.getBlotterState().CalculatedColumn;
      case StateChangedTrigger.Calendar:
        return returnJson
          ? JSON.stringify(this.getBlotterState().Calendar)
          : this.getBlotterState().Calendar;
      case StateChangedTrigger.CellValidation:
        return returnJson
          ? JSON.stringify(this.getBlotterState().CellValidation)
          : this.getBlotterState().CellValidation;
      case StateChangedTrigger.Chart:
        return returnJson
          ? JSON.stringify(this.getBlotterState().Chart)
          : this.getBlotterState().Chart;
      case StateChangedTrigger.ColumnFilter:
        return returnJson
          ? JSON.stringify(this.getBlotterState().ColumnFilter)
          : this.getBlotterState().ColumnFilter;
      case StateChangedTrigger.ConditionalStyle:
        return returnJson
          ? JSON.stringify(this.getBlotterState().ConditionalStyle)
          : this.getBlotterState().ConditionalStyle;
      case StateChangedTrigger.CustomSort:
        return returnJson
          ? JSON.stringify(this.getBlotterState().CustomSort)
          : this.getBlotterState().CustomSort;
      case StateChangedTrigger.Dashboard:
        return returnJson
          ? JSON.stringify(this.getBlotterState().Dashboard)
          : this.getBlotterState().Dashboard;
      case StateChangedTrigger.DataSource:
        return returnJson
          ? JSON.stringify(this.getBlotterState().DataSource)
          : this.getBlotterState().DataSource;
      case StateChangedTrigger.Export:
        return returnJson
          ? JSON.stringify(this.getBlotterState().Export)
          : this.getBlotterState().Export;
      case StateChangedTrigger.FlashingCell:
        return returnJson
          ? JSON.stringify(this.getBlotterState().FlashingCell)
          : this.getBlotterState().FlashingCell;
      case StateChangedTrigger.FormatColumn:
        return returnJson
          ? JSON.stringify(this.getBlotterState().FormatColumn)
          : this.getBlotterState().FormatColumn;
      case StateChangedTrigger.Layout:
        return returnJson
          ? JSON.stringify(this.getBlotterState().Layout)
          : this.getBlotterState().Layout;
      case StateChangedTrigger.PlusMinus:
        return returnJson
          ? JSON.stringify(this.getBlotterState().PlusMinus)
          : this.getBlotterState().PlusMinus;
      case StateChangedTrigger.QuickSearch:
        return returnJson
          ? JSON.stringify(this.getBlotterState().QuickSearch)
          : this.getBlotterState().QuickSearch;
      case StateChangedTrigger.CellSummary:
        return returnJson
          ? JSON.stringify(this.getBlotterState().SelectedCells)
          : this.getBlotterState().CellSummary;
      case StateChangedTrigger.Shortcut:
        return returnJson
          ? JSON.stringify(this.getBlotterState().Shortcut)
          : this.getBlotterState().Shortcut;
      case StateChangedTrigger.SmartEdit:
        return returnJson
          ? JSON.stringify(this.getBlotterState().SmartEdit)
          : this.getBlotterState().SmartEdit;
      case StateChangedTrigger.Theme:
        return returnJson
          ? JSON.stringify(this.getBlotterState().Theme)
          : this.getBlotterState().Theme;
      case StateChangedTrigger.UserFilter:
        return returnJson
          ? JSON.stringify(this.getBlotterState().UserFilter)
          : this.getBlotterState().UserFilter;
    }
  }

  public configGetAdvancedSearchState(returnJson: boolean = false): AdvancedSearchState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.AdvancedSearch,
      returnJson
    ) as AdvancedSearchState;
  }
  public configGetAlertSearchState(returnJson: boolean = false): AlertState {
    return this.configGetUserStateByFunction(StateChangedTrigger.Alert, returnJson) as AlertState;
  }
  public configGetBulkUpdateState(returnJson: boolean = false): BulkUpdateState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.BulkUpdate,
      returnJson
    ) as BulkUpdateState;
  }
  public configGetCalculatedColumnState(returnJson: boolean = false): CalculatedColumnState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.CalculatedColumn,
      returnJson
    ) as CalculatedColumnState;
  }
  public configGetCalendarState(returnJson: boolean = false): CalendarState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.Calendar,
      returnJson
    ) as CalendarState;
  }
  public configGetCellValidationState(returnJson: boolean = false): CellValidationState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.CellValidation,
      returnJson
    ) as CellValidationState;
  }
  public configGetChartState(returnJson: boolean = false): ChartState {
    return this.configGetUserStateByFunction(StateChangedTrigger.Chart, returnJson) as ChartState;
  }
  public configGetColumnFilterState(returnJson: boolean = false): ColumnFilterState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.ColumnFilter,
      returnJson
    ) as ColumnFilterState;
  }
  public configGetConditionalStyleState(returnJson: boolean = false): ConditionalStyleState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.ConditionalStyle,
      returnJson
    ) as ConditionalStyleState;
  }
  public configGetCustomSortState(returnJson: boolean = false): CustomSortState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.CustomSort,
      returnJson
    ) as CustomSortState;
  }
  public configGetDashboardState(returnJson: boolean = false): DashboardState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.Dashboard,
      returnJson
    ) as DashboardState;
  }
  public configGetDataSourceState(returnJson: boolean = false): DataSourceState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.DataSource,
      returnJson
    ) as DataSourceState;
  }
  public configGetExportState(returnJson: boolean = false): ExportState {
    return this.configGetUserStateByFunction(StateChangedTrigger.Export, returnJson) as ExportState;
  }
  public configGetFlashingCellState(returnJson: boolean = false): FlashingCellState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.FlashingCell,
      returnJson
    ) as FlashingCellState;
  }
  public configGetFormatColumnState(returnJson: boolean = false): FormatColumnState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.FormatColumn,
      returnJson
    ) as FormatColumnState;
  }
  public configGetLayoutState(returnJson: boolean = false): LayoutState {
    return this.configGetUserStateByFunction(StateChangedTrigger.Layout, returnJson) as LayoutState;
  }
  public configGetPlusMinusState(returnJson: boolean = false): PlusMinusState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.PlusMinus,
      returnJson
    ) as PlusMinusState;
  }
  public configGetQuickSearchState(returnJson: boolean = false): QuickSearchState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.QuickSearch,
      returnJson
    ) as QuickSearchState;
  }
  public configGetCellSummaryState(returnJson: boolean = false): CellSummaryState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.CellSummary,
      returnJson
    ) as CellSummaryState;
  }
  public configGetShortcutState(returnJson: boolean = false): ShortcutState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.Shortcut,
      returnJson
    ) as ShortcutState;
  }
  public configGetSmartEditState(returnJson: boolean = false): SmartEditState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.SmartEdit,
      returnJson
    ) as SmartEditState;
  }
  public configGetThemeState(returnJson: boolean = false): ThemeState {
    return this.configGetUserStateByFunction(StateChangedTrigger.Theme, returnJson) as ThemeState;
  }
  public configGetUserFilterState(returnJson: boolean = false): UserFilterState {
    return this.configGetUserStateByFunction(
      StateChangedTrigger.UserFilter,
      returnJson
    ) as UserFilterState;
  }
}
