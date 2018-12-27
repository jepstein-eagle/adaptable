import { IEvent } from "../../../Api/Interface/IEvent";
import { IDataChangedInfo } from "../../../Api/Interface/IDataChangedInfo";
export interface IDataService {
    CreateDataSourcedChangedEvent(dataChangedEvent: IDataChangedInfo): void;
    CreateDataEvent(identifierValue: any, NewValue: any, columnId: string, record: any): void;
    OnDataSourceChanged(): IEvent<IDataService, IDataChangedInfo>;
}
