import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
export interface IFlashingCell extends IAdaptableBlotterObject {
    IsLive: boolean;
    ColumnId: string;
    FlashingCellDuration: number;
    UpColor: string;
    DownColor: string;
}
