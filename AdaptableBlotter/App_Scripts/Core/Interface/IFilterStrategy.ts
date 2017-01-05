import { Expression } from '../../Core/Expression/Expression';
import {IAdaptableBlotter, IColumn} from './IAdaptableBlotter';

export interface IFilterStrategy{
}


export interface IColumnFilter {
    ColumnId: string
    Filter: Expression
}

export interface IFilterContext {
    Container: any;
    Popup: any;
    DataSource: any,
    Column: IColumn,
    Blotter: IAdaptableBlotter
}
   

