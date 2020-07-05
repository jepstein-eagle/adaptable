import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';

/**
 * The Predefined Configuration for the Percent Bar Function
 *
 * Percent Bars allow you to colour and fill cells in a column based on the cell value as a proportion of the column's maximum values.
 *
 * They can also include a `PercentBarRange` collection, which allow for different colours in the Percent Bar based upon which range the cell value lies.*
 */
export interface PercentBarState extends ConfigState {
  PercentBars?: PercentBar[];
}

/**
 * The `PercentBar` object used in the PercentBar function.
 *
 *  See [Percent Bar State](_src_predefinedconfig_percentbarstate_.percentbarstate.html) for full information on how to create Percent Bars and links to other relevant AdapTable help resources.
 *
 */
export interface PercentBar extends AdaptableObject {
  /**
   * The Column for which the Percent Bar should be applied
   */
  ColumnId: string;

  /**
   * Any Ranges in the Percent Bar (e.g. to allow a traffic light effect)
   *
   * Note: if no Ranges are supplied then AdapTable will create a default one when it first loads
   */
  Ranges?: PercentBarRange[];

  /**
   * Whether to display a value in the cell in addition to the Percent Bar
   *
   * Default Value: false
   */
  ShowValue?: boolean;

  /**
   * Whether to display a tooltip when the mouse hovers over a cell in the Percent Bar
   *
   *  Default Value: true
   */
  ShowToolTip?: boolean;

  /**
   * Whether to display the actual cell value
   *
   * Only used if either `ShowValue` or `ShowToolTip` are set to true
   */
  DisplayRawValue?: boolean;

  /**
   * Whether to display the cell value as a percentage of the Percent Bar's maximum value (calculated by getting the `Max` property value from the highest Range))
   *
   * Only used if either `ShowValue` or `ShowToolTip` are set to true
   */
  DisplayPercentageValue?: boolean;

  /**
   * The back colour to show for the Percent Bar - useful for setting off the value visually
   *
   * Leave unset if no back colour is required for the Percent Bar
   *
   * Default value: Gray
   */
  BackColor?: string;

  /**
   * Deprecated property - no longer used
   *
   * Has been rplaced with a `PercentBarRamge`
   */
  NegativeValue?: number;
  /**
   * Deprecated property - no longer used
   *
   * Has been rplaced with a `PercentBarRamge`
   */

  PositiveValue?: number;
  /**
   * Deprecated property - no longer used
   *
   * Has been rplaced with a `PercentBarRamge`
   */

  NegativeColor?: string;
  /**
   * Deprecated property - no longer used
   *
   * Has been rplaced with a `PercentBarRamge`
   */

  PositiveColor?: string;
  /**
   * Deprecated property - no longer used
   *
   * Has been rplaced with a `PercentBarRamge`
   */

  PositiveValueColumnId?: string;
  /**
   * Deprecated property - no longer used
   *
   * Has been rplaced with a `PercentBarRamge`
   */

  NegativeValueColumnId?: string;
}

/**
 * Defines a 'Range' used in the Percent Bar function
 *
 * Each range contains a start (min) and end (max) number togetther with a colour
 *
 * A Percent Bar can have an unlimited amount of ranges (but at least one).
 */
export interface PercentBarRange {
  /**
   * The start number of the `PercentBarRange`
   */
  Min: number;

  /**
   * The end number of the `PercentBarRange`
   */
  Max: number;

  /**
   * The cell colour to use for any values that fall inside the `PercentBarRange`
   */
  Color: string;
}
