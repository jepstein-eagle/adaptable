import { AlertState } from './Interface/IState';
import * as Redux from 'redux';
import { IAlertDefinition } from '../../Api/Interface/IAdaptableBlotterObjects';
import { MessageType } from '../../Core/Enums';
export declare const ALERT_DEFIINITION_ADD_UPDATE = "ALERT_DEFIINITION_ADD_UPDATE";
export declare const ALERT_DEFIINITION_DELETE = "ALERT_DEFIINITION_DELETE";
export declare const ALERT_DEFIINITION_SELECT = "ALERT_DEFIINITION_SELECT";
export declare const ALERT_DEFIINITION_CHANGE_ALERT_TYPE = "ALERT_DEFIINITION_CHANGE_ALERT_TYPE";
export interface AlertDefinitionAddUpdateAction extends Redux.Action {
    Index: number;
    AlertDefinition: IAlertDefinition;
}
export interface AlertDefinitionDeleteAction extends Redux.Action {
    Index: number;
}
export interface AlertDefinitionChangeMessageTypeAction extends Redux.Action {
    Index: number;
    MessageType: MessageType;
}
export declare const AlertDefinitionAddUpdate: (Index: number, AlertDefinition: IAlertDefinition) => AlertDefinitionAddUpdateAction;
export declare const AlertDefinitionDelete: (Index: number) => AlertDefinitionDeleteAction;
export declare const AlertDefinitionChangeMessageType: (Index: number, MessageType: MessageType) => AlertDefinitionChangeMessageTypeAction;
export declare const AlertReducer: Redux.Reducer<AlertState>;
