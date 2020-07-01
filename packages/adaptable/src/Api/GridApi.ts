import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { GridState } from '../PredefinedConfig/GridState';
import { SelectedCellInfo } from '../PredefinedConfig/Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../PredefinedConfig/Selection/SelectedRowInfo';
import { DataType, SortOrder } from '../PredefinedConfig/Common/Enums';
import { AdaptableOptions } from '../AdaptableOptions/AdaptableOptions';
import { ColumnSort } from '../PredefinedConfig/Common/ColumnSort';
import { ColumnCategory } from '../types';

/**
 * Provides access to important elements of Adaptable like columns, sorting, selected cells etc.
 *
 * It also provides a set of useful methods to add / edit / delete rows in the Grid and, indeed, to reset the DataSource.
 *
 */
export interface GridApi {
  /**
   * Returns the whole of the current Grid State
   */
  getGridState(): GridState;
  /**
   * Repopulates the grid; typically used after listening to a SearchChanged event, so appropriately filtered data on the server can be sent to Adaptable.
   *
   * @param data can be any data from any datasource that is suitable for the underlying grid.
   */
  setGridData(data: any): void;

  /**
   * Loads the grid; designed for first time use
   *
   * Identical to setGridData other than that Adaptable will then reload any Layout after it is called - useful if you have opened row groups
   *
   * @param data can be any data from any datasource that is suitable for the underlying grid.
   */
  loadGridData(data: any): void;

  /**
   * Updates Adaptable (and underlying grid) with rows that have changed.
   *
   * Note: this method simply updates the data set; **it does not take edit validation into account** - for that you should use *setCellVallue* or *setGriddCell*
   *
   * @param dataRows the rows which have been updated.  Send the whole row and Adaptable and underlying grid will take care of the rest.
   *
   * @param config use if running a batch update (so that updates are grouped).  The 2 props are:
   *
   * - batchUpdate: set to true if running batch updates
   *
   * - callback: a function to run when the batch successfully updates
   */
  updateGridData(
    dataRows: any[],
    config?: { batchUpdate?: boolean; callback?: (res: any) => void }
  ): void;

  /**
   * Adds the given rows to Adaptable (and underlying grid).
   *
   * @param dataRows the rows which should be added.  Its your responsibility to ensure that all 'mandatory' fields are included and that the Primary Key stays unique.
   */
  addGridData(dataRows: any[]): void;

  /**
   * Deletes the given rows from Adaptable (and underlying grid).
   *
   * @param dataRows the rows which should be deleted.
   */
  deleteGridData(dataRows: any[]): void;

  /**
   * Updates a cell in Adaptable
   *
   * Note: this update **will be validated** against any existing Cell or Server Validation
   *
   * @param columnId the column to update
   * @param newValue the new value to use
   * @param primaryKeyValue the primaryKeyValue of the row (i.e. the value in the PrimaryKeyColumn identified in Adaptable Options)
   * @param forceFilter whether to refilter the Grid (and update aggregations) on data change - default is false
   *
   */
  setCellValue(columnId: string, newValue: any, primaryKeyValue: any, forceFilter: boolean): void;

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

  /**
   * Returns all the current Column Sort information in Adaptable
   */
  getColumnSorts(): ColumnSort[];

  setColumnSorts(columnSorts: ColumnSort[]): void;

  /**
   * Returns all the current Selected Ceslls in Adaptable
   */
  getSelectedCellInfo(): SelectedCellInfo;

  /**
   * Returns all the current Selected Rows in Adaptable
   */
  getSelectedRowInfo(): SelectedRowInfo;

  /**
   * Returns the underlying Vendor Grid
   *
   * This will be the object passed into Adaptable Options when you created Adaptable
   *
   * For ag-Grid this is the GridOptions object.
   */
  getVendorGrid(): any;

  /**
   * Returns Adaptable Options object passed into Adaptable at the start
   */
  getadaptableOptions(): AdaptableOptions;

  /**
   * Retrieves the value in the cell which is in the given Column and in the Row that contains that given Primary Key Value
   *
   * @param id the primaryKeyValue of the row (ie. the value in the Column defined as the Primary Key Column)
   *
   * @param columnId the name of the Column which contains the cell
   */
  getCellDisplayValue(primaryKeyValue: any, columnId: string): string;

  hideFilterForm(): void;
  applyGridFiltering(): void;
  clearGridFiltering(): void;

  sortAdaptable(columnSorts: ColumnSort[]): void;

  selectNodes(rowNodes: any[]): void;
  selectNode(rowNode: any): void;

  selectColumn(columnId: string): void;
  selectColumns(columnIds: string[]): void;

  getFirstRowNode(): any;
  getRowNodesForPrimaryKeys(primaryKeyValues: any[]): any[];
  getRowNodeForPrimaryKey(primaryKeyValue: any): any;

  expandAllRowGroups(): void;
  closeAllRowGroups(): void;
  getExpandRowGroupsKeys(): any[];
  expandRowGroupsForValues(columnValues: any[]): void;

  isSpecialColumn(columnId: string): boolean;
  isCalculatedColumn(columnId: string): boolean;
  isFreeTextColumn(columnId: string): boolean;
  isActionColumn(columnId: string): boolean;

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
  getColumnFromId(columnId: string): AdaptableColumn;

  getSortableColumns(): AdaptableColumn[];
  getGroupableColumns(): AdaptableColumn[];
  getPivotableColumns(): AdaptableColumn[];
  getAggregetableColumns(): AdaptableColumn[];

  isGridPivotable(): boolean;
  isGridGroupable(): boolean;

  /**
   * Destroys the current AdapTable instance.
   *
   * When using the React or Angular wrappers, you don't need to call this manually, since it's automatically called in the component lifecycle,
   * when the component is destroyed.
   */
  destroy(): void;
}
