import { Expression } from '../../Expression';
import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
export interface IPlusMinusRule extends IAdaptableBlotterObject {
  ColumnId: string;
  IsDefaultNudge: boolean;
  NudgeValue: number;
  Expression: Expression;
}
