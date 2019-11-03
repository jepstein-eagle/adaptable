import { RunTimeState } from './RunTimeState';

/**
 * The Predefined Configuration for the Updated Row function
 *
 * The Updated Row function enables you to easily see which rows have changed.
 *
 * You are able to change the Up, Down and Neutral colours if you are not happy with the defaults (Green, Red and Gray respectively).
 *
 * Currently updated rows stay with the new colour until you clear them - either by clicking in the row in the Context Menu or by Clearing them all (via the Column Menu).
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
   * **Default value: false**
   */
  EnableUpdatedRow?: boolean;

  /**
   * The default colour to use for an updated row when the (numeric or date) cell that triggered the update had a change in value direction of **up**.
   *
   * If not provided then **green** is used as the default value.
   */
  UpColor?: string;

  /**
   * The default colour to use for an updated row when the (numeric or date) cell that triggered the update had a change in value direction of **down**.
   *
   * If not provided then **red** is used as the default value.
   */
  DownColor?: string;

  /**
   * The default colour to use for an updated row when the cell that triggered the update was not numeric or date and so the change in value had **no direction**.
   *
   * If not provided then **gray** is used as the default value.
   */
  NeutralColor?: string;

  /**
   * How long the row will stay updated for.
   *
   * **note** this property is not currently used and ALL row updates will remain in place until the user clears them (through the context or column menus)
   */
  UpdatedRowDuration?: 250 | 500 | 750 | 1000 | 'Always';

  /**
   * Whether the Adaptable Blotter should jump (ie. change its vertical scroll position) so that the updated row is visible.
   *
   * **Default value: false**
   */
  JumpToRow?: boolean;
}
