"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MenuItem_1 = require("../Core/MenuItem");
const MenuRedux = require("../Redux/ActionsReducers/MenuRedux");
const ArrayExtensions_1 = require("../Core/Extensions/ArrayExtensions");
const StringExtensions_1 = require("../Core/Extensions/StringExtensions");
const ColumnHelper_1 = require("../Core/Helpers/ColumnHelper");
class AdaptableStrategyBase {
    constructor(Id, blotter) {
        this.Id = Id;
        this.blotter = blotter;
    }
    InitializeWithRedux() {
        this.InitState();
        this.blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState());
    }
    InitState() {
        // stff - check this works
    }
    getPopupMenuItem() {
        if (!this.hasPopupMenu()) {
            return null;
        }
        if (this.popupMenuItem == null) {
            this.addPopupMenuItem();
        }
        return this.popupMenuItem;
    }
    hasPopupMenu() {
        return true;
    }
    addPopupMenuItem() {
        // base class implementation which is empty
    }
    addContextMenuItem(columnId) {
        // base class implementation which is empty
    }
    getStrategyEntitlement() {
        let state = this.blotter.AdaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements;
        return state.find(x => x.FunctionName == this.Id);
    }
    isVisibleStrategy() {
        let entitlement = this.getStrategyEntitlement();
        if (entitlement) {
            return entitlement.AccessLevel != "Hidden";
        }
        return true;
    }
    isReadOnlyStrategy() {
        let entitlement = this.getStrategyEntitlement();
        if (entitlement) {
            if (entitlement.AccessLevel == "ReadOnly") {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }
    // creates the menu items in the main dropdown
    createMenuItemShowPopup(Label, ComponentName, GlyphIcon, PopupParams) {
        let menuItemShowPopup = new MenuItem_1.MenuItemShowPopup(Label, this.Id, ComponentName, GlyphIcon, this.isReadOnlyStrategy(), this.isVisibleStrategy(), PopupParams);
        this.popupMenuItem = menuItemShowPopup;
    }
    // direct actions called by the context menu - invisible if strategy is hidden or readonly
    createContextMenuItemReduxAction(Label, GlyphIcon, Action) {
        if (this.isVisibleStrategy() && !this.isReadOnlyStrategy()) {
            let menuItemShowPopup = new MenuItem_1.MenuItemDoReduxAction(Label, this.Id, Action, GlyphIcon, false, true);
            this.addContextMenuItemToStore(menuItemShowPopup);
        }
    }
    // popups called by the context menu - invisible if strategy is hidden or readonly
    createContextMenuItemShowPopup(Label, ComponentName, GlyphIcon, PopupParams) {
        if (this.isVisibleStrategy() && !this.isReadOnlyStrategy()) {
            let menuItemShowPopup = new MenuItem_1.MenuItemShowPopup(Label, this.Id, ComponentName, GlyphIcon, false, true, PopupParams);
            this.addContextMenuItemToStore(menuItemShowPopup);
        }
    }
    addContextMenuItemToStore(menuItem) {
        // check for duplicates here
        let existingMenuItems = this.blotter.AdaptableBlotterStore.TheStore.getState().Menu.ContextMenu.Items.map(m => m.StrategyId);
        if (!ArrayExtensions_1.ArrayExtensions.ContainsItem(existingMenuItems, menuItem.StrategyId)) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(MenuRedux.AddItemColumnContextMenu(menuItem));
        }
    }
    canCreateContextMenuItem(columnId, blotter, functionType = "") {
        if (this.isReadOnlyStrategy()) {
            return false;
        }
        let column = ColumnHelper_1.ColumnHelper.getColumnFromId(columnId, this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns);
        if (column == null) {
            return false;
        }
        if (functionType == "sort" && !column.Sortable) {
            return false;
        }
        else if (functionType == "filter" && (!column.Filterable || !blotter.isFilterable())) {
            return false;
        }
        return true;
    }
    publishServerSearch(searchChangedTrigger) {
        let state = this.blotter.AdaptableBlotterStore.TheStore.getState();
        let dataSource = state.DataSource.DataSources.find(ds => ds == state.DataSource.CurrentDataSource);
        let advancedSearch = state.AdvancedSearch.AdvancedSearches.find(as => as.Name == state.AdvancedSearch.CurrentAdvancedSearch);
        // lets get the searchstate
        let blotterSearchState = {
            dataSource: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(dataSource) ? dataSource : "",
            advancedSearch: advancedSearch == null ? null : advancedSearch,
            quickSearch: state.QuickSearch.QuickSearchText,
            columnFilters: state.Filter.ColumnFilters
        };
        let blotterSortState = {
            gridSorts: state.Grid.GridSorts,
            customSorts: state.CustomSort.CustomSorts
        };
        let searchChangedInfo = {
            searchChangedTrigger: searchChangedTrigger,
            blotterSearchState: blotterSearchState,
            blotterSortState: blotterSortState,
            searchAsAtDate: new Date()
        };
        let searchChangedData = {
            name: "Adaptable Blotter",
            type: "Search Args",
            id: searchChangedInfo
        };
        let searchChangedArgs = {
            object: "fdc3-context",
            definition: "https://fdc3.org/context/1.0.0/",
            version: "1.0.0",
            data: [searchChangedData]
        };
        this.blotter.SearchedChanged.Dispatch(this.blotter, searchChangedArgs);
    }
}
exports.AdaptableStrategyBase = AdaptableStrategyBase;
