import { IEvent } from "../../Interface/IEvent";
import { IAdaptableBlotter } from "../../Interface/IAdaptableBlotter";
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs, IStateChangedEventArgs } from "./IStateEvents";
import { IAdvancedSearch, ILayout, IStyle, IColumnFilter, IUserFilter, ICustomSort, IUserTheme, IShortcut, ICalculatedColumn, ICellValidationRule, IFormatColumn } from "./IAdaptableBlotterObjects";
import { IEntitlement } from "../../Interface/Interfaces";
import { AdaptableBlotterState } from "../../../Redux/Store/Interface/IAdaptableStore";
import { AdvancedSearchState, AlertState, BulkUpdateState, CalculatedColumnState, CalendarState, CellValidationState, ChartState, ColumnFilterState, ConditionalStyleState, CustomSortState, DashboardState, DataSourceState, ExportState, FlashingCellState, FormatColumnState, LayoutState, PlusMinusState, QuickSearchState, SelectedCellsState, ShortcutState, SmartEditState, ThemeState, UserFilterState, IUserState } from "../../../Redux/ActionsReducers/Interface/IState";

/**
 * The main interface between users (devs) and the Blotter while the system is up and running
 */
export interface IBlotterApi {
  /**
   * Repopulates the grid; typically used after listening to a SearchChanged event, so appropriately filtered data on the server can be sent to the Blotter.
   * @param data can be any data from any datasource that is suitable for the underlying grid.  
   */
  setGridData(data: any): void;


  /**
   * Selects the layout
   * @param layoutName has to be an existing layout
   */
  layoutSet(layoutName: string): void

  /**
     * Clears the currently selected layout
     */
  layoutClear(): void

  /**
   * Retrieves current Layout
   */
  layoutGetCurrent(): ILayout

  /**
   * Retrieves all Layouts in State
   */
  layoutgetAll(): ILayout[]

  /**
   * Saves the current layout - using the column order and grid sort info currently in the grid
   */
  layoutSave(): void

  /**
* Runs QuickSearch on the supplied text
* @param quickSearchText text to run QuickSearch on
*/
  quickSearchRun(quickSearchText: string): void

  /**
   * Clears Quick Search
   */
  quickSearchClear(): void

  /**
   * Retrieves the current quick search text
   */
  quickSearchGetValue(): string
  /**
   * Sets the Quick Search Operator
   * @param operator Either 'Contains' to return any cell containing the text or 'StartsWith' to return only those where the value starts with the text
   */
  quickSearchSetOperator(operator: 'Contains' | 'StartsWith'): void
  quickSearchSetDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void
  quickSearchSetStyle(style: IStyle): void

  /**
  * Selects the dataSource
  * @param dataSource has to be an existing dataSource
  */
  dataSourceSet(dataSource: string): void

  /**
   * Clears the currently selected dataSource
   */
  dataSourceClear(): void

  // Advanced Search api methods
  advancedSearchSet(advancedSearchName: string): void
  advancedSearchClear(): void
  advancedSearchAdd(advancedSearch: IAdvancedSearch): void
  advancedSearchEdit(advancedSearchName: string, advancedSearch: IAdvancedSearch): void
  advancedSearchDelete(advancedSearchName: string): void
  advancedSearchGetCurrent(): IAdvancedSearch
  advancedSearchGetByName(advancedSearchName: string): IAdvancedSearch
  advancedSearchGetAll(): IAdvancedSearch[]

  // Dashboard api methods
  dashboardSetAvailableToolbars(availableToolbars: string[]): void
  dashboardSetVisibleToolbars(visibleToolbars: string[]): void
  dashboardShowToolbar(visibleToolbar: string): void
  dashboardHideToolbar(visibleToolbar: string): void
  dashboardSetVisibleButtons(functionButtons: string[]): void
  dashboardSetZoom(zoom: Number): void
  dashboardSetVisibility(dashboardVisibility: 'Minimised' | 'Visible' | 'Hidden'): void
  dashboardShow(): void
  dashboardHide(): void
  dashboardShowSystemStatusButton(): void
  dashboardHideSystemStatusButton(): void
  dashboardShowFunctionsDropdown(): void
  dashboardHideFunctionsDropdown(): void
  dashboardShowColumnsDropdown(): void
  dashboardHideColumnsDropdown(): void
  dashboardSetHomeToolbarTitle(title: string): void
  dashboardSetApplicationToolbarTitle(title: string): void
  dashboardMinimise(): void

