import { AccessLevel } from '../Enums';
import { IEntitlement } from '../Interface/Interfaces';
export declare module EntitlementHelper {
    function getEntitlementAccessLevelForStrategy(entitlements: IEntitlement[], strategyId: string): AccessLevel;
}
