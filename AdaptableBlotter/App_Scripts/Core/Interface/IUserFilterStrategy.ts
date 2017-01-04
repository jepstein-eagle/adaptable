import { IUserFilter } from '../../Core/interface/IExpression';
import { Expression } from '../../Core/Expression/Expression';
import {IAdaptableBlotter, IColumn} from './IAdaptableBlotter';



export interface IUserFilterStrategy{
        CreateEmptyUserFilter(): IUserFilter 
}



   

