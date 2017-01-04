import { INamedExpression } from '../../Core/interface/IExpression';
import { Expression } from '../../Core/Expression/Expression';
import {IAdaptableBlotter, IColumn} from './IAdaptableBlotter';



export interface INamedExpressionStrategy{
        CreateEmptyNamedExpression(): INamedExpression 
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
   

