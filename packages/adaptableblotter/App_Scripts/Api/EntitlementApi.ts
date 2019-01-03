import * as EntitlementsRedux from '../Redux/ActionsReducers/EntitlementsRedux'
import { IEntitlement } from "./Interface/Interfaces";
import { ApiBase } from "./ApiBase";
import { IEntitlementApi } from './Interface/IEntitlementApi';


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

  public Add(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Full"): void {
    let entitlement: IEntitlement = { FunctionName: functionName, AccessLevel: accessLevel }
    this.dispatchAction(EntitlementsRedux.EntitlementAdd(entitlement))
  }

  public Edit(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Full"): void {
    let entitlement: IEntitlement = { FunctionName: functionName, AccessLevel: accessLevel }
    this.dispatchAction(EntitlementsRedux.EntitlementUpdate(entitlement))
  }

  public Delete(functionName: string): void {
    this.dispatchAction(EntitlementsRedux.EntitlementDelete(functionName))
  }

}