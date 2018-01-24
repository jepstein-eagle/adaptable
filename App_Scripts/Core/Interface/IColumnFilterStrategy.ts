import { IUserFilter } from '../../Core/Interface/IExpression';
import { IStrategy } from './IStrategy';
import { Expression } from '../../Core/Expression/Expression';
import { IAdaptableBlotter, IColumn } from './IAdaptableBlotter';
import { DistinctCriteriaPairValue } from '../Enums'


export interface IColumnFilterStrategy extends IStrategy{
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
    Column: IColumn,
    Blotter: IAdaptableBlotter,
    ColumnValueType: DistinctCriteriaPairValue
}


   

