import { IEntitlement } from "../../api/Interface/Interfaces";
import { AccessLevel } from "../Enums";
import { ArrayExtensions } from "../Extensions/ArrayExtensions";

export module EntitlementHelper {

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
