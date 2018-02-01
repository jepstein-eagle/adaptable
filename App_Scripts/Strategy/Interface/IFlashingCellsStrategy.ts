import {  IStrategy } from './IStrategy';
import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter'

export interface IFlashingColumn extends IConfigEntity {
    IsLive: boolean,
    ColumnName: string;
    FlashingCellDuration: number;
    UpBackColor : string
    DownBackColor : string
}

export interface IFlashingCellsStrategy extends IStrategy {
}


