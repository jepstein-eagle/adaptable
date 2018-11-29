"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants = require("../../Core/Constants/GeneralConstants");
const ColumnHelper_1 = require("./ColumnHelper");
const Enums_1 = require("../../Utilities/Enums");
const ObjectFactory_1 = require("../ObjectFactory");
const LayoutRedux = require("../../Redux/ActionsReducers/LayoutRedux");
var LayoutHelper;
(function (LayoutHelper) {
    function getLayoutDescription(layout, columns) {
        let returnString = "";
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
        if (blotter.isInitialised && layoutState.CurrentLayout != GeneralConstants.DEFAULT_LAYOUT) {
            if (blotter.BlotterOptions.autoSaveLayouts) {
                let layout = layoutState.Layouts.find(l => l.Name == layoutState.CurrentLayout);
                if (layout != null) {
                    let gridState = blotter.AdaptableBlotterStore.TheStore.getState().Grid;
                    let visibleColumns = gridState.Columns.filter(c => c.Visible);
                    let gridVendorState = blotter.getVendorGridState(visibleColumns.map(vc => vc.ColumnId), false);
                    let layoutIndex = layoutState.Layouts.findIndex(l => l.Name == layoutState.CurrentLayout);
                    let layoutToSave = ObjectFactory_1.ObjectFactory.CreateLayout(visibleColumns, gridState.GridSorts, gridVendorState, layoutState.CurrentLayout);
                    blotter.AdaptableBlotterStore.TheStore.dispatch(LayoutRedux.LayoutPreSave(layoutIndex, layoutToSave));
                }
            }
            blotter.ColumnStateChanged.Dispatch(blotter, { currentLayout: layoutState.CurrentLayout });
        }
    }
    LayoutHelper.autoSaveLayout = autoSaveLayout;
})(LayoutHelper = exports.LayoutHelper || (exports.LayoutHelper = {}));
