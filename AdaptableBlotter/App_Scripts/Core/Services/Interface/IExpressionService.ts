
import {  IExpressionFilter } from '../../Interface/IExpression';


export interface IExpressionService {
    GetFilterExpressions(): Array<IExpressionFilter> 
}