import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';
import { IStrategy, } from './Interface/IStrategy';
import { Action } from 'redux';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import { IBlotterSearchState, IBlotterSortState, ISearchChangedEventArgs, ISearchChangedInfo, ISearchEventData, IStateChangedInfo, IStateEventData, IStateChangedEventArgs } from '../Utilities/Interface/IStateEvents';
import { SearchChangedTrigger, StateChangedTrigger, DataType } from '../Utilities/Enums';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { IAdvancedSearch, IEntitlement } from '../Api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../Api/Interface/IColumn';
import { ColumnHelper } from '../Utilities/Helpers/ColumnHelper';
import { IUserState } from '../Redux/ActionsReducers/Interface/IState';
import { MenuItemShowPopup, MenuItemDoReduxAction } from '../Utilities/MenuItem';
import { IMenuItem } from '../Utilities/Interface/IMenu';


export abstract class AdaptableStrategyBase implements IStrategy {
    constructor(public Id: string, protected blotter: IAdaptableBlotter) {
    }

    public InitializeWithRedux() {
        this.InitState();
        this.blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }

    public popupMenuItem: IMenuItem;

    protected InitState(): void {
        // stff - check this works
    }


    public getPopupMenuItem(): IMenuItem {
        if (!this.hasPopupMenu()) {
            return null;
        }

        if (this.popupMenuItem == null) {
            this.addPopupMenuItem();
        }
        return this.popupMenuItem;
    }

    protected hasPopupMenu(): boolean {
        return true;
    }

    protected addPopupMenuItem(): void {
        // base class implementation which is empty
    }

    public addContextMenuItem(column: IColumn): void {
        // base class implementation which is empty
    }

    getStrategyEntitlement(): IEntitlement {
        let state = this.blotter.AdaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements;
        return state.find(x => x.FunctionName == this.Id)
    }

    isVisibleStrategy(): boolean {
        let entitlement: IEntitlement = this.getStrategyEntitlement();
        if (entitlement) {
            return entitlement.AccessLevel != "Hidden"
        }
        return true;
    }

    isReadOnlyStrategy(): boolean {
        let entitlement: IEntitlement = this.getStrategyEntitlement();
        if (entitlement) {
            if (entitlement.AccessLevel == "ReadOnly") {
                return true
            } else {
                return false;
            }
        }
        return false;
    }

    // creates the menu items in the main dropdown
    createMenuItemShowPopup(Label: string,
        ComponentName: string,
        GlyphIcon: string,
        PopupParams?: string) {
        let menuItemShowPopup: MenuItemShowPopup = new MenuItemShowPopup(
            Label,
            this.Id,
            ComponentName,
            GlyphIcon,
            //  this.isReadOnlyStrategy(),
            this.isVisibleStrategy(),
            PopupParams)
        this.popupMenuItem = menuItemShowPopup;
    }


    // direct actions called by the context menu - invisible if strategy is hidden or readonly
    createContextMenuItemReduxAction(Label: string,
        GlyphIcon: string,
        Action: Action): any {
        if (this.isVisibleStrategy() && !this.isReadOnlyStrategy()) {

            let menuItemShowPopup: MenuItemDoReduxAction = new MenuItemDoReduxAction(
                Label,
                this.Id,
                Action,
                GlyphIcon,
                true)
            this.addContextMenuItemToStore(menuItemShowPopup);
        }
    }


    // popups called by the context menu - invisible if strategy is hidden or readonly
    createContextMenuItemShowPopup(Label: string,
        ComponentName: string,
        GlyphIcon: string,
        PopupParams?: string) {

        if (this.isVisibleStrategy() && !this.isReadOnlyStrategy()) {
            let menuItemShowPopup: MenuItemShowPopup = new MenuItemShowPopup(
                Label,
                this.Id,
                ComponentName,
                GlyphIcon,
                true,
                PopupParams)
            this.addContextMenuItemToStore(menuItemShowPopup);
        }
    }

    addContextMenuItemToStore(menuItem: IMenuItem): void {
        // check for duplicates here
        let existingMenuItems = this.blotter.AdaptableBlotterStore.TheStore.getState().Menu.ContextMenu.Items.map(m => m.StrategyId)
        if (!ArrayExtensions.ContainsItem(existingMenuItems, menuItem.StrategyId)) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                MenuRedux.AddItemColumnContextMenu(
                    menuItem
                ))
        }
    }

    canCreateContextMenuItem(column: IColumn, blotter: IAdaptableBlotter, functionType: string = ""): boolean {
        if (this.isReadOnlyStrategy()) {
            return false;
        }
        if (StringExtensions.IsNotNullOrEmpty(functionType)) {
            if (functionType == "sort") {
                return column.Sortable;
            } else if (functionType == "numeric") {
                return column.DataType == DataType.Number;
            } else if (functionType == "columnfilter") {
                return column.Filterable
            } else if (functionType == "floatingfilter") {
                return (blotter.hasFloatingFilter() && blotter.BlotterOptions.filterOptions.useAdaptableBlotterFloatingFilter)
            }
        }
        return true;
    }

    publishSearchChanged(searchChangedTrigger: SearchChangedTrigger): void {
        let state: AdaptableBlotterState = this.blotter.AdaptableBlotterStore.TheStore.getState();

        let dataSource: string = state.DataSource.DataSources.find(ds => ds == state.DataSource.CurrentDataSource)
        let advancedSearch: IAdvancedSearch = state.AdvancedSearch.AdvancedSearches.find(as => as.Name == state.AdvancedSearch.CurrentAdvancedSearch);

        // lets get the searchstate
        let blotterSearchState: IBlotterSearchState = {
            dataSource: StringExtensions.IsNotNullOrEmpty(dataSource) ? dataSource : "",
            advancedSearch: advancedSearch == null ? null : advancedSearch,
            quickSearch: state.QuickSearch.QuickSearchText,
            columnFilters: state.ColumnFilter.ColumnFilters
        }

        let blotterSortState: IBlotterSortState = {
            gridSorts: state.Grid.GridSorts,
            customSorts: state.CustomSort.CustomSorts
        }

        let searchChangedInfo: ISearchChangedInfo = {
            searchChangedTrigger: searchChangedTrigger,
            blotterSearchState: blotterSearchState,
            blotterSortState: blotterSortState,
            searchAsAtDate: new Date()
        }

        let searchEventData: ISearchEventData = {
            name: "Adaptable Blotter",
            type: "Search Args",
            id: searchChangedInfo
        }

        let searchChangedArgs: ISearchChangedEventArgs = {
            object: "fdc3-context",
            definition: "https://fdc3.org/context/1.0.0/",
            version: "1.0.0",
            data: [searchEventData]
        }
        this.blotter.SearchedChanged.Dispatch(this.blotter, searchChangedArgs);
    }

    publishStateChanged(stateChangedTrigger: StateChangedTrigger, state: IUserState): void {
        let stateChangedInfo: IStateChangedInfo = {
            stateChangedTrigger: stateChangedTrigger,
            userState: state
        }

        let stateEventData: IStateEventData = {
            name: "Adaptable Blotter",
            type: "State Args",
            id: stateChangedInfo
        }

        let stateChangedArgs: IStateChangedEventArgs = {
            object: "fdc3-context",
            definition: "https://fdc3.org/context/1.0.0/",
            version: "1.0.0",
            data: [stateEventData]
        }
        this.blotter.StateChanged.Dispatch(this.blotter, stateChangedArgs);
    }

}
