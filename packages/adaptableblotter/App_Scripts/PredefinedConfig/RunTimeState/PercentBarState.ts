import { RunTimeState } from './RunTimeState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface PercentBarState extends RunTimeState {
  PercentBars?: PercentBar[];
}

export interface PercentBar extends IAdaptableBlotterObject {
  ColumnId: string;
  MinValue?: number;
  MaxValue?: number;
  PositiveColor: string;
  NegativeColor: string;
  ShowValue: boolean;
  MaxValueColumnId?: string;
  MinValueColumnId?: string;
}
