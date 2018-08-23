import { IColumn } from '../Interface/IColumn';
import * as GeneralConstants from '../Constants/GeneralConstants';
import { AdaptableBlotterLogger } from './AdaptableBlotterLogger';
import { DataType } from '../Enums';

export module ColumnHelper {

    // Lets put all column mapping in one place so we can properly deal with missing columns consistently...

    export function isSpecialColumn(columnId: string): boolean {
        return columnId == "ag-Grid-AutoColumn"
    }

   

    export function getFriendlyNameFromColumn(columnId: string, column: IColumn): string {
        if (columnId.includes(GeneralConstants.MISSING_COLUMN)) {
            return columnId;
        }
        if (column) {
            return column.FriendlyName
        } else {
            AdaptableBlotterLogger.LogWarning("No column found named '" + columnId + "'");
            return columnId + GeneralConstants.MISSING_COLUMN
        }
    }

    export function getFriendlyNameFromColumnId(columnId: string, columns: IColumn[]): string {
        let foundColumn: IColumn = columns.find(c => c.ColumnId == columnId);
        return getFriendlyNameFromColumn(columnId, foundColumn);
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
        return (foundColumn) ? foundColumn.ColumnId : friendlyName // if not found then keep the name that we have from before
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
       // TODO check for missing column
       return columns.find(c=>c.ColumnId==columnId)
    }

    export function getNumericColumns(columns: IColumn[]): IColumn[] {
       return columns.filter(c=>c.DataType==DataType.Number)
    }
}

