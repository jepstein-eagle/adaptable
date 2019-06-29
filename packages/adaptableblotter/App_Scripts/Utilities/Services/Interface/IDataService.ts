import { DataChangedInfo } from '../../Interface/DataChangedInfo';
import { IEvent } from '../../Interface/IEvent';

export enum ChangeDirection {
  Up = 'Up',
  Down = 'Down',
  Ignore = 'Ignore',
}

export interface IDataService {
  CreateDataChangedEvent(dataChangedInfo: DataChangedInfo): void;
  OnDataSourceChanged(): IEvent<IDataService, DataChangedInfo>;
  GetPreviousColumnValue(
    columnId: string,
    identifierValue: any,
    newValue: number,
    changeDirection: ChangeDirection
  ): number;
}
