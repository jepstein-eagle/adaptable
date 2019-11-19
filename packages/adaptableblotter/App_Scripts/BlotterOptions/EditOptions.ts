import { DataChangedInfo } from '../Utilities/Interface/DataChangedInfo';

/**
 * Options related to Editing in the Adaptable Blotter.
 *
 * Allows you to provide the Adaptable Blotter with Server Validation that works in conjunction with Client (aka Cell) Validation
 *
 * **EditOptions Example**
 *
 * ```ts
 * adaptableBlotterOptions.editOptions = {
 *     validateOnServer: (dataChangedInfo: DataChangedInfo) => {
 *       return new Promise((resolve, reject) => {
 *         setTimeout(() => resolve(getServerEditResponse(dataChangedInfo)), 2000);
 *       });
 *     },
 *   };
 *
 * --------------------
 *
 * function getServerEditResponse(dataChangedInfo: DataChangedInfo): ValidationResult {
 *  if (dataChangedInfo.ColumnId == 'amount') {
 *    if (dataChangedInfo.NewValue == 50) {
 *     return {
 *       NewValue: dataChangedInfo.OldValue,
 *        ValidationMessage: 'Cannot set amount to 50',
 *      };
 *    } else if (dataChangedInfo.NewValue > 100) {
 *      return {
 *        NewValue: 100,
 *        ValidationMessage: 'Amount cannot be greater than 100',
 *      };
 *    } else if (dataChangedInfo.NewValue < 20) {
 *      return {
 *        NewValue: 20,
 *        ValidationMessage: 'Amount cannot  be less than  20',
 *      };
 *    }
 *  }
 * return {};
 *}
 *
 *  --------------------
 *
 * ```
 */
export interface EditOptions {
  /**
   * Used when you want to check an Edit made in the Adaptable Blotter on your Server
   *
   * The argument provided is the **DataChangedInfo** which provides the old and new values, the column, and also the node in which the cell lives.
   *
   * The property returns a promise that includes a Validation Result
   *
   * A ValidadtionResult has 2 properties:  A new value to use instead of the proposed one from the edit and a message.
   *
   * You can return an empty object if you are happy with the edit (and it will then go through as normal).
   *
   * This function will only be called AFTER cell validation has successfully completed.
   *
   *  **Default Value: null**
   */
  validateOnServer?: (dataChangedInfo: DataChangedInfo) => Promise<ValidationResult>;
}

/**
 * Used for Server Validation ie. after an edit has been made in the Adaptable Blotter which you want to check on your server.
 *
 * It contains 2 properties:
 *
 * -the new value which should be used for the edit if the proposed one is no good; leave this blank if you are happy with the edit
 *
 * -a message which will be displayed
 *
 * The values returned (through a Promise) will populate the Column Filter, Column Values section in Query Builder and Bulk Update.
 */
export interface ValidationResult {
  ValidationMessage?: string;
  NewValue?: any;
}
