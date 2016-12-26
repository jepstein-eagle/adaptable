import {  IColumn } from '../../Interface/IAdaptableBlotter';

import { INamedExpression } from '../../Interface/IExpression';


export interface IExpressionService {
    GetNamedExpressions(): Array<INamedExpression>
    EvaluateExpression(expressionId: string, valueToCheck: any): boolean
     ShouldShowNamedExpressionForColumn(namedExpression: INamedExpression, column: IColumn):boolean

}