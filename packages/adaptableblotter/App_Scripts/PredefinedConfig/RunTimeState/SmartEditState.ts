import { RunTimeState } from './RunTimeState';
export interface SmartEditState extends RunTimeState {
  /**
   * Which value will be used to create the Smart Edit (used in conjunction with the MathOperation and the cell's current value).
   *
   * This property is rarely set in config; it updates each time Smart Edit is used.
   */
  SmartEditValue?: number;

  /**
   * Which Math Operation to use for the Smart Edit.
   */
  MathOperation?: 'Add' | 'Subtract' | 'Multiply' | 'Divide';
}
