import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter'
import { IConfigEntity } from './IAdaptableBlotter'

export interface IFlashingColumn extends IConfigEntity {
    IsLive: boolean,
    ColumnName: string;
    FlashingCellDuration: number;
    UpBackColor : string
    DownBackColor : string
}

export interface IFlashingCellsStrategy extends IStrategy {
}


