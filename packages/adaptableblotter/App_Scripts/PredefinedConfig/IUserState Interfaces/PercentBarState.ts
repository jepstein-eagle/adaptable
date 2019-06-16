import { IUserState } from '../Interfaces/IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface PercentBarState extends IUserState {
  PercentBars?: IPercentBar[];
}

export interface IPercentBar extends IAdaptableBlotterObject {
  ColumnId: string;
  MinValue?: number;
  MaxValue?: number;
  PositiveColor: string;
  NegativeColor: string;
  ShowValue: boolean;
  MaxValueColumnId?: string;
  MinValueColumnId?: string;
}
