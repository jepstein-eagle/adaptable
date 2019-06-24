import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
export interface PercentBarState extends RunTimeState {
  PercentBars?: PercentBar[];
}

export interface PercentBar extends AdaptableBlotterObject {
  ColumnId: string;
  MinValue?: number;
  MaxValue?: number;
  PositiveColor: string;
  NegativeColor: string;
  ShowValue: boolean;
  MaxValueColumnId?: string;
  MinValueColumnId?: string;
}

/*
A collection of IPercentBar objects (see below for more details).

Each Percent Bar object contains a ColumnId, Minimum and Maximum values, and Positive and Negative Colours.

*/
