import { IStrategy } from './IStrategy';
import { IAdaptableBlotter } from '../../Utilities/Interface/IAdaptableBlotter';
import { IColumn } from '../../Utilities/Interface/IColumn';

export interface IColumnFilterStrategy extends IStrategy {
}

export interface IColumnFilterContext {
    Column: IColumn,
    Blotter: IAdaptableBlotter,
    ShowCloseButton: boolean, 
   }




