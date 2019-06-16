import { RunTimeState } from './RunTimeState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface ShortcutState extends RunTimeState {
  Shortcuts?: Shortcut[];
}

/**
 * Used to define a Keyboard Shortcut as used in the Shortcuts function
 */
export interface Shortcut extends IAdaptableBlotterObject {
  /**
   * Key which when pressed on keyboard triggers the shortcut
   */
  ShortcutKey: string;
  /**
   * Output of the function; if 'date' then its always a new value;
   * if 'number' then it can be computed with existing edit value
   */
  ShortcutResult: any;
  /**
   * What the function does; Date shortcuts only replace;
   * Numeric shortcuts make a computation based on existing value and 'ShortcutResult' property
   */
  ShortcutOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace';
  /**
   * Which columns the keyboard is active on.
   */
  ColumnType: 'Number' | 'Date';
  /**
   * If its a system
   */
  IsDynamic: boolean;
}
