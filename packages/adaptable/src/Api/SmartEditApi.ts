import { SmartEditState } from '../PredefinedConfig/SmartEditState';

/**
 * Provides full and comprehensive run-time access to the Smart Edit function
 *
 * Smart Edit is a convenience function that allows users - with a single action - to edit a cell (or group of cells in the same column) using a mathmatical operation.
 *
 * Smart Edit works on **numeric columns only**.
 *
 * --------------
 *
 * **Further AdapTable Help Resources**
 *
 * [Smart Edit Demo](https://demo.adaptabletools.com/edit/aggridsmarteditdemo/)
 *
 * {@link SmartEditState|Smart Edit State}
 *
 * [Smart Edit Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/smart-edit-function.md)
 *
 **/
export interface SmartEditApi {
  /**
   * Retrieves the Smart Edit section from Adaptable State
   */
  getSmartEditState(): SmartEditState;

  /**
   * Sets the operation to use in Smart Edit
   * @param mathOperation the operation to run - either 'Add', 'Subtract','Multiply', 'Divide' or'Replace'
   */
  setSmartEditMathOperation(
    mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'
  ): void;

  /**
   * Gets the current Smart Edit Operation ('Add','Subtract','Multiply','Divide' or 'Replace')
   */
  getSmartEditMathOperation(): string;

  /**
   *
   * @param smartEditValue the value to use in the Operation e.g. if you want to multiply by 10 then the smartEditValue is 10
   */
  setSmartEditValue(smartEditValue: number): void;

  /**
   * Returns the current Smart Edit Value
   */
  getSmartEditValue(): number;

  /**
   * Opens the Smart Edit popup screen
   */
  showSmartEditPopup(): void;
}
