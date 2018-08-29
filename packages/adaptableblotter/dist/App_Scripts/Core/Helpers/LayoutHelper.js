"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Enums");
const ColumnHelper_1 = require("./ColumnHelper");
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
})(LayoutHelper = exports.LayoutHelper || (exports.LayoutHelper = {}));
