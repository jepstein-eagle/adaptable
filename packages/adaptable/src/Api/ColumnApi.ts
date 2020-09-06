import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { AdaptableScope, ScopeDataType } from '../PredefinedConfig/Common/AdaptableScope';

/**
 * Provides access to a suite of column-related functions in AdapTable
 */
export interface ColumnApi {
  /** Returns all the columns in Adaptable
   *
   * Each column has a number of properties such as Visiblity and Data Type
   */
  getColumns(): AdaptableColumn[];

  /**
   * Returns all the visible columns in Adaptable
   */
  getVisibleColumns(): AdaptableColumn[];

  /**
   * Returns all the numeric columns in Adaptable
   */
  getNumericColumns(): AdaptableColumn[];

  /**
   * Returns all the Date columns in Adaptable
   */
  getDateColumns(): AdaptableColumn[];

  /**
   * Returns all the string columns in Adaptable
   */
  getStringColumns(): AdaptableColumn[];

  /**
   * Returns all the boolean columns in Adaptable
   */
  getBooleanColumns(): AdaptableColumn[];

  /**
   * Returns all the numeric array columns in Adaptable
   */
  getNumericArrayColumns(): AdaptableColumn[];

  /**
   * Returns all Columns in the State that have a given DataType
   *
   * @param dataType the DataType of the Columns to retrieve
   */
  getColumnsOfType(dataType: DataType): AdaptableColumn[];

  selectColumn(columnId: string): void;
  selectColumns(columnIds: string[]): void;
  selectAll(): void;

  hideColumn(columnId: string): void;
  showColumn(columnId: string): void;

  isRowGroupColumn(columnId: string): boolean;
  isCalculatedColumn(columnId: string): boolean;
  isFreeTextColumn(columnId: string): boolean;
  isActionColumn(columnId: string): boolean;
  isSpecialRenderedColumn(columnId: string): boolean;

  isNumericColumn(column: AdaptableColumn): boolean;
  getColumnDataTypeFromColumnId(
    columnId: string
  ): 'String' | 'Number' | 'NumberArray' | 'Boolean' | 'Date' | 'Object' | 'Unknown';
  getFriendlyNameFromColumn(columnId: string, column: AdaptableColumn): string;
  getFriendlyNameFromColumnId(columnId: string): string;
  getFriendlyNamesFromColumnIds(columnIds: string[]): string[];
  getColumnFromFriendlyName(columnName: string): AdaptableColumn;
  getColumnIdFromFriendlyName(friendlyName: string): string;
  getColumnIdsFromFriendlyNames(friendlyNames: string[]): string[];
  getColumnsFromFriendlyNames(friendlyNames: string[]): AdaptableColumn[];
  getColumnsFromIds(columnIds: string[]): AdaptableColumn[];
  getColumnFromId(columnId: string, logWarning?: boolean): AdaptableColumn;

  getSortableColumns(): AdaptableColumn[];
  getGroupableColumns(): AdaptableColumn[];
  getPivotableColumns(): AdaptableColumn[];
  getAggregetableColumns(): AdaptableColumn[];

  getDistinctDisplayValuesForColumn(columnId: string): any[];
  getDistinctVisibleDisplayValuesForColumn(columnId: string): any[];
  getDistinctRawValuesForColumn(columnId: string): any[];
  getDistinctVisibleRawValuesForColumn(columnId: string): any[];
}
