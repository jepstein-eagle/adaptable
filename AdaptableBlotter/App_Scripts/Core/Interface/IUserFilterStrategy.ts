import { IUserFilterExpression } from '../../Core/interface/IExpression';
import { Expression } from '../../Core/Expression/Expression';
import {IAdaptableBlotter, IColumn} from './IAdaptableBlotter';



export interface IUserFilterStrategy{
        CreateEmptyUserFilterExpression(): IUserFilterExpression 
}



   

