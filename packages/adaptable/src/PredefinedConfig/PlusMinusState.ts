import { ConfigState } from './ConfigState';
import { QueryObject } from './Common/QueryObject';

export interface PlusMinusState extends ConfigState {
  PlusMinusRules?: PlusMinusRule[];
}

export interface PlusMinusRule extends QueryObject {
  ColumnId: string;
  IsDefaultNudge: boolean;
  NudgeValue: number;
}
