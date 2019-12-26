import * as EntitlementsRedux from '../../Redux/ActionsReducers/EntitlementsRedux';
import { ApiBase } from './ApiBase';
import { EntitlementApi } from '../EntitlementApi';
import { EntitlementState, Entitlement } from '../../PredefinedConfig/EntitlementState';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export class EntitlementApiImpl extends ApiBase implements EntitlementApi {
  public getEntitlementState(): EntitlementState {
    return this.getBlotterState().Entitlements;
  }

  public getAllEntitlement(): Entitlement[] {
    return this.getBlotterState().Entitlements.FunctionEntitlements;
  }

  public getEntitlementByFunctionName(functionName: AdaptableFunctionName): Entitlement {
    return this.getBlotterState().Entitlements.FunctionEntitlements.find(
      f => f.FunctionName == functionName
    );
  }

  public getEntitlementAccessLevelForFunctionName(functionName: AdaptableFunctionName): string {
    return this.getBlotterState().Entitlements.FunctionEntitlements.find(
      f => f.FunctionName == functionName
    ).AccessLevel;
  }

  public addEntitlement(
    functionName: AdaptableFunctionName,
    accessLevel: 'ReadOnly' | 'Hidden' | 'Full'
  ): void {
    let entitlement: Entitlement = { FunctionName: functionName, AccessLevel: accessLevel };
    this.dispatchAction(EntitlementsRedux.EntitlementAdd(entitlement));
  }

  public editEntitlement(
    functionName: AdaptableFunctionName,
    accessLevel: 'ReadOnly' | 'Hidden' | 'Full'
  ): void {
    let entitlement: Entitlement = { FunctionName: functionName, AccessLevel: accessLevel };
    this.dispatchAction(EntitlementsRedux.EntitlementUpdate(entitlement));
  }

  public deleteEntitlement(functionName: AdaptableFunctionName): void {
    this.dispatchAction(EntitlementsRedux.EntitlementDelete(functionName));
  }
}
