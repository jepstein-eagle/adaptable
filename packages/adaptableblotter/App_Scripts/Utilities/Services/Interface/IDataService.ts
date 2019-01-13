import { IEvent } from "../../../Api/Interface/IEvent";
import { IDataChangedInfo } from "../../../Api/Interface/IDataChangedInfo";

export interface IDataService {
  CreateDataChangedEvent(dataChangedInfo: IDataChangedInfo): void;
  OnDataSourceChanged(): IEvent<IDataService, IDataChangedInfo>;
  GetPreviousColumnValue(columnId: string, identifierValue: any, newValue: number): number;
}