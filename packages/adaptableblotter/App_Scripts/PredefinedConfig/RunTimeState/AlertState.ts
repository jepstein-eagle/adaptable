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

/*
AlertPopupDiv

string

The name of the <div> you want your alerts to display.  

Leave blank if you want them to show using the main Adaptable Blotter popup. 

Note
This property is only used if the Alert itself has showAsPopup set to true.

AlertDefinitions

IAlertDefinition array

A collection of Alert Definitions - which will trigger Alerts when their condition is met

An IAlertDefinition consists of 4 properties:

ColumnId: Which column change will trigger the alert

Range: The Range of the Alert (see Expression Object Config for more information on Ranges).

Message Type: Type of the Alert - set to one of "Info", "Warning" or "Error".

Expression: An optional expression which needs to be satisfied before the Alert can be triggered (see Expression Object Config for more information).

MaxAlertsInStore

string

How many alerts to hold at any one time.  If you hit this limit then we start to remove the oldest alerts.

*/
