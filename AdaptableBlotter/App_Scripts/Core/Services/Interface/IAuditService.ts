import { IEvent } from '../../Interface/IEvent'
import {  ColumnType } from '../../Enums';


export interface IDataChangedEvent {
    OldValue: any;
    NewValue: any;
    ColumnName: string;
    IdentifierValue: any;
    Timestamp: number
}

export interface IColumnDataValueList {
    ColumnName: string;
    CellDataValueList: ICellDataValueList[];
}

export interface ICellDataValueList {
    IdentifierValue: any;
    DataChangedInfos: IDataChangedInfo[],
}

export interface IDataChangedInfo {
    OldValue: any;
    NewValue: any;
    Timestamp: number
}


export interface IAuditService {
    CreateAuditEvent(identifierValue: any, NewValue: any, ColumnName: string, forceDispatch?: boolean): void;
    OnDataSourceChanged(): IEvent<IAuditService, IDataChangedEvent>;
}