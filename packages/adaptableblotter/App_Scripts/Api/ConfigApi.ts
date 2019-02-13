import { IUserState, AdvancedSearchState, AlertState, BulkUpdateState, CalculatedColumnState, CalendarState, CellValidationState, ChartState, ColumnFilterState, ConditionalStyleState, CustomSortState, DashboardState, DataSourceState, ExportState, FlashingCellState, FormatColumnState, LayoutState, PlusMinusState, QuickSearchState, ShortcutState, SmartEditState, ThemeState, UserFilterState, CellSummaryState } from '../Redux/ActionsReducers/Interface/IState';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import { ResetUserData, LoadState } from '../Redux/Store/AdaptableBlotterStore';
import { StateChangedTrigger } from '../Utilities/Enums';
import { ApiBase } from './ApiBase';
import { IConfigApi } from './Interface/IConfigApi';

export class ConfigApi extends ApiBase implements IConfigApi {

   public configClear(): void {
    //this doesnt work but should!
    this.dispatchAction(ResetUserData())
  }

  public configDeleteLocalStorage(): void {
    //   a horrible rough and ready method which clears local storage and refreshes but is not nice.
    localStorage.removeItem(this.blotter.BlotterOptions.blotterId);
    window.location.reload();
  }

  public configGetAllState(): AdaptableBlotterState {
    return this.getState()
  }

  private getUserStateKeys() {
    return ['AdvancedSearch', 'Alert', 'BulkUpdate', 'CalculatedColumn',
      'Calendar', 'CellValidation', 'Chart', 'ColumnFilter', 'ConditionalStyle',
      'CustomSort', 'Dashboard', 'DataSource', 'Export', 'FlashingCell',
      'FormatColumn', 'Layout', 'PlusMinus', 'QuickSearch', 'SelectedCells',
      'Shortcut', 'SmartEdit', 'Theme', 'UserFilter'];
  }

  public configGetAllUserState(): IUserState[] {
    const userStateKeys = this.getUserStateKeys();
    const allState = this.configGetAllState();
    return userStateKeys.map(k => allState[k]);
  }

  public configloadUserState(state: { [s: string]: IUserState }): void {
    const userStateKeys = this.getUserStateKeys();
    const userState = Object.keys(state).reduce((xs, x) => userStateKeys.indexOf(x) !== -1 ? { ...xs, [x]: state[x] } : xs, {});
    this.dispatchAction(LoadState(userState));
  }

  public configGetUserStateByFunction(functionName: 'AdvancedSearch' | 'Alert' | 'BulkUpdate' | 'CalculatedColumn' | 'Calendar' |
    'CellValidation' | 'Chart' | 'ColumnFilter' | 'ConditionalStyle' | 'CustomSort' | 'Dashboard' | 'DataSource' |
    'Export' | 'FlashingCell' | 'FormatColumn' | 'Layout' | 'PlusMinus' | 'QuickSearch' | 'CellSummary' |
    'Shortcut' | 'SmartEdit' | 'Theme' | 'UserFilter', returnJson: boolean = false): IUserState {
    switch (functionName as StateChangedTrigger) {
      case StateChangedTrigger.AdvancedSearch:
        return (returnJson) ? JSON.stringify(this.getState().AdvancedSearch) : this.getState().AdvancedSearch
      case StateChangedTrigger.Alert:
        return (returnJson) ? JSON.stringify(this.getState().Alert) : this.getState().Alert
      case StateChangedTrigger.BulkUpdate:
        return (returnJson) ? JSON.stringify(this.getState().BulkUpdate) : this.getState().BulkUpdate
      case StateChangedTrigger.CalculatedColumn:
        return (returnJson) ? JSON.stringify(this.getState().CalculatedColumn) : this.getState().CalculatedColumn
      case StateChangedTrigger.Calendar:
        return (returnJson) ? JSON.stringify(this.getState().Calendar) : this.getState().Calendar
      case StateChangedTrigger.CellValidation:
        return (returnJson) ? JSON.stringify(this.getState().CellValidation) : this.getState().CellValidation
      case StateChangedTrigger.Chart:
        return (returnJson) ? JSON.stringify(this.getState().Chart) : this.getState().Chart
      case StateChangedTrigger.ColumnFilter:
        return (returnJson) ? JSON.stringify(this.getState().ColumnFilter) : this.getState().ColumnFilter
      case StateChangedTrigger.ConditionalStyle:
        return (returnJson) ? JSON.stringify(this.getState().ConditionalStyle) : this.getState().ConditionalStyle
      case StateChangedTrigger.CustomSort:
        return (returnJson) ? JSON.stringify(this.getState().CustomSort) : this.getState().CustomSort
      case StateChangedTrigger.Dashboard:
        return (returnJson) ? JSON.stringify(this.getState().Dashboard) : this.getState().Dashboard
      case StateChangedTrigger.DataSource:
        return (returnJson) ? JSON.stringify(this.getState().DataSource) : this.getState().DataSource
      case StateChangedTrigger.Export:
        return (returnJson) ? JSON.stringify(this.getState().Export) : this.getState().Export
      case StateChangedTrigger.FlashingCell:
        return (returnJson) ? JSON.stringify(this.getState().FlashingCell) : this.getState().FlashingCell
      case StateChangedTrigger.FormatColumn:
        return (returnJson) ? JSON.stringify(this.getState().FormatColumn) : this.getState().FormatColumn
      case StateChangedTrigger.Layout:
        return (returnJson) ? JSON.stringify(this.getState().Layout) : this.getState().Layout
      case StateChangedTrigger.PlusMinus:
        return (returnJson) ? JSON.stringify(this.getState().PlusMinus) : this.getState().PlusMinus
      case StateChangedTrigger.QuickSearch:
        return (returnJson) ? JSON.stringify(this.getState().QuickSearch) : this.getState().QuickSearch
      case StateChangedTrigger.CellSummary:
        return (returnJson) ? JSON.stringify(this.getState().SelectedCells) : this.getState().CellSummary
      case StateChangedTrigger.Shortcut:
        return (returnJson) ? JSON.stringify(this.getState().Shortcut) : this.getState().Shortcut
      case StateChangedTrigger.SmartEdit:
        return (returnJson) ? JSON.stringify(this.getState().SmartEdit) : this.getState().SmartEdit
      case StateChangedTrigger.Theme:
        return (returnJson) ? JSON.stringify(this.getState().Theme) : this.getState().Theme
      case StateChangedTrigger.UserFilter:
        return (returnJson) ? JSON.stringify(this.getState().UserFilter) : this.getState().UserFilter
    }
  }

