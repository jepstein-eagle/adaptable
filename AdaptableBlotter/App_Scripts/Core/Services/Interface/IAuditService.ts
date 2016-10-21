import {IEvent} from '../../Interface/IEvent'


export interface IDataChangedEvent {
    OldValue: any;
    NewValue: any;
    ColumnName: string;
    IdentifierValue: any;
}

export interface IColumnDataValueList{
    ColumnName: string;
    DataValues : IDataValue[];
}

export interface IDataValue {
    OldValue: any;
    NewValue: any;
    IdentifierValue: any; 
}



export interface IAuditService {
     CreateAuditEvent(identifierValue: any,  NewValue: any, ColumnName :string): void;
    OnDataSourceChanged(): IEvent<IAuditService, IDataChangedEvent>;
}