import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { LoggingHelper } from './LoggingHelper';
import { IColumn } from '../Interface/IColumn';
import { DataType } from '../Enums';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { StringExtensions } from '../Extensions/StringExtensions';
import { IColumnCategory } from "../Interface/BlotterObjects/IColumnCategory";

// Single place for all column mapping functions so can be dealt with consistetly re error handling

export function isSpecialColumn(columnId: string): boolean {
    return columnId == "ag-Grid-AutoColumn"
}

export function isNumericColumn(column: IColumn): boolean {
    return column.DataType == DataType.Number;
}

export function getColumnDataTypeFromColumnId(columnId: string, columns: IColumn[]): DataType {
    return columns.find(c => c.ColumnId == columnId).DataType;
}

export function getFriendlyNameFromColumn(columnId: string, column: IColumn): string {
    if (columnId.includes(GeneralConstants.MISSING_COLUMN)) {
        return columnId;
    }
    if (column) {
        return column.FriendlyName
    } else {
        LogMissingColumnWarning(columnId);
        return columnId + GeneralConstants.MISSING_COLUMN
    }
}

export function getFriendlyNameFromColumnId(columnId: string, columns: IColumn[]): string {
    let foundColumn: IColumn = columns.find(c => c.ColumnId == columnId);
    if (foundColumn) {
        return getFriendlyNameFromColumn(columnId, foundColumn);
    } else {
        LogMissingColumnWarning(columnId);
        return columnId + GeneralConstants.MISSING_COLUMN
    }
}

export function getFriendlyNamesFromColumnIds(columnIds: string[], columns: IColumn[]): string[] {
    let friendlyNames: string[] = []
    columnIds.forEach(c => {
        friendlyNames.push(getFriendlyNameFromColumnId(c, columns))
    })
    return friendlyNames;
}

export function getColumnIdFromFriendlyName(friendlyName: string, columns: IColumn[]): string {
    if (friendlyName.includes(GeneralConstants.MISSING_COLUMN)) {
        return friendlyName.replace(GeneralConstants.MISSING_COLUMN, "");  // Ids should stay "pure"
    }
    let foundColumn: IColumn = columns.find(c => c.FriendlyName == friendlyName);
    if (foundColumn) {
        return foundColumn.ColumnId;
    } else {
        LogMissingColumnWarning(friendlyName);
        return friendlyName + GeneralConstants.MISSING_COLUMN
    }
}

export function getColumnIdsFromFriendlyNames(friendlyNames: string[], columns: IColumn[]): string[] {
    let columnIds: string[] = []
    friendlyNames.forEach(c => {
        columnIds.push(getColumnIdFromFriendlyName(c, columns))
    })
    return columnIds;
}

export function getColumnsFromFriendlyNames(friendlyNames: string[], columns: IColumn[]): IColumn[] {
    // not sure if this is right as might ignore bad cols
    return friendlyNames.map(friendlyName => columns.find(x => x.FriendlyName == friendlyName))
}

export function getColumnFromId(columnId: string, columns: IColumn[], logWarning = true): IColumn {
    // just return null if no columns rather than logging a warning - otherwise get lots at startup
    if (ArrayExtensions.IsNullOrEmpty(columns)) {
        return null;
    }
    let foundColumn: IColumn = columns.find(c => c.ColumnId == columnId)
    if (foundColumn) {
        return foundColumn;
    } else {
        if (logWarning) {
            LogMissingColumnWarning(columnId);
        }
        return null;
    }

}

export function getColumnFromFriendlyName(columnName: string, columns: IColumn[], logWarning = true): IColumn {
    // just return null if no columns rather than logging a warning - otherwise get lots at startup
    if (ArrayExtensions.IsNullOrEmpty(columns)) {
        return null;
    }
    let foundColumn: IColumn = columns.find(c => c.FriendlyName == columnName)
    if (foundColumn) {
        return foundColumn;
    } else {
        if (logWarning) {
            LogMissingColumnWarning(columnName);
        }
        return null;
    }

}

export function getColumnsOfType(columns: IColumn[], dataType: DataType): IColumn[] {
    switch (dataType) {
        case DataType.All:
            return columns;
        case DataType.Boolean:
            return this.getBooleanColumns(columns, DataType.Boolean);
        case DataType.Date:
            return this.getBooleanColumns(columns, DataType.Date);
        case DataType.Number:
            return this.getBooleanColumns(columns, DataType.Number);
        case DataType.String:
            return this.getBooleanColumns(columns, DataType.String);
        default:
            return columns;
    }

}

export function getNumericColumns(columns: IColumn[]): IColumn[] {
    return columns.filter(c => c.DataType == DataType.Number)
}

export function getStringColumns(columns: IColumn[]): IColumn[] {
    return columns.filter(c => c.DataType == DataType.String)
}

export function getDateColumns(columns: IColumn[]): IColumn[] {
    return columns.filter(c => c.DataType == DataType.Date)
}

export function getBooleanColumns(columns: IColumn[]): IColumn[] {
    return columns.filter(c => c.DataType == DataType.Boolean)
}

export function getColumnCategoryFromColumnCategories(columnId: string, ColumnCategoryns: IColumnCategory[]): string {
    let returnValue: string = ""
    ColumnCategoryns.forEach(c => {
        if (StringExtensions.IsNullOrEmpty(returnValue)) {
            let column: string = c.ColumnIds.find(col => col == columnId);
            if (column) {
                returnValue = c.ColumnCategoryId;
            }
        }
    })
    return returnValue;
}

export function getSortableColumns(columns: IColumn[]): IColumn[] {
    return columns.filter(c => c.Sortable);
}

function LogMissingColumnWarning(columnId: string): void {
    if (!isSpecialColumn(columnId)) {
        LoggingHelper.LogAdaptableBlotterWarning("No column found named '" + columnId + "'");
    }
}

export const ColumnHelper = {
    isSpecialColumn,
    isNumericColumn,
    getColumnDataTypeFromColumnId,
    getFriendlyNameFromColumn,
    getFriendlyNameFromColumnId,
    getFriendlyNamesFromColumnIds,
    getColumnsFromFriendlyNames,
    getColumnFromId,
    getColumnFromFriendlyName,
    getColumnsOfType,
    getNumericColumns,
    getStringColumns,
    getDateColumns,
    getBooleanColumns,
    getColumnCategoryFromColumnCategories,
    getSortableColumns,
    getColumnIdFromFriendlyName,
    getColumnIdsFromFriendlyNames
}

export default ColumnHelper