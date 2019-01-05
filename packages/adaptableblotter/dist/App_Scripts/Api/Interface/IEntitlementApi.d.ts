import { IEntitlement } from "./IAdaptableBlotterObjects";
export interface IEntitlementApi {
    GetAll(): IEntitlement[];
    GetByFunction(functionName: string): IEntitlement;
    GetAccessLevelForFunction(functionName: string): string;
    Add(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Full"): void;
    Edit(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Full"): void;
    Delete(functionName: string): void;
}
