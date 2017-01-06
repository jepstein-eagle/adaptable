import { Expression } from '../../Core/Expression/Expression';
import { IAdaptableBlotter, IColumn } from './IAdaptableBlotter';

export interface IColumnFilterStrategy {
}


export interface IColumnFilter {
    ColumnId: string
    Filter: Expression
}

export interface IColumnFilterItem {
    RawValue: string
    DisplayValue: string
    Index: number
}



export interface IColumnFilterContext {
    Container: any;
    Popup: any;
    DataSource: any,
    Column: IColumn,
    Blotter: IAdaptableBlotter
}
