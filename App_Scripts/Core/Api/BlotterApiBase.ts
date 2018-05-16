import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { IEvent } from "../Interface/IEvent";
import { IBlotterApi } from "./Interface/IBlotterApi";
import { ISearchChangedEventArgs } from "./Interface/ServerSearch";
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux'
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux'
import * as DataSourceRedux from '../../Redux/ActionsReducers/DataSourceRedux'
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux'
import * as EntitlementsRedux from '../../Redux/ActionsReducers/EntitlementsRedux'
import * as UserInterfaceRedux from '../../Redux/ActionsReducers/UserInterfaceRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import * as SmartEditRedux from '../../Redux/ActionsReducers/SmartEditRedux'
import * as CalendarRedux from '../../Redux/ActionsReducers/CalendarRedux'
import * as ThemeRedux from '../../Redux/ActionsReducers/ThemeRedux'
import * as CustomSortRedux from '../../Redux/ActionsReducers/CustomSortRedux'
import { ILayout, IAdaptableBlotterObject, IAdvancedSearch, IStyle, ICustomSort } from "./Interface/AdaptableBlotterObjects";
import { DEFAULT_LAYOUT } from "../Constants/GeneralConstants";
import * as StrategyNames from '../Constants/StrategyNames'
import { IEntitlement } from "../Interface/Interfaces";
import { LeafExpressionOperator, DisplayAction, Visibility, MathOperation } from "../Enums";
import { CustomSortAdd } from "../../Redux/ActionsReducers/CustomSortRedux";

export abstract class BlotterApiBase implements IBlotterApi {

    constructor(protected blotter: IAdaptableBlotter) {
    }

    public setGridData(dataSource: any): void {      // no implementation     
    }

