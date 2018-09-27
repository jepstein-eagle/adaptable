"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants = require("../Constants/GeneralConstants");
const AdaptableBlotterLogger_1 = require("./AdaptableBlotterLogger");
const Enums_1 = require("../Enums");
const StringExtensions_1 = require("../Extensions/StringExtensions");
var ColumnHelper;
(function (ColumnHelper) {
    // Lets put all column mapping in one place so we can properly deal with missing columns consistently...
    function isSpecialColumn(columnId) {
        return columnId == "ag-Grid-AutoColumn";
    }
    ColumnHelper.isSpecialColumn = isSpecialColumn;
    function getFriendlyNameFromColumn(columnId, column) {
        if (columnId.includes(GeneralConstants.MISSING_COLUMN)) {
            return columnId;
        }
        if (column) {
            return column.FriendlyName;
        }
        else {
            AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogWarning("No column found named '" + columnId + "'");
            return columnId + GeneralConstants.MISSING_COLUMN;
        }
    }
    ColumnHelper.getFriendlyNameFromColumn = getFriendlyNameFromColumn;
    function getFriendlyNameFromColumnId(columnId, columns) {
        let foundColumn = columns.find(c => c.ColumnId == columnId);
        return getFriendlyNameFromColumn(columnId, foundColumn);
    }
    ColumnHelper.getFriendlyNameFromColumnId = getFriendlyNameFromColumnId;
    function getFriendlyNamesFromColumnIds(columnIds, columns) {
        let friendlyNames = [];
        columnIds.forEach(c => {
            friendlyNames.push(getFriendlyNameFromColumnId(c, columns));
        });
        return friendlyNames;
    }
    ColumnHelper.getFriendlyNamesFromColumnIds = getFriendlyNamesFromColumnIds;
    function getColumnIdFromFriendlyName(friendlyName, columns) {
        if (friendlyName.includes(GeneralConstants.MISSING_COLUMN)) {
            return friendlyName.replace(GeneralConstants.MISSING_COLUMN, ""); // Ids should stay "pure"
        }
        let foundColumn = columns.find(c => c.FriendlyName == friendlyName);
        return (foundColumn) ? foundColumn.ColumnId : friendlyName; // if not found then keep the name that we have from before
    }
    ColumnHelper.getColumnIdFromFriendlyName = getColumnIdFromFriendlyName;
    function getColumnIdsFromFriendlyNames(friendlyNames, columns) {
        let columnIds = [];
        friendlyNames.forEach(c => {
            columnIds.push(getColumnIdFromFriendlyName(c, columns));
        });
        return columnIds;
    }
    ColumnHelper.getColumnIdsFromFriendlyNames = getColumnIdsFromFriendlyNames;
    function getColumnsFromFriendlyNames(friendlyNames, columns) {
        // not sure if this is right as might ignore bad cols
        return friendlyNames.map(friendlyName => columns.find(x => x.FriendlyName == friendlyName));
    }
    ColumnHelper.getColumnsFromFriendlyNames = getColumnsFromFriendlyNames;
    function getColumnFromId(columnId, columns) {
        // TODO check for missing column
        return columns.find(c => c.ColumnId == columnId);
    }
    ColumnHelper.getColumnFromId = getColumnFromId;
    function getNumericColumns(columns) {
        return columns.filter(c => c.DataType == Enums_1.DataType.Number);
    }
    ColumnHelper.getNumericColumns = getNumericColumns;
    function getColumnCategoryFromCategories(columnId, categories) {
        let returnValue = "";
        categories.forEach(c => {
            if (StringExtensions_1.StringExtensions.IsNullOrEmpty(returnValue)) {
                let column = c.Columns.find(col => col == columnId);
                if (column) {
                    returnValue = c.Category;
                }
            }
        });
        return returnValue;
    }
    ColumnHelper.getColumnCategoryFromCategories = getColumnCategoryFromCategories;
})(ColumnHelper = exports.ColumnHelper || (exports.ColumnHelper = {}));
