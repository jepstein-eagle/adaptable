"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MenuItem_1 = require("../Core/MenuItem");
const MenuRedux = require("../Redux/ActionsReducers/MenuRedux");
const Enums_1 = require("../Utilities/Enums");
const ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
const StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
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
    addContextMenuItem(column) {
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
        let menuItemShowPopup = new MenuItem_1.MenuItemShowPopup(Label, this.Id, ComponentName, GlyphIcon, 
        //  this.isReadOnlyStrategy(),
        this.isVisibleStrategy(), PopupParams);
        this.popupMenuItem = menuItemShowPopup;
    }
    // direct actions called by the context menu - invisible if strategy is hidden or readonly
    createContextMenuItemReduxAction(Label, GlyphIcon, Action) {
        if (this.isVisibleStrategy() && !this.isReadOnlyStrategy()) {
            let menuItemShowPopup = new MenuItem_1.MenuItemDoReduxAction(Label, this.Id, Action, GlyphIcon, true);
            this.addContextMenuItemToStore(menuItemShowPopup);
        }
    }
    // popups called by the context menu - invisible if strategy is hidden or readonly
    createContextMenuItemShowPopup(Label, ComponentName, GlyphIcon, PopupParams) {
        if (this.isVisibleStrategy() && !this.isReadOnlyStrategy()) {
            let menuItemShowPopup = new MenuItem_1.MenuItemShowPopup(Label, this.Id, ComponentName, GlyphIcon, true, PopupParams);
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
    canCreateContextMenuItem(column, blotter, functionType = "") {
        if (this.isReadOnlyStrategy()) {
            return false;
        }
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(functionType)) {
            if (functionType == "sort") {
                return column.Sortable;
            }
            else if (functionType == "numeric") {
                return column.DataType == Enums_1.DataType.Number;
            }
            else if (functionType == "filter") {
                return column.Filterable && blotter.isFilterable();
            }
            else if (functionType == "quickfilter") {
                return (blotter.isQuickFilterable() && blotter.BlotterOptions.useAdaptableBlotterFloatingFilter);
            }
        }
        return true;
    }
    publishSearchChanged(searchChangedTrigger) {
        let state = this.blotter.AdaptableBlotterStore.TheStore.getState();
        let dataSource = state.DataSource.DataSources.find(ds => ds == state.DataSource.CurrentDataSource);
        let advancedSearch = state.AdvancedSearch.AdvancedSearches.find(as => as.Name == state.AdvancedSearch.CurrentAdvancedSearch);
        // lets get the searchstate
        let blotterSearchState = {
            dataSource: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(dataSource) ? dataSource : "",
            advancedSearch: advancedSearch == null ? null : advancedSearch,
            quickSearch: state.QuickSearch.QuickSearchText,
            columnFilters: state.ColumnFilter.ColumnFilters
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
        let searchEventData = {
            name: "Adaptable Blotter",
            type: "Search Args",
            id: searchChangedInfo
        };
        let searchChangedArgs = {
            object: "fdc3-context",
            definition: "https://fdc3.org/context/1.0.0/",
            version: "1.0.0",
            data: [searchEventData]
        };
        this.blotter.SearchedChanged.Dispatch(this.blotter, searchChangedArgs);
    }
    publishStateChanged(stateChangedTrigger, state) {
        let stateChangedInfo = {
            stateChangedTrigger: stateChangedTrigger,
            userState: state
        };
        let stateEventData = {
            name: "Adaptable Blotter",
            type: "State Args",
            id: stateChangedInfo
        };
        let stateChangedArgs = {
            object: "fdc3-context",
            definition: "https://fdc3.org/context/1.0.0/",
            version: "1.0.0",
            data: [stateEventData]
        };
        this.blotter.StateChanged.Dispatch(this.blotter, stateChangedArgs);
    }
}
exports.AdaptableStrategyBase = AdaptableStrategyBase;
