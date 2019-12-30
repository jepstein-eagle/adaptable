import { RunTimeState } from './RunTimeState';

/**
 * The Predefined Configuration for the Updated Row function
 *
 * The Updated Row function enables you to easily see when data in a row has changed.
 *
 * You are able to change the Up, Down and Neutral colours if you are not happy with the defaults (Green, Red and Gray respectively).
 *
 * Newly updated rows will display with the new colour until they are explicitly cleared.  This can be done in two ways:
 *
 *  - Clicking the 'Clear Updated Row' menu item in the Context Menu.  This option will only appear in cells in Updated Rows and will clear just that Updated Row.
 *
 *  - Clicking the 'Clear Updated Rows' option in the Column Header Menu.  This option will only appear if there are Updated Rows and will clear all Updated Rows.
 *
 * ```ts
 * export default {
 * UpdatedRow: {
 *  EnableUpdatedRow: true,
 *  JumpToRow: true,
 *  UpColor: '#32CD32', // lime green
 *  DownColor: '#FFA500', // orange
 *  NeutralColor: '#FFFF00', // yellow
 *  }
 * } as PredefinedConfig;
 * ```
 */
export interface UpdatedRowState extends RunTimeState {
  /**
   * Whether to enable the Updated Row function so that updated rows are highlighted.
   *
   * **Default Value: false**
   */
  EnableUpdatedRow?: boolean;

  /**
   * The default colour to use for an updated row when the (numeric or date) cell that triggered the update had a change in value direction of **up**.
   *
   * **Default Value: green**
   */
  UpColor?: string;

  /**
   * The default colour to use for an updated row when the (numeric or date) cell that triggered the update had a change in value direction of **down**.
   *
   * **Default Value: red**
   */
  DownColor?: string;

  /**
   * The default colour to use for an updated row when the cell that triggered the update was not numeric or date and so the change in value had **no direction**.
   *
   * **Default Value: gray**
   */
  NeutralColor?: string;

  /**
   * How long the row will stay updated for.
   *
   * **note: this property is not currently used** - The value is always 'Always', meaning ALL row updates will remain in place until the user clears them (through the context or column menus)
   */
  Duration?: 250 | 500 | 750 | 1000 | 'Always';

  /**
   * Whether the Adaptable should jump (ie. change its vertical scroll position) so that the updated row is visible.
   *
   * **Default Value: false**
   */
  JumpToRow?: boolean;

  /**
   * How many updated rows to hold in the State at any one time (and therefore to display).
   *
   * If you reacch this limit then we remove the oldest updated row each time a new one needs to be displayed.
   *
   * **Default Value**:  Infinity
   *
   */
  MaxUpdatedRowsInStore?: number;
}
