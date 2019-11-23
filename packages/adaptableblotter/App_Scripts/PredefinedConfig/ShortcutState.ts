import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from './Common/AdaptableBlotterObject';
export interface ShortcutState extends RunTimeState {
  Shortcuts?: Shortcut[];
}

/**
 * Used to define a Keyboard Shortcut as used in the Shortcuts function
 */
export interface Shortcut extends AdaptableBlotterObject {
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

/*
A collection of Shortcuts.

An IShortcut consists of 5 properties:

ShortcutKey: The keyboard key which will trigger the function.

ShortcutResult: The output of the function.

ShortcutOperation: What the function does.

Possible values are: Add, Subtract, Multiply, Divide or Replace.

Column Type: Data type of the column where shortcut can be applied. 

Possible values are: Number, Date.

IsDynamic: Whether the Shortcut uses a System Filter (e.g. 'Next Working Day' Date System Filter).
*/
