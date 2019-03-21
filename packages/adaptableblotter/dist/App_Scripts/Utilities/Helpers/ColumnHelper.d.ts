import { IColumn } from '../Interface/IColumn';
import { DataType } from '../Enums';
import { IColumnCategory } from "../Interface/BlotterObjects/IColumnCategory";
export declare module ColumnHelper {
    function isSpecialColumn(columnId: string): boolean;
    function isNumericColumn(column: IColumn): boolean;
    function getColumnDataTypeFromColumnId(columnId: string, columns: IColumn[]): DataType;
    function getFriendlyNameFromColumn(columnId: string, column: IColumn): string;
    function getFriendlyNameFromColumnId(columnId: string, columns: IColumn[]): string;
    function getFriendlyNamesFromColumnIds(columnIds: string[], columns: IColumn[]): string[];
    function getColumnIdFromFriendlyName(friendlyName: string, columns: IColumn[]): string;
    function getColumnIdsFromFriendlyNames(friendlyNames: string[], columns: IColumn[]): string[];
    function getColumnsFromFriendlyNames(friendlyNames: string[], columns: IColumn[]): IColumn[];
    function getColumnFromId(columnId: string, columns: IColumn[], logWarning?: boolean): IColumn;
    function getColumnFromName(columnName: string, columns: IColumn[], logWarning?: boolean): IColumn;
    function getColumnsOfType(columns: IColumn[], dataType: DataType): IColumn[];
    function getNumericColumns(columns: IColumn[]): IColumn[];
    function getStringColumns(columns: IColumn[]): IColumn[];
    function getDateColumns(columns: IColumn[]): IColumn[];
    function getBooleanColumns(columns: IColumn[]): IColumn[];
    function getColumnCategoryFromColumnCategories(columnId: string, ColumnCategoryns: IColumnCategory[]): string;
    function getSortableColumns(columns: IColumn[]): IColumn[];
}
