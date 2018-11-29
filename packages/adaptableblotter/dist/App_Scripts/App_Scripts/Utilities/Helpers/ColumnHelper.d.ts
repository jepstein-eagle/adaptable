import { IColumn } from '../../api/Interface/IColumn';
import { DataType } from '../../Utilities/Enums';
import { IColumnCategory } from '../../api/Interface/Interfaces';
export declare module ColumnHelper {
    function isSpecialColumn(columnId: string): boolean;
    function getColumnDataTypeFromColumnId(columnId: string, columns: IColumn[]): DataType;
    function getFriendlyNameFromColumn(columnId: string, column: IColumn): string;
    function getFriendlyNameFromColumnId(columnId: string, columns: IColumn[]): string;
    function getFriendlyNamesFromColumnIds(columnIds: string[], columns: IColumn[]): string[];
    function getColumnIdFromFriendlyName(friendlyName: string, columns: IColumn[]): string;
    function getColumnIdsFromFriendlyNames(friendlyNames: string[], columns: IColumn[]): string[];
    function getColumnsFromFriendlyNames(friendlyNames: string[], columns: IColumn[]): IColumn[];
    function getColumnFromId(columnId: string, columns: IColumn[]): IColumn;
    function getNumericColumns(columns: IColumn[]): IColumn[];
    function getColumnCategoryFromColumnCategories(columnId: string, ColumnCategoryns: IColumnCategory[]): string;
}
