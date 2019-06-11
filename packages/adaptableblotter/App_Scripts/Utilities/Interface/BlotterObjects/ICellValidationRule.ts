import { Expression } from '../../Expression';
import { IRange } from '../Expression/IRange';
import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
export interface ICellValidationRule extends IAdaptableBlotterObject {
  ColumnId: string;
  Range: IRange;
  ActionMode: 'Warn User' | 'Stop Edit';
  Expression?: Expression;
}
