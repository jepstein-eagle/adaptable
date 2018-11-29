import { IEvent } from "../../../api/Interface/IEvent";
export interface IDataChangingEvent {
    NewValue: any;
    ColumnId: string;
    IdentifierValue: any;
}
export interface IDataChangedEvent {
    OldValue: any;
    NewValue: any;
    ColumnId: string;
    IdentifierValue: any;
    Timestamp: number;
    Record: any;
}
export interface IDataChangedInfo {
    OldValue: any;
    NewValue: any;
    Timestamp: number;
}
export interface IAuditService {
    CreateAuditChangedEvent(dataChangedEvent: IDataChangedEvent): void;
    CreateAuditEvent(identifierValue: any, NewValue: any, columnId: string, record: any): void;
    OnDataSourceChanged(): IEvent<IAuditService, IDataChangedEvent>;
    Init(initialData: any): void;
    getExistingDataValue(dataChangingEvent: IDataChangingEvent): any;
}
