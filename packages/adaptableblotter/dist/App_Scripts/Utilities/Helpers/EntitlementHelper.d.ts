import { IEntitlement } from "../../api/Interface/Interfaces";
import { AccessLevel } from "../Enums";
export declare module EntitlementHelper {
    function getEntitlementAccessLevelForStrategy(entitlements: IEntitlement[], strategyId: string): AccessLevel;
}
