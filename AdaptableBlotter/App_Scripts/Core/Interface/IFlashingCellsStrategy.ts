import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { IDataChangedEvent } from '../../Core/Services/Interface/IAuditService'

// TODO: Add colour scheme in due course
export interface IFlashingColumn {
    IsLive: boolean,
    ColumnName: string;
    FlashingCellDuration: IFlashingCellDuration;
}

export interface IFlashingCellDuration{
    Name: string;
    Duration: number;
}

export interface IFlashingCellsStrategy extends IStrategy {
    FlashCell(dataChangedEvent: IDataChangedEvent, flashingColumn: IFlashingColumn): void

}


