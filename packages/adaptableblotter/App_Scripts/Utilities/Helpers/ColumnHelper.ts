import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { LoggingHelper } from './LoggingHelper';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { DataType } from '../../PredefinedConfig/Common/Enums';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { StringExtensions } from '../Extensions/StringExtensions';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';

// Single place for all column mapping functions so can be dealt with consistetly re error handling

export function isSpecialColumn(columnId: string): boolean {
  return columnId == 'ag-Grid-AutoColumn';
}

export function isNumericColumn(column: AdaptableColumn): boolean {
  return column.DataType == DataType.Number;
}

export function getColumnDataTypeFromColumnId(
  columnId: string,
  columns: AdaptableColumn[]
): DataType {
  return columns.find(c => c.ColumnId == columnId).DataType;
}

export function getFriendlyNameFromColumn(columnId: string, column: AdaptableColumn): string {
  if (columnId.includes(GeneralConstants.MISSING_COLUMN)) {
    return columnId;
  }
  if (column) {
    return column.FriendlyName;
  }
  LogMissingColumnWarning(columnId);
  return columnId + GeneralConstants.MISSING_COLUMN;
}

export function getFriendlyNameFromColumnId(columnId: string, columns: AdaptableColumn[]): string {
  const foundColumn: AdaptableColumn | undefined = columns.find(c => c.ColumnId == columnId);
  if (foundColumn) {
    return getFriendlyNameFromColumn(columnId, foundColumn);
  }
  LogMissingColumnWarning(columnId);
  return columnId + GeneralConstants.MISSING_COLUMN;
}

export function getFriendlyNamesFromColumnIds(
  columnIds: string[],
  columns: AdaptableColumn[]
): string[] {
  const friendlyNames: string[] = [];
  if (ArrayExtensions.IsNullOrEmpty(columnIds)) {
    return friendlyNames;
  }
  columnIds.forEach(c => {
    friendlyNames.push(getFriendlyNameFromColumnId(c, columns));
  });
  return friendlyNames;
}

export function getColumnIdFromFriendlyName(
  friendlyName: string,
  columns: AdaptableColumn[]
): string {
  if (friendlyName.includes(GeneralConstants.MISSING_COLUMN)) {
    return friendlyName.replace(GeneralConstants.MISSING_COLUMN, ''); // Ids should stay "pure"
  }
  const foundColumn: AdaptableColumn | undefined = columns.find(
    c => c.FriendlyName == friendlyName
  );
  if (foundColumn) {
    return foundColumn.ColumnId;
  }
  LogMissingColumnWarning(friendlyName);
  return friendlyName + GeneralConstants.MISSING_COLUMN;
}

export function getColumnIdsFromFriendlyNames(
  friendlyNames: string[],
  columns: AdaptableColumn[]
): string[] {
  const columnIds: string[] = [];
  if (ArrayExtensions.IsNullOrEmpty(friendlyNames)) {
    return columnIds;
  }
  friendlyNames.forEach(c => {
    columnIds.push(getColumnIdFromFriendlyName(c, columns));
  });
  return columnIds;
}

export function getColumnsFromFriendlyNames(
  friendlyNames: string[],
  columns: AdaptableColumn[]
): AdaptableColumn[] {
  // not sure if this is right as might ignore bad cols
  return friendlyNames.map(friendlyName => columns.find(x => x.FriendlyName == friendlyName));
}

export function getColumnFromId(
  columnId: string,
  columns: AdaptableColumn[],
  logWarning = true
): AdaptableColumn {
  // just return null if no columns rather than logging a warning - otherwise get lots at startup
  if (ArrayExtensions.IsNullOrEmpty(columns)) {
    return null;
  }
  const foundColumn: AdaptableColumn = columns.find(c => c.ColumnId == columnId);
  if (foundColumn) {
    return foundColumn;
  }
  if (logWarning) {
    LogMissingColumnWarning(columnId);
  }
  return null;
}

export function getColumnFromFriendlyName(
  columnName: string,
  columns: AdaptableColumn[],
  logWarning = true
): AdaptableColumn {
  // just return null if no columns rather than logging a warning - otherwise get lots at startup
  if (ArrayExtensions.IsNullOrEmpty(columns)) {
    return null;
  }
  const foundColumn: AdaptableColumn = columns.find(c => c.FriendlyName == columnName);
  if (foundColumn) {
    return foundColumn;
  }
  if (logWarning) {
    LogMissingColumnWarning(columnName);
  }
  return null;
}

export function getColumnsOfType(
  columns: AdaptableColumn[],
  dataType: DataType
): AdaptableColumn[] {
  switch (dataType) {
    case DataType.All:
      return columns;
    case DataType.Boolean:
      return getBooleanColumns(columns);
    case DataType.Date:
      return getDateColumns(columns);
    case DataType.Number:
      return getNumericColumns(columns);
    case DataType.NumberArray:
      return getNumericArrayColumns(columns);
    case DataType.String:
      return getStringColumns(columns);
    default:
      return columns;
  }
}

export function getNumericColumns(columns: AdaptableColumn[]): AdaptableColumn[] {
  return columns.filter(c => c.DataType == DataType.Number);
}

export function getNumericArrayColumns(columns: AdaptableColumn[]): AdaptableColumn[] {
  return columns.filter(c => c.DataType == DataType.NumberArray);
}

export function getStringColumns(columns: AdaptableColumn[]): AdaptableColumn[] {
  return columns.filter(c => c.DataType == DataType.String);
}

export function getDateColumns(columns: AdaptableColumn[]): AdaptableColumn[] {
  return columns.filter(c => c.DataType == DataType.Date);
}

export function getBooleanColumns(columns: AdaptableColumn[]): AdaptableColumn[] {
  return columns.filter(c => c.DataType == DataType.Boolean);
}

export function getColumnCategoryFromColumnCategories(
  columnId: string,
  ColumnCategoryns: ColumnCategory[]
): string {
  let returnValue: string = '';
  ColumnCategoryns.forEach(c => {
    if (StringExtensions.IsNullOrEmpty(returnValue)) {
      const column: string | undefined = c.ColumnIds.find(col => col == columnId);
      if (column) {
        returnValue = c.ColumnCategoryId;
      }
    }
  });
  return returnValue;
}

export function getSortableColumns(columns: AdaptableColumn[]): AdaptableColumn[] {
  return columns.filter(c => c.Sortable);
}

export function getGroupableColumns(columns: AdaptableColumn[]): AdaptableColumn[] {
  return columns.filter(c => c.Groupable);
}

export function getPivotableColumns(columns: AdaptableColumn[]): AdaptableColumn[] {
  return columns.filter(c => c.Pivotable);
}

export function getAggregetableColumns(columns: AdaptableColumn[]): AdaptableColumn[] {
  return columns.filter(c => c.Aggregatable).filter(c => c.DataType == DataType.Number);
}

function LogMissingColumnWarning(columnId: string): void {
  if (!isSpecialColumn(columnId)) {
    LoggingHelper.LogAdaptableWarning(`No column found named '${columnId}'`);
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
  getNumericArrayColumns,
  getStringColumns,
  getDateColumns,
  getBooleanColumns,
  getColumnCategoryFromColumnCategories,
  getSortableColumns,
  getGroupableColumns,
  getPivotableColumns,
  getAggregetableColumns,
  getColumnIdFromFriendlyName,
  getColumnIdsFromFriendlyNames,
};

export default ColumnHelper;
