import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
export interface PercentBarState extends RunTimeState {
  PercentBars?: PercentBar[];
}

export interface PercentBar extends AdaptableObject {
  ColumnId: string;
  MinValue?: number;
  MaxValue?: number;
  PositiveColor: string;
  NegativeColor: string;
  ShowValue?: boolean;
  MaxValueColumnId?: string;
  MinValueColumnId?: string;

  /**
   * Whether to display a tooltip that will appear when you hover over the column showing the cell's numeric value.
   */
  ShowToolTip?: boolean;
}

/*
A collection of IPercentBar objects (see below for more details).

Each Percent Bar object contains a ColumnId, Minimum and Maximum values, and Positive and Negative Colours.

*/
