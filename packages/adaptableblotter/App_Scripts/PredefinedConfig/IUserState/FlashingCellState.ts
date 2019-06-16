import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface FlashingCellState extends IUserState {
  FlashingCells?: FlashingCell[];
  DefaultUpColor?: string;
  DefautDownColor?: string;
  DefaultDuration?: 250 | 500 | 750 | 1000;
}

export interface FlashingCell extends IAdaptableBlotterObject {
  IsLive: boolean;
  ColumnId: string;
  FlashingCellDuration: 250 | 500 | 750 | 1000;
  UpColor: string;
  DownColor: string;
}
