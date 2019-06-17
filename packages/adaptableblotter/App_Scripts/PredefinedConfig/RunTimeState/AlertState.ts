import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { Expression } from '../Common/Expression/Expression';
import { QueryRange } from '../Common/Expression/QueryRange';
export interface AlertState extends RunTimeState {
  AlertDefinitions?: AlertDefinition[];
  MaxAlertsInStore?: number;
  AlertPopupDiv?: string;
}

export interface AlertDefinition extends AdaptableBlotterObject {
  ColumnId: string;
  Range: QueryRange;
  Expression?: Expression;
  MessageType: 'Success' | 'Info' | 'Warning' | 'Error';
  ShowAsPopup: boolean;
}
