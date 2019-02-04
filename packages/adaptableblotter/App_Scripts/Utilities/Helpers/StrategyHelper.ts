import * as StrategyConstants from '../Constants/StrategyConstants'
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { IEntitlement } from "../Interface/IEntitlement";
import { AccessLevel } from '../Enums';

export module StrategyHelper {

    export function IsEditStrategy(strategyId: string): boolean {
        return strategyId != StrategyConstants.SmartEditStrategyId
    }
    export function IsFilterStrategy(strategyId: string): boolean {
        return strategyId != StrategyConstants.SmartEditStrategyId
    }
    export function IsSortStrategy(strategyId: string): boolean {
        return strategyId != StrategyConstants.SmartEditStrategyId
    }

    export function getEntitlementAccessLevelForStrategy(entitlements: IEntitlement[], strategyId: string): AccessLevel {
        if (ArrayExtensions.IsNotNullOrEmpty(entitlements)) {
      let entitlement: IEntitlement = entitlements.find(e => e.FunctionName == strategyId);
      if (entitlement) {
          return entitlement.AccessLevel as AccessLevel;
      }
  }
  return AccessLevel.Full;
}

   

}