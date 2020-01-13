import { DataChangedInfo } from '../../../AdaptableOptions/CommonObjects/DataChangedInfo';

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
  GetPreviousColumnValue(
    columnId: string,
    identifierValue: any,
    newValue: number,
    changeDirection: ChangeDirection
  ): number;

  on(eventName: 'DataChanged', callback: (dataChangedInfo: DataChangedInfo) => void): () => void;
}
