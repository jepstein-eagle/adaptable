import { IStrategy } from './IStrategy';
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { DistinctCriteriaPairValue } from '../../Core/Enums'
import { IColumn } from '../../Core/Interface/IColumn';


export interface IColumnFilterStrategy extends IStrategy {
}



export interface IColumnFilterContext {
    Column: IColumn,
    Blotter: IAdaptableBlotter,
}




