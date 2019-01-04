import { IStrategy } from '../../Strategy/Interface/IStrategy'

export interface IAdaptableStrategyCollection extends Map<string, IStrategy> {
}

export interface ICellInfo {
    Id: any;
    ColumnId: string;
    Value: any;
}

export interface IVendorGridInfo{
    GroupState: any
    ColumnState: any
}

export interface IMasterChildren{
    Master: any;
    Children: any[]
}

export interface IKeyValuePair {
    Key: string,
    Value: any
}