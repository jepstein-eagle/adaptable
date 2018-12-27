import { IEntitlement } from '../../Api/Interface/Interfaces';
import { AccessLevel } from '../Enums';
export declare module StrategyHelper {
    function IsEditStrategy(strategyId: string): boolean;
    function IsFilterStrategy(strategyId: string): boolean;
    function IsSortStrategy(strategyId: string): boolean;
    function getEntitlementAccessLevelForStrategy(entitlements: IEntitlement[], strategyId: string): AccessLevel;
}
