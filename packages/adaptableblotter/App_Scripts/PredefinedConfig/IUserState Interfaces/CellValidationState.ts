import { IUserState } from '../Interfaces/IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { IRange } from '../Common Objects/Expression/IRange';
import { Expression } from '../Common Objects/Expression/Expression';
export interface CellValidationState extends IUserState {
  CellValidations?: ICellValidationRule[];
}

export interface ICellValidationRule extends IAdaptableBlotterObject {
  ColumnId: string;
  Range: IRange;
  ActionMode: 'Warn User' | 'Stop Edit';
  Expression?: Expression;
}
