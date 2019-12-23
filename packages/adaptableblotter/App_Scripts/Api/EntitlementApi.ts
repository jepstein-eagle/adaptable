import { EntitlementState, Entitlement } from '../PredefinedConfig/EntitlementState';
import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';

export interface EntitlementApi {
  getEntitlementState(): EntitlementState;
  getAllEntitlement(): Entitlement[];
  getEntitlementByFunction(functionName: AdaptableFunctionName): Entitlement;
  getEntitlementAccessLevelForFunction(functionName: AdaptableFunctionName): string;
  addEntitlement(
    functionName: AdaptableFunctionName,
    accessLevel: 'ReadOnly' | 'Hidden' | 'Full'
  ): void;
  editEntitlement(
    functionName: AdaptableFunctionName,
    accessLevel: 'ReadOnly' | 'Hidden' | 'Full'
  ): void;
  deleteEntitlement(functionName: AdaptableFunctionName): void;
}
