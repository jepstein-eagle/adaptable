import { IStrategy } from './IStrategy';
import { Expression } from '../../Core/Expression';
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { DistinctCriteriaPairValue } from '../../Core/Enums'
import { IColumn } from '../../Core/Interface/IColumn';


export interface IColumnFilterStrategy extends IStrategy{
}


export interface IColumnFilter  {
    ColumnId: string
    Filter: Expression
}

export interface IColumnFilterContext {
    Column: IColumn,
    Blotter: IAdaptableBlotter,
    ColumnValueType: DistinctCriteriaPairValue
}


   

