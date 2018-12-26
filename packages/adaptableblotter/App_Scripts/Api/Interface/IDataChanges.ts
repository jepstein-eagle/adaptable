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
    Timestamp: number
}