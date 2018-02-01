import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { Expression } from '../../Core/Expression';
import { ICellInfo } from '../Interface/IStrategy';
import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter'

export interface IPlusMinusStrategy extends IStrategy {
    ApplyPlusMinus(keyEventString: string, newValues: ICellInfo[]): void
}

export interface IPlusMinusCondition extends IConfigEntity{
    ColumnId: string
    DefaultNudge: number
    Expression: Expression
}