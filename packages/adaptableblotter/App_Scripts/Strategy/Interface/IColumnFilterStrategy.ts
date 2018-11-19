import { IStrategy } from './IStrategy';
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { IColumn } from '../../Core/Interface/IColumn';
import { DistinctCriteriaPairValue } from '../../Core/Enums';

export interface IColumnFilterStrategy extends IStrategy {
}

export interface IColumnFilterContext {
    Column: IColumn,
    Blotter: IAdaptableBlotter,
    ShowCloseButton: boolean, 
    DistinctCriteriaPairValue: DistinctCriteriaPairValue
}




