import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { SmartEditOperation } from '../Enums';
import { Expression } from '../Expression/Expression';
import { ICellInfo } from '../Interface/IStrategy';
import { IConfigEntity } from './IAdaptableBlotter'

export interface IPlusMinusStrategy extends IStrategy {
    ApplyPlusMinus(keyEventString: string, newValues: ICellInfo[]): void
}

export interface IPlusMinusCondition extends IConfigEntity{
    ColumnId: string
    DefaultNudge: number
    Expression: Expression
}