import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';

export interface PercentBarState extends ConfigState {
  PercentBars?: PercentBar[];
}

export interface PercentBar extends AdaptableObject {
  ColumnId: string;

  Ranges?: PercentBarRange[];

  ShowValue?: boolean;

  ShowToolTip?: boolean;

  DisplayRawValue?: boolean;

  DisplayPercentageValue?: boolean;

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
 * Defines a range used in the Percent Bar function
 *
 * Each range contains a start (min) and end (max) number togetther with a colour
 *
 * A Percent Bar can have an unlimited amount of ranges (but at least one).
 */
export interface PercentBarRange {
  Min: number;
  Max: number;
  Color: string;
}
