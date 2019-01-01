import * as EntitlementsRedux from '../Redux/ActionsReducers/EntitlementsRedux'
import { IEntitlement } from "./Interface/Interfaces";
import { ApiBase } from "./ApiBase";

export interface IEntitlementApi {

  GetAll(): IEntitlement[]
  GetByFunction(functionName: string): IEntitlement
  GetAccessLevelForFunction(functionName: string): string
  AddOrUpdate(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Full"): void
  Delete(functionName: string): void

}


export class EntitlementApi extends ApiBase implements IEntitlementApi {


  public GetAll(): IEntitlement[] {
    return this.getState().Entitlements.FunctionEntitlements;
  }

  public GetByFunction(functionName: string): IEntitlement {
    return this.getState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName);
  }

  public GetAccessLevelForFunction(functionName: string): string {
    return this.getState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName).AccessLevel;
  }

  public AddOrUpdate(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Full"): void {
    let entitlement: IEntitlement = { FunctionName: functionName, AccessLevel: accessLevel }
    this.dispatchAction(EntitlementsRedux.EntitlementAddUpdate(-1, entitlement))
  }

  public Delete(functionName: string): void {
    this.dispatchAction(EntitlementsRedux.EntitlementDelete(functionName))
  }



}