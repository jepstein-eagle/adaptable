import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { Expression } from '../Common/Expression/Expression';

export interface PlusMinusState extends RunTimeState {
  PlusMinusRules?: PlusMinusRule[];
}

export interface PlusMinusRule extends AdaptableBlotterObject {
  ColumnId: string;
  IsDefaultNudge: boolean;
  NudgeValue: number;
  Expression?: Expression;
}
