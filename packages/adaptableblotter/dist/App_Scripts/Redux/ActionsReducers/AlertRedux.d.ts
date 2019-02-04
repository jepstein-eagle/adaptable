import { AlertState } from './Interface/IState';
import * as Redux from 'redux';
import { IAlertDefinition } from "../../Utilities/Interface/BlotterObjects/IAlertDefinition";
import { MessageType } from '../../Utilities/Enums';
export declare const ALERT_DEFIINITION_ADD_UPDATE = "ALERT_DEFIINITION_ADD_UPDATE";
export declare const ALERT_DEFIINITION_DELETE = "ALERT_DEFIINITION_DELETE";
export declare const ALERT_DEFIINITION_SELECT = "ALERT_DEFIINITION_SELECT";
export declare const ALERT_DEFIINITION_CHANGE_ALERT_TYPE = "ALERT_DEFIINITION_CHANGE_ALERT_TYPE";
export interface AlertDefinitionAddUpdateAction extends Redux.Action {
    index: number;
    alertDefinition: IAlertDefinition;
}
export interface AlertDefinitionDeleteAction extends Redux.Action {
    index: number;
}
export interface AlertDefinitionChangeMessageTypeAction extends Redux.Action {
    index: number;
    messageType: MessageType;
}
export declare const AlertDefinitionAddUpdate: (index: number, alertDefinition: IAlertDefinition) => AlertDefinitionAddUpdateAction;
export declare const AlertDefinitionDelete: (index: number) => AlertDefinitionDeleteAction;
export declare const AlertDefinitionChangeMessageType: (index: number, messageType: MessageType) => AlertDefinitionChangeMessageTypeAction;
export declare const AlertReducer: Redux.Reducer<AlertState>;
