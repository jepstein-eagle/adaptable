import {  IStrategy } from './IStrategy';
import { IAdaptableBlotterObject } from '../../Core/Interface/Interfaces';

export interface IFlashingColumn extends IAdaptableBlotterObject {
    IsLive: boolean,
    ColumnName: string;
    FlashingCellDuration: number;
    UpBackColor : string
    DownBackColor : string
}

export interface IFlashingCellsStrategy extends IStrategy {
}


