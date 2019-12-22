import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { GridState } from '../PredefinedConfig/GridState';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { ColumnSort } from '../PredefinedConfig/LayoutState';
import { GridCell } from '../Utilities/Interface/Selection/GridCell';
import { SelectedRowInfo } from '../Utilities/Interface/Selection/SelectedRowInfo';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { AdaptableBlotterOptions } from '../BlotterOptions/AdaptableBlotterOptions';

/**
 * Provides access to important elements of the Adaptable Blotter like columns, sorting, selected cells etc.
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
   * Repopulates the grid; typically used after listening to a SearchChanged event, so appropriately filtered data on the server can be sent to the Blotter.
   *
   * @param data can be any data from any datasource that is suitable for the underlying grid.
   */
  setGridData(data: any): void;

  /**
   * Updates the Adaptable Blotter (and underlying grid) with rows that have changed.
   *
   * Note: this method simply updates the data set; **it does not take edit validation into account** - for that you should use *setCellVallue* or *setGriddCell*
   *
   * @param dataRows the rows which have been updated.  Send the whole row and the Adaptable Blotter and underlying grid will take care of the rest.
   */
  updateGridData(dataRows: any[]): void;

  /**
   * Adds the given rows to the Adaptable Blotter (and underlying grid).
   *
   * @param dataRows the rows which should be added.  Its your responsibility to ensure that all 'mandatory' fields are included and that the Primary Key stays unique.
   */
  addGridData(dataRows: any[]): void;

  /**
   * Deletes the given rows from the Adaptable Blotter (and underlying grid).
   *
   * @param dataRows the rows which should be deleted.
   */
  deleteGridData(dataRows: any[]): void;

  /**
   * Updates a cell in the Adaptable Blotter
   *
   * Note: this update **will be validated** against any existing Cell or Server Validation
   *
   * @param columnId the column to update
   * @param newValue the new value to use
   * @param primaryKeyValue the primaryKeyValue of the row (i.e. the value in the PrimaryKeyColumn identified in Adaptable Blotter Options)
   * @param validateChange whether to perform validation on the cell edit; optional value which defaults to **true** if not supplied
   *
   */
  setCellValue(
    columnId: string,
    newValue: any,
    primaryKeyValue: any,
    reselectSelectedCells: boolean,
    validateChange?: boolean
  ): void;

  /**
   * Replaces a batch of existing cell values in the Adaptable Blotter with those contained in the inputted Grid Cells
   * @param gridCells the new cells
   */
  setGridCells(
    gridCells: GridCell[],
    reselectSelectedCells: boolean,
    validateChange: boolean
  ): void;

  /** Returns all the columns in the Adaptable Blotter
   *
   * Each column has a number of properties such as Visiblity and Data Type
   */
  getColumns(): AdaptableColumn[];

  /**
   * Returns all the visible columns in the Adaptable Blotter
   */
  getVisibleColumns(): AdaptableColumn[];

  /**
   * Returns all the numeric columns in the Adaptable Blotter
   */
  getNumericColumns(): AdaptableColumn[];

  /**
   * Returns all the Date columns in the Adaptable Blotter
   */
  getDateColumns(): AdaptableColumn[];

  /**
   * Returns all the string columns in the Adaptable Blotter
   */
  getStringColumns(): AdaptableColumn[];

  /**
   * Returns all the boolean columns in the Adaptable Blotter
   */
  getBooleanColumns(): AdaptableColumn[];

  /**
   * Returns all the numeric array columns in the Adaptable Blotter
   */
  getNumericArrayColumns(): AdaptableColumn[];

  /**
   * Returns all Columns in the State that have a given DataType
   *
   * @param dataType the DataType of the Columns to retrieve
   */
  getColumnsOfType(dataType: DataType): AdaptableColumn[];

  /**
   * Returns all the current Column Sort information in the Adaptable Blotter
   */
  getColumnSorts(): ColumnSort[];

  /**
   * Returns all the current Selected Ceslls in the Adaptable Blotter
   */
  getSelectedCellInfo(): SelectedCellInfo;

  /**
   * Returns all the current Selected Rows in the Adaptable Blotter
   */
  getSelectedRowInfo(): SelectedRowInfo;

  /**
   * Returns the underlying Vendor Grid
   *
   * This will be the object passed into the Adaptable Blotter Options when you created the Adaptable Blotter
   *
   * For ag-Grid this is the GridOptions object.
   */
  getVendorGrid(): any;

  /**
   * Returns the Blotter Options object passed into the Adaptable Blotter at the start
   */
  getBlotterOptions(): AdaptableBlotterOptions;

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
}