    // Layout api methods
    public layoutSet(layoutName: string): void {
        let layout: ILayout = this.blotter.AdaptableBlotterStore.TheStore.getState().Layout.Layouts.find(l => l.Name == layoutName);
        if (this.checkItemExists(layout, layoutName, StrategyNames.LayoutStrategyName)) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(LayoutRedux.LayoutSelect(layoutName))
        }
    }

    public layoutClear(): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(LayoutRedux.LayoutSelect(DEFAULT_LAYOUT))
    }

     public layoutSelectCurrent(): ILayout {
        let layoutName = this.blotter.AdaptableBlotterStore.TheStore.getState().Layout.CurrentLayout;
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Layout.Layouts.find(l => l.Name == layoutName);
    }

    public layoutIncludeVendorState(): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(LayoutRedux.LayoutIncludeVendorState())
    }

    public layoutExcludeVendorState(): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(LayoutRedux.LayoutExcludeVendorState())
    }

    // Dashboard api methods
    public dashboardSetAvailableToolbars(availableToolbars: string[]): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(DashboardRedux.DashboardSetAvailableToolbars(availableToolbars))
    }

    public dashboardSetVisibleToolbars(visibleToolbars: string[]): void {
        visibleToolbars.forEach(vt => {
            this.dashboardShowToolbar(vt)
        })
    }

    public dashboardShowToolbar(visibleToolbar: string): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(DashboardRedux.DashboardSetToolbarVisibility(visibleToolbar))
    }

    public dashboardHideToolbar(visibleToolbar: string): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(DashboardRedux.DashboardSetToolbarVisibility(visibleToolbar))
    }

    public dashboardSetVisibleButtons(functionButtons: string[]): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(DashboardRedux.DashboardSetFunctionButtons(functionButtons))
    }

    public dashboardSetZoom(zoom: Number): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(DashboardRedux.DashboardSetZoom(zoom))
    }

    public dashboardSetVisibility(dashboardVisibility: 'Minimised' | 'Visible' | 'Hidden'): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(DashboardRedux.DashboardSetVisibility(dashboardVisibility as Visibility))
    }

    // Quick Search api methods
    public quickSearchRun(quickSearchText: string): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(QuickSearchRedux.QuickSearchApply(quickSearchText))
    }

    public quickSearchClear(): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(QuickSearchRedux.QuickSearchApply(""))
    }

    public quickSearchSelectValue(): string {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText;
    }

    public quickSearchSetOperator(operator: 'Contains' | 'StartsWith'): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(QuickSearchRedux.QuickSearchSetOperator(operator as LeafExpressionOperator))
    }

    public quickSearchSetDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(QuickSearchRedux.QuickSearchSetDisplay(displayAction as DisplayAction))
    }

    public quickSearchSetStyle(style: IStyle): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(QuickSearchRedux.QuickSearchSetStyle(style))
    }

    // Calendar State
    public calendarSetCurrent(calendar: string): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(CalendarRedux.CalendarSelect(calendar))
    }

    public calendarSelectCurrent(): string {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Calendar.CurrentCalendar;
    }


    // Theme State
    public themeSelectCurrent(theme: string): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(ThemeRedux.ThemeSelect(theme))
    }

    public themeGetCurrent(): string {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Theme.CurrentTheme;
    }

    public themeSetSystemThemes(systemThemes: string[]): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(ThemeRedux.ThemeSetSystemThemes(systemThemes))
    }

    public themeSetUserThemes(userThemes: string[]): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(ThemeRedux.ThemeSetUserThemes(userThemes))
    }


    // SmartEdit api methods
    public smartEditSetMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(SmartEditRedux.SmartEditChangeOperation(mathOperation as MathOperation))
    }

    public smartEditSelectMathOperation(): string {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().SmartEdit.MathOperation;
    }

    public smartEditSetValue(smartEditValue: number): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(SmartEditRedux.SmartEditChangeValue(smartEditValue))
    }

    public smartEditSelectValue(): number {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().SmartEdit.SmartEditValue;
    }


    // user interface api methods
    public uiSetColorPalette(colorPalette: string[]): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(UserInterfaceRedux.ColorPaletteSet(colorPalette))
    }

    public uiAddColorsToPalette(colorPalette: string[]): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(UserInterfaceRedux.ColorPaletteAdd(colorPalette))
    }

    public uiAddStyleClassNames(styleClassNames: string[]): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(UserInterfaceRedux.StyleClassNamesAdd(styleClassNames))
    }


    // Data Source api methods
    public dataSourceSet(dataSourceName: string): void {
        let dataSource: string = this.blotter.AdaptableBlotterStore.TheStore.getState().DataSource.DataSources.find(a => a == dataSourceName);
        if (this.checkItemExists(dataSource, dataSourceName, StrategyNames.DataSourceStrategyName)) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(DataSourceRedux.DataSourceSelect(dataSource))
        }
    }

    public dataSourceClear(): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(DataSourceRedux.DataSourceSelect(""))
    }


    // Advanced Search api methods
    public advancedSearchSet(advancedSearchName: string): void {
        let advancedSearch: IAdvancedSearch = this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
        if (this.checkItemExists(advancedSearch, advancedSearchName, StrategyNames.AdvancedSearchStrategyName)) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchName))
        }
    }

    public advancedSearchClear(): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(AdvancedSearchRedux.AdvancedSearchSelect(""))
    }

    public advancedSearchAdd(advancedSearch: IAdvancedSearch): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(AdvancedSearchRedux.AdvancedSearchAddUpdate(-1, advancedSearch))
    }

    public advancedSearchEdit(advancedSearchName: string, advancedSearch: IAdvancedSearch): void {
        let searchIndex: number = this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches.findIndex(a => a.Name == advancedSearchName);
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(AdvancedSearchRedux.AdvancedSearchAddUpdate(searchIndex, advancedSearch))
    }

    public advancedSearchDelete(advancedSearchName: string): void {
        let searchToDelete = this.advancedSearchSelectByName(advancedSearchName)
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(AdvancedSearchRedux.AdvancedSearchDelete(searchToDelete))
    }

    public advancedSearchSelectCurrent(): IAdvancedSearch {
        let currentAdvancedSearchName: string = this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearch
        return this.advancedSearchSelectByName(currentAdvancedSearchName)
    }

    public advancedSearchSelectByName(advancedSearchName: string): IAdvancedSearch {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
    }

    public advancedSearchSelectAll(): IAdvancedSearch[] {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches;
    }

    // Entitlement Methods
    public entitlementSelectAll(): IEntitlement[] {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements;
    }

    public entitlementSelectByFunction(functionName: string): IEntitlement {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName);
    }

    public entitlementSelectAccessLevelForFunction(functionName: string): string {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName).AccessLevel;
    }

    public entitlementAddOrUpdate(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Default"): void {
        let entitlement: IEntitlement = { FunctionName: functionName, AccessLevel: accessLevel }
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(EntitlementsRedux.EntitlementAddUpdate(-1, entitlement))
    }

    public entitlementDelete(functionName: string): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(EntitlementsRedux.EntitlementDelete(functionName))
    }

    // Custom Sort Methods
     public customSortSelectAll(): ICustomSort[] {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().CustomSort.CustomSorts;
    }

     public customSortSelectByColumn(columnn: string): ICustomSort {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().CustomSort.CustomSorts.find(cs=>cs.ColumnId == columnn);
    }

    public customSortAdd(column: string, values: string[]): void {
        let customSort: ICustomSort = {ColumnId: column, SortedValues: values, IsReadOnly: false}
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(CustomSortRedux.CustomSortAdd(customSort))
    }

    public customSortEdit(column: string, values: string[]): void {
        let customSort: ICustomSort = {ColumnId: column, SortedValues: values, IsReadOnly: false}
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(CustomSortRedux.CustomSortEdit(customSort))
    }

    public customSortDelete(column: string): void {
       let customSort: ICustomSort = this.customSortSelectByColumn(column);
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(CustomSortRedux.CustomSortDelete(customSort))
    }

    // Events
    public onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs> {
        return this.blotter.SearchedChanged;
    }

    private checkItemExists(item: any, name: string, type: string): boolean {
        if (!item) {
            this.blotter.LoggingService.LogError("No " + type + " found with the name: " + name)
            return false;
        }
        return true;
    }
}
