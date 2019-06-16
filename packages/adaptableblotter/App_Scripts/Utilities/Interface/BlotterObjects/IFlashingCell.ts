import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
export interface IFlashingCell extends IAdaptableBlotterObject {
  IsLive: boolean;
  ColumnId: string;
  FlashingCellDuration: 250 | 500 | 750 | 1000;
  UpColor: string;
  DownColor: string;
}
