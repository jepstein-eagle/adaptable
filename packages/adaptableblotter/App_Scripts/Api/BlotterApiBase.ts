import { IAdaptableBlotter } from "../Api/Interface/IAdaptableBlotter";
import { IEvent } from "./Interface/IEvent";
import { IBlotterApi } from "./Interface/IBlotterApi";
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs, IStateChangedEventArgs } from "./Interface/IStateEvents";
import * as LayoutRedux from '../Redux/ActionsReducers/LayoutRedux'
import * as QuickSearchRedux from '../Redux/ActionsReducers/QuickSearchRedux'
import * as DataSourceRedux from '../Redux/ActionsReducers/DataSourceRedux'
import * as AdvancedSearchRedux from '../Redux/ActionsReducers/AdvancedSearchRedux'
import * as ColumnCategoryRedux from '../Redux/ActionsReducers/ColumnCategoryRedux'
import * as FreeTextColumnRedux from '../Redux/ActionsReducers/FreeTextColumnRedux'
import * as PercentBarRedux from '../Redux/ActionsReducers/PercentBarRedux'
import * as EntitlementsRedux from '../Redux/ActionsReducers/EntitlementsRedux'
import * as UserInterfaceRedux from '../Redux/ActionsReducers/UserInterfaceRedux'
import * as DashboardRedux from '../Redux/ActionsReducers/DashboardRedux'
import * as SmartEditRedux from '../Redux/ActionsReducers/SmartEditRedux'
import * as ShortcutRedux from '../Redux/ActionsReducers/ShortcutRedux'
import * as CellValidationRedux from '../Redux/ActionsReducers/CellValidationRedux'
import * as CalculatedColumnRedux from '../Redux/ActionsReducers/CalculatedColumnRedux'
import * as CalendarRedux from '../Redux/ActionsReducers/CalendarRedux'
import * as ThemeRedux from '../Redux/ActionsReducers/ThemeRedux'
import * as CustomSortRedux from '../Redux/ActionsReducers/CustomSortRedux'
import * as ColumnFilterRedux from '../Redux/ActionsReducers/ColumnFilterRedux'
import * as UserFilterRedux from '../Redux/ActionsReducers/UserFilterRedux'
import * as SystemFilterRedux from '../Redux/ActionsReducers/SystemFilterRedux'
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import * as ExportRedux from '../Redux/ActionsReducers/ExportRedux'
import * as FormatColumnRedux from '../Redux/ActionsReducers/FormatColumnRedux'
import { ILayout, IAdvancedSearch, IStyle, ICustomSort, IColumnFilter, IUserFilter, IUserTheme, IShortcut, ICalculatedColumn, ICellValidationRule, IFormatColumn, IReport, IGridSort, IFreeTextColumn, IPercentBar } from "./Interface/IAdaptableBlotterObjects";
import { DEFAULT_LAYOUT } from "../Utilities/Constants/GeneralConstants";
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import { IEntitlement, ISystemStatus, IPermittedColumnValues, IColumnCategory } from "../Api/Interface/Interfaces";
import { LeafExpressionOperator, DisplayAction, Visibility, MathOperation, MessageType, StatusColour, ExportDestination, StateChangedTrigger } from "../Utilities/Enums";
import { ResetUserData, LoadState } from '../Redux/Store/AdaptableBlotterStore';
import { AdaptableBlotterState } from "../Redux/Store/Interface/IAdaptableStore";
import { Action } from "redux";
import { ILiveReport } from "../Strategy/Interface/IExportStrategy";
import { IAlert } from "./Interface/IMessage";
import { ObjectFactory } from "../Utilities/ObjectFactory";
import { IColumn } from "./Interface/IColumn";
import { AdvancedSearchState, AlertState, BulkUpdateState, CalculatedColumnState, CalendarState, CellValidationState, ChartState, ColumnFilterState, ConditionalStyleState, CustomSortState, DashboardState, DataSourceState, ExportState, FlashingCellState, FormatColumnState, PlusMinusState, QuickSearchState, SelectedCellsState, ShortcutState, SmartEditState, ThemeState, UserFilterState, LayoutState, IUserState, IState } from "../Redux/ActionsReducers/Interface/IState";
import { FilterHelper } from "../Utilities/Helpers/FilterHelper";
import { StringExtensions } from "../Utilities/Extensions/StringExtensions";
import { LoggingHelper } from "../Utilities/Helpers/LoggingHelper";

