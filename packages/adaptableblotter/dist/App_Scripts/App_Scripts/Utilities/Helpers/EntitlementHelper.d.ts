import { IEntitlement } from "../../Core/Interface/Interfaces";
import { AccessLevel } from "../../Utilities/Enums";
export declare module EntitlementHelper {
    function getEntitlementAccessLevelForStrategy(entitlements: IEntitlement[], strategyId: string): AccessLevel;
}
