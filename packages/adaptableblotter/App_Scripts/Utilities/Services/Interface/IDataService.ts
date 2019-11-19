import { DataChangedInfo } from '../../../BlotterOptions/CommonObjects/DataChangedInfo';
import { IEvent } from '../../Interface/IEvent';

export enum ChangeDirection {
  Up = 'Up',
  Down = 'Down',
  Neutral = 'Neutral',
}

export interface UpdatedRowInfo {
  primaryKeyValue: any;
  changeDirection: ChangeDirection;
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
