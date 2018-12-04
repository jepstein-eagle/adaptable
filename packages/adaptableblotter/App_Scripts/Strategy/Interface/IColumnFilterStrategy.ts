import { IStrategy } from './IStrategy';
import { IAdaptableBlotter } from '../../Api/Interface/IAdaptableBlotter';
import { IColumn } from '../../Api/Interface/IColumn';

export interface IColumnFilterStrategy extends IStrategy {
}

export interface IColumnFilterContext {
    Column: IColumn,
    Blotter: IAdaptableBlotter,
    ShowCloseButton: boolean, 
   }




