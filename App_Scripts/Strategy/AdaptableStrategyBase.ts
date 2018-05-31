import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IStrategy, } from '../Strategy/Interface/IStrategy';
import { IMenuItem } from '../Core/Interface/IMenu';
import { MenuItemShowPopup, MenuItemDoReduxAction } from '../Core/MenuItem';
import { IEnterpriseCache } from 'ag-grid';
import { Action } from 'redux';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import { IEntitlement } from '../Core/Interface/Interfaces';
import { QuickSearchState, AdvancedSearchState, FilterState } from '../Redux/ActionsReducers/Interface/IState';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import { IBlotterSearchState, IBlotterSortState, ISearchChangedEventArgs } from '../Core/Api/Interface/ServerSearch';
import { SearchChangedTrigger } from '../Core/Enums';
import { ColumnHelper } from '../Core/Helpers/ColumnHelper';
import { ArrayExtensions } from '../Core/Extensions/ArrayExtensions';

export abstract class AdaptableStrategyBase implements IStrategy {
    private buildContextMenu: boolean
    private buildPopupMenu: boolean
    private Entitlements: IEntitlement[]
    constructor(public Id: string, protected blotter: IAdaptableBlotter) {
    }

    public InitializeWithRedux() {
        this.InitBaseState()
        this.blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitBaseState())
        this.InitState();
        this.blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }


    private InitBaseState() {
        if (this.buildContextMenu != this.blotter.AdaptableBlotterStore.TheStore.getState().Menu.ContextMenu.BuildContextMenu) {
            this.buildContextMenu = this.blotter.AdaptableBlotterStore.TheStore.getState().Menu.ContextMenu.BuildContextMenu;
            if (this.buildContextMenu) {
                let columnId = this.blotter.AdaptableBlotterStore.TheStore.getState().Menu.ContextMenu.ColumnId;
                if (!ColumnHelper.isSpecialColumn(columnId)) {
                    this.addColumnMenuItem(this.blotter.AdaptableBlotterStore.TheStore.getState().Menu.ContextMenu.ColumnId)
                }
            }
        }
    }

    protected InitState(): void {
        // stff - check this works
    }


    public popupMenuItem: IMenuItem;

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

    protected addColumnMenuItem(columnId: string): void {
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
        let existingMenuItems = this.blotter.AdaptableBlotterStore.TheStore.getState().Menu.ContextMenu.Items.map(m=>m.StrategyId)
        if (!ArrayExtensions.ContainsItem(existingMenuItems, menuItem.StrategyId)) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                MenuRedux.AddItemColumnContextMenu(
                    menuItem
                ))
        }
    }

    publishServerSearch(searchChangedTrigger: SearchChangedTrigger): void {
        let state: AdaptableBlotterState = this.blotter.AdaptableBlotterStore.TheStore.getState();
        // lets get the searchstate
        let blotterSearchState: IBlotterSearchState = {
            DataSource: state.DataSource.DataSources.find(ds => ds == state.DataSource.CurrentDataSource),
            AdvancedSearch: state.AdvancedSearch.AdvancedSearches.find(as => as.Name == state.AdvancedSearch.CurrentAdvancedSearch),
            QuickSearch: state.QuickSearch.QuickSearchText,
            ColumnFilters: state.Filter.ColumnFilters
        }

        let blotterSortState: IBlotterSortState = {
            GridSorts: state.Grid.GridSorts,
            CustomSorts: state.CustomSort.CustomSorts
        }
        let searchChangedArgs: ISearchChangedEventArgs = { SearchChangedTrigger: searchChangedTrigger, BlotterSearchState: blotterSearchState, BlotterSortState: blotterSortState }
        this.blotter.SearchedChanged.Dispatch(this.blotter, searchChangedArgs);
    }

}