  public configGetAdvancedSearchState(returnJson: boolean = false): AdvancedSearchState {
    return this.configGetUserStateByFunction(StateChangedTrigger.AdvancedSearch, returnJson) as AdvancedSearchState
  }
  public configGetAlertSearchState(returnJson: boolean = false): AlertState {
    return this.configGetUserStateByFunction(StateChangedTrigger.Alert, returnJson) as AlertState
  }
  public configGetBulkUpdateState(returnJson: boolean = false): BulkUpdateState {
    return this.configGetUserStateByFunction(StateChangedTrigger.BulkUpdate, returnJson) as BulkUpdateState
  }
  public configGetCalculatedColumnState(returnJson: boolean = false): CalculatedColumnState {
    return this.configGetUserStateByFunction(StateChangedTrigger.CalculatedColumn, returnJson) as CalculatedColumnState
  }
  public configGetCalendarState(returnJson: boolean = false): CalendarState {
    return this.configGetUserStateByFunction(StateChangedTrigger.Calendar, returnJson) as CalendarState
  }
  public configGetCellValidationState(returnJson: boolean = false): CellValidationState {
    return this.configGetUserStateByFunction(StateChangedTrigger.CellValidation, returnJson) as CellValidationState
  }
  public configGetChartState(returnJson: boolean = false): ChartState {
    return this.configGetUserStateByFunction(StateChangedTrigger.Chart, returnJson) as ChartState
  }
  public configGetColumnFilterState(returnJson: boolean = false): ColumnFilterState {
    return this.configGetUserStateByFunction(StateChangedTrigger.ColumnFilter, returnJson) as ColumnFilterState
  }
  public configGetConditionalStyleState(returnJson: boolean = false): ConditionalStyleState {
    return this.configGetUserStateByFunction(StateChangedTrigger.ConditionalStyle, returnJson) as ConditionalStyleState
  }
  public configGetCustomSortState(returnJson: boolean = false): CustomSortState {
    return this.configGetUserStateByFunction(StateChangedTrigger.CustomSort, returnJson) as CustomSortState
  }
  public configGetDashboardState(returnJson: boolean = false): DashboardState {
    return this.configGetUserStateByFunction(StateChangedTrigger.Dashboard, returnJson) as DashboardState
  }
  public configGetDataSourceState(returnJson: boolean = false): DataSourceState {
    return this.configGetUserStateByFunction(StateChangedTrigger.DataSource, returnJson) as DataSourceState
  }
  public configGetExportState(returnJson: boolean = false): ExportState {
    return this.configGetUserStateByFunction(StateChangedTrigger.Export, returnJson) as ExportState
  }
  public configGetFlashingCellState(returnJson: boolean = false): FlashingCellState {
    return this.configGetUserStateByFunction(StateChangedTrigger.FlashingCell, returnJson) as FlashingCellState
  }
  public configGetFormatColumnState(returnJson: boolean = false): FormatColumnState {
    return this.configGetUserStateByFunction(StateChangedTrigger.FormatColumn, returnJson) as FormatColumnState
  }
  public configGetLayoutState(returnJson: boolean = false): LayoutState {
    return this.configGetUserStateByFunction(StateChangedTrigger.Layout, returnJson) as LayoutState
  }
  public configGetPlusMinusState(returnJson: boolean = false): PlusMinusState {
    return this.configGetUserStateByFunction(StateChangedTrigger.PlusMinus, returnJson) as PlusMinusState
  }
  public configGetQuickSearchState(returnJson: boolean = false): QuickSearchState {
    return this.configGetUserStateByFunction(StateChangedTrigger.QuickSearch, returnJson) as QuickSearchState
  }
  public configGetCellSummaryState(returnJson: boolean = false): CellSummaryState {
    return this.configGetUserStateByFunction(StateChangedTrigger.CellSummary, returnJson) as CellSummaryState
  }
  public configGetShortcutState(returnJson: boolean = false): ShortcutState {
    return this.configGetUserStateByFunction(StateChangedTrigger.Shortcut, returnJson) as ShortcutState
  }
  public configGetSmartEditState(returnJson: boolean = false): SmartEditState {
    return this.configGetUserStateByFunction(StateChangedTrigger.SmartEdit, returnJson) as SmartEditState
  }
  public configGetThemeState(returnJson: boolean = false): ThemeState {
    return this.configGetUserStateByFunction(StateChangedTrigger.Theme, returnJson) as ThemeState
  }
  public configGetUserFilterState(returnJson: boolean = false): UserFilterState {
    return this.configGetUserStateByFunction(StateChangedTrigger.UserFilter, returnJson) as UserFilterState
  }

}