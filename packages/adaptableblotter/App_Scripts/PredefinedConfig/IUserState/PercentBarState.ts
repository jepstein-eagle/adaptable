import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface PercentBarState extends IUserState {
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
