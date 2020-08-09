import * as EntitlementsRedux from '../../Redux/ActionsReducers/EntitlementsRedux';
import { ApiBase } from './ApiBase';
import { EntitlementsApi } from '../EntitlementsApi';
import {
  Entitlement,
  AccessLevel,
  EntitlementState,
} from '../../PredefinedConfig/EntitlementState';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export class EntitlementsApiImpl extends ApiBase implements EntitlementsApi {
  public getEntitlementState(): EntitlementState {
    return this.getAdaptableState().Entitlements;
  }

  public isFunctionHiddenEntitlement(adaptableFunctionName: AdaptableFunctionName): boolean {
    return this.getEntitlementAccessLevelByAdaptableFunctionName(adaptableFunctionName) == 'Hidden';
  }

  public isFunctionFullEntitlement(adaptableFunctionName: AdaptableFunctionName): boolean {
    console.log(this.getEntitlementState());
    let test =
      this.getEntitlementAccessLevelByAdaptableFunctionName(adaptableFunctionName) == 'Full';
    console.log(adaptableFunctionName);
    console.log(test);
    return test;
  }

  public isFunctionReadOnlyEntitlement(adaptableFunctionName: AdaptableFunctionName): boolean {
    return (
      this.getEntitlementAccessLevelByAdaptableFunctionName(adaptableFunctionName) == 'ReadOnly'
    );
  }

  // do stuff here if its a function
  public getEntitlementAccessLevelByAdaptableFunctionName(
    adaptableFunctionName: AdaptableFunctionName
  ): AccessLevel {
    // first see if there is a function - and if so then run it;
    let entitlementLookUpFunction = this.getEntitlementState().EntitlementLookUpFunction;
    if (entitlementLookUpFunction) {
      const fn = this.adaptable.getUserFunctionHandler(
        'EntitlementLookUpFunction',
        entitlementLookUpFunction
      );
      let accessLevel: AccessLevel = fn(
        adaptableFunctionName,
        this.adaptable.adaptableOptions.userName,
        this.adaptable.adaptableOptions.adaptableId
      );
      if (accessLevel) {
        return accessLevel;
      }
    } else {
      // if no function then look up the state
      let entitlement: Entitlement = this.getEntitlementState().FunctionEntitlements.find(
        f => f.FunctionName == adaptableFunctionName
      );
      if (entitlement) {
        return entitlement.AccessLevel;
      }
    }
    // if still here then return their default Access Level
    let defaultAccessLevel: AccessLevel = this.getEntitlementState().DefaultAccessLevel;
    return defaultAccessLevel ? defaultAccessLevel : 'Full';
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
