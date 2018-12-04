import { EntitlementsState } from './Interface/IState';
import * as Redux from 'redux';
import { IEntitlement } from '../../Api/Interface/Interfaces';
export declare const ENTITLEMENT_ADD_UPDATE = "ENTITLEMENT_ADD_UPDATE";
export declare const ENTITLEMENT_DELETE = "ENTITLEMENT_DELETE";
export interface EntitlementAddUpdateAction extends Redux.Action {
    Index: number;
    Entitlement: IEntitlement;
}
export interface EntitlementDeleteAction extends Redux.Action {
    FunctionName: string;
}
export declare const EntitlementAddUpdate: (Index: number, Entitlement: IEntitlement) => EntitlementAddUpdateAction;
export declare const EntitlementDelete: (FunctionName: string) => EntitlementDeleteAction;
export declare const EntitlementsReducer: Redux.Reducer<EntitlementsState>;
