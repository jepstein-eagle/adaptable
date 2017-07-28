import { IEvent } from '../../Interface/IEvent'
import { ICellValidationRule } from '../../Interface/ICellValidationStrategy';


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

export interface IColumnDataValueList {
    ColumnName: string;
    CellDataValueList: ICellDataValueList[];
}

export interface ICellDataValueList {
    IdentifierValue: any;
    DataChangedInfo: IDataChangedInfo,
}

export interface IDataChangedInfo {
    OldValue: any;
    NewValue: any;
    Timestamp: number
}


export interface IAuditService {
    CreateAuditEvent(identifierValue: any, NewValue: any, ColumnName: string, record: any): void;
    OnDataSourceChanged(): IEvent<IAuditService, IDataChangedEvent>;
    CheckCellChanging(dataChangingEvent: IDataChangingEvent): ICellValidationRule[]
    Init(initialData : any) : void

}