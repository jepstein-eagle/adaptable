import { ConfigState } from './ConfigState';
import { MathOperation } from './Common/Enums';

/**
 * The Predefined Configuration for the Smart Editfunction
 *
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
 * {@link SmartEditApi|Smart Edit API}
 *
 * [Smart Edit Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/smart-edit-function.md)
 *
 * --------------
 *
 * ```ts
 * export default {
 * SmartEdit: {
 *  MathOperation: 'Add',
 *  }
 * } as PredefinedConfig;
 * ```
 */
export interface SmartEditState extends ConfigState {
  /**
   * Which value will be used to create the Smart Edit (used in conjunction with the MathOperation and the cell's current value).
   *
   * Note: This property is rarely set in config; it updates each time Smart Edit is used.
   *
   *  **Default Value: 1**
   */
  SmartEditValue?: number;

  /**
   * Which Math Operation to use for the Smart Edit.
   *
   *  Choices are: 'Add', 'Subtract', 'Multiply' or 'Divide',
   *
   * **Default Value: Multiply**
   */
  MathOperation?: Exclude<MathOperation, MathOperation.Replace>; // 'Add' | 'Subtract' | 'Multiply' | 'Divide';
}
