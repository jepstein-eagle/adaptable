import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IStrategy, } from './Interface/IStrategy';
import { IMenuItem } from '../Core/Interface/IMenu';
import { MenuItemShowPopup, MenuItemDoReduxAction } from '../Core/MenuItem';
import { Action } from 'redux';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import { IEntitlement } from '../Core/Interface/Interfaces';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import { IBlotterSearchState, IBlotterSortState, ISearchChangedEventArgs, ISearchChangedInfo, ISearchChangedData } from '../Core/Api/Interface/ServerSearch';
import { SearchChangedTrigger } from '../Core/Enums';
import { ColumnHelper } from '../Core/Helpers/ColumnHelper';
import { ArrayExtensions } from '../Core/Extensions/ArrayExtensions';
import { IDatasource } from 'ag-grid';
import { StringExtensions } from '../Core/Extensions/StringExtensions';
import { IAdvancedSearch } from '../Core/Api/Interface/AdaptableBlotterObjects';

export abstract class AdaptableStrategyBase implements IStrategy {
    private buildContextMenu: boolean
    constructor(public Id: string, protected blotter: IAdaptableBlotter) {
    }

    public InitializeWithRedux() {
        this.InitBaseState()
        this.blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitBaseState())
        this.InitState();
        this.blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }


    private InitBaseState() {
    //    if (this.buildContextMenu != this.blotter.AdaptableBlotterStore.TheStore.getState().Menu.ContextMenu.BuildContextMenu) {
    //        this.buildContextMenu = this.blotter.AdaptableBlotterStore.TheStore.getState().Menu.ContextMenu.BuildContextMenu;
    //        if (this.buildContextMenu) {
   //             let columnId = this.blotter.AdaptableBlotterStore.TheStore.getState().Menu.ContextMenu.ColumnId;
    //            if (!ColumnHelper.isSpecialColumn(columnId)) {
    //                this.addColumnMenuItem(this.blotter.AdaptableBlotterStore.TheStore.getState().Menu.ContextMenu.ColumnId)
    //            }
    //        }
     //   }
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

    protected hasContextMenu(): boolean {
        return false;
    }

    protected addPopupMenuItem(): void {
        // base class implementation which is empty
    }

public addContextMenuItem(columnId: string): void {
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
            this.isReadOnlyStrategy(),
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
                false,
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
                false,
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

    publishServerSearch(searchChangedTrigger: SearchChangedTrigger): void {
        let state: AdaptableBlotterState = this.blotter.AdaptableBlotterStore.TheStore.getState();

        let dataSource: string = state.DataSource.DataSources.find(ds => ds == state.DataSource.CurrentDataSource)
        let advancedSearch: IAdvancedSearch = state.AdvancedSearch.AdvancedSearches.find(as => as.Name == state.AdvancedSearch.CurrentAdvancedSearch);

        // lets get the searchstate
        let blotterSearchState: IBlotterSearchState = {
            dataSource: StringExtensions.IsNotNullOrEmpty(dataSource) ? dataSource : "",
            advancedSearch: advancedSearch == null ? null : advancedSearch,
            quickSearch: state.QuickSearch.QuickSearchText,
            columnFilters: state.Filter.ColumnFilters
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

        let searchChangedData: ISearchChangedData = {
            name: "Adaptable Blotter",
            type: "Search Args",
            id: searchChangedInfo
        }

        let searchChangedArgs: ISearchChangedEventArgs = {
            object: "fdc3-context",
            definition: "https://fdc3.org/context/1.0.0/",
            version: "1.0.0",
            data: [searchChangedData]
        }

        this.blotter.SearchedChanged.Dispatch(this.blotter, searchChangedArgs);
    }

}
