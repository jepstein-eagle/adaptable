import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { IDataChangedEvent } from '../../Core/Services/Interface/IAuditService'
import { FlashingCellDuration } from '../Enums';

// TODO: Add colour scheme in due course
export interface IFlashingColumn {
    IsLive: boolean,
    ColumnName: string;
    FlashingCellDuration: FlashingCellDuration;
}

export interface IFlashingCellsStrategy extends IStrategy {
    FlashCell(dataChangedEvent: IDataChangedEvent, flashingColumn: IFlashingColumn): void
}


