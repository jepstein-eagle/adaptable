import { ChartState } from '../../PredefinedConfig/IUserState Interfaces/ChartState';
import { UserFilterState } from '../../PredefinedConfig/IUserState Interfaces/UserFilterState';
import { ThemeState } from '../../PredefinedConfig/IUserState Interfaces/ThemeState';
import { SmartEditState } from '../../PredefinedConfig/IUserState Interfaces/SmartEditState';
import { ShortcutState } from '../../PredefinedConfig/IUserState Interfaces/ShortcutState';
import { QuickSearchState } from '../../PredefinedConfig/IUserState Interfaces/QuickSearchState';
import { PlusMinusState } from '../../PredefinedConfig/IUserState Interfaces/PlusMinusState';
import { LayoutState } from '../../PredefinedConfig/IUserState Interfaces/LayoutState';
import { FormatColumnState } from '../../PredefinedConfig/IUserState Interfaces/FormatColumnState';
import { FlashingCellState } from '../../PredefinedConfig/IUserState Interfaces/FlashingCellState';
import { ExportState } from '../../PredefinedConfig/IUserState Interfaces/ExportState';
import { DataSourceState } from '../../PredefinedConfig/IUserState Interfaces/DataSourceState';
import { DashboardState } from '../../PredefinedConfig/IUserState Interfaces/DashboardState';
import { CustomSortState } from '../../PredefinedConfig/IUserState Interfaces/CustomSortState';
import { ConditionalStyleState } from '../../PredefinedConfig/IUserState Interfaces/ConditionalStyleState';
import { ColumnFilterState } from '../../PredefinedConfig/IUserState Interfaces/ColumnFilterState';
import { CellValidationState } from '../../PredefinedConfig/IUserState Interfaces/CellValidationState';
import { CellSummaryState } from '../../PredefinedConfig/IUserState Interfaces/CellSummaryState';
import { CalendarState } from '../../PredefinedConfig/IUserState Interfaces/CalendarState';
import { CalculatedColumnState } from '../../PredefinedConfig/IUserState Interfaces/CalculatedColumnState';
import { BulkUpdateState } from '../../PredefinedConfig/IUserState Interfaces/BulkUpdateState';
import { AlertState } from '../../PredefinedConfig/IUserState Interfaces/AlertState';
import { AdvancedSearchState } from '../../PredefinedConfig/IUserState Interfaces/AdvancedSearchState';
import { IUserState } from '../../PredefinedConfig/Interfaces/IUserState';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';

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
