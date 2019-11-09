import * as EntitlementsRedux from '../../Redux/ActionsReducers/EntitlementsRedux';
import { ApiBase } from './ApiBase';
import { EntitlementApi } from '../EntitlementApi';
import { EntitlementsState, Entitlement } from '../../PredefinedConfig/EntitlementsState';

export class EntitlementApiImpl extends ApiBase implements EntitlementApi {
  public getEntitlementState(): EntitlementsState {
    return this.getBlotterState().Entitlements;
  }

  public getAllEntitlement(): Entitlement[] {
    return this.getBlotterState().Entitlements.FunctionEntitlements;
  }

  public getEntitlementByFunction(functionName: string): Entitlement {
    return this.getBlotterState().Entitlements.FunctionEntitlements.find(
      f => f.FunctionName == functionName
    );
  }

  public getEntitlementAccessLevelForFunction(functionName: string): string {
    return this.getBlotterState().Entitlements.FunctionEntitlements.find(
      f => f.FunctionName == functionName
    ).AccessLevel;
  }

  public addEntitlement(functionName: string, accessLevel: 'ReadOnly' | 'Hidden' | 'Full'): void {
    let entitlement: Entitlement = { FunctionName: functionName, AccessLevel: accessLevel };
    this.dispatchAction(EntitlementsRedux.EntitlementAdd(entitlement));
  }

  public editEntitlement(functionName: string, accessLevel: 'ReadOnly' | 'Hidden' | 'Full'): void {
    let entitlement: Entitlement = { FunctionName: functionName, AccessLevel: accessLevel };
    this.dispatchAction(EntitlementsRedux.EntitlementUpdate(entitlement));
  }

  public deleteEntitlement(functionName: string): void {
    this.dispatchAction(EntitlementsRedux.EntitlementDelete(functionName));
  }
}
