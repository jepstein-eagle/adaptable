import * as EntitlementsRedux from '../../Redux/ActionsReducers/EntitlementsRedux';
import { ApiBase } from './ApiBase';
import { EntitlementsApi } from '../EntitlementsApi';
import { EntitlementState, Entitlement } from '../../PredefinedConfig/EntitlementState';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export class EntitlementsApiImpl extends ApiBase implements EntitlementsApi {
  public getEntitlementsState(): EntitlementState {
    return this.getAdaptableState().Entitlements;
  }

  public getAllEntitlements(): Entitlement[] {
    return this.getAdaptableState().Entitlements.FunctionEntitlements;
  }

  public getEntitlementByAdaptableFunctionName(
    adaptableFunctionName: AdaptableFunctionName
  ): Entitlement {
    return this.getAdaptableState().Entitlements.FunctionEntitlements.find(
      f => f.FunctionName == adaptableFunctionName
    );
  }

  public getEntitlementAccessLevelForAdaptableFunctionName(
    adaptableFunctionName: AdaptableFunctionName
  ): string {
    return this.getAdaptableState().Entitlements.FunctionEntitlements.find(
      f => f.FunctionName == adaptableFunctionName
    ).AccessLevel;
  }

  public addEntitlements(entitlements: Entitlement[]): void {
    entitlements.forEach((entitlement: Entitlement) => {
      this.dispatchAction(EntitlementsRedux.EntitlementAdd(entitlement));
    });
  }

  public addEntitlement(entitlement: Entitlement): void {
    this.dispatchAction(EntitlementsRedux.EntitlementAdd(entitlement));
  }

  public createEntitlement(
    adaptableFunctionName: AdaptableFunctionName,
    accessLevel: 'ReadOnly' | 'Hidden' | 'Full'
  ): void {
    let entitlement: Entitlement = {
      FunctionName: adaptableFunctionName,
      AccessLevel: accessLevel,
    };
    this.addEntitlement(entitlement);
  }

  public editEntitlement(
    adaptableFunctionName: AdaptableFunctionName,
    accessLevel: 'ReadOnly' | 'Hidden' | 'Full'
  ): void {
    let entitlement: Entitlement = {
      FunctionName: adaptableFunctionName,
      AccessLevel: accessLevel,
    };
    this.dispatchAction(EntitlementsRedux.EntitlementUpdate(entitlement));
  }

  public deleteEntitlement(adaptableFunctionName: AdaptableFunctionName): void {
    this.dispatchAction(EntitlementsRedux.EntitlementDelete(adaptableFunctionName));
  }
}