export abstract class BlotterApiBase implements IBlotterApi {

  constructor(protected blotter: IAdaptableBlotter) {
  }

  public setGridData(dataSource: any): void {
    // no implementation as done in the base class
  }

  // Layout api methods
  public layoutSet(layoutName: string): void {
    let layout: ILayout = this.getState().Layout.Layouts.find(l => l.Name == layoutName);
    if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyName)) {
      this.dispatchAction(LayoutRedux.LayoutSelect(layoutName))
    }
  }

  public layoutClear(): void {
    this.dispatchAction(LayoutRedux.LayoutSelect(DEFAULT_LAYOUT))
  }

  public layoutGetCurrent(): ILayout {
    let layoutName = this.getState().Layout.CurrentLayout;
    return this.getState().Layout.Layouts.find(l => l.Name == layoutName);
  }

  public layoutgetAll(): ILayout[] {
    return this.getState().Layout.Layouts;
  }

  public layoutSave(): void {
    let currentLayoutName: string = this.getState().Layout.CurrentLayout
    if (currentLayoutName != DEFAULT_LAYOUT) {
      let currentLayoutObject: ILayout = this.getState().Layout.Layouts.find(l => l.Name == currentLayoutName)
      let currentLayoutIndex: number = this.getState().Layout.Layouts.findIndex(l => l.Name == currentLayoutName)
      if (currentLayoutIndex != -1) {
        let gridState: any = (currentLayoutObject) ? currentLayoutObject.VendorGridInfo : null
        let visibleColumns: IColumn[] = this.getState().Grid.Columns.filter(c => c.Visible);
        let gridSorts: IGridSort[] = this.getState().Grid.GridSorts;
        let layoutToSave = ObjectFactory.CreateLayout(visibleColumns, gridSorts, gridState, currentLayoutName)
        this.dispatchAction(LayoutRedux.LayoutPreSave(currentLayoutIndex, layoutToSave))
      }
    }
  }

  // Dashboard api methods
  public dashboardSetAvailableToolbars(availableToolbars: string[]): void {
    this.dispatchAction(DashboardRedux.DashboardSetAvailableToolbars(availableToolbars))
  }

  public dashboardSetVisibleToolbars(visibleToolbars: string[]): void {
    visibleToolbars.forEach(vt => {
      this.dashboardShowToolbar(vt)
    })
  }

  public dashboardShowToolbar(visibleToolbar: string): void {
    this.dispatchAction(DashboardRedux.DashboardShowToolbar(visibleToolbar))
  }

  public dashboardHideToolbar(visibleToolbar: string): void {
    this.dispatchAction(DashboardRedux.DashboardHideToolbar(visibleToolbar))
  }

  public dashboardSetVisibleButtons(functionButtons: string[]): void {
    this.dispatchAction(DashboardRedux.DashboardSetFunctionButtons(functionButtons))
  }

  public dashboardSetZoom(zoom: Number): void {
    this.dispatchAction(DashboardRedux.DashboardSetZoom(zoom))
  }

  public dashboardSetVisibility(dashboardVisibility: 'Minimised' | 'Visible' | 'Hidden'): void {
    this.dispatchAction(DashboardRedux.DashboardSetVisibility(dashboardVisibility as Visibility))
  }

  public dashboardShow(): void {
    this.dashboardSetVisibility(Visibility.Visible);
  }

  public dashboardHide(): void {
    this.dashboardSetVisibility(Visibility.Hidden);
  }

  public dashboardMinimise(): void {
    this.dashboardSetVisibility(Visibility.Minimised);
  }

  public dashboardShowSystemStatusButton(): void {
    this.dispatchAction(DashboardRedux.DashboardShowSystemStatusButton())
  }

  public dashboardHideSystemStatusButton(): void {
    this.dispatchAction(DashboardRedux.DashboardHideSystemStatusButton())
  }

  public dashboardShowAboutButton(): void {
    this.dispatchAction(DashboardRedux.DashboardShowAboutButton())
  }

  public dashboardHideAboutButton(): void {
    this.dispatchAction(DashboardRedux.DashboardHideAboutButton())
  }

  public dashboardShowFunctionsDropdown(): void {
    this.dispatchAction(DashboardRedux.DashboardShowFunctionsDropdown())
  }

  public dashboardHideFunctionsDropdown(): void {
    this.dispatchAction(DashboardRedux.DashboardHideFunctionsDropdown())
  }

  public dashboardShowColumnsDropdown(): void {
    this.dispatchAction(DashboardRedux.DashboardShowColumnsDropdown())
  }

  public dashboardHideColumnsDropdown(): void {
    this.dispatchAction(DashboardRedux.DashboardHideColumnsDropdown())
  }

  public dashboardSetHomeToolbarTitle(title: string): void {
    this.dispatchAction(DashboardRedux.DashboardSetHomeToolbarTitle(title))
  }

  public dashboardSetApplicationToolbarTitle(title: string): void {
    this.dispatchAction(DashboardRedux.DashboardSetApplicationToolbarTitle(title))
  }


  // Quick Search api methods
  public quickSearchRun(quickSearchText: string): void {
    this.dispatchAction(QuickSearchRedux.QuickSearchApply(quickSearchText))
  }

  public quickSearchClear(): void {
    this.dispatchAction(QuickSearchRedux.QuickSearchApply(""))
  }

  public quickSearchGetValue(): string {
    return this.getState().QuickSearch.QuickSearchText;
  }

  public quickSearchSetDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void {
    this.dispatchAction(QuickSearchRedux.QuickSearchSetDisplay(displayAction as DisplayAction))
  }

  public quickSearchSetStyle(style: IStyle): void {
    this.dispatchAction(QuickSearchRedux.QuickSearchSetStyle(style))
  }

  // Calendar State
  public calendarSetCurrent(calendar: string): void {
    this.dispatchAction(CalendarRedux.CalendarSelect(calendar))
  }

  public calendarGetCurrent(): string {
    return this.getState().Calendar.CurrentCalendar;
  }


  // Theme State
  public themeSetCurrent(theme: string): void {
    this.dispatchAction(ThemeRedux.ThemeSelect(theme))
  }

  public themeGetCurrent(): string {
    return this.getState().Theme.CurrentTheme;
  }

  public themeSetSystemThemes(systemThemes: string[]): void {
    this.dispatchAction(ThemeRedux.ThemeSetSystemThemes(systemThemes))
  }

  public themeSetUserThemes(userThemes: string[]): void {
    this.dispatchAction(ThemeRedux.ThemeSetUserThemes(userThemes))
  }

  public themeSystemThemeGetAll(): string[] {
    return this.getState().Theme.SystemThemes;
  }

  public themeUserThemeGetAll(): IUserTheme[] {
    return this.getState().Theme.UserThemes;
  }

  // Shortuct State
  public shortcutGetAll(): IShortcut[] {
    return this.getState().Shortcut.Shortcuts;
  }

  public shortcutAdd(shortcut: IShortcut): void {
    this.dispatchAction(ShortcutRedux.ShortcutAdd(shortcut))
  }

  public shortcutDelete(shortcut: IShortcut): void {
    this.dispatchAction(ShortcutRedux.ShortcutDelete(shortcut))
  }

  public shortcutDeleteAll(): void {
    this.shortcutGetAll().forEach(s => {
      this.shortcutDelete(s);
    })
  }


  // SmartEdit api methods
  public smartEditSetMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void {
    this.dispatchAction(SmartEditRedux.SmartEditChangeOperation(mathOperation as MathOperation))
  }

  public smartEditGetMathOperation(): string {
    return this.getState().SmartEdit.MathOperation;
  }

  public smartEditSetValue(smartEditValue: number): void {
    this.dispatchAction(SmartEditRedux.SmartEditChangeValue(smartEditValue))
  }

  public smartEditGetValue(): number {
    return this.getState().SmartEdit.SmartEditValue;
  }


  // user interface api methods
  public uiSetColorPalette(colorPalette: string[]): void {
    this.dispatchAction(UserInterfaceRedux.ColorPaletteSet(colorPalette))
  }

  public uiAddColorsToPalette(colorPalette: string[]): void {
    this.dispatchAction(UserInterfaceRedux.ColorPaletteAdd(colorPalette))
  }

  public uiAddStyleClassNames(styleClassNames: string[]): void {
    this.dispatchAction(UserInterfaceRedux.StyleClassNamesAdd(styleClassNames))
  }

  public uiSetColumnPermittedValues(column: string, permittedValues: string[]): void {
    let permittedColumnValues: IPermittedColumnValues = { ColumnId: column, PermittedValues: permittedValues }
    this.dispatchAction(UserInterfaceRedux.PermittedColumnValuesSet(permittedColumnValues))
  }

  public uiClearColumnPermittedValues(column: string): void {
    this.dispatchAction(UserInterfaceRedux.PermittedColumnValuesDelete(column))
  }


  // filter api methods
  public columnFilterSet(columnFilters: IColumnFilter[]): void {
    columnFilters.forEach(cf => {
      this.dispatchAction(ColumnFilterRedux.ColumnFilterAddUpdate(cf))
    })
  }

  public columnFilterSetUserFilter(userFilter: string): void {
    let existingUserFilter: IUserFilter = this.getState().UserFilter.UserFilters.find(uf => uf.Name == userFilter);
    if (this.checkItemExists(existingUserFilter, userFilter, "User Filter")) {
      let columnFilter: IColumnFilter = ObjectFactory.CreateColumnFilterFromUserFilter(existingUserFilter)
      this.dispatchAction(ColumnFilterRedux.ColumnFilterAddUpdate(columnFilter));
    }
  }

  public columnFilterClear(columnFilter: IColumnFilter): void {
    this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(columnFilter.ColumnId));
  }

  public columnFilterClearByColumns(columns: string[]): void {
    columns.forEach(c => {
      this.columnFilterClearByColumn(c);
    })
  }

  public columnFilterClearByColumn(column: string): void {
    this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(column));
  }

  public columnFilterClearAll(): void {
    this.dispatchAction(ColumnFilterRedux.ColumnFilterClearAll());
  }

  public columnFiltersGetCurrent(): IColumnFilter[] {
    return this.getState().ColumnFilter.ColumnFilters;
  }

  public userFilterSet(userFilters: IUserFilter[]): void {
    userFilters.forEach(uf => {
      this.dispatchAction(UserFilterRedux.UserFilterAddUpdate(-1, uf))
    })
  }

  public systemFilterSet(systemFilters: string[]): void {
    this.dispatchAction(SystemFilterRedux.SystemFilterSet(systemFilters));
  }

  public systemFilterClear(): void {
    this.dispatchAction(SystemFilterRedux.SystemFilterSet([]));
  }

  public systemFilterGetCurrent(): string[] {
    return this.getState().SystemFilter.SystemFilters;
  }

  public systemFilterGetAll(): string[] {
    return FilterHelper.GetAllSystemFilters();
  }


  // Data Source api methods
  public dataSourceSet(dataSourceName: string): void {
    let dataSource: string = this.getState().DataSource.DataSources.find(a => a == dataSourceName);
    if (this.checkItemExists(dataSource, dataSourceName, StrategyConstants.DataSourceStrategyName)) {
      this.dispatchAction(DataSourceRedux.DataSourceSelect(dataSource))
    }
  }

  public dataSourceClear(): void {
    this.dispatchAction(DataSourceRedux.DataSourceSelect(""))
  }


  // Advanced Search api methods
  public advancedSearchSet(advancedSearchName: string): void {
    let advancedSearch: IAdvancedSearch = this.getState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
    if (this.checkItemExists(advancedSearch, advancedSearchName, StrategyConstants.AdvancedSearchStrategyName)) {
      this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchName))
    }
  }

  public advancedSearchClear(): void {
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(""))
  }

  public advancedSearchAdd(advancedSearch: IAdvancedSearch): void {
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAddUpdate(-1, advancedSearch))
  }

  public advancedSearchEdit(advancedSearchName: string, advancedSearch: IAdvancedSearch): void {
    let searchIndex: number = this.getState().AdvancedSearch.AdvancedSearches.findIndex(a => a.Name == advancedSearchName);
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAddUpdate(searchIndex, advancedSearch))
  }

  public advancedSearchDelete(advancedSearchName: string): void {
    let searchToDelete = this.advancedSearchGetByName(advancedSearchName)
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchDelete(searchToDelete))
  }

  public advancedSearchGetCurrent(): IAdvancedSearch {
    let currentAdvancedSearchName: string = this.getState().AdvancedSearch.CurrentAdvancedSearch
    return this.advancedSearchGetByName(currentAdvancedSearchName)
  }

  public advancedSearchGetByName(advancedSearchName: string): IAdvancedSearch {
    return this.getState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
  }

  public advancedSearchGetAll(): IAdvancedSearch[] {
    return this.getState().AdvancedSearch.AdvancedSearches;
  }

  // Entitlement Methods
  public entitlementGetAll(): IEntitlement[] {
    return this.getState().Entitlements.FunctionEntitlements;
  }

  public entitlementGetByFunction(functionName: string): IEntitlement {
    return this.getState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName);
  }

  public entitlementGetAccessLevelForFunction(functionName: string): string {
    return this.getState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName).AccessLevel;
  }

  public entitlementAddOrUpdate(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Full"): void {
    let entitlement: IEntitlement = { FunctionName: functionName, AccessLevel: accessLevel }
    this.dispatchAction(EntitlementsRedux.EntitlementAddUpdate(-1, entitlement))
  }

  public entitlementDelete(functionName: string): void {
    this.dispatchAction(EntitlementsRedux.EntitlementDelete(functionName))
  }

  // Custom Sort Methods
  public customSortGetAll(): ICustomSort[] {
    return this.getState().CustomSort.CustomSorts;
  }

  public customSortGetByColumn(columnn: string): ICustomSort {
    return this.getState().CustomSort.CustomSorts.find(cs => cs.ColumnId == columnn);
  }

  public customSortAdd(column: string, values: string[]): void {
    let customSort: ICustomSort = { ColumnId: column, SortedValues: values }
    this.dispatchAction(CustomSortRedux.CustomSortAdd(customSort))
  }

  public customSortEdit(column: string, values: string[]): void {
    let customSort: ICustomSort = { ColumnId: column, SortedValues: values }
    this.dispatchAction(CustomSortRedux.CustomSortEdit(customSort))
  }

  public customSortDelete(column: string): void {
    let customSort: ICustomSort = this.customSortGetByColumn(column);
    this.dispatchAction(CustomSortRedux.CustomSortDelete(customSort))
  }

  // Calculated Column State
  public calculatedColumnGetAll(): ICalculatedColumn[] {
    return this.getState().CalculatedColumn.CalculatedColumns;
  }

  public calculatedColumnAdd(calculatedColumn: ICalculatedColumn): void {
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnAdd(calculatedColumn))
  }

  public calculatedColumnEditExpression(column: string, columnExpression: string): void {
    let calcColumn: ICalculatedColumn = this.calculatedColumnGetAll().find(cc => cc.ColumnId == column);
    let calcColumnIndex: number = this.calculatedColumnGetAll().findIndex(cc => cc.ColumnId == column);
    calcColumn.ColumnExpression = columnExpression;
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnEdit(calcColumnIndex, calcColumn))
  }

  public calculatedColumnDelete(column: string): void {
    let calcColumnIndex: number = this.calculatedColumnGetAll().findIndex(cc => cc.ColumnId == column);
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnDelete(calcColumnIndex))
  }

  // CellValidation State
  public cellValidationGetAll(): ICellValidationRule[] {
    return this.getState().CellValidation.CellValidations;
  }

  public cellValidationAdd(cellValidationRule: ICellValidationRule): void {
    this.dispatchAction(CellValidationRedux.CellValidationAddUpdate(-1, cellValidationRule))
  }

  public cellValidationDelete(cellValidationRule: ICellValidationRule): void {
    let index: number = this.cellValidationGetAll().findIndex(cv => cv == cellValidationRule)
    this.dispatchAction(CellValidationRedux.CellValidationDelete(index))
  }

  // Format Column api methods
  public formatColumnGetAll(): IFormatColumn[] {
    return this.getState().FormatColumn.FormatColumns;
  }

  public formatColumnnAdd(column: string, style: IStyle): void {
    let formatColumn: IFormatColumn = { ColumnId: column, Style: style }
    this.dispatchAction(FormatColumnRedux.FormatColumnAdd(formatColumn))
  }

  public formatColumnnUpdate(column: string, style: IStyle): void {
    let formatColumn: IFormatColumn = { ColumnId: column, Style: style }
    this.dispatchAction(FormatColumnRedux.FormatColumnEdit(formatColumn))
  }

  public formatColumnDelete(formatColumn: IFormatColumn): void {
    this.dispatchAction(FormatColumnRedux.FormatColumnDelete(formatColumn))
  }

  public formatColumnDeleteAll(): void {
    this.formatColumnGetAll().forEach(fc => {
      this.formatColumnDelete(fc);
    })
  }


  // System Status api Methods
  public systemStatusSet(statusMessage: string, statusColour: "Red" | "Amber" | "Green"): void {
    let systemStatus: ISystemStatus = { StatusMessage: statusMessage, StatusColour: statusColour }
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus))
  }
  public systemStatusSetRed(statusMessage: string): void {
    let systemStatus: ISystemStatus = { StatusMessage: statusMessage, StatusColour: StatusColour.Red }
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus))
  }
  public systemStatusSetAmber(statusMessage: string): void {
    let systemStatus: ISystemStatus = { StatusMessage: statusMessage, StatusColour: StatusColour.Amber }
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus))
  }
  public systemStatusSetGreen(statusMessage: string): void {
    let systemStatus: ISystemStatus = { StatusMessage: statusMessage, StatusColour: StatusColour.Green }
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus))
  }

  public systemStatusClear(): void {
    this.dispatchAction(SystemRedux.SystemClearHealthStatus())
  }

  // Alerts api Methods
  public alertShow(alertHeader: string, alertMessage: string, MessageType: "Info" | "Warning" | "Error", showAsPopup: boolean): void {
    let maxAlerts: number = this.getState().Alert.MaxAlertsInStore;
    let MessageTypeEnum = MessageType as MessageType;
    let alertToShow: IAlert = {
      Header: alertHeader,
      Msg: alertMessage,
      MessageType: MessageTypeEnum
    }
    this.dispatchAction(SystemRedux.SystemAlertAdd(alertToShow, maxAlerts))
    if (showAsPopup) {
      if (StringExtensions.IsNotNullOrEmpty(this.getState().Alert.AlertPopupDiv)) {
        let alertString: string = alertToShow.Header + ": " + alertToShow.Msg
        let alertDiv = document.getElementById(this.getState().Alert.AlertPopupDiv);
        if (alertDiv) {
          alertDiv.innerHTML = alertString;
        }
      } else {
        this.dispatchAction(PopupRedux.PopupShowAlert(alertToShow))
      }
    }
    LoggingHelper.LogAlert(alertHeader + ": " + alertMessage, MessageTypeEnum)
  }

  public alertShowMessage(alertHeader: string, alertMessage: string, showAsPopup: boolean): void {
    this.alertShow(alertHeader, alertMessage, MessageType.Info, showAsPopup)
  }

  public alertShowWarning(alertHeader: string, alertMessage: string, showAsPopup: boolean): void {
    this.alertShow(alertHeader, alertMessage, MessageType.Warning, showAsPopup)
  }

  public alertShowError(alertHeader: string, alertMessage: string, showAsPopup: boolean): void {
    this.alertShow(alertHeader, alertMessage, MessageType.Error, showAsPopup)
  }

  // Export api Methods
  public exportSendReport(reportName: string, destination: ExportDestination): void {
    let report: IReport = this.exportReportsGetAll().find(r => r.Name == reportName);
    if (this.checkItemExists(report, reportName, "Report")) {
      this.dispatchAction(ExportRedux.ExportApply(reportName, destination))
    }
  }

  public exportReportsGetAll(): IReport[] {
    return this.getState().Export.Reports;
  }

  public exportLiveReportsGetAll(): ILiveReport[] {
    return this.getState().System.CurrentLiveReports;
  }

  // column category api methods
  public columnCategoryGetAll(): IColumnCategory[] {
    return this.getState().ColumnCategory.ColumnCategories;
  }

  public columnCategoryAdd(columnCategory: IColumnCategory): void {
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryAdd(columnCategory))
  }

  public columnCategoryCreate(columnCategoryId: string, columns: string[]): void {
    let columnCategory: IColumnCategory = {
      ColumnCategoryId: columnCategoryId,
      ColumnIds: columns
    }
    this.columnCategoryAdd(columnCategory);
  }

  public columnCategoryEdit(previousColumnCategoryId: string, columnCategory: IColumnCategory): void {
    let index: number = this.columnCategoryGetAll().findIndex(cc => cc.ColumnCategoryId == previousColumnCategoryId)
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory))
  }

  public columnCategoryAddColumns(columnCategoryId: string, columns: string[]): void {
    let columnCategory: IColumnCategory = this.columnCategoryGetAll().find(cc => cc.ColumnCategoryId == columnCategoryId)
    let index: number = this.columnCategoryGetAll().findIndex(cc => cc.ColumnCategoryId == columnCategoryId)
    columns.forEach(c => {
      columnCategory.ColumnIds.push(c);
    })
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory))
  }

  public columnCategoryRemoveColumns(columnCategoryId: string, columns: string[]): void {
    let columnCategory: IColumnCategory = this.columnCategoryGetAll().find(cc => cc.ColumnCategoryId == columnCategoryId)
    let index: number = this.columnCategoryGetAll().findIndex(cc => cc.ColumnCategoryId == columnCategoryId)
    columns.forEach(c => {
      let ccIndex = columnCategory.ColumnIds.findIndex(cc => cc == c)
      columnCategory.ColumnIds.splice(ccIndex, 1);
    })
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory))
  }


  public columnCategoryDelete(columnCategoryId: string): void {
    let columnCategory: IColumnCategory = this.columnCategoryGetAll().find(cc => cc.ColumnCategoryId == columnCategoryId)
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryDelete(columnCategory))
  }

  // Free Text Column api methods
  public freeTextColumnGetAll(): IFreeTextColumn[] {
    return this.getState().FreeTextColumn.FreeTextColumns;
  }

  public freeTextColumnAdd(freeTextColumn: IFreeTextColumn): void {
    this.dispatchAction(FreeTextColumnRedux.FreeTextColumnAdd(freeTextColumn))
  }

  public freeTextColumnCreate(columnId: string, defaultValue: string = null): void {
    let freeTextColumn: IFreeTextColumn = {
      ColumnId: columnId,
      DefaultValue: defaultValue,
      FreeTextStoredValues: []
    }
    this.freeTextColumnAdd(freeTextColumn);
  }

  public freeTextColumnDelete(columnId: string): void {
    let freeTextColumn: IFreeTextColumn = this.freeTextColumnGetAll().find(ftc => ftc.ColumnId == columnId);
    this.dispatchAction(FreeTextColumnRedux.FreeTextColumnDelete(freeTextColumn))
  }


  // Percent Bars api methods
  public percentBarGetAll(): IPercentBar[] {
    return this.getState().PercentBar.PercentBars;
  }

  public percentBarGetByColumn(columnId: string): IPercentBar {
    let percentBar: IPercentBar = this.getState().PercentBar.PercentBars.find(pcb => pcb.ColumnId == columnId);
    return percentBar;
  }

  public percentBarAdd(percentBar: IPercentBar): void {
    this.dispatchAction(PercentBarRedux.PercentBarAdd( percentBar))
  }

  public percentBarCreate(columnId: string, minValue: number, maxValue: number, positiveColor: string, negativeColor: string, showValue: boolean): void {
    let percentBar: IPercentBar = {
      ColumnId: columnId,
      MinValue: minValue,
      MaxValue: maxValue,
      PositiveColor: positiveColor,
      NegativeColor: negativeColor,
      ShowValue: showValue
    }
    this.percentBarAdd(percentBar);
  }

  public percentBarEditByIndex(index: number, percentBar: IPercentBar): void {
    this.dispatchAction(PercentBarRedux.PercentBarEdit(index, percentBar))
  }

  public percentBarEdit(percentBar: IPercentBar): void {
    let index: number = this.percentBarGetAll().findIndex(pcb=>pcb.ColumnId == percentBar.ColumnId);
   this.percentBarEditByIndex(index, percentBar);
  }

  public percentBarEditMinValue(minValue: number, columnId: string): void {
   let percentBar = this.percentBarGetByColumn(columnId);
    percentBar.MinValue = minValue;
    let index: number = this.percentBarGetAll().findIndex(pcb=>pcb.ColumnId == percentBar.ColumnId);
    this.percentBarEditByIndex(index, percentBar);
    }

  public percentBarEditMaxValue(maxValue: number, columnId: string): void {
    let percentBar = this.percentBarGetByColumn(columnId);
    percentBar.MaxValue = maxValue;
    let index: number = this.percentBarGetAll().findIndex(pcb=>pcb.ColumnId == percentBar.ColumnId);
    this.percentBarEditByIndex(index, percentBar);
 }

  public percentBarEditPositiveColor(positiveColor: string, columnId: string): void {
    let percentBar = this.percentBarGetByColumn(columnId);
    percentBar.PositiveColor = positiveColor;
    let index: number = this.percentBarGetAll().findIndex(pcb=>pcb.ColumnId == percentBar.ColumnId);
    this.percentBarEditByIndex(index, percentBar);
 }

  public percentBarEditNegativeColor(negativeColor: string, columnId: string): void {
    let percentBar = this.percentBarGetByColumn(columnId);
    percentBar.NegativeColor = negativeColor;
    let index: number = this.percentBarGetAll().findIndex(pcb=>pcb.ColumnId == percentBar.ColumnId);
    this.percentBarEditByIndex(index, percentBar);
  }

  public percentBarEditShowValue(showValue: boolean, columnId: string): void {
    let percentBar = this.percentBarGetByColumn(columnId);
    percentBar.ShowValue = showValue;
    let index: number = this.percentBarGetAll().findIndex(pcb=>pcb.ColumnId == percentBar.ColumnId);
    this.percentBarEditByIndex(index, percentBar);
  }

  public percentBarDelete(columnId: string): void {
    let index: number = this.percentBarGetAll().findIndex(pcb=>pcb.ColumnId == columnId);
    this.dispatchAction(PercentBarRedux.PercentBarDelete(index))
  }


  // General Config
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

  public loadUserState(state: { [s: string]: IUserState }): void {
    const userStateKeys = this.getUserStateKeys();
    const userState = Object.keys(state).reduce((xs, x) => userStateKeys.indexOf(x) !== -1 ? { ...xs, [x]: state[x] } : xs, {});
    this.dispatchAction(LoadState(userState));
  }

  public configGetUserStateByFunction(functionName: 'AdvancedSearch' | 'Alert' | 'BulkUpdate' | 'CalculatedColumn' | 'Calendar' |
    'CellValidation' | 'Chart' | 'ColumnFilter' | 'ConditionalStyle' | 'CustomSort' | 'Dashboard' | 'DataSource' |
    'Export' | 'FlashingCell' | 'FormatColumn' | 'Layout' | 'PlusMinus' | 'QuickSearch' | 'SelectedCells' |
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
      case StateChangedTrigger.SelectedCells:
        return (returnJson) ? JSON.stringify(this.getState().SelectedCells) : this.getState().SelectedCells
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
  public configGetSelectedCellsState(returnJson: boolean = false): SelectedCellsState {
    return this.configGetUserStateByFunction(StateChangedTrigger.SelectedCells, returnJson) as SelectedCellsState
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

  // Events
  public onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs> {
    return this.blotter.SearchedChanged;
  }

  public onStateChanged(): IEvent<IAdaptableBlotter, IStateChangedEventArgs> {
    return this.blotter.StateChanged;
  }

  public onColumnStateChanged(): IEvent<IAdaptableBlotter, IColumnStateChangedEventArgs> {
    return this.blotter.ColumnStateChanged;
  }

  // Helper Methods
  private dispatchAction(action: Action): void {
    this.blotter.AdaptableBlotterStore.TheStore.dispatch(action)
  }

  private checkItemExists(item: any, name: string, type: string): boolean {
    if (!item) {
      LoggingHelper.LogError("No " + type + " found with the name: " + name)
      return false;
    }
    return true;
  }

  private getState(): AdaptableBlotterState {
    return this.blotter.AdaptableBlotterStore.TheStore.getState()
  }

}

