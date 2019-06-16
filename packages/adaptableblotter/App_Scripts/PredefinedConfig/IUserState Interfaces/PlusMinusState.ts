import { IUserState } from '../Interfaces/IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { Expression } from '../Common Objects/Expression/Expression';
export interface PlusMinusState extends IUserState {
  PlusMinusRules?: IPlusMinusRule[];
}

export interface IPlusMinusRule extends IAdaptableBlotterObject {
  ColumnId: string;
  IsDefaultNudge: boolean;
  NudgeValue: number;
  Expression?: Expression;
}