  // Calendar State
  calendarSetCurrent(calendar: string): void
  calendarGetCurrent(): string

  // Theme State
  themeSetCurrent(theme: string): void
  themeGetCurrent(): string
  themeSetSystemThemes(systemThemes: string[]): void
  themeSetUserThemes(userThemes: string[]): void
  themeSystemThemeGetAll(): string[]
  themeUserThemeGetAll(): IUserTheme[]

  // Shortcut api methods
  shortcutGetAll(): IShortcut[]
  shortcutAdd(shortcut: IShortcut): void
  shortcutDelete(shortcut: IShortcut): void
  shortcutDeleteAll(): void

  // SmartEdit api methods
  smartEditSetMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void
  smartEditGetMathOperation(): string
  smartEditSetValue(smartEditValue: number): void
  smartEditGetValue(): number

  // user interface api methods
  uiSetColorPalette(colorPalette: string[]): void
  uiAddColorsToPalette(colorPalette: string[]): void
  uiAddStyleClassNames(styleClassNames: string[]): void
  uiSetColumnPermittedValues(column: string, permittedValues: string[]): void
  uiClearColumnPermittedValues(column: string): void


  // column filter api methods
  columnFilterSet(columnFilters: IColumnFilter[]): void
  columnFilterSetUserFilter(userFilter: string): void
  columnFilterClear(columnFilter: IColumnFilter): void
  columnFilterClearByColumn(column: string): void
  columnFilterClearByColumns(columns: string[]): void
  columnFilterClearAll(): void
  columnFiltersGetCurrent(): IColumnFilter[]
  userFilterSet(userFilters: IUserFilter[]): void
  systemFilterSet(systemFilters: string[]): void
  systemFilterClear(): void
  systemFilterGetCurrent(): string[]
  systemFilterGetAll(): string[]

