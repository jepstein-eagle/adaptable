"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants = require("../../Core/Constants/GeneralConstants");
const LoggingHelper_1 = require("./LoggingHelper");
const Enums_1 = require("../../Core/Enums");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
const StringExtensions_1 = require("../Extensions/StringExtensions");
var ColumnHelper;
(function (ColumnHelper) {
    // Single place for all column mapping functions so can be dealt with consistetly re error handling
    function isSpecialColumn(columnId) {
        return columnId == "ag-Grid-AutoColumn";
    }
    ColumnHelper.isSpecialColumn = isSpecialColumn;
    function getColumnDataTypeFromColumnId(columnId, columns) {
        return columns.find(c => c.ColumnId == columnId).DataType;
    }
    ColumnHelper.getColumnDataTypeFromColumnId = getColumnDataTypeFromColumnId;
    function getFriendlyNameFromColumn(columnId, column) {
        if (columnId.includes(GeneralConstants.MISSING_COLUMN)) {
            return columnId;
        }
        if (column) {
            return column.FriendlyName;
        }
        else {
            LoggingHelper_1.LoggingHelper.LogWarning("No column found named '" + columnId + "'");
            return columnId + GeneralConstants.MISSING_COLUMN;
        }
    }
    ColumnHelper.getFriendlyNameFromColumn = getFriendlyNameFromColumn;
    function getFriendlyNameFromColumnId(columnId, columns) {
        let foundColumn = columns.find(c => c.ColumnId == columnId);
        if (foundColumn) {
            return getFriendlyNameFromColumn(columnId, foundColumn);
        }
        else {
            LoggingHelper_1.LoggingHelper.LogWarning("No column found named '" + columnId + "'");
            return columnId + GeneralConstants.MISSING_COLUMN;
        }
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
        if (foundColumn) {
            return foundColumn.ColumnId;
        }
        else {
            LoggingHelper_1.LoggingHelper.LogWarning("No column found named '" + friendlyName + "'");
            return friendlyName + GeneralConstants.MISSING_COLUMN;
        }
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
        // just return null if no columns rather than logging a warning - otherwise get lots at startup
        if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(columns)) {
            return null;
        }
        let foundColumn = columns.find(c => c.ColumnId == columnId);
        if (foundColumn) {
            return foundColumn;
        }
        else {
            LoggingHelper_1.LoggingHelper.LogWarning("No column found named '" + columnId + "'");
            return null;
        }
    }
    ColumnHelper.getColumnFromId = getColumnFromId;
    function getNumericColumns(columns) {
        return columns.filter(c => c.DataType == Enums_1.DataType.Number);
    }
    ColumnHelper.getNumericColumns = getNumericColumns;
    function getColumnCategoryFromColumnCategories(columnId, ColumnCategoryns) {
        let returnValue = "";
        ColumnCategoryns.forEach(c => {
            if (StringExtensions_1.StringExtensions.IsNullOrEmpty(returnValue)) {
                let column = c.ColumnIds.find(col => col == columnId);
                if (column) {
                    returnValue = c.ColumnCategoryId;
                }
            }
        });
        return returnValue;
    }
    ColumnHelper.getColumnCategoryFromColumnCategories = getColumnCategoryFromColumnCategories;
})(ColumnHelper = exports.ColumnHelper || (exports.ColumnHelper = {}));
