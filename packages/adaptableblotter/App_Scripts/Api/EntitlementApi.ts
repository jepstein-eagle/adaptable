import * as EntitlementsRedux from '../Redux/ActionsReducers/EntitlementsRedux'
import { ApiBase } from "./ApiBase";
import { IEntitlementApi } from './Interface/IEntitlementApi';
import { IEntitlement } from "../Utilities/Interface/IEntitlement";
import { EntitlementsState } from '../Redux/ActionsReducers/Interface/IState';


export class EntitlementApi extends ApiBase implements IEntitlementApi {

  
  public GetState(): EntitlementsState {
    return this.getBlotterState().Entitlements;
}

public GetAll(): IEntitlement[] {
    return this.getBlotterState().Entitlements.FunctionEntitlements;
  }

  public GetByFunction(functionName: string): IEntitlement {
    return this.getBlotterState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName);
  }

  public GetAccessLevelForFunction(functionName: string): string {
    return this.getBlotterState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName).AccessLevel;
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