import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { Expression } from '../Common/Expression/Expression';
import { QueryRange } from '../Common/Expression/QueryRange';
export interface CellValidationState extends RunTimeState {
  CellValidations?: CellValidationRule[];
}

export interface CellValidationRule extends AdaptableBlotterObject {
  ColumnId: string;
  Range: QueryRange;
  ActionMode: 'Warn User' | 'Stop Edit';
  Expression?: Expression;
}

/*
A collection of Cell Validations

An ICellValidationRule consists of 4 properties:

ColumnId: The column on which the validation will take place

Range: The rule itself.  It uses the same Range object as in any Query / Expression (see Expression Object Config for more details).

ActionMode: What happens when the validation rule is broken: options are 'Warn User' (which will display a popup) or 'Stop Edit' which will prevent the edit.

Expression: Whether the Cell Validation is additionally dependent on other values in the row.  (See Expression Object Config for more details).
*/
