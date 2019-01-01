import * as EntitlementsRedux from '../Redux/ActionsReducers/EntitlementsRedux'
import { IEntitlement } from "./Interface/Interfaces";
import { ApiBase } from "./ApiBase";

export interface IEntitlementApi {

   // Entitlement Methods
   entitlementGetAll(): IEntitlement[]
   entitlementGetByFunction(functionName: string): IEntitlement
   entitlementGetAccessLevelForFunction(functionName: string): string
   entitlementAddOrUpdate(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Full"): void
   entitlementDelete(functionName: string): void

}


export class EntitlementApi extends ApiBase implements IEntitlementApi {

     

  // Entitlement Methods
  public entitlementGetAll(): IEntitlement[] {
    return this.getState().Entitlements.FunctionEntitlements;
  }

  public entitlementGetByFunction(functionName: string): IEntitlement {
    return this.getState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName);
  }

  public entitlementGetAccessLevelForFunction(functionName: string): string {
    return this.getState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName).AccessLevel;
  }

  public entitlementAddOrUpdate(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Full"): void {
    let entitlement: IEntitlement = { FunctionName: functionName, AccessLevel: accessLevel }
    this.dispatchAction(EntitlementsRedux.EntitlementAddUpdate(-1, entitlement))
  }

  public entitlementDelete(functionName: string): void {
    this.dispatchAction(EntitlementsRedux.EntitlementDelete(functionName))
  }



}