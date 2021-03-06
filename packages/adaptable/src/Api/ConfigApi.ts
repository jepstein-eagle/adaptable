import { ChartState } from '../PredefinedConfig/ChartState';
import { ThemeState } from '../PredefinedConfig/ThemeState';
import { SmartEditState } from '../PredefinedConfig/SmartEditState';
import { ShortcutState } from '../PredefinedConfig/ShortcutState';
import { QuickSearchState } from '../PredefinedConfig/QuickSearchState';
import { LayoutState } from '../PredefinedConfig/LayoutState';
import { FormatColumnState } from '../PredefinedConfig/FormatColumnState';
import { FlashingCellState } from '../PredefinedConfig/FlashingCellState';
import { ExportState } from '../PredefinedConfig/ExportState';
import { DataSourceState } from '../PredefinedConfig/DataSourceState';
import { DashboardState } from '../PredefinedConfig/DashboardState';
import { CustomSortState } from '../PredefinedConfig/CustomSortState';
import { ConditionalStyleState } from '../PredefinedConfig/ConditionalStyleState';
import { CellValidationState } from '../PredefinedConfig/CellValidationState';
import { CellSummaryState } from '../PredefinedConfig/CellSummaryState';
import { CalendarState } from '../PredefinedConfig/CalendarState';
import { CalculatedColumnState } from '../PredefinedConfig/CalculatedColumnState';
import { BulkUpdateState } from '../PredefinedConfig/BulkUpdateState';
import { AlertState } from '../PredefinedConfig/AlertState';
import { ConfigState } from '../PredefinedConfig/ConfigState';
import { PlusMinusState } from '../PredefinedConfig/PlusMinusState';
import { ActionColumnState } from '../PredefinedConfig/ActionColumnState';
import { ApplicationState } from '../PredefinedConfig/ApplicationState';
import { UpdatedRowState } from '../PredefinedConfig/UpdatedRowState';
import { SparklineColumnState } from '../PredefinedConfig/SparklineColumnState';
import { AdaptableState } from '../PredefinedConfig/AdaptableState';
import { EntitlementState } from '../PredefinedConfig/EntitlementState';
import { FreeTextColumnState } from '../PredefinedConfig/FreeTextColumnState';
import { PercentBarState } from '../PredefinedConfig/PercentBarState';
import { FilterState } from '../PredefinedConfig/FilterState';
import { SystemStatusState } from '../PredefinedConfig/SystemStatusState';
import { TeamSharingState } from '../PredefinedConfig/TeamSharingState';
import { ToolPanelState } from '../PredefinedConfig/ToolPanelState';
import { UserInterfaceState } from '../PredefinedConfig/UserInterfaceState';
import { AdaptableStateKey } from '../PredefinedConfig/Common/Types';
import { IPushPullState } from '../PredefinedConfig/IPushPullState';
import { Glue42State } from '../PredefinedConfig/Glue42State';
import { AdaptableSearchState, ScheduleState } from '../types';
import { AdaptableSortState } from './Events/SearchChanged';
import { QueryState } from '../PredefinedConfig/QueryState';

export interface ConfigApi {
  configInit(): void;

  /**
   * Clears the  configuration for the current user, reverting everyting to system defaults.
   *
   * This includes clearing all predefined items that have been created fo the users (though they will subsequently be re-applied if the local cache is cleared).
   *  */
  configClear(): void;

  configDeleteLocalStorage(): void;

  configCopyAllStateToClipboard(): void;
  configCopyUserStateToClipboard(): void;

  /**
   * Loads the user state that is supplied.
   *
   * This will **replace** the existing User State; it is **not** a merge function.
   *
   * @param state
   */
  configloadUserState(state: { [s: string]: ConfigState }): void;

  /**
   * Some of the state retrieved by this function will be internal state that is required by the System but not relevant to users so be careful - it is preferable to use the configGetAllUserState method which will only retrieve run-time state that can be amended by users (and is persisted into local storage or remote config).
   */
  configGetAllState(): AdaptableState;

  configGetAllUserState(): ConfigState[];

  configGetUserStateByStateKey(
    stateKey: AdaptableStateKey,
    returnJson: boolean
  ): ConfigState | string;

  configGetActionColumnState(returnJson: boolean): ActionColumnState;
  configGetQueryState(returnJson: boolean): QueryState;
  configGetAlertState(returnJson: boolean): AlertState;
  configGetApplicationState(returnJson: boolean): ApplicationState;
  configGetBulkUpdateState(returnJson: boolean): BulkUpdateState;
  configGetCalculatedColumnState(returnJson: boolean): CalculatedColumnState;
  configGetCalendarState(returnJson: boolean): CalendarState;
  configGetCellSummaryState(returnJson: boolean): CellSummaryState;
  configGetCellValidationState(returnJson: boolean): CellValidationState;
  configGetChartState(returnJson: boolean): ChartState;
  configGetConditionalStyleState(returnJson: boolean): ConditionalStyleState;
  configGetCustomSortState(returnJson: boolean): CustomSortState;
  configGetDashboardState(returnJson: boolean): DashboardState;
  configGetDataSourceState(returnJson: boolean): DataSourceState;
  configGetEntitlementState(returnJson: boolean): EntitlementState;
  configGetExportState(returnJson: boolean): ExportState;
  configGetFlashingCellState(returnJson: boolean): FlashingCellState;
  configGetFormatColumnState(returnJson: boolean): FormatColumnState;
  configGetFreeTextColumnState(returnJson: boolean): FreeTextColumnState;
  configGetLayoutState(returnJson: boolean): LayoutState;
  configGetIPushPullState(returnJson: boolean): IPushPullState;
  configGetGlue42State(returnJson: boolean): Glue42State;
  configGetPercentBarState(returnJson: boolean): PercentBarState;
  configGetPlusMinusState(returnJson: boolean): PlusMinusState;
  configGetScheduleState(returnJson: boolean): ScheduleState;
  configGetQuickSearchState(returnJson: boolean): QuickSearchState;
  configGetShortcutState(returnJson: boolean): ShortcutState;
  configGetSmartEditState(returnJson: boolean): SmartEditState;
  configGetSparklineColumnState(returnJson: boolean): SparklineColumnState;
  configGetFilterState(returnJson: boolean): FilterState;
  configGetSystemStatusState(returnJson: boolean): SystemStatusState;
  configGetThemeState(returnJson: boolean): ThemeState;
  configGetToolPanelState(returnJson: boolean): ToolPanelState;
  configGetUpdatedRowState(returnJson: boolean): UpdatedRowState;
  configGetUserInterfaceState(returnJson: boolean): UserInterfaceState;

  configGetAdaptableSearchState(): AdaptableSearchState;
  configGetAdaptableSortState(): AdaptableSortState;
}
