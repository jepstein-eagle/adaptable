import { IEvent } from "../../../Api/Interface/IEvent";
import { IDataChangedEvent, IDataChangingEvent } from "../../../Api/Interface/IDataChanges";

export interface IAuditService {
    CreateAuditChangedEvent(dataChangedEvent: IDataChangedEvent): void;
    CreateAuditEvent(identifierValue: any, NewValue: any, columnId: string, record: any): void;
    OnDataSourceChanged(): IEvent<IAuditService, IDataChangedEvent>;
    Init(initialData: any): void
    getExistingDataValue(dataChangingEvent: IDataChangingEvent): any
}