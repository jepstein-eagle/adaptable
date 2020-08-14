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

/*
A collection of IPlusMinusRule objects (see below for more details).

Each object has 4 properties:

ColumnId: The column where the Plus / Minus is applied.

IsDefaultNudge:  Whether its the default Nudge Value for the column (there can only be one for each column).   

NudgeValue:  The value to increment / decrement the column by when the nudge is applied.

Expression: An expression determining whether the nudge will be applied - only used if IsDefaultNudge is false - see Expression Object Config for more information
*/
