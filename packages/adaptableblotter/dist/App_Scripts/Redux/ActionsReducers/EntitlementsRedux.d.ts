import { EntitlementsState } from './Interface/IState';
import * as Redux from 'redux';
import { IEntitlement } from '../../Api/Interface/IAdaptableBlotterObjects';
export declare const ENTITLEMENT_ADD = "ENTITLEMENT_ADD";
export declare const ENTITLEMENT_UPDATE = "ENTITLEMENT_UPDATE";
export declare const ENTITLEMENT_DELETE = "ENTITLEMENT_DELETE";
export interface EntitlementAddAction extends Redux.Action {
    Entitlement: IEntitlement;
}
export interface EntitlementUpdateAction extends Redux.Action {
    Entitlement: IEntitlement;
}
export interface EntitlementDeleteAction extends Redux.Action {
    FunctionName: string;
}
export declare const EntitlementAdd: (Entitlement: IEntitlement) => EntitlementAddAction;
export declare const EntitlementUpdate: (Entitlement: IEntitlement) => EntitlementUpdateAction;
export declare const EntitlementDelete: (FunctionName: string) => EntitlementDeleteAction;
export declare const EntitlementsReducer: Redux.Reducer<EntitlementsState>;
