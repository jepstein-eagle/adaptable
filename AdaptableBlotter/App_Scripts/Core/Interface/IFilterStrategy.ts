import { INamedExpression } from '../../Core/interface/IExpression';
import { Expression } from '../../Core/Expression/Expression';
import {IAdaptableBlotter} from './IAdaptableBlotter';

// This is not the full filter strategy in the sense that we are not doing filters
// For now all we are doing is creating NamedExpressions that we can persist and then use in other Expressions


export interface IFilterStrategy{
        CreateEmptyFilter(): INamedExpression 
}


export interface IColumnFilter {
    ColumnId: string
    Filter: Expression
}

export interface IFilterContext {
    Container: any;
    Popup: any;
    DataSource: any,
    ColumnId: string,
    Blotter: IAdaptableBlotter
}
   

