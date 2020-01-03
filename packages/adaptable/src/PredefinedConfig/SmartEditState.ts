import { RunTimeState } from './RunTimeState';
import { MathOperation } from './Common/Enums';

/**
 * The Predefined Configuration for the Smart Editfunction
 *
 * Use Smart Edit when you want to edit a cell (or group of cells in the same column) using a mathmatical operation.
 *
 * ```ts
 * export default {
 * SmartEdit: {
 *  MathOperation: 'Add',
 *  }
 * } as PredefinedConfig;
 * ```
 */
export interface SmartEditState extends RunTimeState {
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
