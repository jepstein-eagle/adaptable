import { IDataChangedInfo } from '../../Interface/IDataChangedInfo';
import { IEvent } from '../../Interface/IEvent';
import { IStateChangedArgs } from '../DataService';

export enum ChangeDirection {
  Up = 'Up',
  Down = 'Down',
  Ignore = 'Ignore',
}

export interface IDataService {
  CreateDataChangedEvent(dataChangedInfo: IDataChangedInfo): void;
  OnDataSourceChanged(): IEvent<IDataService, IDataChangedInfo>;
  GetPreviousColumnValue(
    columnId: string,
    identifierValue: any,
    newValue: number,
    changeDirection: ChangeDirection
  ): number;

  OnStateChanged(): IEvent<IDataService, IStateChangedArgs>;
}
