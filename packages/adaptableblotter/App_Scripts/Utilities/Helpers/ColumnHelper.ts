import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { LoggingHelper } from './LoggingHelper';
import { IColumn } from '../../Api/Interface/IColumn';
import { DataType } from '../Enums';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { IColumnCategory } from '../../api/Interface/Interfaces';
import { StringExtensions } from '../Extensions/StringExtensions';

export module ColumnHelper {

    // Single place for all column mapping functions so can be dealt with consistetly re error handling

    export function isSpecialColumn(columnId: string): boolean {
        return columnId == "ag-Grid-AutoColumn"
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
            LoggingHelper.LogWarning("No column found named '" + columnId + "'");
            return columnId + GeneralConstants.MISSING_COLUMN
        }
    }

    export function getFriendlyNameFromColumnId(columnId: string, columns: IColumn[]): string {
        let foundColumn: IColumn = columns.find(c => c.ColumnId == columnId);
        if (foundColumn) {
            return getFriendlyNameFromColumn(columnId, foundColumn);
        } else {
            LoggingHelper.LogWarning("No column found named '" + columnId + "'");
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
            LoggingHelper.LogWarning("No column found named '" + friendlyName + "'");
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

    export function getColumnFromId(columnId: string, columns: IColumn[]): IColumn {
       // just return null if no columns rather than logging a warning - otherwise get lots at startup
        if (ArrayExtensions.IsNullOrEmpty(columns)) {
            return null;
        }
        let foundColumn: IColumn = columns.find(c => c.ColumnId == columnId)
        if (foundColumn) {
            return foundColumn;
        } else {
            LoggingHelper.LogWarning("No column found named '" + columnId + "'");
            return null;
        }

    }

    export function getNumericColumns(columns: IColumn[]): IColumn[] {
        return columns.filter(c => c.DataType == DataType.Number)
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
}
