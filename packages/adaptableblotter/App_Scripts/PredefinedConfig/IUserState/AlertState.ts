import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { IRange } from '../Common/Expression/IRange';
import { Expression } from '../Common/Expression/Expression';
export interface AlertState extends IUserState {
  AlertDefinitions?: AlertDefinition[];
  MaxAlertsInStore?: number;
  AlertPopupDiv?: string;
}

export interface AlertDefinition extends IAdaptableBlotterObject {
  ColumnId: string;
  Range: IRange;
  Expression?: Expression;
  MessageType: 'Success' | 'Info' | 'Warning' | 'Error';
  ShowAsPopup: boolean;
}
