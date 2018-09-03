"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants = require("../Constants/GeneralConstants");
const Enums_1 = require("../Enums");
const ColumnHelper_1 = require("./ColumnHelper");
const LayoutRedux = require("../../Redux/ActionsReducers/LayoutRedux");
const ObjectFactory_1 = require("../ObjectFactory");
var LayoutHelper;
(function (LayoutHelper) {
    function getLayoutDescription(layout, columns) {
        let returnString = "";
        let gridSorts = layout.GridSorts;
        returnString += layout.Columns.length + " Columns; ";
        returnString += "\n";
        returnString += " Sort: " + getGridSort(layout.GridSorts, columns);
        return returnString;
    }
    LayoutHelper.getLayoutDescription = getLayoutDescription;
    function getGridSort(gridSorts, columns) {
        if (gridSorts.length == 0) {
            return "None";
        }
        let returnString = "";
        gridSorts.forEach((gs) => {
            returnString += ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(gs.Column, columns) + getSortOrder(gs.SortOrder);
        });
        return returnString;
    }
    LayoutHelper.getGridSort = getGridSort;
    function getSortOrder(sortOrder) {
        return (sortOrder == Enums_1.SortOrder.Ascending) ? " [asc] " : " [desc] ";
    }
    LayoutHelper.getSortOrder = getSortOrder;
    function autoSaveLayout(blotter) {
        let layoutState = blotter.AdaptableBlotterStore.TheStore.getState().Layout;
        if (layoutState.CurrentLayout != GeneralConstants.DEFAULT_LAYOUT) {
            if (blotter.BlotterOptions.autoSaveLayouts) {
                let layout = layoutState.Layouts.find(l => l.Name == layoutState.CurrentLayout);
                let gridState = blotter.AdaptableBlotterStore.TheStore.getState().Grid;
                let gridVendorState = layout.VendorGridInfo;
                let layoutIndex = layoutState.Layouts.findIndex(l => l.Name == layoutState.CurrentLayout);
                let visibleColumns = gridState.Columns.filter(c => c.Visible);
                let layoutToSave = ObjectFactory_1.ObjectFactory.CreateLayout(visibleColumns, gridState.GridSorts, gridVendorState, layoutState.CurrentLayout);
                blotter.AdaptableBlotterStore.TheStore.dispatch(LayoutRedux.LayoutPreSave(layoutIndex, layoutToSave));
            }
            blotter.ColumnStateChanged.Dispatch(blotter, { currentLayout: layoutState.CurrentLayout });
        }
    }
    LayoutHelper.autoSaveLayout = autoSaveLayout;
})(LayoutHelper = exports.LayoutHelper || (exports.LayoutHelper = {}));
