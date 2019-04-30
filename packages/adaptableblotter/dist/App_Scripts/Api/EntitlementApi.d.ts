import { ApiBase } from "./ApiBase";
import { IEntitlementApi } from './Interface/IEntitlementApi';
import { IEntitlement } from "../Utilities/Interface/IEntitlement";
import { EntitlementsState } from '../Redux/ActionsReducers/Interface/IState';
export declare class EntitlementApi extends ApiBase implements IEntitlementApi {
    getEntitlementState(): EntitlementsState;
    getAllEntitlement(): IEntitlement[];
    getEntitlementByFunction(functionName: string): IEntitlement;
    getEntitlementAccessLevelForFunction(functionName: string): string;
    addEntitlement(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Full"): void;
    editEntitlement(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Full"): void;
    deleteEntitlement(functionName: string): void;
}
