import { AlertState } from './Interface/IState';
import * as Redux from 'redux';
import { IAlertDefinition } from '../../Core/Api/Interface/AdaptableBlotterObjects';
import { MessageType } from '../../Core/Enums';
import { IAlert } from '../../Core/Interface/IMessage';
export declare const ALERT_DEFIINITION_ADD_UPDATE = "ALERT_DEFIINITION_ADD_UPDATE";
export declare const ALERT_DEFIINITION_DELETE = "ALERT_DEFIINITION_DELETE";
export declare const ALERT_DEFIINITION_SELECT = "ALERT_DEFIINITION_SELECT";
export declare const ALERT_DEFIINITION_CHANGE_ALERT_TYPE = "ALERT_DEFIINITION_CHANGE_ALERT_TYPE";
export declare const ALERT_ADD = "ALERT_ADD";
export declare const ALERT_DELETE = "ALERT_DELETE";
export declare const ALERT_DELETE_ALL = "ALERT_DELETE_ALL";
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
export interface AlertAddAction extends Redux.Action {
    Alert: IAlert;
}
export interface AlertDeleteAction extends Redux.Action {
    Index: number;
}
export interface AlertDeleteAllAction extends Redux.Action {
}
export declare const AlertDefinitionAddUpdate: (Index: number, AlertDefinition: IAlertDefinition) => AlertDefinitionAddUpdateAction;
export declare const AlertDefinitionDelete: (Index: number) => AlertDefinitionDeleteAction;
export declare const AlertDefinitionChangeMessageType: (Index: number, MessageType: MessageType) => AlertDefinitionChangeMessageTypeAction;
export declare const AlertAdd: (Alert: IAlert) => AlertAddAction;
export declare const AlertDelete: (Index: number) => AlertDeleteAction;
export declare const AlertDeleteAll: () => AlertDeleteAllAction;
export declare const AlertReducer: Redux.Reducer<AlertState>;
