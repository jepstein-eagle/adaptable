import { IDataChangedInfo } from "../../../Api/Interface/IDataChangedInfo";
import { IEvent } from "../../Interface/IEvent";

export interface IDataService {
    CreateDataSourcedChangedEvent(dataChangedEvent: IDataChangedInfo): void;
    CreateDataEvent(identifierValue: any, NewValue: any, columnId: string, record: any): void;
    OnDataSourceChanged(): IEvent<IDataService, IDataChangedInfo>;
}