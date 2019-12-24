import { DataChangedInfo } from '../../../BlotterOptions/CommonObjects/DataChangedInfo';
import { DATA_CHANGED_EVENT } from '../../Constants/GeneralConstants';

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

  on(
    eventName: DATA_CHANGED_EVENT,
    callback: (dataChangedInfo: DataChangedInfo) => void
  ): () => void;
}
