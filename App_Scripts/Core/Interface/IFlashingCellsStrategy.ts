import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter'
import { IConfigEntity } from './IAdaptableBlotter'

export interface IFlashingColumn extends IConfigEntity {
    IsLive: boolean,
    ColumnName: string;
    FlashingCellDuration: IFlashingCellDuration;
    UpBackColor : string
    DownBackColor : string
}

export interface IFlashingCellDuration {
    Name: string;
    Duration: number;
}

export interface IFlashingCellsStrategy extends IStrategy {
}


