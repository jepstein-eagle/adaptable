import { UpdatedRowState } from '../PredefinedConfig/RunTimeState/UpdatedRowState';
import { UpdatedRowInfo } from '../Utilities/Services/Interface/IDataService';

/**
 * Provides full and comprehensive run-time access to the Updated Row function and associated state.
 *
 * The Updated Row function enables you to easily see when data in a row has changed.
 */
export interface UpdatedRowApi {
  /**
   * Retrieves the Updated Row section from the Adaptable Blotter State
   *
   * This provides details of how the Updated Row function has been configured but **not** of which rows are currently coloured differently as a result of being updated.
   */
  getUpdatedRowState(): UpdatedRowState;

  /**
   * Enables the Update Row function so the grid will visually indicate when  a row has changed.
   */
  updatedRowEnable(): void;

  /**
   * Disables the Update Row function so the grid will not visually indicate when  a row has changed.
   */
  updatedRowDisable(): void;

  /**
   * Enables the 'Jump To Row' option where the Adaptable Blotter updates its scroll position to ensure the updated row is visible.
   */
  jumpToRowEnable(): void;

  /**
   * Disables the 'Jump To Row' option so that the Adaptable Blotter will no not update its scroll position to ensure the updated row is visible.
   */
  jumpToRowDisable(): void;

  /**
   * Set the Up Color ie. the color the row will display if the change in value that caused the update was UP.
   *
   * Only used for numeric or data columns
   *
   * @param upColor the color to set
   */
  setUpColor(upColor: string): void;

  /**
   * Set the Down Color ie. the color the row will display if the change in value that caused the update was DOWN.
   *
   * Only used for numeric or data columns
   *
   * @param downColor the color to set
   */
  setDownColor(downColor: string): void;

  /**
   * Set the 'No Change' Color ie. the color the row will display if the change in value that caused the update was neither up nor down (e.g. was in a string column).
   *
   * @param neutralColor the color to set
   */
  setNeutralColor(neutralColor: string): void;

  /**
   * Adds a new Updated Row
   *
   * @param updatedRowInfo the *UpdatedRowInfo* object to add
   */
  addUpdatedRowInfo(updatedRowInfo: UpdatedRowInfo): void;

  /**
   * Deletes (clears) an updated row - so that the row is no longer styled differentnly
   *
   * @param updatedRowInfo the *UpdatedRowInfo* object to delete
   */
  deleteUpdatedRowInfo(updatedRowInfo: UpdatedRowInfo): void;

  /**
   * Deletes all updated rows so that no rows have their back colour displayed differently
   */
  deleteAllUpdatedRowInfo(): void;
}
