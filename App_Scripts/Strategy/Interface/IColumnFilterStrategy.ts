import { IUserFilter } from '../../Core/Interface/IExpression';
import { IStrategy } from './IStrategy';
import { Expression } from '../../Core/Expression';
import { IAdaptableBlotter, IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { DistinctCriteriaPairValue } from '../../Core/Enums'
import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter'


export interface IColumnFilterStrategy extends IStrategy{
}


export interface IColumnFilter  {
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


   

