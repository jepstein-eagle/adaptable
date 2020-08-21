import {
  FreeTextColumnState,
  FreeTextColumn,
  FreeTextStoredValue,
} from '../PredefinedConfig/FreeTextColumnState';
/**
 * Provides full and comprehensive run-time access to the Free Text Column function and associated state.
 *
 * Free Text Columns are special columns that contain data which you insert and which is stored in YOUR state and not in the official data source.
 *
 * It is primarily used for Comments or for similar use cases where you want to make additional notes that will not be persisted with the main data source.
 */
export interface FreeTextColumnApi {
  /**
   * Retrieves the Free Text Column section from Adaptable State
   */
  getFreeTextColumnState(): FreeTextColumnState;

  /**
   * Gets all Free Text Columns in Adaptable State
   */
  getAllFreeTextColumn(): FreeTextColumn[];

  /**
   * Sets all Free Text Columns in Adaptable State
   */
  setFreeTextColumns(freeTextColumns: FreeTextColumn[]): void;

  /**
   * Adds a new Free Text Column to Adaptable State
   *
   * @param freeTextColumn the freeTextColumn to add
   */
  addFreeTextColumn(freeTextColumn: FreeTextColumn): void;

  /**
   * Edits an existing Free Text Column to Adaptable State
   *
   * @param freeTextColumn the freeTextColumn to edit - ColumnId property is mandatory
   */
  editFreeTextColumn(freeTextColumn: Partial<FreeTextColumn> & { ColumnId: string }): void;

  /**
   * Creates a new Free Text Column and adds it to Adaptable State
   *
   * @param param.columnId the id for the column - try to keep this small and unique (and dont use spaces)
   * @param param.columnName the name for the column - optional - if not provided, will default to the columnId
   * @param param.defaultValue the default value that will appear in the Column unless overrident - leave blank if you dont require a default value
   */
  createFreeTextColumn(param: {
    columnId: string;
    columnName?: string;
    defaultValue: string;
  }): void;

  /**
   * Deletes an existing Free Text Column from Adaptable State
   *
   * @param columnId the name of the Free Text Column to delete
   */
  deleteFreeTextColumn(columnId: string): void;

  /**
   * Adds a Free Text Stored Value for a Free Text Column
   *
   * If there is an existing Stored Value for that cell it will be replaced
   *
   * @param freeTextColumn the Free Text Column to which to add the Stored Value
   * @param storedValue the Free Text Stored Value to add
   */
  addEditFreeTextColumnStoredValue(
    freeTextColumn: FreeTextColumn,
    storedValue: FreeTextStoredValue
  ): void;

  /**
   * Opens the Free Text Column popup screen
   */
  showFreeTextColumnPopup(): void;
}
