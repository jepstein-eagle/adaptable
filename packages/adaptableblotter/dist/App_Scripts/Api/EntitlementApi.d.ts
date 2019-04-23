import { ApiBase } from "./ApiBase";
import { IEntitlementApi } from './Interface/IEntitlementApi';
import { IEntitlement } from "../Utilities/Interface/IEntitlement";
import { EntitlementsState } from '../Redux/ActionsReducers/Interface/IState';
export declare class EntitlementApi extends ApiBase implements IEntitlementApi {
    GetState(): EntitlementsState;
    GetAll(): IEntitlement[];
    GetByFunction(functionName: string): IEntitlement;
    GetAccessLevelForFunction(functionName: string): string;
    Add(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Full"): void;
    Edit(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Full"): void;
    Delete(functionName: string): void;
}