  // Entitlement Methods
  entitlementGetAll(): IEntitlement[]
  entitlementGetByFunction(functionName: string): IEntitlement
  entitlementGetAccessLevelForFunction(functionName: string): string
  entitlementAddOrUpdate(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Full"): void
  entitlementDelete(functionName: string): void

  // Custom Sort Methods
  customSortGetAll(): ICustomSort[]
  customSortGetByColumn(columnn: string): ICustomSort
  customSortAdd(column: string, values: string[]): void
  customSortEdit(column: string, values: string[]): void
  customSortDelete(column: string): void

  // Calculated Column State
  calculatedColumnGetAll(): ICalculatedColumn[]
  calculatedColumnAdd(calculatedColumn: ICalculatedColumn): void
  calculatedColumnEditExpression(column: string, columnExpression: string): void
  calculatedColumnDelete(column: string): void


  // CellValidation State
  cellValidationGetAll(): ICellValidationRule[]
  cellValidationAdd(cellValidationRule: ICellValidationRule): void
  cellValidationDelete(cellValidationRule: ICellValidationRule): void

  // FormatColumn State
  formatColumnGetAll(): IFormatColumn[]
  formatColumnnAdd(column: string, style: IStyle): void
  formatColumnnUpdate(column: string, style: IStyle): void
  formatColumnDelete(formatColumn: IFormatColumn): void
  formatColumnDeleteAll(): void

  // System Status
  /**
   * Sets which coloured System Status button is displayed in the Home Toolbar
   * @param statusMessage The message to show when the button is clicked
   * @param statusColour The colour of the buttton - also influences the type of message (red: error, amber: warning etc)
   */
  systemStatusSet(statusMessage: string, statusColour: "Red" | "Amber" | "Green"): void

  systemStatusSetRed(statusMessage: string): void
  systemStatusSetAmber(statusMessage: string): void
  systemStatusSetGreen(statusMessage: string): void

  /**
   * Clears any System Status messages - and sets teh button to green
   */
  systemStatusClear(): void

  // Alerts
  /**
   * Shows an alert as a popup
   * @param alertHeader Title to appear in the popup
   * @param alertMessage Main message of the alert
   * @param MessageType Type (Info, Warning or Error) of the Alert - depending on this value the image and colour of the alert will change.
   */
  alertShow(alertHeader: string, alertMessage: string, MessageType: "Info" | "Warning" | "Error", showAsPopup: boolean): void

  alertShowMessage(alertHeader: string, alertMessage: string, showAsPopup: boolean): void
  alertShowWarning(alertHeader: string, alertMessage: string, showAsPopup: boolean): void
  alertShowError(alertHeader: string, alertMessage: string, showAsPopup: boolean): void


  // General Config

  /**
   * Clears the  configuration for the current user, reverting everyting to system defaults.
   * This includes clearing all predefined items that have been created fo the users (though they will subsequently be re-applied if the local cache is cleared).
   *  */
  configClear(): void
  configDeleteLocalStorage(): void
  configGetAllState(): AdaptableBlotterState
  configGetAllUserState(): IUserState[]
  configGetUserStateByFunction(stateChangedTrigger: 'AdvancedSearch' | 'Alert' | 'BulkUpdate' | 'CalculatedColumn' | 'Calendar' |
    'CellValidation' | 'Chart' | 'ColumnFilter' | 'ConditionalStyle' | 'CustomSort' | 'Dashboard' | 'DataSource' |
    'Export' | 'FlashingCell' | 'FormatColumn' | 'Layout' | 'PlusMinus' | 'QuickSearch' | 'SelectedCells' |
    'Shortcut' | 'SmartEdit' | 'Theme' | 'UserFilter', returnJson: boolean): IUserState

  configGetAdvancedSearchState(returnJson: boolean): AdvancedSearchState
  configGetAlertSearchState(returnJson: boolean): AlertState
  configGetBulkUpdateState(returnJson: boolean): BulkUpdateState
  configGetCalculatedColumnState(returnJson: boolean): CalculatedColumnState
  configGetCalendarState(returnJson: boolean): CalendarState
  configGetCellValidationState(returnJson: boolean): CellValidationState
  configGetChartState(returnJson: boolean): ChartState
  configGetColumnFilterState(returnJson: boolean): ColumnFilterState
  configGetConditionalStyleState(returnJson: boolean): ConditionalStyleState
  configGetCustomSortState(returnJson: boolean): CustomSortState
  configGetDashboardState(returnJson: boolean): DashboardState
  configGetDataSourceState(returnJson: boolean): DataSourceState
  configGetExportState(returnJson: boolean): ExportState
  configGetFlashingCellState(returnJson: boolean): FlashingCellState
  configGetFormatColumnState(returnJson: boolean): FormatColumnState
  configGetLayoutState(returnJson: boolean): LayoutState
  configGetPlusMinusState(returnJson: boolean): PlusMinusState
  configGetQuickSearchState(returnJson: boolean): QuickSearchState
  configGetSelectedCellsState(returnJson: boolean): SelectedCellsState
  configGetShortcutState(returnJson: boolean): ShortcutState
  configGetSmartEditState(returnJson: boolean): SmartEditState
  configGetThemeState(returnJson: boolean): ThemeState
  configGetUserFilterState(returnJson: boolean): UserFilterState

  /**
  * Event fired whenever search criteria in the Blotter changes, providing full coverage of what triggered the change and the current Search and Filter state.
  * @returns IEvent<IAdaptableBlotter, ISearchChangedEventArgs>
  */
  onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs>;

  /**
  * Event fired whenever the state in the Blotter changes, providing full coverage of what triggered the change and what the new state for that function is.
  * @returns IEvent<IAdaptableBlotter, IStateChangedEventArgs>
  */
  onStateChanged(): IEvent<IAdaptableBlotter, IStateChangedEventArgs>;

  /**
  * Event fired whenever column order (and visiblity) and grid sorts in the Blotter change.
  * Only fires when in a user layout and currently just passes the name of the layout.
  * @returns IEvent<IAdaptableBlotter, IColumnStateChangedEventArgs>
  */
  onColumnStateChanged(): IEvent<IAdaptableBlotter, IColumnStateChangedEventArgs>;
}
