import { ChartState } from '../../PredefinedConfig/IUserState/ChartState';
import { UserFilterState } from '../../PredefinedConfig/IUserState/UserFilterState';
import { ThemeState } from '../../PredefinedConfig/IUserState/ThemeState';
import { SmartEditState } from '../../PredefinedConfig/IUserState/SmartEditState';
import { ShortcutState } from '../../PredefinedConfig/IUserState/ShortcutState';
import { QuickSearchState } from '../../PredefinedConfig/IUserState/QuickSearchState';
import { LayoutState } from '../../PredefinedConfig/IUserState/LayoutState';
import { FormatColumnState } from '../../PredefinedConfig/IUserState/FormatColumnState';
import { FlashingCellState } from '../../PredefinedConfig/IUserState/FlashingCellState';
import { ExportState } from '../../PredefinedConfig/IUserState/ExportState';
import { DataSourceState } from '../../PredefinedConfig/IUserState/DataSourceState';
import { DashboardState } from '../../PredefinedConfig/IUserState/DashboardState';
import { CustomSortState } from '../../PredefinedConfig/IUserState/CustomSortState';
import { ConditionalStyleState } from '../../PredefinedConfig/IUserState/ConditionalStyleState';
import { ColumnFilterState } from '../../PredefinedConfig/IUserState/ColumnFilterState';
import { CellValidationState } from '../../PredefinedConfig/IUserState/CellValidationState';
import { CellSummaryState } from '../../PredefinedConfig/IUserState/CellSummaryState';
import { CalendarState } from '../../PredefinedConfig/IUserState/CalendarState';
import { CalculatedColumnState } from '../../PredefinedConfig/IUserState/CalculatedColumnState';
import { BulkUpdateState } from '../../PredefinedConfig/IUserState/BulkUpdateState';
import { AlertState } from '../../PredefinedConfig/IUserState/AlertState';
import { AdvancedSearchState } from '../../PredefinedConfig/IUserState/AdvancedSearchState';
import { IUserState } from '../../PredefinedConfig/IUserState/IUserState';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { PlusMinusState } from '../../PredefinedConfig/IUserState/PlusMinusState';

export interface IConfigApi {
  // General Config
  configInit(): void;
  /**
   * Clears the  configuration for the current user, reverting everyting to system defaults.
   * This includes clearing all predefined items that have been created fo the users (though they will subsequently be re-applied if the local cache is cleared).
   *  */
  configClear(): void;
  configDeleteLocalStorage(): void;

  configloadUserState(state: { [s: string]: IUserState }): void;

  configGetAllState(): AdaptableBlotterState;

  configGetAllUserState(): IUserState[];
  configGetUserStateByFunction(
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
    returnJson: boolean
  ): IUserState;

  configGetAdvancedSearchState(returnJson: boolean): AdvancedSearchState;
  configGetAlertSearchState(returnJson: boolean): AlertState;
  configGetBulkUpdateState(returnJson: boolean): BulkUpdateState;
  configGetCalculatedColumnState(returnJson: boolean): CalculatedColumnState;
  configGetCalendarState(returnJson: boolean): CalendarState;
  configGetCellValidationState(returnJson: boolean): CellValidationState;
  configGetChartState(returnJson: boolean): ChartState;
  configGetColumnFilterState(returnJson: boolean): ColumnFilterState;
  configGetConditionalStyleState(returnJson: boolean): ConditionalStyleState;
  configGetCustomSortState(returnJson: boolean): CustomSortState;
  configGetDashboardState(returnJson: boolean): DashboardState;
  configGetDataSourceState(returnJson: boolean): DataSourceState;
  configGetExportState(returnJson: boolean): ExportState;
  configGetFlashingCellState(returnJson: boolean): FlashingCellState;
  configGetFormatColumnState(returnJson: boolean): FormatColumnState;
  configGetLayoutState(returnJson: boolean): LayoutState;
  configGetPlusMinusState(returnJson: boolean): PlusMinusState;
  configGetQuickSearchState(returnJson: boolean): QuickSearchState;
  configGetCellSummaryState(returnJson: boolean): CellSummaryState;
  configGetShortcutState(returnJson: boolean): ShortcutState;
  configGetSmartEditState(returnJson: boolean): SmartEditState;
  configGetThemeState(returnJson: boolean): ThemeState;
  configGetUserFilterState(returnJson: boolean): UserFilterState;
}
