"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Utilities/Enums");
const StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
const MenuItem_1 = require("../Utilities/MenuItem");
/**
 * Base class for all strategies and does most of the work of creating menus
 * Each strategy is reponsible for managing state (through InitState())
 */
class AdaptableStrategyBase {
    constructor(Id, blotter) {
        this.Id = Id;
        this.blotter = blotter;
    }
    initializeWithRedux() {
        this.InitState();
        this.blotter.adaptableBlotterStore.TheStore.subscribe(() => this.InitState());
    }
    InitState() {
        // derived in each strategy that needs to manage state
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
        let functionEntitlements = this.blotter.api.entitlementApi.getEntitlementState().FunctionEntitlements;
        return functionEntitlements.find(x => x.FunctionName == this.Id);
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
        let menuItemShowPopup = new MenuItem_1.MenuItemShowPopup(Label, this.Id, ComponentName, GlyphIcon, this.isVisibleStrategy(), PopupParams);
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
        this.blotter.api.internalApi.ColumnContextMenuAddItem(menuItem);
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
            else if (functionType == "columnfilter") {
                return column.Filterable;
            }
            else if (functionType == "floatingfilter") {
                return (blotter.hasFloatingFilter && blotter.blotterOptions.filterOptions.useAdaptableBlotterFloatingFilter);
            }
        }
        return true;
    }
    /**
     * Each time any of the objects that make up search are changed (e.g. filters, quick search, advanced search, data sources etc.) we fire an event
     * This is primarily to help users who want to run search on the server and so need to know what has changed
     * @param searchChangedTrigger function that triggered the event
     */
    publishSearchChanged(searchChangedTrigger) {
        let currentDataSource = this.blotter.api.dataSourceApi.getCurrentDataSource();
        let currentAdvancedSearch = this.blotter.api.advancedSearchApi.getCurrentAdvancedSearch();
        // lets get the searchstate
        let blotterSearchState = {
            dataSource: currentDataSource == null ? null : currentDataSource,
            advancedSearch: currentAdvancedSearch == null ? null : currentAdvancedSearch,
            quickSearch: this.blotter.api.quickSearchApi.getQuickSearchValue(),
            columnFilters: this.blotter.api.columnFilterApi.getAllColumnFilter()
        };
        let blotterSortState = {
            gridSorts: this.blotter.api.gridApi.getGridSorts(),
            customSorts: this.blotter.api.customSortApi.getAllCustomSort()
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
        this.blotter.api.eventApi._onSearchedChanged.Dispatch(this.blotter, searchChangedArgs);
    }
    /**
     * An event which is triggered whenever User (as oppoesed to System) State is changed.
     * Its the responsibility of each function to fire the event when their state changes
     * @param stateChangedTrigger which function has triggered the event
     * @param state the current state of that function
     */
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
        this.blotter.api.eventApi._onStateChanged.Dispatch(this.blotter, stateChangedArgs);
    }
}
exports.AdaptableStrategyBase = AdaptableStrategyBase;
