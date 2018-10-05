import { IStrategy } from '../../Strategy/Interface/IStrategy'

export interface IAdaptableStrategyCollection extends Map<string, IStrategy> {
}

export interface IEntitlement {
    FunctionName: string;
    AccessLevel: "ReadOnly" | "Hidden" | "Full";
}

export interface ISystemStatus {
    StatusMessage: string;
    StatusColour: "Red" | "Amber" | "Green";
}

export interface IPermittedColumnValues {
    ColumnId: string;
    PermittedValues: any[]
}

export interface IColumnCategory {
    Category: string;
    Columns: string[]
}

export interface ICellInfo {
    Id: any;
    ColumnId: string;
    Value: any;
}

