import {  IStrategy } from './IStrategy';
import { IAdaptableBlotterObject } from '../../Core/Interface/Interfaces';

export interface IFlashingCell extends IAdaptableBlotterObject {
    IsLive: boolean,
    ColumnName: string;
    FlashingCellDuration: number;
    UpBackColor : string
    DownBackColor : string
}

export interface IFlashingCellsStrategy extends IStrategy {
}


