import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { IRange } from '../Common/Expression/IRange';
import { Expression } from '../Common/Expression/Expression';
export interface CellValidationState extends IUserState {
  CellValidations?: CellValidationRule[];
}

export interface CellValidationRule extends IAdaptableBlotterObject {
  ColumnId: string;
  Range: IRange;
  ActionMode: 'Warn User' | 'Stop Edit';
  Expression?: Expression;
}
