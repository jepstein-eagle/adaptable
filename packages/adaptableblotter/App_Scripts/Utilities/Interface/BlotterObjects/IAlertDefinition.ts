import { Expression } from '../../Expression';
import { IRange } from '../Expression/IRange';
import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
export interface IAlertDefinition extends IAdaptableBlotterObject {
  ColumnId: string;
  Range: IRange;
  Expression: Expression;
  MessageType: 'Success' | 'Info' | 'Warning' | 'Error';
  ShowAsPopup: boolean;
}
